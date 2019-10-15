import React, { useRef, useState } from "react"
import styles from "./projectDetail.module.scss"
import Img from "gatsby-image"
import ReactMarkdown from "react-markdown"
import ProjectVideo from "./projectVideo"

const ProjectDetail = ({ title, intro, content, credits }) => {
  return (
    <div className={styles.project}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.intro}>
        <ReactMarkdown escapeHtml={false} source={intro} />
      </div>
      {(content || []).map(
        (
          { caption, image, marginLeft, marginTop, ratio, video, width },
          index
        ) => (
          <div
            key={index}
            className={styles.item}
            style={{
              "--marginTop": `${marginTop}%`,
              "--marginLeft": `${marginLeft}%`,
              "--width": `${width}%`,
            }}
          >
            {video || image ? (
              <>
                {video ? (
                  <ProjectVideo video={video} />
                ) : image.childImageSharp ? (
                  <Img fluid={image.childImageSharp.fluid} />
                ) : (
                  <img alt="" src={image} />
                )}
                {caption && <div className={styles.caption}>{caption}</div>}
              </>
            ) : (
              <div className={styles.text}>{caption}</div>
            )}
          </div>
        )
      )}

      <footer className={styles.credits}>
        {(credits || []).map(({ key, value }) => (
          <ul key={`${key}-${value}`} className="">
            <li>{key}</li>
            <li>{value}</li>
          </ul>
        ))}
      </footer>
    </div>
  )
}

export default ProjectDetail
