const mailChimpAPI = process.env.MAILCHIMP_API_KEY;

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

  const { email } = event.queryStringParameters;
  let errorMessage: string;

  if (!email) {
    errorMessage = 'No EMAIL supplied';
    console.log(errorMessage);

    return createResponse({
      statusCode: 400,
      body: JSON.stringify(errorMessage),
    });
  }

  const data = {
    email_address: email,
    status: 'subscribed',
    merge_fields: {},
  };

  const subscriber = JSON.stringify(data);
  console.log('Sending data to mailchimp', subscriber);

  try {
    const response = await fetch(
      'https://us4.api.mailchimp.com/3.0/lists/cf9e550f84/members',
      {
        method: 'POST',
        body: subscriber,
        headers: {
          Authorization: `Basic ${mailChimpAPI}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const json = await response.json();

    console.log(`Mailchimp body: ${JSON.stringify(json)}`);
    console.log(`Status Code: ${response.status}`);

    if (response.ok) {
      console.log('Added to list in Mailchimp subscriber list');

      return createResponse({
        statusCode: 200,
      });
    }

    console.log('Error from mailchimp', json.detail);

    return createResponse({
      statusCode: 400,
      body: JSON.stringify({ error: json.detail }),
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
