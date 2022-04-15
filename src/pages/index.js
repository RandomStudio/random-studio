import React from 'react';
import PropTypes from 'prop-types';
import getDataFromBackend from '../api/getDataFromBackend';
import { addVimeoVideoDataToObject } from '../api/getVideoData';
import { INDEX_PAGE_QUERY } from '../api/QUERIES';
import Head from '../components/Head/Head';
import Layout from '../components/Layout/Layout';
import ProjectList from '../components/ProjectList/ProjectList';
import { projectPropType, videoPropType } from '../propTypes';
import PartyHeader from '../components/PartyHeader/PartyHeader';

const Home = ({
  collaborator,
  collaborationUrl,
  intro,
  isLogoCentred,
  projects,
  video,
}) => (
  <Layout isLogoCentred={isLogoCentred}>
    <Head />

    <PartyHeader />

    <ProjectList hasLimit intro={intro} projects={projects} />
  </Layout>
);

export const getStaticProps = async ({ preview }) => {
  const { page, projects } = await getDataFromBackend({
    query: INDEX_PAGE_QUERY,
    preview,
  });

  return {
    props: {
      ...page,
      video: await addVimeoVideoDataToObject(page.video),
      projects: await Promise.all(
        projects.map(async project => ({
          ...project,
          featuredVideo: await addVimeoVideoDataToObject(project.featuredVideo),
        })),
      ),
    },
  };
};

Home.propTypes = {
  collaborationUrl: PropTypes.string.isRequired,
  collaborator: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
  isLogoCentred: PropTypes.bool,
  projects: PropTypes.arrayOf(projectPropType).isRequired,
  video: videoPropType.isRequired,
};

Home.defaultProps = {
  isLogoCentred: false,
};

export default Home;
