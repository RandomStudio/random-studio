import React from 'react';
import getDataFromBackend from '../api/getDataFromBackend';
import { INDEX_PAGE_QUERY } from '../api/QUERIES';
import Head from '../components/Head/Head';
import HomeVideo from '../components/HomeVideo/HomeVideo';
import Layout from '../components/Layout/Layout';
import ProjectList from '../components/ProjectList/ProjectList';
import { Project, VideoData } from '../types/types';
import dynamic from 'next/dynamic';

const ChunkedPartyHeader = dynamic(
  () => import('../components/PartyHeader/PartyHeader'),
  {
    ssr: false,
  },
);

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

    <ChunkedPartyHeader isLive={true} />

    <ProjectList hasLimit intro={intro} projects={projects} />
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
