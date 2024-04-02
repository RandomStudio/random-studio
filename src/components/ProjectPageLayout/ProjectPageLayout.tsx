import React from 'react';
import Layout from '../Layout/Layout';
import ProjectDetail from '../ProjectDetail/ProjectDetail';
import useScrollRestoration from '../../hooks/useScrollRestoration';
import {
  CreditsType,
  ContentBlock as ContentBlockType,
  Image,
  OpenGraph,
  ProjectSummary,
} from '../../types/types';
import Container from '../Layout/Container/Container';

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
    <Layout
      description={intro}
      hasFooter={false}
      image={image ?? featuredImage}
      socialDescription={ogDescription}
      socialTitle={ogTitle}
      title={title}
    >
      <Container hasHorizontalConstraint>
        <ProjectDetail
          content={content}
          credits={credits}
          externalUrl={externalUrl}
          intro={intro}
          relatedProjects={relatedProjects}
          relatedProjectsTitle={relatedProjectsTitle}
          title={title}
        />
      </Container>
    </Layout>
  );
};

export default ProjectPageLayout;
