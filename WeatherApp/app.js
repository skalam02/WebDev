var yargs = require('yargs')
var geocode = require('./geocode/geocode')

var argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Address to fetch weather for",
      string: true
    }
  })
  .help()
  .alias('help','h')
  .argv

geocode.geocodeAddress(argv.a, function(error, results){
  if (error) {
    console.log(error)
  } else {
    console.log(JSON.stringify(results, undefined, 2))
  }
})







// var yargs = require('yargs')
// var geocode = require('./geocode/geocode')
// var weather = require('./weather/weather')
// var argv = yargs.options({
//   a: {
//     demand: true,
//     alias: "address",
//     describe: 'Address to fetch weather for',
//     string: true
//   }})
// .help()
// .alias('help', 'h')
// .argv;

// geocode.geocodeAddress(argv.a) 
// // var apiKey = "df45a4c47772de590074f7e6660ebcd0"
     