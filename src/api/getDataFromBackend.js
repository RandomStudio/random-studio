import { GraphQLClient } from 'graphql-request';

const getDataFromBackend = async ({ query, variables }) => {
  const endpoint = `https://graphql.datocms.com/`;

  const includeDrafts = process.env.NODE_ENV !== 'production';

  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
      ...(includeDrafts ? { 'X-Include-Drafts': 'true' } : {}),
    },
  });

  const data = await client.request(query, variables);

  return data;
};

export default getDataFromBackend;
