import React from 'react';
import getDataFromBackend from '../api/getDataFromBackend';
import { INDEX_PAGE_QUERY } from '../api/QUERIES';
import Head from '../components/Head/Head';
import HomeVideo from '../components/HomeVideo/HomeVideo';
import Layout from '../components/Layout/Layout';
import ProjectList from '../components/ProjectList/ProjectList';

const Home = ({
  collaborator,
  collaborationUrl,
  intro,
  layout,
  projects,
  slug,
  videoUrl,
}) => (
  <Layout layout={layout}>
    <Head pathName={slug} />
    <HomeVideo
      collaborationUrl={collaborationUrl}
      collaborator={collaborator}
      videoUrl={videoUrl}
    />
    <ProjectList intro={intro} limit={projects.length} projects={projects} />
  </Layout>
);

export const getStaticProps = async () => {
  const { page, projects } = await getDataFromBackend({
    query: INDEX_PAGE_QUERY,
  });

  return {
    props: {
      ...page,
      projects,
    },
  };
};

export default Home;
