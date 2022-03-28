'use strict';
var utils = require('../utils/writer.js');
const Worker = require('../models/worker.js');

/**
 * Returns all workers locations from the given location or within 50km
 *
 * location String home location to search against
 * returns List
 **/
exports.workersLocationGET = async (location) => {
  console.log('workersLocationGET')
  let loc = {};
  location = location.split(',');
  let l = location[0].indexOf(':') + 1;
  loc.latitude = location[0].substring(l).trim();
  l = location[1].indexOf(':') + 1;
  loc.longitude = location[1].substring(l, location[1].length - 1).trim();
  console.log('loc=', loc)
  return new Promise(async (resolve, reject) => {
    try {
      const workers = await Worker.find({ location: loc });
      console.log('workers=', workers)
      resolve(workers);
    } catch (err) {
      console.log(err)
      reject(new utils.respondWithCode(500,));
    }
  });
}

