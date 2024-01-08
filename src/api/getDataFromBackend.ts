import { GraphQLClient, RequestDocument } from 'graphql-request';
import addAdditionalInfoToBlocks from '../pages/api/addAdditionalDataToBlocks';

const getDataFromBackend = async ({
  query,
  variables,
  isPreview = false,
}: {
  query: RequestDocument;
  variables?: unknown;
  isPreview?: boolean;
}) => {
  const endpoint = 'https://graphql.datocms.com/';

  const includeDrafts = process.env.NEXT_CONTEXT !== 'production' || isPreview;
  console.log('Doing a fetch', includeDrafts);

  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
      ...(includeDrafts ? { 'X-Include-Drafts': 'true' } : {}),
    },
  });

  const data = await client.request(query, variables);
  console.log('Resolved a fetch');

  return addAdditionalInfoToBlocks(data);
};

export default getDataFromBackend;
