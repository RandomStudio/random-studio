import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout/layout"
import ProjectDetail from "../components/projectDetail"
import Navigation from "../components/Layout/navigation"
import SEO from "../components/Layout/seo"
import BackScrim from "../components/Project/BackScrim/backScrim"

export const pageQuery = graphql`
  query ProjectById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
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
                ...GatsbyImageSharpFluid
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
    markdownRemark: {
      fields: { slug },
      frontmatter: project,
    },
  },
}) => (
  <Layout>
    <SEO
      pathName={slug}
      title={project.title}
      description={project.intro}
      image={
        project.thumbnail.image ? project.thumbnail.image.publicURL : undefined
      }
    />
    <Navigation />
    <ProjectDetail {...project} />
    <BackScrim />
  </Layout>
)
