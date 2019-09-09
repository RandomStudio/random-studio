exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    {
      allApiProjects {
        edges {
          node {
            slug
            items {
              type
              caption
              content
              alt
              width
              marginLeft
              marginTop
              ratio
            }
            intro
            title
            base_image_url
          }
        }
      }
    }
  `)
  await Promise.all(
    result.data.allApiProjects.edges.map(({ node: project }) =>
      actions.createPage({
        path: `/projects/${project.slug}`,
        component: require.resolve(`./src/templates/project.js`),
        context: { project },
      })
    )
  )
}
