import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import styles from "./index.module.css"

export const query = graphql`
  {
    allApiProjects(filter: { slug: { ne: null } }) {
      edges {
        node {
          id
          slug
          tags
          title
          thumbnailType
          thumbnailContent
          thumbnailAlt
          base_image_url
          thumbnailMarginLeft
          thumbnailMarginTop
          thumbnailWidth
          thumbnailRatio
        }
      }
    }
  }
`

export default ({ data }) => (
  <Layout>
    {data.allApiProjects.edges.map(({ node }) => (
      <Link
        className={styles.thumbnail}
        key={node.id}
        id={node.slug}
        to={`/projects/${node.slug}`}
        style={{
          marginTop: `${node.thumbnailMarginTop}vw`,
          marginLeft: `${node.thumbnailMarginLeft}vw`,
          width: `${node.thumbnailWidth}%`,
        }}
      >
        <div
          className={styles.media}
          style={{ paddingBottom: `${node.thumbnailRatio}%` }}
        >
          {node.thumbnailType === "video" ? (
            <video
              src={node.thumbnailContent}
              loop
              muted
              autoPlay
              playsInline
            />
          ) : (
            <img
              src={`${node.base_image_url}${node.thumbnailContent}`}
              alt={node.thumbnailAlt}
            />
          )}
        </div>
        <div dangerouslySetInnerHTML={{ __html: node.title }} />
      </Link>
    ))}
  </Layout>
)
