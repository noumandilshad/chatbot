const AWS = require("aws-sdk");

const credentials = new AWS.Credentials({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
AWS.config.credentials = credentials;
AWS.config.update({ region: process.env.AWS_REGION });

const lex = new AWS.LexModelBuildingService();
const lexRuntime = new AWS.LexRuntime();

const createBotParams = {
  name: botName,
  intents: [
    {
      intentName: "GreetingIntent",
      sampleUtterances: ["Hello", "Hi", "Hey"],
      fulfillmentActivity: {
        type: "ReturnIntent",
      },
    },
  ],
};
lexModelBuildingService.putBot(createBotParams).promise();

const botAlias = process.env.LEX_BOT_ALAIS;
const botName = process.env.LEX_BOT_NAME;

exports.lex = async ({ question, userId }) => {
  const params = {
    botAlias,
    botName,
    inputText: question,
    userId,
  };

  try {
    const { message } = await lexRuntime.postText(params).promise();
    return message;
  } catch (error) {
    throw error;
  }
};
