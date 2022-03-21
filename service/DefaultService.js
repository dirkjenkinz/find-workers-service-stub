'use strict';
var utils = require('../utils/writer.js');

/**
 * Returns all workers locations from the given location or within 50km
 *
 * location String home location to search against
 * returns List
 **/
exports.workersLocationGET = function async (location) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = [{
      "workerId": 0,
      "name": "name",
      "location": {
        "latitude": 6.0274563,
        "longitude": 1.4658129
      },
      "home": "home"
    }, {
      "workerId": 0,
      "name": "name",
      "location": {
        "latitude": 6.0274563,
        "longitude": 1.4658129
      },
      "home": "home"
    }];
    if (location.latitude === 6 && location.longitude === 1) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      console.log(new utils.respondWithCode(400,))
      resolve(new utils.respondWithCode(400,));
    }
  });
}

