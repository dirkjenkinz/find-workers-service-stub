const utils = require('../utils/writer');
const Worker = require('../models/worker');
const { logger } = require('../utils/logger');

/*
1 degree latitude = 110.574 kilometres
.452 degrees = 50 kilometres

1 degree longitude = 111.320*cos(latitude) km
.569 degrees = 50 miles
*/
const filterByDistance = (workers, latitude, longitude) => {
  const match = [];
  const MINLAT = latitude - 0.452;
  const MAXLAT = latitude + 0.452;
  const MINLONG = longitude - 0.569;
  const MAXLONG = longitude + 0.569;

  for (let i = 0; i < workers.length; i++) {
    if (
      workers[i].location.latitude >= MINLAT
      && workers[i].location.latitude <= MAXLAT
      && workers[i].location.longitude >= MINLONG
      && workers[i].location.longitude <= MAXLONG
    ) {
      match.push(workers[i]);
    }
  }
  return match;
};

/*
  Returns all workers locations from the given location or within 50km
  location String home location to search against
  returns List
 */
exports.workersLocationGET = function (location) {
  logger.info('workersLocationGET');
  const loc = location.split(',');
  const lat = Number(loc[0]);
  const long = Number(loc[1].trim());

  logger.info(lat);
  logger.info(long);

  return new Promise((resolve, reject) => {
    try {
      let workers = Worker.find();
      workers = filterByDistance(workers, lat, long);
      resolve(workers);
    } catch (err) {
      logger.error(err);
      reject(new utils.RespondWithCode(500));
    }
  });
};
