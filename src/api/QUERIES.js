import { THUMBNAIL_FRAGMENT } from './FRAGMENTS';

export const INDEX_PAGE_QUERY = `
  ${THUMBNAIL_FRAGMENT}

  query {
    page: indexPage {
      intro
      middle(markdown: true)
      videoUrl
      collaborator
      collaborationUrl
    }
    projects: allProjects(filter: {isHomepage: {eq: "true"}}) {
      title
      slug
      ...Thumbnail
    }
  }
`;

export const PROJECT_PATHS_QUERY = `
{
  projects: allProjects(orderBy: position_ASC) {
    slug
  }
}
`;

export const PROJECTS_LIST_QUERY = `
${THUMBNAIL_FRAGMENT}

query {
  projects: allProjects {
    title
    slug
    tags
    ...Thumbnail
  }
}
`;

export const SINGLE_PROJECT_QUERY = `
  ${THUMBNAIL_FRAGMENT}

  query ProjectQuery($slug: String!) {
    project(orderBy: position_ASC, filter: {slug: {eq: $slug}}) {
      id
      slug
      content
      intro
      title
      ...Thumbnail
      relatedProjects {
        slug
        title
        intro
        ...Thumbnail
      }
      content {
        __typename
        ... on VideoBlockRecord {
          id
          marginTop
          marginLeft
          url
          width
          loops
          isMuted
          isAlwaysMuted
          hasControls
          caption
          autoplay
        }
        ... on TextBlockRecord {
          id
          text
          width
          marginTop
          marginLeft
        }
        ... on ImageBlockRecord {
          id
          width
          marginTop
          marginLeft
          caption
          image {
            ...ImageDataObject
          }
        }
        ... on CarouselBlockRecord {
          id
        }
      }
    }
  }
`;
