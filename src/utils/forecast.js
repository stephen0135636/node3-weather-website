const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/47295d5e5a8c6153d8b034f2b51f7e3e/'+latitude+','+longitude
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('unable to connect',undefined)
        }else if(body.error){
            callback('unable to get forecast',undefined)
        }else{
            callback(undefined,body.daily.data[0].summary+' it is currently ' +body.currently.temperature + ' degrees out. There is a ' +body.currently.precipProbability+ '% chance of rain')
        }
    }) 
}

module.exports = forecast