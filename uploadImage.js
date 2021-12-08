const { Curl } = require('node-libcurl');
const fs = require('fs');
const mime = require('mime-types');
const path = require('path');

const filePath = process.argv[3];

const curl = new Curl();
const close = curl.close.bind(curl);

const onSuccess = (code, response) => {
  if (code === 200) {
    const {
      result: { id },
    } = JSON.parse(response);

    let savedImageIds;

    try {
      savedImageIds = JSON.parse(fs.readFileSync('./cloudflareImageIds.json'));
    } catch (error) {
      console.error(error);

      return;
    }

    const filename = path.basename(filePath);
    savedImageIds[filename] = id;

    fs.writeFileSync(
      './cloudflareImageIds.json',
      JSON.stringify(savedImageIds),
    );

    console.log('Saved', filePath);
  }

  close();
};

const doCurl = () => {
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

  curl.on('end', onSuccess);

  curl.on('error', error => {
    console.log(error);

    close();
  });

  curl.perform();
};

doCurl();
