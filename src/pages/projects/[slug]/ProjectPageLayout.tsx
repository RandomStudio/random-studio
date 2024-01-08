import React from 'react';
import Head from '../../../components/Head/Head';
import Layout from '../../../components/Layout/Layout';
import ProjectDetail from '../../../components/ProjectDetail/ProjectDetail';
import styles from './index.module.scss';
import useScrollRestoration from './useScrollRestoration';
import {
  CreditsType,
  ContentBlock as ContentBlockType,
  Image,
  OpenGraph,
  ProjectSummary,
} from '../../../types/types';

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
