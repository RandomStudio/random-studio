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
      if (templateKey) {
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

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Allow articles to be empty from\ GraphQL MD
  const typeDefsArticles = `
    type Article {
      article: String
      position: Int
    }

    type MarkdownRemarkFrontmatter implements Node {
      articles: [Article]
    }
  `
  const typeDefsRelatedProject = `
    type RelatedProject {
      title: String
      subtitle: String
      project: String!
    }

    type RelatedProjectBlock {
      blockTitle: String
      projects: [RelatedProject]
    }

    type MarkdownRemarkFrontmatter implements Node {
      relatedProjects: RelatedProjectBlock
    }
  `

  createTypes(`${typeDefsArticles} ${typeDefsRelatedProject}`);
}
