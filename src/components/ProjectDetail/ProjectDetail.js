import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import styles from './ProjectDetail.module.scss';
import ProjectVideo from '../../templates/Home/ProjectVideo/ProjectVideo';
import RelatedProjectSlider from './RelatedProjectSlider/RelatedProjectSlider';
import FluidImage from '../FluidImage/FluidImage';

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
    (relatedProjects.projects || []).map((relatedProject) => {
      const foundProject =
        allProjects.length &&
        allProjects.find(
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
                ) : (
                  <FluidImage image={image} />
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

      <RelatedProjectSlider
        blockTitle={relatedProjects && relatedProjects.blockTitle}
        projects={relatedWork}
      />

      <footer
        className={`${styles.credits} ${
          relatedProjects ? styles.creditsAdjustedSpacing : ''
        }`}
      >
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
