import React from 'react';
import {
  PROJECT_PATHS_QUERY,
  SINGLE_PROJECT_QUERY,
} from '../../../api/QUERIES';
import Head from '../../../components/Head/Head';
import Layout from '../../../components/Layout/Layout';
import ProjectDetail from '../../../components/ProjectDetail/ProjectDetail';
import getDataFromBackend from '../../../api/getDataFromBackend';
import styles from './index.module.scss';
import addAdditionalInfoToBlocks from '../../../api/addAdditionalInfoToBlocks';
import { getVideoData } from '../../../api/videos/getVideoData.mjs';
import {
  ContentBlockType,
  CreditsType,
  OpenGraph,
  RelatedProject,
} from '../../../types';

type ProjectProps = {
  content: ContentBlockType[];
  credits?: CreditsType[];
  details: { [key: string]: string };
  externalUrl: string;
  featuredImage: ImageData;
  id: string;
  intro: string;
  relatedProjectsTitle: string;
  relatedProjects: RelatedProject[];
  opengraph: OpenGraph;
  title: string;
};

const Project = ({
  content,
  credits,
  details,
  externalUrl,
  featuredImage,
  intro,
  opengraph: { description: ogDescription, image, title: ogTitle },
  relatedProjects,
  relatedProjectsTitle,
  title,
}: ProjectProps) => {
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
        details={details}
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

export const getStaticProps = async ({ params, preview }) => {
  const { project } = await getDataFromBackend({
    query: SINGLE_PROJECT_QUERY,
    variables: {
      slug: params.slug,
    },
    preview,
  });

  return {
    props: {
      ...project,
      featuredVideo: await getVideoData(project.featuredVideo),
      content: await addAdditionalInfoToBlocks(project.content),
      opengraph: project.opengraph ?? {},
      relatedProjects: await Promise.all(
        project.relatedProjects?.map(async related => ({
          ...related,
          featuredVideo: await getVideoData(related.featuredVideo),
        }))
      ),
    },
  };
};

export async function getStaticPaths() {
  const { projects } = await getDataFromBackend({
    query: PROJECT_PATHS_QUERY,
  });

  return {
    fallback: false,
    paths: projects.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
  };
}

export default Project;
