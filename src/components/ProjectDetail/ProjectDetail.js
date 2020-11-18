import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import Img from 'gatsby-image/withIEPolyfill';
import styles from './ProjectDetail.module.scss';
import ProjectVideo from '../../templates/Home/ProjectVideo/ProjectVideo';
import Carousel from '../Carousel/Carousel';
import Caption from './Caption/Caption';
import RelatedProjectSlider from './RelatedProjectSlider/RelatedProjectSlider';

const ProjectDetail = ({
  title,
  intro,
  content,
  credits,
  relatedProjects,
  allProjects,
}) => {
  const relatedWork = relatedProjects
    && (relatedProjects.projects || []).map(relatedProject => {
      const foundProject = allProjects.length
        && allProjects.find(
          ({
            node: {
              frontmatter: { title },
            },
          }) => relatedProject.project === title,
        );

      return {
        ...relatedProject,
        slug: foundProject ? foundProject.node.fields.slug : null,
      };
    });

  const contentType = ({
    caption,
    image,
    alt,
    marginLeft,
    video,
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
            <Img alt={alt} fluid={image.childImageSharp.fluid} />
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
            alt,
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
              alt,
              marginLeft,
              video,
              carousel,
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
          <ul key={`${key}-${value}`} className="">
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
