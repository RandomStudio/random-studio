import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import styles from "./index.module.css"
import Img from "gatsby-image"

export default ({ data }) => (
  <Layout>
    {[].map(
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
