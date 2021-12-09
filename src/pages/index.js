import React from 'react';
import Footer from '../components/Footer/Footer';
import HomeVideo from '../components/Home/HomeVideo/HomeVideo';
import Layout from '../components/Layout/Layout';
import ProjectList from '../components/Home/ProjectList/ProjectList';
import SEO from '../components/SEO/SEO';

const Home = ({
  address,
  collaborationCredits,
  email,
  layout,
  phone,
  projects,
  slug,
  video,
}) => (
  <Layout>
    <SEO pathName={slug} />
    <HomeVideo
      collaborationCredits={collaborationCredits}
      layout={layout}
      videoUrl={video}
    />
    <ProjectList projects={projects} />
    <Footer address={address} email={email} phone={phone} />
  </Layout>
);

export const getStaticProps = async () => {
  const {
    getAllProjects,
    getContentFromFile,
  } = require('../utils/contentUtils');

  const data = getContentFromFile('index');
  const allProjects = getAllProjects();

  const projectDetails = data.projects
    .map(({ caption, project: projectTitle, thumbnail }) => {
      const project = allProjects.find(({ title }) => title === projectTitle);

      if (!project) {
        return null;
      }

      return {
        priority: project.priority ?? null,
        slug: project.slug,
        thumbnail: thumbnail ?? null,
        title: caption || project.title,
      };
    })
    .filter(project => project !== null)
    .sort(({ priority: a }, { priority: b }) => b - a);

  return {
    props: {
      ...data,
      projects: projectDetails,
    },
  };
};

export default Home;
