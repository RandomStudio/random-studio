import React from 'react';
import Layout from '../../../components/Layout/Layout';
import HomeVideo from '../../../templates/Home/HomeVideo/HomeVideo';
import ProjectList from '../../../templates/Home/ProjectList/ProjectList';

export default ({ entry }) => {
  const { data } = entry.toJSON();

  const {
    collaborationCredits,
    projects,
    video,
  } = data;

  return (
    <Layout>
      <HomeVideo
        videoUrl={video}
        collaborationCredits={collaborationCredits}
      />
      <ProjectList
        {...data}
        projects={[].map(({
          caption,
          project,
          thumbnail,
        }) => ({
          slug: 'none',
          title: caption || project,
          thumbnail,
        }))}
      />
    </Layout>
  );
};
