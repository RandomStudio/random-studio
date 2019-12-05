/* eslint-disable */
const fetch = require('node-fetch')
exports.handler = async function(event, context) {
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
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data.joke })
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
