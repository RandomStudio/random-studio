import React from 'react';
import ReactMarkdown from 'react-markdown';
import Img from 'gatsby-image';
import styles from './ProjectDetail.module.scss';
import ProjectVideo from '../../templates/Home/ProjectVideo/ProjectVideo';

const ProjectDetail = ({ title, intro, content, credits }) => (
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
        index,
      ) => (
        <div
          key={index}
          className={styles.item}
          style={{
            '--marginTop': `${marginTop}%`,
            '--marginLeft': `${marginLeft}%`,
            '--width': `${width}%`,
          }}
        >
          {(video && video.url) || image ? (
            <>
              {video && video.url ? (
                <ProjectVideo video={video} ratio={ratio} />
              ) : image.childImageSharp ? (
                <Img fluid={image.childImageSharp.fluid} />
              ) : (
                <img alt="" src={image} />
              )}
              {caption && (
                <div
                  className={styles.caption}
                  style={{ marginLeft: !marginLeft && '1.4rem' }}
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
      ),
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
);

export default ProjectDetail;
