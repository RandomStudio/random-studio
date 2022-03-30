import { GraphQLClient } from 'graphql-request';

const getDataFromBackend = async ({ query, variables }) => {
  const client = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
      authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
    },
  });

  const {
    repository,
  } = await client.request(
    `query {
      repository(owner: "RandomStudio", name: "random-studio") {
        ${typeof query === 'string' ? query : query.join('')}
      }
    }`,
    variables,
  );

  return repository;
};

export default getDataFromBackend;
