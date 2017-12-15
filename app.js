const ApiBuilder = require('claudia-api-builder')
const api = new ApiBuilder()
const apiCalls = require('./apiCalls')

module.exports = api

api.get('/api', request => {
  const lat = request.queryString.lat
  const long = request.queryString.long

  apiCalls.getLocations(lat, long)
    .then((locations) => {
      let times = []
      locations.map(location => {
        apiCalls.getRealTimeDepartures(location.id)
          .then(time => times.push(time))
      })

      return times
    })
})
