import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout/layout"
import Navigation from "../components/Layout/navigation"
import Footer from "../components/Layout/footer"
import ProjectList from "../components/projectList"
import HomeVideo from "../components/homeVideo"

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
              marginLeft
              width
              image {
                childImageSharp {
                  fluid(maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
    markdownRemark(frontmatter: { templateKey: { eq: "index" } }) {
      frontmatter {
        address
        contact
        intro
        middle
      }
    }
  }
`

export default ({ data }) => (
  <Layout>
    <Navigation />
    <HomeVideo />
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
