import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import styles from "./project.module.css"

export default ({ pageContext: { project } }) => (
  <Layout>
    <div className={styles.project}>
      <h1
        className={styles.title}
        dangerouslySetInnerHTML={{ __html: project.title }}
      />
      <div
        className={styles.intro}
        dangerouslySetInnerHTML={{ __html: project.intro }}
      />
      {project.items.map((item, index) => (
        <div
          key={index}
          className={styles.item}
          style={{
            marginTop: `${item.marginTop}vw`,
            marginLeft: `${item.marginLeft}vw`,
            width: `${item.width}%`,
          }}
        >
          <div
            className={styles.media}
            style={{ paddingBottom: `${item.ratio}%` }}
          >
            {item.type === "video" ? (
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
            )}
          </div>
          {item.caption && <div className={styles.caption}>{item.caption}</div>}
        </div>
      ))}
      <Link to={`/#${project.slug}`} className={styles.back}>
        Back to projects
      </Link>
    </div>
  </Layout>
)
