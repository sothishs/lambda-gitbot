const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' });
const codebuild = new AWS.CodeBuild()
const status = require('./status')

module.exports.run = (sourceVersion) => {

  return new Promise((resolve, reject) => {

    console.log("Doing AWS Codebuild");
    codebuild.startBuild({
      projectName: process.env.PROJECT_NAME,
      artifactsOverride: { type: 'NO_ARTIFACTS' },
      sourceVersion: sourceVersion
    })
      .promise()

      .then(resp => {
        return status.update('pending', 'AWS codebuild is running...', sourceVersion, resp.build.id)
      })

      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      })
  })

}
