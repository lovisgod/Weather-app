const request = require('request');

//this uses callback functions
const forecast  = (lattitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/4c0114b78f1400c17449abec8e96d219/' + lattitude + ',' + longitude + '?units=si';
    request({url, json:true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to server', undefined);
        }else if (body.error) {
            callback('Unable to find location', undefined);
        }else {
            const data = body.currently;
            const temp = data.temperature;
            const precipProbability = data.precipProbability;
            callback(undefined, 'There is a ' + precipProbability + '%' + ' ' + 'chance of rain');
        }
    })
}

module.exports = forecast;