import React from 'react';
import Layout from '../../components/Layout/Layout';
import ProjectList from '../../components/ProjectList/ProjectList';
import { PROJECTS_LIST_QUERY } from '../../api/QUERIES';
import getDataFromBackend from '../../api/getDataFromBackend';
import { ProjectSummary } from '../../types/types';
import Container from '../../components/Layout/Container/Container';

type ProjectsProps = {
  projects: ProjectSummary[];
};

const Projects = ({ projects }: ProjectsProps) => (
  <Layout title="Projects">
    <Container hasHorizontalConstraint={false}>
      <ProjectList hasFilters projects={projects} />
    </Container>
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
