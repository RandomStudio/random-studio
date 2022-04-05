import fetch from "node-fetch";

const getVideoDetails = async id => {
  const response = await fetch(`https://api.vimeo.com/videos/${id}`, {
    headers: {
      Authorization: `bearer ${process.env.VIMEO_TOKEN}`,
    },
  });

  return response.json();
};

const getVimeoDetails = async url => {
  if (!url) {
    return null;
  }

  const { pathname } = new URL(url);
  const id = pathname.split('/').at(-1).split('.')[0];

  const details = await getVideoDetails(id);

  if (!details || !details.pictures) {
    console.error('Failed for', url, id, details);
    throw Error('BREAK')
    return null;
  }

  const {
    name,
    link,
    pictures: { sizes },
  } = details;

  const { height, width, link: thumbnailUrl } = sizes[0];

  return {
    height,
    provider: 'vimeo',
    providerUid: id,
    thumbnailUrl,
    title: name,
    url: link,
    width,
  };
};

export default getVimeoDetails;
