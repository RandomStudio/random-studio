import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import styles from "./project.module.css"
import Img from "gatsby-image"

export const pageQuery = graphql`
  query ProjectBySlug($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        intro
        title
        content {
          caption
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
          marginLeft
          ratio
          video
          width
        }
      }
    }
  }
`

export default ({
  data: {
    markdownRemark: { frontmatter: project },
  },
}) => (
  <Layout>
    <div className={styles.project}>
      <h1 className={styles.title}>{project.title}</h1>
      <div className={styles.intro}>{project.intro}</div>
      {(project.content || []).map((item, index) => (
        <div
          key={index}
          className={styles.item}
          style={{
            marginTop: `${item.marginTop}%`,
            marginLeft: `${item.marginLeft}%`,
            width: `${item.width}%`,
          }}
        >
          {item.video || item.image ? (
            <>
              {item.video ? (
                <div style={{ paddingBottom: `${item.ratio}%` }}>
                  <video src={item.video} loop muted autoPlay playsInline />
                </div>
              ) : (
                <Img fluid={item.image.childImageSharp.fluid} />
              )}
              {item.caption && (
                <div className={styles.caption}>{item.caption}</div>
              )}
            </>
          ) : (
            <div className={styles.text} key={index}>
              {item.caption}
            </div>
          )}
        </div>
      ))}
      <Link to={`/#${project.slug}`} className={styles.back}>
        Back to projects
      </Link>
    </div>
  </Layout>
)
