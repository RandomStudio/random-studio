import React from 'react';
import Layout from '../../components/Layout/Layout';
import Head from '../../components/Head/Head';
import ProjectList from '../../components/ProjectList/ProjectList';
import { PROJECTS_LIST_QUERY } from '../../api/QUERIES';
import getDataFromBackend from '../../api/getDataFromBackend';
import { ProjectSummary } from '../../types/types';

type ProjectsProps = {
  projects: ProjectSummary[];
};

const Projects = ({ projects }: ProjectsProps) => (
  <Layout title="Projects">
    <ProjectList hasFilters projects={projects} />
  </Layout>
);

export const getStaticProps = async () => {
  const { projects } = await getDataFromBackend({
    query: PROJECTS_LIST_QUERY,
  });

  return {
    props: {
      projects,
    },
  };
};

export default Projects;
