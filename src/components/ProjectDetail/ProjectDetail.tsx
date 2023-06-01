import React from 'react';
import ReactMarkdown from 'react-markdown';
import RelatedProjectSlider from './RelatedProjectSlider/RelatedProjectSlider';
import styles from './ProjectDetail.module.scss';
import ContentBlock from './ContentBlock/ContentBlock';
import BackScrim from './BackScrim/BackScrim';
import {
  ContentBlockType,
  CreditsType,
  OpenGraph,
  RelatedProject,
  VideoData,
} from '../../types'

import Credits from './Credits/Credits';

type ProjectDetailProps = {
  credits: CreditsType[];
  content: ContentBlockType[];
  details: { [key: string]: string };
  intro: string;
  relatedProjectsTitle: string;
  relatedProjects: RelatedProject[];
  title: string;
};

const ProjectDetail = ({
  credits,
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

      <Credits credits={credits} details={details} />

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
