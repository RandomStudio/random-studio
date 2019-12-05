/* eslint-disable */
const btoa = require('btoa');
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const email = event.queryStringParameters.email;
  console.log(`Received email ${email}`)
  try {
    let authenticationString = btoa('randomstudiofakeuser:a190422ce7a17a3e098a155c2e966664-us4');
    authenticationString = `Basic ${authenticationString}`;
    const body = JSON.stringify({
      "email_address": email,
      "status": "subscribed",
    });
    console.log(body);
    const response = await fetch('https://api.mailchimp.com/3.0/lists/cf9e550f84/members/', {
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
    console.log(response.statusText);
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
