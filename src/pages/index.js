import React from 'react';
import Footer from '../components/Footer/Footer';
import Head from '../components/Head/Head';
import HomeVideo from '../components/HomeVideo/HomeVideo';
import Layout from '../components/Layout/Layout';
import ProjectList from '../components/ProjectList/ProjectList';

const Home = ({
  address,
  collaborationCredits,
  email,
  intro,
  layout,
  phone,
  projects,
  slug,
  video,
}) => (
  <Layout layout={layout}>
    <Head pathName={slug} />
    <HomeVideo collaborationCredits={collaborationCredits} videoUrl={video} />
    <ProjectList intro={intro} limit={projects.length} projects={projects} />
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
      const project = allProjects.find(
        ({ title }) => title.toLowerCase() === projectTitle.toLowerCase(),
      );

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
    .filter(project => project !== null);

  return {
    props: {
      ...data,
      projects: projectDetails,
    },
  };
};

export default Home;
