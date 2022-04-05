import React from 'react';
import Layout from '../../components/Layout/Layout';
import Head from '../../components/Head/Head';
import ProjectList from '../../components/ProjectList/ProjectList';
import { PROJECTS_LIST_QUERY } from '../../api/QUERIES';
import getDataFromBackend from '../../api/getDataFromBackend';
import { addVimeoVideoDataToObject } from '../../api/getVideoData';

const Projects = ({ projects }) => (
  <Layout>
    <Head title="Projects" />
    <ProjectList hasFilters projects={projects} />
  </Layout>
);

export const getStaticProps = async ({ preview }) => {
  const { projects } = await getDataFromBackend({
    query: PROJECTS_LIST_QUERY,
    preview,
  });

  return {
    props: {
      projects: await Promise.all(
        projects.map(async project => ({
          ...project,
          featuredVideo: await addVimeoVideoDataToObject(project.featuredVideo),
          tags: project.tags.map(tag => tag.toLowerCase()),
        })),
      ),
    },
  };
};

export default Projects;
