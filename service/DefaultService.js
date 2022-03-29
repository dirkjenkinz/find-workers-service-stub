'use strict';
var utils = require('../utils/writer.js');
const Worker = require('../models/worker.js');

/**
 * Returns all workers locations from the given location or within 50km
 *
 * location String home location to search against
 * returns List
 **/
 exports.workersLocationGET = function (location) {
  console.log('workersLocationGET ---')
  location = location.split(',');
  console.log('1.', '>'+location+'<')
  let lat = Number(location[0]);
  let long = Number(location[1]);
  const loc = {"latitude": lat, "longitude": long};
  console.log(loc)
  return new Promise(async (resolve, reject) => {
    try {
      const workers = await Worker.find({location: loc});
      console.log(workers)
      resolve(workers)
    } catch (err) {
      console.log(err)
      reject(new utils.respondWithCode(500,));
    }
  });
}

