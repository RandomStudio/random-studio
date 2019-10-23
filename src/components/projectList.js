import React from "react"
import { Link } from "gatsby"
import styles from "./projectList.module.scss"
import Img from "gatsby-image"
import ReactMarkdown from "react-markdown"
import ProjectVideo from "./projectVideo"

export default ({ intro, middle, projects }) => (
  <div id="projects" className={styles.projects}>
    <div className={styles.statement}>
      <ReactMarkdown escapeHtml={false} source={intro} />
    </div>
    {projects.map(({ thumbnail, title, slug }, index) => (
      <React.Fragment key={index}>
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
            {thumbnail.video ? (
              <ProjectVideo
                video={{
                  autoplay: true,
                  isMuted: true,
                  hasControls: false,
                  loops: true,
                  url: thumbnail.video,
                }}
                ratio={thumbnail.ratio}
              />
            ) : (
              !!thumbnail.image &&
              (thumbnail.image.childImageSharp ? (
                <Img fluid={thumbnail.image.childImageSharp.fluid} />
              ) : (
                <img alt="" src={thumbnail.image} />
              ))
            )}
          </div>
          <p className={styles.title}>
            <ReactMarkdown escapeHtml={false} source={title} />
          </p>
        </Link>
        {(index === 5 ||
          (projects.length < 5 && index === projects.length - 1)) && (
          <div className={styles.intermittentStatement}>
            <ReactMarkdown escapeHtml={false} source={middle} />
          </div>
        )}
      </React.Fragment>
    ))}
  </div>
)
