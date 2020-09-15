const request = require('request')


const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=66c540a1cf953616060ebdca627f3aac&query=' + latitude + ',' + longitude + '&units=m'
    request({ url, json: true}, (error,{ body }) => {
        if (error) {
            callback('Unable to connect the servies!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const temperature = body.current.temperature
            const feelslike = body.current.feelslike
            const weatherDescriptions = body.current.weather_descriptions
            const humidity = body.current.humidity
            callback(undefined,{
                forecasData:`${weatherDescriptions[0]}. it is currently ${temperature} degress out. it 
            feels like ${feelslike} degress out, the humidity is ${humidity}%`,
                location: body.location.name
            })
        }
    })
}

module.exports = {
    forecast: forecast
}