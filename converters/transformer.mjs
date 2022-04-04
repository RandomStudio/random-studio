/* eslint-disable no-restricted-syntax */
import { buildModularBlock } from 'datocms-client';
import { basename } from 'path';
import { uploadAsset } from './assets.mjs';
import { getContentFromFile } from './filesystem.mjs';

const IMAGE_BASE_PATH = '../public/img';

const getAdditionalInfo = async () => {
  const indexPage = await getContentFromFile('../src/content', 'index.md');

  const projectsPage = await getContentFromFile(
    '../src/content',
    'projects.md',
  );

  return {
    indexPage,
    projectsPage,
  };
};

const transformOpengraph = async ({ title, description, image }) => {
  const clip = (string, length) =>
    string.length > length ? `${string.slice(0, length - 3)}...` : string;

  const { uploadId } = image
    ? await uploadAsset(IMAGE_BASE_PATH, basename(image))
    : {};

  return {
    title: title ? clip(title, 60) : null,
    description: description ? clip(description, 160) : null,
    image: uploadId,
  };
};

const transformContentBlock = async ({
  carousel,
  marginLeft,
  marginTop,
  width,
  video,
  image,
  alt,
  caption,
}) => {
  if (video?.url) {
    // Video
    const {
      autoplay,
      has_controls: hasControls,
      loops,
      is_muted: isMuted,
      is_always_muted: isAlwaysMuted,
      url,
    } = video;

    return {
      itemType: '1641762',
      url,
      hasControls,
      loops,
      autoplay,
      isMuted,
      isAlwaysMuted,
      caption: caption ?? alt,
      marginLeft: Math.round(marginLeft),
      marginTop: Math.round(marginTop),
      width: Math.round(width),
    };
  }

  if (carousel) {
    return {
      itemType: '1643994',
      marginLeft: Math.round(marginLeft),
      marginTop: Math.round(marginTop),
      width: Math.round(width),
      slides: await Promise.all(
        carousel.map(async slide =>
          buildModularBlock({
            itemType: '1641803',
            image:
              slide.type === 'image'
                ? await uploadAsset(IMAGE_BASE_PATH, basename(slide.image))
                : null,
            video: slide.type === 'video' ? slide.url : null,
          }),
        ),
      ),
    };
  }

  if (image && image !== '') {
    return {
      itemType: '1643992',
      image: await uploadAsset(IMAGE_BASE_PATH, basename(image)),
      caption: caption ?? alt,
      marginLeft: Math.round(marginLeft),
      marginTop: Math.round(marginTop),
      width: Math.round(width),
    };
  }

  return {
    itemType: '1643993',
    marginLeft: Math.round(marginLeft),
    marginTop: Math.round(marginTop),
    width: Math.round(width),
    text: caption,
  };
};

export const transformProject = async (filename, content) => {
  const {
    title,
    intro,
    priority,
    content: blocks,
    credits,
    opengraph,
  } = content;

  const { indexPage, projectsPage } = await getAdditionalInfo();

  const [, { projects: homepageProjects }] = indexPage;
  const [, { projects }] = projectsPage;

  const isHomepage = !!homepageProjects.find(
    ({ project }) => project === title,
  );

  const { thumbnail, tags } =
    projects.find(({ project }) => project === title) ?? {};

  const isVisible = !!thumbnail;

  if (!thumbnail) {
    console.log(title, 'is missing from projects listings');
  }

  const opengraphObj = opengraph ?? {
    title,
    description: intro,
    thumbnail,
  };

  const contentBlocks = [];

  for await (const block of blocks.filter(e => e)) {
    contentBlocks.push(buildModularBlock(await transformContentBlock(block)));
  }

  return {
    itemType: '1641543',
    title,
    slug: basename(filename, '.md')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replaceAll('-–-', '-')
      .replaceAll('---', '-'),
    featuredImage:
      thumbnail?.image && !thumbnail?.video
        ? await uploadAsset(IMAGE_BASE_PATH, basename(thumbnail?.image))
        : null,
    featuredVideo: thumbnail?.video,
    isHomepage,
    isVisible,
    details: credits
      ? JSON.stringify(
        (credits ?? []).reduce(
          (all, { key, value }) => ({
            ...all,
            [key.replace(':', '')]: value,
          }),
          {},
        ),
      )
      : null,
    tags: JSON.stringify(tags ?? []),
    relatedProjects: null,
    opengraph: await transformOpengraph(opengraphObj),
    intro,
    position: Math.round(priority || 0) ?? 0,
    content: contentBlocks,
  };
};

export default transformProject;
