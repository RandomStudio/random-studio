
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

// Allows react spring to work (after build)
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /react-spring/,
          sideEffects: true,
        },
      ],
    },
  });
};

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

  const typeDefs = `
    type Article {
      article: String
      position: Int
    }

    type CarouselElement {
      image: File @fileByRelativePath
      url: String
      caption: String
    }

    type Content {
      image: File @fileByRelativePath
      carousel: [CarouselElement]
    }

    type MarkdownRemarkFrontmatter implements Node {
      articles: [Article]
      content: [Content]
    }
  `;

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
  `;

  createTypes(`${typeDefs} ${typeDefsRelatedProject}`);
};
