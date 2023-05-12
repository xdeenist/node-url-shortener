const {isApiToken, apiToken} = require("../config.json")

const checkApiToken = (request, response, next) => {

  if (isApiToken) {
    if (request.params?.token !== apiToken) {
      return response.status(403).json({message: 'Permission denied'});
    }
  }
  next()
}

module.exports.checkApiToken = checkApiToken;
