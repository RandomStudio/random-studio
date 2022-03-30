import matter from 'gray-matter';
import { getAllProjects, getContentFromFile } from './localDataUtils';
import getDataFromBackend from './getDataFromBackend';
import { ALL_PROJECTS_QUERY, PAGE_QUERY } from './QUERIES';

// TODO: Using slug avoids need to do all of this
const getPageWithProjectList = async pagename => {
  let response = await getDataFromBackend({
    query: [PAGE_QUERY(pagename), ALL_PROJECTS_QUERY],
  });

  if (!response) {
    response = {
      page: {
        text: getContentFromFile(pagename),
      },
      allProjects: {
        projects: getAllProjects(),
      }
    }
  }

  const { page: { text }, allProjects: { projects } } = response;

  const { data } = matter(text);

  const allProjects = projects.map(({ name, content }) => ({
    ...matter(content.text).data,
    slug: `/projects/${name.replace('.md', '')}`,
  }));

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
};

export default getPageWithProjectList;
