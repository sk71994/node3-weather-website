const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=97af3e5488ca4481970eb30b63b5b000&query=' + latitude +',' + longitude + '&units=f';

  request({ url, json: true}, (error, {body}) => {
    if(error){
      callback('Unable to connect to Weather Service!', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      const foreCast = body.current;
      const weatherDescription = foreCast.weather_descriptions;
      const temp = foreCast.temperature;
      const feelsLike = foreCast.feelslike;
      callback(undefined, weatherDescription[0] +". It is currently " +temp + " fahrenheit out. It feels like " +feelsLike + " fahrenheit out.")
    }
  })
}

module.exports = forecast;