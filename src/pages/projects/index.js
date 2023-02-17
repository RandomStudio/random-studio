import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout/Layout';
import Head from '../../components/Head/Head';
import ProjectList from '../../components/ProjectList/ProjectList';
import { PROJECTS_LIST_QUERY } from '../../api/QUERIES';
import getDataFromBackend from '../../api/getDataFromBackend';
import { getVideoData } from '../../api/videos/getVideoData.mjs';
import { projectPropType } from '../../propTypes';

const Projects = ({ projects }) => (
  <Layout>
    <Head title="Projects" />

    <ProjectList hasFilters projects={projects} />
  </Layout>
);

export const getStaticProps = async () => {
  const { projects } = await getDataFromBackend({
    query: PROJECTS_LIST_QUERY,
  });

  return {
    props: {
      projects: await Promise.all(
        projects.map(async project => ({
          ...project,
          featuredVideo: await getVideoData(project.featuredVideoNew),
          tags: project.tags?.map(tag => tag.toLowerCase()) ?? [],
        })),
      ),
    },
  };
};

Projects.propTypes = {
  projects: PropTypes.arrayOf(projectPropType).isRequired,
};

export default Projects;
