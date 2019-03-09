
class Forecast {
  getForecast(lat, long, params) {
    return fetch(`https://api.stormglass.io/point?lat=${lat}&lng=${long}&params=${params}`, {
      headers: {
      'Authorization': `${process.env.REACT_APP_STORMGLASS}`
      }
    })
    .then((response) => {

      return response.json()
    })
    .catch((error) => {
      console.log(error)
    })
  }
}

const ForecastService = new Forecast();

export default ForecastService;