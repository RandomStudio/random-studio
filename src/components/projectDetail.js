import React from "react"
import styles from "./projectDetail.module.css"
import Img from "gatsby-image"
import ReactMarkdown from "react-markdown"

const ProjectDetail = ({ title, intro, content = [] }) =>
  console.log({ title, intro, content }) || (
    <div className={styles.project}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.intro}>
        <ReactMarkdown escapeHtml={false} source={intro} />
      </div>
      {content.map((item, index) => (
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
    </div>
  )

export default ProjectDetail
