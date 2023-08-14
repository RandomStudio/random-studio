const handler = async () => {
  const f = await fetch(
    `https://video.bunnycdn.com/library/87989/videos?itemsPerPage=1000`,
    {
      headers: {
        accept: 'application/json',
        'content-type': 'application/*+json',
        AccessKey: process.env.BUNNY_TOKEN,
      },
    },
  );

  const { items } = await f.json();

  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};

export { handler };
