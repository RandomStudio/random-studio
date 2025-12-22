import { THUMBNAIL_FRAGMENT } from "./FRAGMENTS";

export const PROJECT_LIST_QUERY = `
  ${THUMBNAIL_FRAGMENT}

query {
  projects: allProjects(first: "100", orderBy: position_ASC, filter: {isVisible: {eq: "true"}}) {
    title
    slug
    tags
    ...Thumbnail
  }
}`;
