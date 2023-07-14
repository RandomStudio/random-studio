import React from 'react';
import ReactMarkdown from 'react-markdown';
import RelatedProjectSlider from './RelatedProjectSlider/RelatedProjectSlider';
import styles from './ProjectDetail.module.scss';
import ContentBlock from './ContentBlock/ContentBlock';
import BackScrim from './BackScrim/BackScrim';
import {
  ContentBlockType,
  CreditsType,
  ProjectSummary,
} from '../../types/types';

import Credits from './Credits/Credits';
import Markdown from '../Markdown/Markdown';

type ProjectDetailProps = {
  credits: CreditsType[];
  content: ContentBlockType[];
  externalUrl: string;
  intro: string;
  relatedProjectsTitle: string;
  relatedProjects: ProjectSummary[];
  title: string;
};

const ProjectDetail = ({
  credits,
  content,
  externalUrl,
  intro,
  relatedProjects,
  relatedProjectsTitle,
  title,
}: ProjectDetailProps) => {
  return (
    <div className={styles.project}>
      <h1 className={styles.title}>
        <Markdown markdown={title} />
      </h1>

      <div className={styles.intro}>
        <Markdown markdown={intro} />
      </div>

      {content?.map(block => (
        <ContentBlock {...block} key={block.id} />
      ))}

      <Credits credits={credits} externalUrl={externalUrl} />

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
