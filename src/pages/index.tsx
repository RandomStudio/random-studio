import React from 'react';
import getDataFromBackend from '../api/getDataFromBackend';
import { INDEX_PAGE_QUERY } from '../api/QUERIES';
import HomeVideo from '../components/HomeVideo/HomeVideo';
import Layout from '../components/Layout/Layout';
import ProjectList from '../components/ProjectList/ProjectList';
import { Project, VideoData } from '../types/types';
import Container from '../components/Layout/Container/Container';

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
  <>
    <HomeVideo
      collaborationUrl={collaborationUrl}
      collaborator={collaborator}
      video={video}
    />

    <Layout isLogoCentred={isLogoCentred}>
      <Container>
        <ProjectList hasLimit intro={intro} projects={projects} />
      </Container>
    </Layout>
  </>
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
