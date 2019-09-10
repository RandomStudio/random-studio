const { createFilePath } = require("gatsby-source-filesystem")
const { fmImagesToRelative } = require("gatsby-remark-relative-images")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              intro
              title
            }
          }
        }
      }
    }
  `)

  return Promise.all(
    result.data.allMarkdownRemark.edges.map(edge =>
      createPage({
        path: `/projects${edge.node.fields.slug}`,
        component: require.resolve(`./src/templates/project.js`),
        context: { id: edge.node.id },
      })
    )
  )
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    console.log(
      createFilePath({
        node,
        getNode,
        basePath: "project/",
        trailingSlash: false,
      })
    )
    actions.createNodeField({
      name: `slug`,
      node,
      value: createFilePath({
        node,
        getNode,
        basePath: "project/",
        trailingSlash: false,
      }),
    })
  }
}
