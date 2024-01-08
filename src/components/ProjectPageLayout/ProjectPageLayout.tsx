import React from 'react';
import Head from '../Head/Head';
import Layout from '../Layout/Layout';
import ProjectDetail from '../ProjectDetail/ProjectDetail';
import styles from './ProjectPageLayout.module.scss';
import useScrollRestoration from '../../hooks/useScrollRestoration';
import {
  CreditsType,
  ContentBlock as ContentBlockType,
  Image,
  OpenGraph,
  ProjectSummary,
} from '../../types/types';

type ProjectPageLayoutProps = {
  content: ContentBlockType[];
  credits: CreditsType[];
  externalUrl: string;
  featuredImage: Image;
  intro: string;
  relatedProjectsTitle: string;
  relatedProjects: ProjectSummary[];
  opengraph: OpenGraph;
  title: string;
};

const ProjectPageLayout = ({
  content,
  credits,
  externalUrl,
  featuredImage,
  intro,
  opengraph: { description: ogDescription, image, title: ogTitle },
  relatedProjects,
  relatedProjectsTitle,
  title,
}: ProjectPageLayoutProps) => {
  useScrollRestoration();

  return (
    <Layout className={styles.layout} hasFooter={false}>
      <Head
        description={intro}
        image={image ?? featuredImage}
        socialDescription={ogDescription}
        socialTitle={ogTitle}
        title={title}
      />

      <ProjectDetail
        content={content}
        credits={credits}
        externalUrl={externalUrl}
        intro={intro}
        relatedProjects={relatedProjects}
        relatedProjectsTitle={relatedProjectsTitle}
        title={title}
      />
    </Layout>
  );
};

export default ProjectPageLayout;
