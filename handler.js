const { lex } = require("./lex.service");
const { v4: uuidv4 } = require('uuid');
const { kendra } = require("./kendra.service");

exports.handler = async (event) => {
    const question = event.question;
    const userId = uuidv4()

    const kendraParams = {
      IndexId: indexId,
      QueryText: question,
    };

    try {
        const lexResponse = await lex({question, userId });
        return {
            statusCode: 200,
            body: lexResponse
        }

    }
    catch(error) {

        const kendraResponse = await kendra({question});
        return {
            statusCode: 200,
            body: lexResponse
        }

    }
  
    try {
      if (lexResponse.message) {
        return {
          statusCode: 200,
          body: lexResponse.message,
        };
      }
  
      if (kendraResponse.ResultItems.length > 0) {
        return {
          statusCode: 200,
          body: kendraResponse.ResultItems[0].DocumentExcerpt.Text,
        };
      }
  
      return {
        statusCode: 200,
        body: "Can't find an answer to that",
      };
    } catch (error) {
      console.log(error);
    }
  };