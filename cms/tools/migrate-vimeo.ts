import { buildClient, Client } from '@datocms/cma-client-node';
const tus = require("tus-js-client");
const YoutubeDlWrap = require('youtube-dl-wrap');
const fs = require('fs')

var crypto = require('crypto');

const youtubeDlWrap = new YoutubeDlWrap("/usr/local/bin/youtube-dl");

const PATH = './output.mp4';
const client: Client = buildClient({ apiToken: process.env.DATOCMS_BACKUP_TOKEN });

interface VideoBlock {
  id: string
  video_new: string,
  video: {
    url: string
    title: string
    width: number
    height: number
    provider: string
    provider_uid: string
    thumbnail_url: string
  },
}

const libraryId = 86047;
const apiKey = process.env.BUNNY_TOKEN

const updateRecord = async (post) => {
  const { id, title } = post;

  const item = await client.items.update(id, post);

  console.log('Updated', title)
}

const uploadVideo = (metadata) => new Promise(async (resolve) => {
  const { title } = metadata

  const date = new Date();
  date.setHours(date.getHours() + 1)
  const expiration = date.getTime()

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

  const file = fs.createReadStream(PATH)
  const videoId = guid;

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
      console.log("Upload to Bunny complete", upload.url)
      resolve(guid);
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

const updateVideoBlock = async (block) => {
  let metadata = await youtubeDlWrap.getVideoInfo(block.video.url);

  await new Promise((resolve) => {
    youtubeDlWrap.exec([block.video.url, '--no-continue', '--username', 'tools@random.studio', '--password', 'tintin0!', "-f", "best", "-o", PATH])
      .on("progress", (progress) =>
        console.log(progress.percent, progress.totalSize, progress.currentSpeed, progress.eta))
      .on("youtubeDlEvent", (eventType, eventData) => console.log(eventType, eventData))
      .on("error", (error) => console.error(error))
      .on("close", resolve);
  })
  const id = await uploadVideo(metadata);
  block.video_new = `https://vz-911ddaca-c18.b-cdn.net/${id}/original`;
  return block;
};

const getPosts = async () => {
  let i = 0;

  for await (const post of await client.items.listPagedIterator({ filter: { type: 'project' } })) {
    console.log('Starting', i + 1)
    console.log(post.content)
    const blocks = await client.items.list({
      filter: {
        // you can also use models IDs instead of API keys!
        ids: post.content,
      },
    });
    const updatedBlocks = await Promise.all(blocks.map(block => block.video ? updateVideoBlock(block) : block));
    const updatedPost = {
      ...post,
      content: updatedBlocks,
    }
    console.log(updatedPost)
    updateRecord(updatedPost);
    i++
    return;
  }
}

getPosts();
