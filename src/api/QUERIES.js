import { HOMEPAGE_POSTS_LIMIT } from '../CONSTANTS';
import {
  IMAGE_DATA_OBJECT_FRAGMENT,
  IMAGE_DATA_OBJECT_FRAGMENT_FUNC,
  RELATED_THUMBNAIL_FRAGMENT,
  THUMBNAIL_FRAGMENT,
} from './FRAGMENTS';

export const INDEX_PAGE_QUERY = `
  ${THUMBNAIL_FRAGMENT}

  query {
    page: indexPage {
      intro
      middle(markdown: true)
      video {
        height
        providerUid
        thumbnailUrl
        url
        width
      }
      collaborator
      collaborationUrl
    }
    projects: allProjects(first: "${HOMEPAGE_POSTS_LIMIT}", orderBy: position_ASC, filter: {isVisible: {eq: "true"}}) {
      title
      slug
      ...Thumbnail
    }
  }
`;

export const PROJECT_PATHS_QUERY = `
{
  projects: allProjects(first: "100", orderBy: position_ASC) {
    slug
  }
}
`;

export const PROJECTS_LIST_QUERY = `
${THUMBNAIL_FRAGMENT}

query {
  projects: allProjects(first: "100", orderBy: position_ASC, filter: {isVisible: {eq: "true"}}) {
    title
    slug
    tags
    ...Thumbnail
  }
}
`;

export const SINGLE_PROJECT_QUERY = `
  ${THUMBNAIL_FRAGMENT}
  ${RELATED_THUMBNAIL_FRAGMENT}
  ${IMAGE_DATA_OBJECT_FRAGMENT_FUNC('OpenGraphImageDataObject', 1200, 630)}

  query ProjectQuery($slug: String!) {
    project(orderBy: position_ASC, filter: {slug: {eq: $slug}}) {
      id
      slug
      intro
      title
      details
      ...Thumbnail
      relatedProjectsTitle
      relatedProjects {
        slug
        title
        intro
        ...RelatedThumbnail
      }
      opengraph {
        description
        title
        twitterCard
        image {
          ...OpenGraphImageDataObject
        }
      }
      content {
        __typename
        ... on VideoBlockRecord {
          id
          marginTop
          marginLeft
          width
          loops
          hasAudio
          hasControls
          caption
          autoplay
          video {
            height
            providerUid
            thumbnailUrl
            url
            width
          }
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
          marginLeft
          marginTop
          width
          slides {
            id
            video {
              height
              providerUid
              thumbnailUrl
              url
              width
            }
            image {
              ...ImageDataObject
            }
          }
        }
      }
    }
  }
`;

export const STUDIO_PAGE_QUERY = `
${IMAGE_DATA_OBJECT_FRAGMENT}

{
  page: studioPage {
    id
    skillset
    title
    introBlocks {
      __typename
      video {
        height
        providerUid
        thumbnailUrl
        url
        width
      }
      copy
      image {
        ...ImageDataObject
      }
    }
    skillset
    services {
      title
      copy
      image {
        ...ImageDataObject
      }
    }
    studioImpression {
      ...ImageDataObject
    }
    jobOpenings {
      title
      description(markdown: false)
      url
      id
      _publishedAt
    }
  }
}`;

// NOTE: for ease while CMS is still serving live page. Will be deprecated on deploy
export const NEW_STUDIO_PAGE_QUERY = `
${IMAGE_DATA_OBJECT_FRAGMENT}

{
  page: studioPageNew {
    blurb
    blocks {
      __typename
      copy
      image {
        ...ImageDataObject
      }
      nightImage {
        ...ImageDataObject
      }
    }
  }
}`;
