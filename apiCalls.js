const fetch = require('node-fetch')

const LOCATION_APIKEY = process.env.LOCATIONS_APIKEY || require('./dev.json').LOCATIONS_APIKEY
const REALTIME_APIKEY = process.env.REALTIME_APIKEY || require('./dev.json').REALTIME_APIKEY

// console.log(`LOCATION_KEY: ${LOCATION_APIKEY}`)
// console.log(`REALTIME_APIKEY: ${REALTIME_APIKEY}`)

const getLocations = async (latitude, longitude, radius = 500, maxResults = 2) => {
  try {
    const url = `http://api.sl.se/api2/nearbystops.json?key=${LOCATION_APIKEY}&originCoordLat=${latitude}&originCoordLong=${longitude}&maxresults=${maxResults}&radius=${radius}`
    const siteResponse = await fetch(url)
    const locations = await siteResponse.json()
    return locations.LocationList.StopLocation
  } catch (error) {
    console.log(error)
  }
}

const getRealTimeDepartures = async (locationId, withInNextMinutes = 10) => {
  try {
    const url = `http://api.sl.se/api2/realtimedeparturesV4.json?key=${REALTIME_APIKEY}&SiteID=${locationId}&timeWindow={withInNextMinutes}`
    const realTimeDepartureResponse = await fetch(url)
    const realTimes = await realTimeDepartureResponse.json()
    return realTimes.ResponseData
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getLocations,
  getRealTimeDepartures
}
// getLocations('59.325061500000004', '18.0679052')
//   .then((locations) => {
//     locations.map(location => {
//       getRealTimeDepartures(location.id)
//         .then(l => console.log(l.Buses))
//     })
//   })
