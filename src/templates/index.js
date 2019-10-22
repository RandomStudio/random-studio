import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout/layout"
import Navigation from "../components/Layout/navigation"
import Footer from "../components/Layout/footer"
import ProjectList from "../components/projectList"
import HomeVideo from "../components/homeVideo"
import SEO from "../components/Layout/seo"

export const query = graphql`
  {
    allMarkdownRemark(
      sort: { fields: frontmatter___priority, order: DESC }
      filter: { frontmatter: { templateKey: { eq: "project" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            thumbnail {
              ratio
              marginLeft
              marginTop
              video
              width
              image {
                childImageSharp {
                  fluid(maxWidth: 1920) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
    markdownRemark(frontmatter: { templateKey: { eq: "index" } }) {
      fields {
        slug
      }
      frontmatter {
        address
        contact
        collaborationCredits {
          collaborator
          url
        }
        intro
        middle
        video
      }
    }
  }
`

export default ({ data }) =>
  console.log(data) || (
    <Layout>
      <SEO pathName={data.markdownRemark.fields.slug} />
      <Navigation />
      <HomeVideo
        videoUrl={data.markdownRemark.frontmatter.video}
        collaborationCredits={
          data.markdownRemark.frontmatter.collaborationCredits
        }
      />
      <ProjectList
        {...data.markdownRemark.frontmatter}
        projects={data.allMarkdownRemark.edges.map(
          ({
            node: {
              fields: { slug },
              frontmatter: { title, thumbnail },
            },
          }) => ({ slug, title, thumbnail })
        )}
      />
      <Footer {...data.markdownRemark.frontmatter} />
    </Layout>
  )
