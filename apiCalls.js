const fetch = require('node-fetch')
const keys = require('./apiKeys')

const LOCATION_APIKEY = keys.LOCATION_APIKEY()
const REALTIME_APIKEY = keys.REALTIME_APIKEY()

const getLocations = (latitude, longitude) => {
  const radius = 500
  const maxResults = 2
  const url = `http://api.sl.se/api2/nearbystops.json?key=${LOCATION_APIKEY}&originCoordLat=${latitude}&originCoordLong=${longitude}&maxresults=${maxResults}&radius=${radius}`

  return fetch(url)
    .then(siteResponse => siteResponse.json())
    .then(locations => locations.LocationList.StopLocation)
}

const getRealTimeDepartures = locationId => {
  const withInNextMinutes = 10
  const url = `http://api.sl.se/api2/realtimedeparturesV4.json?key=${REALTIME_APIKEY}&SiteID=${locationId}&timeWindow=${withInNextMinutes}`

  return fetch(url)
    .then(realTimeResponse => realTimeResponse.json())
    .then(realTimes => realTimes.ResponseData)
}

module.exports = {
  getLocations,
  getRealTimeDepartures
}

getLocations('59.325061500000004', '18.0679052')
  .then((locations) => {
    locations.map(location => {
      getRealTimeDepartures(location.id)
        .then(t => console.log(t))
    })
  })
