export const PROJECTS_LIST_QUERY = `
  projectsList: object(expression: "master:src/content/projects") {
    ... on Tree {
      projects: entries {
        name
        path
      }
    }
  }
`;

export const ALL_PROJECTS_QUERY = `
  allProjects: object(expression: "master:src/content/projects") {
    ... on Tree {
      projects: entries {
        name
        path
        content: object {
          ... on Blob {
            text
          }
        }
      }
    }
  }
`;

export const PAGE_QUERY = slug => `
  page: object(expression: "master:src/content/${slug}.md") {
    ... on Blob {
      text
    }
  }
`;

export default {
  ALL_PROJECTS_QUERY,
  PROJECTS_LIST_QUERY,
  PAGE_QUERY,
};
