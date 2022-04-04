import React from 'react';
import getDataFromBackend from '../api/getDataFromBackend';
import { addVimeoVideoDataToObject } from '../api/getVideoData';
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
  video,
}) => (
  <Layout layout={layout}>
    <Head />
    <HomeVideo
      collaborationUrl={collaborationUrl}
      collaborator={collaborator}
      video={video}
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

export default Home;
