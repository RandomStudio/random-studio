import PropTypes from 'prop-types';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Caption from './Caption/Caption';
import Carousel from '../../Carousel/Carousel';
import ProjectVideo from '../ProjectVideo/ProjectVideo';
import RelatedProjectSlider from './RelatedProjectSlider/RelatedProjectSlider';
import styles from './ProjectDetail.module.scss';

const ProjectDetail = ({
  title,
  intro,
  content,
  credits,
  relatedProjects,
  allProjects,
}) => {
  const relatedWork =
    relatedProjects &&
    (relatedProjects.projects || []).map(relatedProject => {
      const foundProject =
        allProjects.length &&
        allProjects.find(project => relatedProject.project === project.title);

      return {
        ...relatedProject,
        slug: foundProject ? foundProject.slug : null,
      };
    });

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
            <ProjectVideo video={video} />
            <Caption caption={caption} marginLeft={marginLeft} />
          </>
        );

      case Boolean(image && image.childImageSharp):
        return (
          <>
            <img
              alt={alt}
              fluid={{
                ...image.childImageSharp.fluid,
                sizes: `(max-width: 576px) 100vw, ${width}vw`,
              }}
              width={width}
            />
            <Caption caption={caption} marginLeft={marginLeft} />
          </>
        );

      case Boolean(image):
        return (
          <>
            <img alt="" src={image} />
            <Caption caption={caption} marginLeft={marginLeft} />
          </>
        );

      case Boolean(carousel):
        return (
          <Carousel
            caption={caption}
            carousel={carousel}
            className={styles.carouselWrapper}
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
        (
          {
            caption,
            image,
            alt,
            marginLeft,
            marginTop,
            video,
            width,
            carousel,
            zIndex,
          },
          index,
        ) => (
          <div
            className={styles.item}
            key={index}
            style={{
              zIndex: zIndex || '0',
              '--marginTop': `${marginTop}%`,
              '--marginLeft': `${marginLeft}%`,
              '--width': `${width}%`,
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
        projects={relatedWork}
      />

      <footer className={styles.credits}>
        {(credits || []).map(({ key, value }) => (
          <ul className="" key={`${key}-${value}`}>
            <li>{key}</li>
            <li>
              <ReactMarkdown source={value} />
            </li>
          </ul>
        ))}
      </footer>
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
