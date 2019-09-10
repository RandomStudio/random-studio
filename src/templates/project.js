import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"
import styles from "./project.module.css"

// export const pageQuery = graphql`
//   query ProjectBySlug($slug: String!) {
//     contentfulProject(slug: { eq: $slug }) {
//       title
//       intro {
//         intro
//       }
//       content {
//         caption {
//           caption
//         }
//         marginLeft
//         marginTop
//         ratio
//         width
//         media {
//           file {
//             contentType
//             url
//           }
//           fluid(maxWidth: 1920, background: "rgb:000000") {
//             ...GatsbyContentfulFluid_tracedSVG
//           }
//         }
//       }
//     }
//   }
// `

export default ({ data: { contentfulProject: project } }) =>
  console.log(project) || (
    <Layout>
      <div className={styles.project}>
        <h1 className={styles.title}>{project.title}</h1>
        <div className={styles.intro}>{project.intro.intro}</div>
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
            {item.media ? (
              <div style={{ paddingBottom: `${item.ratio}%` }}>
                {item.media.file.contentType === "video/mp4" ? (
                  <video
                    src={item.media.file.url}
                    loop
                    muted
                    autoPlay
                    playsInline
                  />
                ) : (
                  <Img fluid={item.media.fluid} />
                )}
                {item.caption && (
                  <div className={styles.caption}>{item.caption.caption}</div>
                )}
              </div>
            ) : (
              <div className={styles.text} key={index}>
                {item.caption && item.caption.caption}
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

/* {item.type === "video" ? (
                <video src={item.content} loop muted autoPlay playsInline />
              ) : item.type === "image" && item.content ? (
                <>
                  <img
                    src={`${project.base_image_url}${item.content}`}
                    alt={item.alt}
                  />
                </>
              ) : (
                <div
                  className={styles.text}
                  dangerouslySetInnerHTML={{ __html: item.content }}
                  key={index}
                />
              )} */
