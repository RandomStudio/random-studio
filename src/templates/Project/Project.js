import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/Layout/layout"
import ProjectDetail from "../../components/projectDetail"
import Navigation from "../components/Layout/navigation"
import SEO from "../../components/Layout/seo"
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
            childImageSharp {
              fixed(width: 800, height: 800) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
        title
        intro
        content {
          caption
          image {
            childImageSharp {
              fluid(maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
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
}) => {
  const returnSlug = `#${slug}`
  const thumbnailImage = project.thumbnail.image
  const SEOImage = thumbnailImage
    ? thumbnailImage.childImageSharp
      ? thumbnailImage.childImageSharp.fixed.src
      : thumbnailImage.publicURL
    : undefined

  return (
    <Layout>
      <SEO
        pathName={slug}
        title={project.title}
        description={project.intro}
        image={SEOImage}
      />
      <Navigation />
      <ProjectDetail {...project} />
      <BackScrim returnUrl={returnSlug} />
    </Layout>
  )
}
