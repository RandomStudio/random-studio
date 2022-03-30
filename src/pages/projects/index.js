import React from 'react';
import Layout from '../../components/Layout/Layout';
import Head from '../../components/Head/Head';
import ProjectList from '../../components/ProjectList/ProjectList';
import getPageWithProjectList from '../../api/getPageWithProjectList';

const Projects = ({ projects, slug }) => {
  return (
    <Layout>
      <Head pathName={slug} title="Projects" />
      <ProjectList hasFilters projects={projects} />
    </Layout>
  );
};

export async function getStaticProps() {
  const props = await getPageWithProjectList('projects');

  return props;
}

export default Projects;
