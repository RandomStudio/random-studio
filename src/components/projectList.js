import React from "react"
import { Link } from "gatsby"
import styles from "./projectList.module.scss"
import Img from "gatsby-image"
import ReactMarkdown from "react-markdown"

export default ({ intro, middle, projects }) => (
  <div id="projects" className={styles.projects}>
    <div className={styles.statement}>
      <ReactMarkdown escapeHtml={false} source={intro} />
    </div>
    {projects.map(({ thumbnail, title, slug }, index) => (
      <>
        <Link
          className={styles.thumbnail}
          key={slug}
          id={slug}
          to={slug}
          style={{
            "--marginTop": `${thumbnail.marginTop}%`,
            "--marginLeft": `${thumbnail.marginLeft}%`,
            "--width": `${thumbnail.width}%`,
          }}
        >
          <div className={styles.media}>
            <Img fluid={thumbnail.image.childImageSharp.fluid} alt="" />
          </div>
          <p className={styles.title}>{title}</p>
        </Link>
        {(index === 5 ||
          (projects.length < 5 && index === projects.length - 1)) && (
          <div className={styles.intermittentStatement}>
            <ReactMarkdown escapeHtml={false} source={middle} />
          </div>
        )}
      </>
    ))}
  </div>
)
