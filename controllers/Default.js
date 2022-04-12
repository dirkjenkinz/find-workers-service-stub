const utils = require('../utils/writer');
const Default = require('../service/DefaultService');

module.exports.workersLocationGET = function workersLocationGET(req, res, next, location) {
  Default.workersLocationGET(location)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
