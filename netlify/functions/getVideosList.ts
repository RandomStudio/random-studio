export const getVideosList = async () => {
  try {
    const response = await fetch(
      `https://video.bunnycdn.com/library/${process.env.BUNNY_LIBRARY_ID}/videos?itemsPerPage=1000`,
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/*+json',
          AccessKey: process.env.BUNNY_TOKEN,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Unable to retrieve list of videos from Bunny');
    }

    const { items } = await response.json();

    return items;
  } catch (error) {
    console.error(error);

    return [];
  }
};

const handler = async () => {
  const items = await getVideosList();

  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};

export { handler };
