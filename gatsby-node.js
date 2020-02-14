const axios = require('axios')

const getForecasts = async () => {
  const forecast = await axios.get('https://api.weatherbit.io/v2.0/forecast/daily?city=Jakarta&days=5&key=2b0ee1414ceb4f9195c5a38d208c473f')
  return forecast.data
}

exports.sourceNodes = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}) => {
  // get data from api at build time
  const forecasts = await getForecasts()

  // create node for build time forecasts data
  createNode({
    cityName: forecasts.city_name,
    timezone: forecasts.timezone,
    countryCode: forecasts.country_code,
    stateCode: forecasts.state_code,
    long: forecasts.long,
    lat: forecasts.lat,
    listForecasts: forecasts.data,
    // required fields
    id: createNodeId(`forecast-${forecasts.stateCode}`),
    internal: {
      type: 'forecast',
      contentDigest: createContentDigest(forecasts),
    },
  })
}
