import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout/layout"
import ProjectDetail from "../components/projectDetail"
import Navigation from "../components/Layout/navigation"
import SEO from "../components/Layout/seo"

export const pageQuery = graphql`
  query ProjectById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        thumbnail {
          image {
            publicURL
          }
        }
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
          marginTop
          marginLeft
          ratio
          video {
            url
            autoplay
            isMuted
            hasControls
            loops
          }
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
    <SEO
      title={project.title}
      description={project.intro}
      image={project.thumbnail.image.publicURL}
    />
    <Navigation />
    <ProjectDetail {...project} />
  </Layout>
)
