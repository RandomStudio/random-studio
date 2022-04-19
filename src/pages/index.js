import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import getDataFromBackend from '../api/getDataFromBackend';
import { addVimeoVideoDataToObject } from '../api/getVideoData';
import { INDEX_PAGE_QUERY } from '../api/QUERIES';
import Head from '../components/Head/Head';
import Layout from '../components/Layout/Layout';
import ProjectList from '../components/ProjectList/ProjectList';
import { projectPropType } from '../propTypes';

const ChunkedPartyHeader = dynamic(
  () => import('../components/PartyHeader/PartyHeader'),
  {
    ssr: false,
  },
);

const Home = ({ intro, isLogoCentred, projects }) => (
  <Layout isLogoCentred={isLogoCentred}>
    <Head />

    <ChunkedPartyHeader />

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
  intro: PropTypes.string.isRequired,
  isLogoCentred: PropTypes.bool,
  projects: PropTypes.arrayOf(projectPropType).isRequired,
};

Home.defaultProps = {
  isLogoCentred: false,
};

export default Home;
