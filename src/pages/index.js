import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import styles from "./index.module.css"
import Img from "gatsby-image"

export const query = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            intro
            title
          }
        }
      }
    }
  }
`

export default ({ data }) => console.log(data) || (
  <Layout>
    {data.allMarkdownRemark.edges.map(
      ({ node }) =>
        console.log(node) || (
          <Link
            className={styles.thumbnail}
            key={node.fields.slug}
            id={node.fields.slug}
            to={`/projects${node.fields.slug}`}
          >
            <div className={styles.media}>
              {/* <Img fluid={node.thumbnail.fluid} alt="" /> */}
            </div>
            <div>{node.frontmatter.title}</div>
          </Link>
        )
    )}
  </Layout>
)
