import React from 'react';
import Layout from '../../components/Layout/Layout';
import Footer from '../../components/Footer/Footer';
import ProjectList from '../../components/Projects/ProjectList/ProjectList';
import SEO from '../../components/SEO/SEO';
import Logo from '../../components/Logo/Logo';

const Projects = ({ address, allProjects, email, phone, projects, slug }) => {
  const projectDetails = projects
    .map(({ caption, project: projectTitle, thumbnail, tags }) => {
      const project = allProjects.find(
        ({ title }) => title.toLowerCase() === projectTitle.toLowerCase(),
      );

      if (!project) {
        return null;
      }

      return {
        slug: project.slug,
        title: caption || project.title,
        thumbnail,
        tags,
      };
    })
    .filter(project => project !== null);

  return (
    <Layout>
      <SEO pathName={slug} />
      <Logo />
      <ProjectList projects={projectDetails} />
      <Footer address={address} email={email} phone={phone} />
    </Layout>
  );
};

export async function getStaticProps() {
  const { getAllProjects, getContentFromFile } = require('../../utils/contentUtils');

  const data = getContentFromFile('projects');
  const allProjects = getAllProjects();

  return {
    props: {
      allProjects,
      ...data,
    },
  };
}

export default Projects;
