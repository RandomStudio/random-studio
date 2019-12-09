/* eslint-disable */
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const email = event.queryStringParameters.email;
  try {
    const authenticationString = 'Basic cmFuZG9tc3R1ZGlvOmExOTA0MjJjZTdhMTdhM2UwOThhMTU1YzJlOTY2NjY0LXVzNA==';
    const body = JSON.stringify({
      "email_address": email,
      "status": "subscribed",
    });
    console.log(body);
    const response = await fetch('https://us4.api.mailchimp.com/3.0/lists/cf9e550f84/members/', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: authenticationString,
      },
      body,
    });
    console.log('Response is ok?')
    console.log(response.status)

    const data = await response.json();
    console.log(data.detail);

    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return {
        statusCode: response.status,
        message: data.detail,
      }
    }

    return {
      statusCode: 200,
      message: 'Success',
      response: JSON.stringify(data),
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      message: 'Something went wrong',
      error: err.message,
    }
  }
}
