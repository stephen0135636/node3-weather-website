const request = require('request')

const geocode = (address,callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidGVjaGtlZWQiLCJhIjoiY2s1eGY1ajViMHVmZDNkcnZybmw0Nm9vNiJ9.RFgP5gj2jVpIncUoi5iMjQ&limit=1'
    request({url : url, json:true},(error,{body})=>{
        if(error){
            callback('unable to connect.Try again',undefined)
        }else if(body.features.length === 0){
            callback('unable to get a given location',undefined)
        }else{  
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name
            }) 
        }
    })
}



module.exports = geocode
