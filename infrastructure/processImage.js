const { basename } = require('path');
const createPlaceholder = require('./createPlaceholder');
const { Curl } = require('node-libcurl');
const fs = require('fs');
const mime = require('mime-types');

const lookupFile = './infrastructure/imageLookup.json';
const filePath = process.argv[3];
const filename = basename(filePath);

let savedImageIds;

try {
  savedImageIds = JSON.parse(fs.readFileSync(lookupFile));
} catch (error) {
  console.error(error);

  return;
}

const upload = () =>
  new Promise((resolve, reject) => {
    const curl = new Curl();
    const close = curl.close.bind(curl);

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
      if (code === 413) {
        console.error(response);
        console.log('Currently need to recover manually.')
      }
      if (code === 200) {
        const {
          result: { id },
        } = JSON.parse(response);
        console.log(id)
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


const processImage = async () => {
  await upload();

  try {
    const placeholder = await createPlaceholder(filePath);
    savedImageIds[filename].thumb = placeholder;
  } catch (error) {
    console.error(error)
    console.log('Caught and will continue without placeholder.')
    console.log(savedImageIds[filename])
  }

  fs.writeFileSync(
    lookupFile,
    JSON.stringify(savedImageIds),
  );

  console.log('Saved', filePath);
}

processImage()
