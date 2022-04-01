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

const Project = ({
  allProjects,
  intro,
  opengraph,
  content,
  details,
  relatedProjects,
  relatedProjectsTitle,
  title,
}) => {
  const socialTitle =
    opengraph && opengraph.ogTitle ? opengraph.ogTitle : undefined;

  const socialDescription =
    opengraph && opengraph.ogDescription ? opengraph.ogDescription : undefined;

  const SEOImage = (opengraph ? opengraph.ogImage : null) || undefined;

  return (
    <Layout className={styles.layout}>
      <Head
        description={intro}
        image={SEOImage}
        socialDescription={socialDescription}
        socialTitle={socialTitle}
        title={title}
      />
      <ProjectDetail
        allProjects={allProjects}
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

export const getStaticProps = async ({ params }) => {
  const { project } = await getDataFromBackend({
    query: SINGLE_PROJECT_QUERY,
    variables: {
      slug: params.slug,
    },
  });

  return {
    props: project,
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
