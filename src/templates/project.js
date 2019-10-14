import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout/layout"
import ProjectDetail from "../components/projectDetail"
import Navigation from "../components/Layout/navigation"

export const pageQuery = graphql`
  query ProjectById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        intro
        content {
          caption
          image {
            childImageSharp {
              fluid(maxWidth: 1920) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
          marginLeft
          ratio
          video
          width
        }
        credits {
          key
          value
        }
      }
    }
  }
`

export default ({
  data: {
    markdownRemark: { frontmatter: project },
  },
}) => (
  <Layout>
    <Navigation />
    <ProjectDetail {...project} />
  </Layout>
)
