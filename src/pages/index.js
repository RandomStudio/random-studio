import React from 'react';
import Footer from '../components/Footer/Footer';
import HomeVideo from '../components/Home/HomeVideo/HomeVideo';
import Layout from '../components/Layout/Layout';
import ProjectList from '../components/Home/ProjectList/ProjectList';
import SEO from '../components/SEO/SEO';

const Home = ({
  address,
  allProjects,
  collaborationCredits,
  email,
  layout,
  phone,
  projects,
  slug,
  video,
}) => {
  const projectsAdjusted = projects
    .map(({ caption, project: projectTitle, thumbnail }) => {
      const project = allProjects.find(({ title }) => title === projectTitle);

      if (!project) {
        return null;
      }

      return {
        priority: project.priority,
        slug: project.slug,
        thumbnail,
        title: caption || project.title,
      };
    })
    .filter(project => project !== null)
    .sort(({ priority: a }, { priority: b }) => b - a);

  return (
    <Layout>
      <SEO pathName={slug} />
      <HomeVideo
        collaborationCredits={collaborationCredits}
        layout={layout}
        videoUrl={video}
      />
      <ProjectList projects={projectsAdjusted} />
      <Footer address={address} email={email} phone={phone} />
    </Layout>
  );
};

export async function getStaticProps() {
  const { getAllProjects, getContentFromFile } = require('../utils/blog');

  const data = getContentFromFile('index');
  const allProjects = getAllProjects();

  return {
    props: {
      allProjects,
      ...data,
    },
  };
}

export default Home;
