import React from 'react';
import Layout from '../../components/Layout/Layout';
import Footer from '../../components/Footer/Footer';
import ProjectList from '../../components/ProjectList/ProjectList';
import SEO from '../../components/SEO/SEO';

const Projects = ({ address, email, phone, projects, slug }) => {
  return (
    <Layout>
      <SEO pathName={slug} />
      <ProjectList hasFilters projects={projects} />
      <Footer address={address} email={email} phone={phone} />
    </Layout>
  );
};

export async function getStaticProps() {
  const {
    getAllProjects,
    getContentFromFile,
  } = require('../../utils/contentUtils');

  const data = getContentFromFile('projects');
  const allProjects = getAllProjects();

  const projectDetails = data.projects
    .map(({ caption, project: projectTitle, thumbnail, tags }) => {
      const project = allProjects.find(
        ({ title }) => title.toLowerCase() === projectTitle.toLowerCase(),
      );

      if (!project) {
        return null;
      }

      return {
        slug: project.slug,
        tags: tags ?? null,
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
}

export default Projects;
