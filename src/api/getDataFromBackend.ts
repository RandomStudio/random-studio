import { GraphQLClient, RequestDocument } from 'graphql-request';

const getDataFromBackend = async ({ query, variables, preview, }: { query: RequestDocument, variables?: unknown, preview?: boolean, }) => {
  const endpoint = 'https://graphql.datocms.com/';

  const includeDrafts = preview ?? process.env.IGNORE_DRAFT_DATA !== 'true';

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
