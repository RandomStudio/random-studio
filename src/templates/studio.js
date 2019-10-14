import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout/layout"
import Navigation from "../components/Layout/navigation"
import Footer from "../components/Layout/footer"
import styles from "./studio.module.css"
import ReactMarkdown from "react-markdown"

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

export default ({ data }) =>
  console.log(data) || (
    <Layout>
      <Navigation />
      <h1 className={styles.logo}>
        Random
        <br />
        Studio
      </h1>
      <div className={styles.intro}>
        <div className={styles.address}>
          <div>
            <ReactMarkdown
              escapeHtml={false}
              source={data.indexPage.frontmatter.address}
            />
          </div>

          <div>
            <ReactMarkdown
              escapeHtml={false}
              source={data.indexPage.frontmatter.contact}
            />
          </div>
        </div>
        <ReactMarkdown
          escapeHtml={false}
          source={data.studioPage.frontmatter.intro}
        />
      </div>
      <Footer {...data.indexPage.frontmatter} />
    </Layout>
  )
