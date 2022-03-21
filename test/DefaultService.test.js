const { expect, test } = require('@jest/globals');
const { workersLocationGET } = require('../service/DefaultService');

const homeList = [{
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

describe('Find workers by location', () => {
    it('should return a partial list of workers', async () => {
        const location = {latitude: 6, longitude: 1}
        const response = await workersLocationGET(location);
        expect(response).toEqual(homeList);
    });
    it('should return 400', async () => {
        const location = {latitude: 6, longitude: 2}
        const response = await workersLocationGET(location);
        expect(response.code).toEqual(400);
    });
});
