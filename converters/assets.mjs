import { SiteClient } from 'datocms-client';
import { parse } from 'path';

const log = (...string) =>
  process.stdout.write(`Assets:: ${string.join(', ')}\n`);

const client = new SiteClient('d4ade14e68bc9b263bfdfcc85cf2f5');

let uploads;

export const uploadAsset = async (path, rawFilename) => {
  if (!rawFilename) {
    return null;
  }

  const { name, ext } = parse(rawFilename);

  const filename =
    name
      .toLowerCase()
      .replaceAll('.', '-')
      .replaceAll('-–-', '-')
      .replaceAll('--', '-')
      .replaceAll('__', '-')
      .replaceAll(' ', '-')
      .replaceAll('(', '')
      .replaceAll(')', '')
      .replaceAll('@', '-')
      .replace(/\-$/, '') + ext;

  if (!uploads) {
    uploads = await client.uploads.all({}, { allPages: true });
  }

  log('Uploading', rawFilename);
  const existing = uploads.find(upload => upload.filename === filename);

  if (existing) {
    log('Already uploaded, skipping');

    return { uploadId: existing.id };
  }

  const filepath = `${path}/${rawFilename}`;
  const uploadPath = await client.createUploadPath(filepath);
  const { id } = await client.uploads.create({ path: uploadPath });

  uploads = await client.uploads.all({}, { allPages: true });
  log('Uploaded!');

  return { uploadId: id };
};

export const eraseExistingAssets = async () => {
  uploads = await client.uploads.all({}, { allPages: true });

  if (uploads.length < 1) {
    return true;
  }

  log('Erasing', uploads.length, 'existing uploads');
  await client.uploads.bulkDestroy({ uploads: uploads.map(({ id }) => id) });

  // Endpoint doesn't always erase all media. Loop until nothing left
  await eraseExistingAssets();

  return true;
};
