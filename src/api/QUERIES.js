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
      video
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

const addBlockQuery = ({
  hasVideo = false,
  hasText = false,
  hasImage = false,
  hasCarousel = false,
}) => `
${hasVideo
    ? `... on VideoBlockRecord {
          autoplay
          caption
          hasAudio
          hasControls
          id
          loops
          marginLeft
          marginTop
          video
          width
}
`
    : ''
  }
${hasText
    ? `... on TextBlockRecord {
  id
  text
  width
  marginTop
  marginLeft
}
`
    : ''
  }
${hasImage
    ? `... on ImageBlockRecord {
  id
  width
  marginTop
  marginLeft
  caption
  image {
    ...ImageDataObject
  }
}
`
    : ''
  }
${hasCarousel
    ? `... on CarouselBlockRecord {
  id
  marginLeft
  marginTop
  width
  slides {
    id
    video
    image {
      ...ImageDataObject
    }
  }
}
`
    : ''
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
      externalUrl
      credits {
        label
        text
        link
      }
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
        ${addBlockQuery({
  hasVideo: true,
  hasImage: true,
  hasCarousel: true,
  hasText: true,
})}
        ... on HorizontalRowRecord {
          id
          __typename
          blocks {
            __typename
            ${addBlockQuery({
  hasVideo: true,
  hasImage: true,
  hasText: true,
})}
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
    skillset
    studioImpression {
      ...ImageDataObject
    }
    vacancies: jobOpenings {
      title
      description(markdown: false)
      url
      id
      _publishedAt
    }
  }
}`;
export const SUSTAINABILITY_PAGE_QUERY = `
${IMAGE_DATA_OBJECT_FRAGMENT}
{
  page: sustainabilityPage {
    intro(markdown: true)
    seoTitle
    seoDescription
    content {
      textFirst
      text
      title
      color
      image {
        ...ImageDataObject
      }
    }
  }
}`;
