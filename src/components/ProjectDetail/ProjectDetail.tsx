import React from 'react';
import ReactMarkdown from 'react-markdown';
import RelatedProjectSlider from './RelatedProjectSlider/RelatedProjectSlider';
import styles from './ProjectDetail.module.scss';
import ContentBlock from './ContentBlock/ContentBlock';
import BackScrim from './BackScrim/BackScrim';
import { ContentBlockType, OpenGraph, RelatedProject, VideoData } from '../../types';

type ProjectDetailProps = {
  content: ContentBlockType[],
  details: {[key:string]: string},
  intro: string,
  relatedProjectsTitle: string,
  relatedProjects: RelatedProject[],
  title: string,
}

const ProjectDetail = ({
  content,
  details,
  intro,
  relatedProjects,
  relatedProjectsTitle,
  title,
}: ProjectDetailProps) => {
  return (
    <div className={styles.project}>
      <h1 className={styles.title}>
        <ReactMarkdown>{title.replace('<br>', '\n\n')}</ReactMarkdown>
      </h1>

      <div className={styles.intro}>
        <ReactMarkdown linkTarget="_blank">
          {intro.replace('<br>', '\n\n')}
        </ReactMarkdown>
      </div>

      {content?.map(block => (
        <ContentBlock {...block} key={block.id} />
      ))}

      <dl aria-label="Project Details" className={styles.credits}>
        {Object.entries(details ?? {})?.map(([key, value]) => (
          <React.Fragment key={`${key}-${value}`}>
            <dt>{`${key}:`}</dt>

            <dd>
              <ReactMarkdown linkTarget="_blank">
                {value.replaceAll('<br />', '<br>').replaceAll('<br>', '\n\n')}
              </ReactMarkdown>
            </dd>
          </React.Fragment>
        ))}
      </dl>

      {relatedProjects && relatedProjects.length > 0 && (
        <RelatedProjectSlider
          relatedProjects={relatedProjects}
          relatedProjectsTitle={relatedProjectsTitle}
        />
      )}

      <BackScrim />
    </div>
  );
};

export default ProjectDetail;
