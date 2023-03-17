const AWS = require('aws-sdk');

const credentials = new AWS.Credentials({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
AWS.config.credentials = credentials;
AWS.config.update({ region: process.env.AWS_REGION });

const kendra = new AWS.Kendra();
const indexId = process.env.KENDRA_INDEX_ID;

exports.kendra = async ({question }, event) => {
  const params = {
    IndexId: indexId,
    QueryText: question,
  };

  try {
    const response = await kendra.query(params).promise();
    if (response.ResultItems.length > 0) {
      return response.ResultItems[0].DocumentExcerpt.Text;
    }
  } catch (error) {
    throw error;
  }
};