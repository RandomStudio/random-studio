const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `);

  data.allMarkdownRemark.edges.forEach(
    ({
      node: {
        id,
        fields: { slug },
        frontmatter: { templateKey },
      },
    }) => {
      if (templateKey && templateKey !== 'Project') {
        actions.createPage({
          path: slug,
          component: require.resolve(
            `./src/templates/${templateKey}/${templateKey}.js`,
          ),
          context: { id, templateKey },
        });
      }
    },
  );
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === 'MarkdownRemark') {
    actions.createNodeField({
      name: 'slug',
      node,
      value: createFilePath({
        node,
        getNode,
      }),
    });
  }
};
