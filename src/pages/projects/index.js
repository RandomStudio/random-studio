import React from 'react';
import Layout from '../../components/Layout/Layout';
import Head from '../../components/Head/Head';
import ProjectList from '../../components/ProjectList/ProjectList';
import getDataFromBackend from '../../api/getDataFromBackend';
import { PAGE_QUERY, ALL_PROJECTS_QUERY } from '../../api/QUERIES';
import matter from 'gray-matter';

const Projects = ({ projects, slug }) => {
  return (
    <Layout>
      <Head pathName={slug} title="Projects" />
      <ProjectList hasFilters projects={projects} />
    </Layout>
  );
};

export async function getStaticProps() {
  const { page: { text }, allProjects: { projects } } = await getDataFromBackend({
    query: [PAGE_QUERY('projects'), ALL_PROJECTS_QUERY],
  });

  const { data } = matter(text);

  const allProjects = projects.map(({ name, content }) => ({
    ...matter(content.text).data,
    slug: name.replace('.md', '')
  }));

  // TODO: Using slug avoids need to reference all projects
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
  console.log(projectDetails)
  return {
    props: {
      ...data,
      projects: projectDetails,
    },
  };
}

export default Projects;
