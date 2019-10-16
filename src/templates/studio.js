import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout/layout"
import Navigation from "../components/Layout/navigation"
import Footer from "../components/Layout/footer"
import Intro from "../components/Studio/Intro/intro"

export const query = graphql`
  {
    studioPage: markdownRemark(frontmatter: { templateKey: { eq: "studio" } }) {
      frontmatter {
        intro
      }
    }
    indexPage: markdownRemark(frontmatter: { templateKey: { eq: "index" } }) {
      frontmatter {
        address
        contact
      }
    }
  }
`

export default ({ data: { indexPage, studioPage } }) => (
  <Layout>
    <Navigation />
    <Intro data={{ ...indexPage.frontmatter, ...studioPage.frontmatter }} />
    <Footer {...indexPage.frontmatter} />
  </Layout>
)
