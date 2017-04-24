'use strict';

const result = require('./lib/result')
const build = require('./lib/build')

exports.handler = (event, context, callback) => {

  const message = event.Records[0].Sns.Message;

  if (message && message.after) {

    // only for PR
    if (message.pull_request) {
      console.log('\n\n === run build on Gitbot SNS === \n\n');
      build.run(message.after)
        .then(resp => {
          callback(null, resp);
        })
        .catch(err => {
          callback(err, null);
        })
    } else {
      callback(err, null);
    }

  } else {

    console.log('\n\n === run build on Codebuild SNS === \n\n');
    result.run(message.buildId)
      .then(resp => {
        callback(null, resp);
      })
      .catch(err => {
        callback(err, null);
      })

  }

}
