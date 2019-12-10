const request = require('request');

module.exports.handler = (event, context, callback) => {
  const { email } = event.queryStringParameters;
  let errorMessage = null;

  if (!email) {
    errorMessage = 'No EMAIL supplied';
    console.log(errorMessage);
    callback(errorMessage);
  }

  const data = {
    email_address: email,
    status: 'subscribed',
    merge_fields: {},
  };

  const subscriber = JSON.stringify(data);
  console.log('Sending data to mailchimp', subscriber);

  request({
    method: 'POST',
    url: 'https://us4.api.mailchimp.com/3.0/lists/cf9e550f84/members',
    body: subscriber,
    headers: {
      Authorization: 'Basic cmFuZG9tc3R1ZGlvOmExOTA0MjJjZTdhMTdhM2UwOThhMTU1YzJlOTY2NjY0LXVzNA==',
      'Content-Type': 'application/json',
    },
  }, (error, response, body) => {
    if (error) {
      callback(error, null);
    }
    const bodyObj = JSON.parse(body);

    console.log('Mailchimp body: ' + JSON.stringify(bodyObj));
    console.log('Status Code: ' + response.statusCode);

    if (response.statusCode < 300) {
      console.log('Added to list in Mailchimp subscriber list');
      callback(null, {
        statusCode: 201,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({
          status: 'saved email',
        }),
      });
    } else {
      console.log('Error from mailchimp', bodyObj.detail);
      callback(bodyObj.detail, null);
    }
  });
};
