import React from 'react';
import getPageWithProjectList from '../api/getPageWithProjectList';
import Head from '../components/Head/Head';
import HomeVideo from '../components/HomeVideo/HomeVideo';
import Layout from '../components/Layout/Layout';
import ProjectList from '../components/ProjectList/ProjectList';

const Home = ({
  collaborationCredits,
  intro,
  layout,
  projects,
  slug,
  video,
}) => (
  <Layout layout={layout}>
    <Head pathName={slug} />
    <HomeVideo collaborationCredits={collaborationCredits} videoUrl={video} />
    <ProjectList intro={intro} limit={projects.length} projects={projects} />
  </Layout>
);

export async function getStaticProps() {
  const props = await getPageWithProjectList('index');

  return props;
}

export default Home;
