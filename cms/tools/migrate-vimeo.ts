// @ts-nocheck
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { buildClient, buildBlockRecord, Client } from '@datocms/cma-client-node';
dotenv.config()
const tus = require("tus-js-client");
const YoutubeDlWrap = require('youtube-dl-wrap');
const fs = require('fs')

var crypto = require('crypto');
var FuzzySet = require('fuzzyset.js');


const youtubeDlWrap = new YoutubeDlWrap("/opt/homebrew/bin/youtube-dl");

const client: Client = buildClient({ apiToken: process.env.DATOCMS_BACKUP_TOKEN });

interface Post {
  id: string
  title: string
  featured_video: Video
  featured_video_new: string
  content: VideoBlock[]
}

interface VideoBlock {
  id: string
  video_new: string,
  video: Video
}

interface Video {
  url: string
  title: string
  width: number
  height: number
  provider: string
  provider_uid: string
  thumbnail_url: string
}

const libraryId = 87192;
const apiKey = process.env.BUNNY_TOKEN

const updateRecord = async (id, post) => {
  const item = await client.items.update(id, post);
  console.log('Updated', item.title)
}

let existingItems = [];
const getExistingVideosList = async () => {
  const f = await fetch(`https://video.bunnycdn.com/library/${libraryId}/videos?itemsPerPage=1000`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/*+json',
      AccessKey: apiKey
    },
  })
  const {
    totalItems,
    currentPage,
    itemsPerPage, items } = await f.json();
  existingItems = [...existingItems, ...items];

  if (totalItems > currentPage * itemsPerPage) {
    await getExistingVideosList();
  }
}

const getPreexistingVideo = async (id) => {
  return existingItems.find(video => video.title.includes(id))?.guid;
}

const uploadVideo = (filename, title, videoId) => new Promise((resolve) => {
  console.log('Start upload', title)
  const date = new Date();
  date.setHours(date.getHours() + 1)
  const expiration = date.getTime()

  const file = fs.createReadStream(filename)

  var upload = new tus.Upload(file, {
    endpoint: "https://video.bunnycdn.com/tusupload",
    retryDelays: [0, 3000, 5000, 10000, 20000, 60000, 60000],
    headers: {
      AccessKey: apiKey,
      //AuthorizationSignature: crypto.createHash('sha256').update(libraryId + apiKey + expiration + videoId).digest('base64'),
      AuthorizationExpire: expiration, // Expiration time as in the signature,
      VideoId: videoId, // The guid of a previously created video object through the Create Video API call
      LibraryId: libraryId,
    },
    metadata: {
      filetype: 'video/mp4',
      title: title,
    },
    onError: function (error) {
      console.error(error)
    },
    onProgress: function (bytesUploaded, bytesTotal) {
      var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
      console.log(bytesUploaded, bytesTotal, percentage + "%")
    },
    onSuccess: function () {
      console.log("Upload to Bunny complete", title, upload.url)
      resolve(videoId);
    }
  })

  // Check if there are any previous uploads to continue.
  upload.findPreviousUploads().then(function (previousUploads) {
    // Found previous uploads so we select the first one.
    if (previousUploads.length) {
      upload.resumeFromPreviousUpload(previousUploads[0])
    }

    // Start the upload
    upload.start()
  })

})

const createBunnyVideo = async (title) => {
  const url = `https://video.bunnycdn.com/library/${libraryId}/videos`;
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/*+json',
      AccessKey: apiKey
    },
    body: JSON.stringify({ title })
  };

  const response = await fetch(url, options)
  const { guid } = await response.json();
  return guid;
}

const addVideoToBunny = async (filename, metadata) => {
  const { id, title } = metadata
  const newTitle = `${id}--${title}`
  const guid = await createBunnyVideo(newTitle);
  await uploadVideo(filename, newTitle, guid);
  return guid;
};

const prepareVideo = async (id, url) => {
  const filename = `./vimeo/${id}.mp4`
  let metadata = await youtubeDlWrap.getVideoInfo(url);

  if (!fs.existsSync(filename)) {
    await new Promise((resolve) => {
      youtubeDlWrap.exec([url, '--username', 'tools@random.studio', '--password', process.env.VIMEO_PASS, "-f", "best", "-o", filename])
        .on("youtubeDlEvent", (eventType, eventData) => console.log(eventType, eventData))
        .on("error", (error) => console.error(error))
        .on("close", resolve);
    })
  }
  return [filename, metadata];
}

const updateVideoBlock = async (block) => {
  const [filename, metadata] = await prepareVideo(block.id, block.video.url);
  const id = await getPreexistingVideo(metadata.id) ?? await addVideoToBunny(filename, metadata);

  return buildBlockRecord({
    id: block.id,
    item_type: block.item_type,
    videoNew: `https://vz-911ddaca-c18.b-cdn.net/${id}/original`,
  });
};

const updateVideoField = async (url) => {
  if (!url) {
    return null;
  }
  const split = url.split('/');
  const [filename, metadata] = await prepareVideo(split.at(-1), url);
  const id = await getPreexistingVideo(metadata.id) ?? await addVideoToBunny(filename, metadata);

  return `https://vz-911ddaca-c18.b-cdn.net/${id}/original`;
}

const migrateToBunny = async () => {
  let i = 0;
  await getExistingVideosList()
  for await (const post of await client.items.listPagedIterator({ filter: { type: 'project' } })) {
    //console.log(`Starting ${i + 1}: ${post.title}`)
    const blockDetails = await client.items.list({
      filter: {
        // you can also use models IDs instead of API keys!
        ids: post.content,
      },
    });
    const blocks = post.content.map(id => blockDetails.find(details => details.id === id))
    try {
      let updatedBlocks = [];
      for await (const block of (blocks ?? [])) {
        updatedBlocks.push(block.video ? await updateVideoBlock(block) : block.id);
      }
      const updatedPost = {
        featured_video_new: await updateVideoField(post.featured_video?.url),
        content: updatedBlocks,
      }
      await updateRecord(post.id, updatedPost);
    } catch (error) {
      console.error(error)
      console.log('NEED TO RETRY:', post.title, post.id)
    }
    i++
  }
}

const updateUrlBase = async () => {
  for await (const post of await client.items.listPagedIterator({ filter: { type: 'project' } })) {
    const blockDetails = await client.items.list({
      filter: {
        ids: post.content,
      },
    });
    const blocks = post.content.map(id => blockDetails.find(details => details.id === id))
    try {
      let updatedBlocks = [];
      for await (const block of (blocks ?? [])) {
        updatedBlocks.push(
          block.video_new ? buildBlockRecord({
            id: block.id,
            item_type: block.item_type,
            video_new: block.video_new.replace(`vz-911ddaca-c18.b-cdn.net`, 'vz-cbb89169-719.b-cdn.net'),
          })
            : block.id
        );
      }
      const updatedPost = {
        featured_video_new: post.featured_video_new.replace(`vz-911ddaca-c18.b-cdn.net`, 'vz-cbb89169-719.b-cdn.net'),
        content: updatedBlocks,
      }
      await updateRecord(post.id, updatedPost);
    } catch (error) {
      console.error(error)
      console.log('NEED TO RETRY:', post.title, post.id)
    }
  }
}
updateUrlBase();
//migrateToBunny();
