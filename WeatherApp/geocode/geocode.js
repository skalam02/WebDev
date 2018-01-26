var request = require('request')

var geocodeAddress = (address, callback) => {
  
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
    json:true
    }, (error, response, body) => {
    if(error) {
      callback("hello")
//       console.log("Unable to connect to Google API")
    } else if(body.status === "ZERO_RESULTS") {
//       console.log("Unable to find that address!")
    } else if (body.status ==="OK"){
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      })
//     console.log(`Address: ${body.results[0].formatted_address}`)
//     console.log(`Latitude: ${body.results[0].geometry.location.lat}`)
//     console.log(`Longitude: ${body.results[0].geometry.location.lng}`)
    }
  })
}

module.exports = {
  geocodeAddress
}