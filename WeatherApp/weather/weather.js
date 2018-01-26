var request = require('request')

function getWeather(lat,long, callback) {
  request({
  url: `https://api.darksky.net/forecast/df45a4c47772de590074f7e6660ebcd0/${lat},${long}`,
  json:true
  }, function (err, response, body) {
        if (!err && response.statusCode === 200) {
          callback(undefined, {temperature: body.currently.temperature})
        } else {
            callback('Unable to fetch the temperature')
        }
  })
}
module.exports = {
  getWeather
}