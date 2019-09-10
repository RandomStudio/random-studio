// exports.createPages = async ({ graphql, actions }) => {
//   const result = await graphql(`
//     {
//       allContentfulProject {
//         edges {
//           node {
//             slug
//           }
//         }
//       }
//     }
//   `)
//   await Promise.all(
//     result.data.allContentfulProject.edges.map(({ node: { slug } }) =>
//       actions.createPage({
//         path: `/projects/${slug}`,
//         component: require.resolve(`./src/templates/project.js`),
//         context: { slug },
//       })
//     )
//   )
// }
