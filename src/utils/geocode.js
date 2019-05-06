 const request = require('request');

//this is sample of a callback functions in js
//callback works like return statements
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibG92aXNnb2QiLCJhIjoiY2p2MDBnem4yMGQ4NTQzb212cGYzZDVsMSJ9.tRfsH_dIhcc7cDTjRzp1rA&limits=1';
    request ({url:url, json:true}, (error, response) => {
        if ( error) {
            console.log(error)
            callback('Unable to connect', undefined);
        } else if (!response.body.features){
            console.log('no feature')
            callback("can't find location", undefined);
        } else if (response.body.features[0] == null){
            console.log('feature is 0')
            callback('cannot find location', undefined);
        }else {
            callback(undefined, data = {
                lattitude : response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                Location_name: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;