const { expect, test } = require('@jest/globals');
const { workersLocationGET } = require('../service/DefaultService');
const mockingoose = require('mockingoose');
const Worker = require('../models/worker');

describe('get workers by location', () => {
    it('should return a list of workers living at a specified geolocatioon', async () => {
      mockingoose(Worker).toReturn(
        [
          {
            "workerId": 12345678,
            "name": 'Bridget Bardot',
            "location": {
              "latitude": '12',
              "longitude": '8',
            },
            "home": 'Zurich'
          },
          {
            "workerId": 23456789,
            "name": 'Hugh Jarse',
            "location": {
              "latitude": '12',
              "longitude": '8',
            },
            "home": 'Zurich'
          }
        ], 'find');
      const response = await workersLocationGET('12, 8');
      expect(response[0].name).toBe('Bridget Bardot');
    });
  });
