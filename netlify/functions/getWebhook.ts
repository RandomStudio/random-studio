async function handler(event) {
  const createResponse = payload => ({
    statusCode: 201,
    ...payload,
    headers: {
      ...payload.headers,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
    },
  });

  try {
    const response = await fetch(
      'http://connectedspace.local:8123/api/webhook/nfc',
      {
        method: 'GET',
      },
    );

      return createResponse({
        statusCode: 200,
      });
  } catch (error) {
    console.log('Error while submitting to mailchimp', error);

    return createResponse({
      statusCode: 400,
      body: JSON.stringify({ error }),
    });
  }
}

export { handler };
