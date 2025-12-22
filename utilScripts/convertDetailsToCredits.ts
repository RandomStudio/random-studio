import { buildBlockRecord, buildClient } from '@datocms/cma-client-node';
const client = buildClient({ apiToken: 'KEY_HERE' });

const createCredits = async (key: string, value: string) => {

  const item = buildBlockRecord({
    item_type: { type: 'item_type', id: '2041491' },
    label: key,
    text: value
  })
  return item;
}

type Project = {
  id: string;
  details: string;
  credits: number[];
}

//client.items.list({ filter: { type: 'credit' } }).then(console.log)

client.items.list({ filter: { type: 'project' } }).then(projects => {
  const allProjects = projects as unknown as Project[];
  allProjects.forEach(async project => {
    const parsed = JSON.parse(project.details);

    if (!parsed || project.credits.length > 0) {
      return;
    }


    const credits = await Promise.all(Object.entries(parsed).map(([key, value]) => createCredits(key, value)));

    try {

      await client.items.update(project.id, {
        credits
      })
      console.log('Success')
    } catch (error) {
      console.log('Failed', project.title)
      //console.log(error)
    }
  })
})
