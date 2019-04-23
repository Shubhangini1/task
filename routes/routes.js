
// all routes are mentioned in this file
module.exports = function (app) {
  var api = require('../src/result')
  app.post('/getResult', api.result)
}
