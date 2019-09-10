import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import styles from "./index.module.css"
import Img from "gatsby-image"

export const query = graphql`
  {
    allContentfulProject {
      edges {
        node {
          title
          slug
          thumbnail {
            fluid(maxWidth: 1920, background: "rgb:000000") {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`

export default ({ data }) => (
  <Layout>
    {data.allContentfulProject.edges.map(
      ({ node }) =>
        console.log(node) || (
          <Link
            className={styles.thumbnail}
            key={node.slug}
            id={node.slug}
            to={`/projects/${node.slug}`}
          >
            <div className={styles.media}>
              <Img fluid={node.thumbnail.fluid} alt="" />
            </div>
            <div>{node.title}</div>
          </Link>
        )
    )}
  </Layout>
)
