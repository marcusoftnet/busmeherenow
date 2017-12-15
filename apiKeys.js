const LOCATION_APIKEY = function () {
  return process.env.LOCATION_APIKEY
}

const REALTIME_APIKEY = function () {
  return process.env.REALTIME_APIKEY
}

module.exports = {
  LOCATION_APIKEY,
  REALTIME_APIKEY
}
