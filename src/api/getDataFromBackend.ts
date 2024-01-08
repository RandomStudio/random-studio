import { GraphQLClient, RequestDocument } from 'graphql-request';
import addAdditionalInfoToBlocks from '../pages/api/addAdditionalDataToBlocks';

const getDataFromBackend = async ({
  query,
  variables,
}: {
  query: RequestDocument;
  variables?: unknown;
}) => {
  const endpoint = 'https://graphql.datocms.com/';

  const includeDrafts =
    process.env.NEXT_CONTEXT !== 'production' ??
    (typeof window !== 'undefined' &&
      window.location.hostname === 'staging.random.studio');

  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
      ...(includeDrafts ? { 'X-Include-Drafts': 'true' } : {}),
    },
  });

  const data = await client.request(query, variables);

  return addAdditionalInfoToBlocks(data);
};

export default getDataFromBackend;
