/* eslint-disable */
const fetch = require('node-fetch')
exports.handler = async function(event, context) {
  return {
    event: JSON.stringify(event),
    context: JSON.stringify(context)
  }
  try {
    let authenticationString = btoa('randomstudiofakeuser:a190422ce7a17a3e098a155c2e966664-us4');
    authenticationString = `Basic ${authenticationString}`;
    const response = await fetch('https://api.mailchimp.com/3.0/lists/cf9e550f84/members/', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: authenticationString,
      },
      body: JSON.stringify({
        email,
      }),
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return {
        statusCode: response.status,
        message: response.statusText,
      }
    }
    const data = await response.json()

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
