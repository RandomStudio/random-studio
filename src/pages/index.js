import React from 'react';
import PropTypes from 'prop-types';
import getDataFromBackend from '../api/getDataFromBackend';
import { getVideoData } from '../api/videos/getVideoData.mjs';
import { INDEX_PAGE_QUERY } from '../api/QUERIES';
import Head from '../components/Head/Head';
import HomeVideo from '../components/HomeVideo/HomeVideo';
import Layout from '../components/Layout/Layout';
import ProjectList from '../components/ProjectList/ProjectList';
import { projectPropType, videoPropType } from '../propTypes';

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

    <HomeVideo
      collaborationUrl={collaborationUrl}
      collaborator={collaborator}
      video={video}
    />

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
      video: await getVideoData(page.video),
      projects: await Promise.all(
        projects.map(async project => ({
          ...project,
          featuredVideo: await getVideoData(project.featuredVideo),
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
