const { Curl } = require('node-libcurl');
const fs = require('fs');
const mime = require('mime-types');
const path = require('path');

const filePath = process.argv[3];
const filename = path.basename(filePath);

const curl = new Curl();
const close = curl.close.bind(curl);

let savedImageIds;

try {
  savedImageIds = JSON.parse(fs.readFileSync('./cloudflareImageIds.json'));
} catch (error) {
  console.error(error);

  return;
}

const upload = () =>
  new Promise((resolve, reject) => {
    console.log('Starting for', filePath);

    curl.setOpt(
      Curl.option.URL,
      'https://api.cloudflare.com/client/v4/accounts/f1e9e2ac863d9018abac35af3b649b56/images/v1',
    );

    curl.setOpt(Curl.option.HTTPHEADER, [
      'Authorization: Bearer YwCiyIeddoLNbfe5l0sCHvkXPbEuZ7-yLw6MD5uo',
    ]);

    curl.setOpt(Curl.option.HTTPPOST, [
      {
        file: filePath,
        name: 'file',
        type: mime.contentType(filePath),
      },
    ]);

    curl.on('end', (code, response) => {
      if (code === 200) {
        const {
          result: { id },
        } = JSON.parse(response);

        savedImageIds[filename] = {
          full: id,
        };
      }

      close();
      resolve();
    });

    curl.on('error', error => {
      console.log(error);

      close();
      reject();
    });

    curl.perform();
  });


const createPlaceholder = async () => {
  const { encode } = require('blurhash');
  const sharp = require("sharp");

  const buffer = await sharp(filePath)
    .raw()
    .ensureAlpha()
    .resize(10, 10, { fit: "inside" })
    .toFormat(sharp.format.jpeg)
    .toBuffer();

  savedImageIds[filename].thumb = buffer.toString('base64')
}

const save = () => {
  fs.writeFileSync(
    './cloudflareImageIds.json',
    JSON.stringify(savedImageIds),
  );

  console.log('Saved', filePath);
}

const processImage = async () => {
  //await upload();
  try {
    await createPlaceholder();
  } catch (error) {
    console.error(error)
    console.log('Caught and will continue without placeholder.')
  }
  save();
}

processImage()
