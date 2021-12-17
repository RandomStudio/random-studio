import PropTypes from 'prop-types';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Caption from './Caption/Caption';
import Carousel from '../../Carousel/Carousel';
import VideoWithControls from '../../VideoWithControls/VideoWithControls';
import RelatedProjectSlider from './RelatedProjectSlider/RelatedProjectSlider';
import styles from './ProjectDetail.module.scss';
import Image from '../../Image/Image';

const ProjectDetail = ({ title, intro, content, credits, relatedProjects }) => {
  const contentType = ({
    caption,
    image,
    alt,
    marginLeft,
    video,
    carousel,
    width,
  }) => {
    switch (true) {
      case Boolean(video && video.url):
        return (
          <>
            <VideoWithControls {...video} />
            <Caption caption={caption} marginLeft={marginLeft} />
          </>
        );

      case Boolean(image):
        return (
          <>
            <Image
              alt={alt ?? caption ?? title}
              sizes={`(max-width: 576px) 100vw, ${width}vw`}
              src={image}
            />
            <Caption caption={caption} marginLeft={marginLeft} />
          </>
        );

      case Boolean(carousel):
        return (
          <Carousel
            caption={caption}
            carousel={carousel}
            className={styles.carouselWrapper}
            width={width}
          />
        );

      default:
        return (
          <div className={styles.text}>
            <ReactMarkdown escapeHtml={false} source={caption} />
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
        ({
          caption,
          image,
          alt,
          id,
          marginLeft,
          marginTop,
          video,
          width,
          carousel,
          zIndex,
        }) => (
          <div
            className={styles.item}
            key={id}
            style={{
              '--marginLeft': `${marginLeft}%`,
              '--marginTop': `${marginTop}%`,
              '--width': `${width}%`,
              zIndex: zIndex || '0',
            }}
          >
            {contentType({
              caption,
              image,
              alt,
              marginLeft,
              video,
              carousel,
              width,
            })}
          </div>
        ),
      )}

      <RelatedProjectSlider
        blockTitle={relatedProjects && relatedProjects.blockTitle}
        projects={relatedProjects}
      />

      <dl aria-label="Project Details" className={styles.credits}>
        {(credits || []).map(({ key, value }) => (
          <React.Fragment key={`${key}-${value}`}>
            <dt>{key}</dt>
            <dd>
              <ReactMarkdown source={value} />
            </dd>
          </React.Fragment>
        ))}
      </dl>
    </div>
  );
};

ProjectDetail.propTypes = {
  title: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  credits: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  relatedProjects: PropTypes.shape({
    blockTitle: PropTypes.string,
    projects: PropTypes.arrayOf(PropTypes.object),
  }),
  allProjects: PropTypes.arrayOf(PropTypes.object),
};

ProjectDetail.defaultProps = {
  allProjects: [],
  relatedProjects: null,
};

export default ProjectDetail;
