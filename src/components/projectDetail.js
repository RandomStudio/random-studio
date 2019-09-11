import React from "react"
import styles from "./projectDetail.module.css"
import Img from "gatsby-image"
import ReactMarkdown from "react-markdown"

const ProjectDetail = ({ title, intro, content = [] }) => (
  <div className={styles.project}>
    <h1 className={styles.title}>{title}</h1>
    <div className={styles.intro}>
      <ReactMarkdown escapeHtml={false} source={intro} />
    </div>
    {content.map(
      (
        { caption, image, marginLeft, marginTop, ratio, video, width },
        index
      ) => (
        <div
          key={index}
          className={styles.item}
          style={{
            marginTop: `${marginTop}%`,
            marginLeft: `${marginLeft}%`,
            width: `${width}%`,
          }}
        >
          {video || image ? (
            <>
              {video ? (
                <div style={{ paddingBottom: `${ratio}%` }}>
                  <video src={video} loop muted autoPlay playsInline />
                </div>
              ) : image.childImageSharp ? (
                <Img fluid={image.childImageSharp.fluid} />
              ) : (
                <img alt="" src={image} />
              )}
              {caption && <div className={styles.caption}>{caption}</div>}
            </>
          ) : (
            <div className={styles.text} key={index}>
              {caption}
            </div>
          )}
        </div>
      )
    )}
  </div>
)

export default ProjectDetail
