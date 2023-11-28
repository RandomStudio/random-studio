import React from 'react';
import { GetStaticPropsContext } from 'next';
import getDataFromBackend from '../api/getDataFromBackend';
import { INDEX_PAGE_QUERY } from '../api/QUERIES';
import Head from '../components/Head/Head';
import HomeVideo from '../components/HomeVideo/HomeVideo';
import Layout from '../components/Layout/Layout';
import ProjectList from '../components/ProjectList/ProjectList';
import { Project, VideoData } from '../types/types';

type HomeProps = {
  collaborator: string;
  collaborationUrl: string;
  intro: string;
  isLogoCentred: boolean;
  projects: Project[];
  video: VideoData;
};

const Home = ({
  collaborator,
  collaborationUrl,
  intro,
  isLogoCentred = false,
  projects,
  video,
}: HomeProps) => (
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

export const getStaticProps = async ({ preview }: GetStaticPropsContext) => {
  const { page, projects } = await getDataFromBackend({
    query: INDEX_PAGE_QUERY,
    preview,
  });

  return {
    props: {
      ...page,
      projects,
    },
  };
};

export default Home;
