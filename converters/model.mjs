import { SiteClient } from 'datocms-client';

const log = (...string) => process.stdout.write(`Models:: ${string.join(', ')}\n`);

const client = new SiteClient('d4ade14e68bc9b263bfdfcc85cf2f5');

export const eraseExistingItems = async models => {
  const items = await client.items.all({ filter: { type: models.join(',') } }, { allPages: true });
  log('Erasing', items.length, models.join(', '));
  await client.items.bulkDestroy({ items: items.map(({ id }) => id) });
};

export const uploadItem = async data => {
  const records = await client.items.all({
    filter: {
      type: 'project',
      fields: {
        slug: {
          eq: data.slug,
        },
      },
    },
  });

  if (records.length > 0) {
    return;
  }

  const newRecord = await client.items.create(data);

  await client.item.publish(newRecord.id, {
    recursive: 'true'
  });
};
