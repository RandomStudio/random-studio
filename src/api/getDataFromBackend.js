import { GraphQLClient } from 'graphql-request';

const getDataFromBackend = async ({ query, variables, preview }) => {
  const endpoint = `https://graphql.datocms.com/`;

  console.log(preview ? 'Getting preview data' : 'Getting published data');

  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
      ...(preview ? { 'X-Include-Drafts': 'true' } : {}),
    },
  });

  const data = await client.request(query, variables);

  return data;
};

export default getDataFromBackend;
