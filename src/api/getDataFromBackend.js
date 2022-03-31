import { GraphQLClient } from 'graphql-request';

const getDataFromBackend = async ({ query, variables, preview }) => {
  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`;

  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
    },
  });

  const data = await client.request(query, variables);

  return data;
};

export default getDataFromBackend;
