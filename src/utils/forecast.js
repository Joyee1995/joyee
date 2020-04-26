const request = require('request')


const forecast = (f1, f2, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b21ea0d9c1309d586438a021698f1d43&query=' + f1 + ',' + f2 
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('You are not connected to the internet',undefined)
        } else if (body.error) {
            callback('location is not given',undefined)
        } else {
            callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out.')
        }
    })
}

module.exports=forecast
