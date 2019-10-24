import React from "react"
import styles from "./projectDetail.module.scss"
import ReactMarkdown from "react-markdown"
import ProjectVideo from "./projectVideo"
import LazyImage from "./General/LazyImage/lazyImage"

const ProjectDetail = ({ title, intro, content, credits }) => {
  return (
    <div className={styles.project}>
      <h1 className={styles.title}>
        <ReactMarkdown escapeHtml={false} source={title} />
      </h1>
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
            {(video && video.url) || image ? (
              <>
                {video && video.url ? (
                  <ProjectVideo video={video} ratio={ratio} />
                ) : (
                  <LazyImage image={image} />
                )}
                {caption && (
                  <div
                    className={styles.caption}
                    style={{ marginLeft: !marginLeft && "1.4rem" }}
                  >
                    {caption}
                  </div>
                )}
              </>
            ) : (
              <div className={styles.text}>
                <ReactMarkdown source={caption} />
              </div>
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
