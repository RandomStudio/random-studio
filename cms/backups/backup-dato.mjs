import { SiteClient } from 'datocms-client';
import { createWriteStream, mkdir, writeFileSync } from 'fs';
import { basename } from 'path';
import fetch from 'node-fetch';

const client = new SiteClient(process.env.DATOCMS_BACKUP_TOKEN);

const backupRecords = async () => {
  console.log('Downloading records...');
  const response = await client.items.all({}, { allPages: true });
  writeFileSync('records.json', JSON.stringify(response, null, 2));
}

const saveAsset = (path, blob) => new Promise((resolve, reject) => {
  const stream = createWriteStream(path);
  blob.pipe(stream);
  blob.on("end", resolve);
  stream.on("error", reject);
})

const backupAssets = async () => {
  console.log('Downloading assets...');
  const site = await client.site.find();
  const uploads = await client.uploads.all({}, { allPages: true })

  mkdir('./assets', { recursive: true }, err => {
    if (err) {
      console.error(err);
    }
  });

  for await (const upload of uploads) {
    const imageUrl = 'https://' + site.imgixHost + upload.path;
    console.log(`Downloading ${imageUrl}...`);

    const response = await fetch(imageUrl);
    await saveAsset('./assets/' + basename(upload.path), response.body)
    console.log('Done')
  }
}

backupRecords();
backupAssets();
