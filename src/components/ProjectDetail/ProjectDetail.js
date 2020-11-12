import React from 'react';
import ReactMarkdown from 'react-markdown';
import Img from 'gatsby-image';
import styles from './ProjectDetail.module.scss';
import ProjectVideo from '../../templates/Home/ProjectVideo/ProjectVideo';
import Carousel from '../Carousel/Carousel';
import Caption from './Caption/Caption';

const ProjectDetail = ({ title, intro, content, credits }) => {
  const contentType = ({
    caption,
    image,
    marginLeft,
    marginTop,
    video,
    width,
    carousel,
  }) => {
    switch (true) {
      case Boolean(video && video.url):
        return (
          <>
            <ProjectVideo video={video} />
            <Caption marginLeft={marginLeft} caption={caption} />
          </>
        );

      case Boolean(image && image.childImageSharp):
        return (
          <>
            <Img fluid={image.childImageSharp.fluid} />
            <Caption marginLeft={marginLeft} caption={caption} />
          </>
        );

      case Boolean(image):
        return (
          <>
            <img alt="" src={image} />
            <Caption marginLeft={marginLeft} caption={caption} />
          </>
        );

      case Boolean(carousel):
        return (
          <Carousel
            className={styles.carouselWrapper}
            carousel={carousel}
          />
        );

      default:
        return (
          <div className={styles.text}>
            <ReactMarkdown source={caption} />
          </div>
        );
    }
  };

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
        {
          caption,
          image,
          marginLeft,
          marginTop,
          video,
          width,
          carousel,
        },
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
            {contentType({
              caption,
              image,
              marginLeft,
              marginTop,
              video,
              width,
              carousel,
            })}
          </div>
        )
    )}

    <footer className={styles.credits}>
      {(credits || []).map(({ key, value }) => (
        <ul key={`${key}-${value}`} className="">
          <li>{key}</li>
          <li>
            <ReactMarkdown source={value} />
          </li>
        </ul>
      ))}
    </footer>
  </div>
)
};

export default ProjectDetail;
