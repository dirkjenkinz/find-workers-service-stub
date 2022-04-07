'use strict';
var utils = require('../utils/writer.js');
const Worker = require('../models/worker.js');
const { logger } = require('../utils/logger.js');

/**
 * Returns all workers locations from the given location or within 50km
 *
 * location String home location to search against
 * returns List
 **/
exports.workersLocationGET = function (location) {
  logger.info('workersLocationGET');
  location = location.split(',');
  const lat = Number(location[0])
  const long = Number(location[1].trim());

  logger.info('latitude = ' + lat);
  logger.info('longitude = ' + long);

  return new Promise(async (resolve, reject) => {
    try {
      let workers = await Worker.find();
      workers = filterByDistance(workers, lat, long);
      resolve(workers);
    } catch (err) {
      logger.error(err);
      reject(new utils.respondWithCode(500,));
    }
  });
};

  /* 
  1 degree latitude = 110.574 kilometres
  .452 degrees = 50 kilometres 

  1 degree longitude = 111.320*cos(latitude) km
  .569 degrees = 50 miles
  */
const filterByDistance = (workers, latitude, longitude) => {
  let match = [];
  const MINLAT = latitude - .452;
  const MAXLAT = latitude + .452;
  const MINLONG = longitude - .569;
  const MAXLONG = longitude + .569;

  for (let i = 0; i < workers.length; i++){
    if (
      workers[i].location.latitude >= MINLAT &&
      workers[i].location.latitude <= MAXLAT &&
      workers[i].location.longitude >= MINLONG &&
      workers[i].location.longitude <= MAXLONG
    ) {
      match.push(workers[i])
    }
  }
  return match;
}

