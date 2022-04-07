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
import { projectPropTypeObject } from '../../../propTypes';
import { addVimeoVideoDataToObject } from '../../../api/getVideoData';

const Project = ({
  featuredImage,
  intro,
  opengraph: { description: ogDescription, image, title: ogTitle },
  content,
  details,
  relatedProjects,
  relatedProjectsTitle,
  title,
}) => {
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
    preview,
    variables: {
      slug: params.slug,
    },
  });

  return {
    props: {
      ...project,
      featuredVideo: project.featuredVideo
        ? await addVimeoVideoDataToObject(project.featuredVideo)
        : null,
      content: await addAdditionalInfoToBlocks(project.content),
      opengraph: project.opengraph ?? {},
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

Project.propTypes = projectPropTypeObject;

export default Project;
