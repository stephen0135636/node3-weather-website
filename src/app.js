const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

//define paths for Express confid
const  publicDirectoryPath = path.join(__dirname,'../public')
const  viewPath = path.join(__dirname,'../templates/views')
const partialsPath =  path.join(__dirname,'../templates/partials')
//setup handlebars engine amd views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve  
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
    res.render('index',{
        title : 'Weather',
        name : 'Nwabueze Nonso'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title : 'About',
        name:'Nwabueze Nonso'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title : 'Help',
        helptext:'This is some helpful text',
        name: 'Nwabueze Nonso'
    })
})


app.get('/weather',(req,res) => {
   
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}= {})=>{
        if(error){
            return res.send({error})
        }
        
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })

    // res.send({
    //     forecast : 'it is raining',
    //     loaction:'Warri',
    //     address:req.query.address
    // })
 
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
      return res.send({
           error:'you must provide a search term'
       }) 
    }
    
    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*' , (req,res)=>{
    res.render('404',{
        title : '404',
        name: 'Nwabueze Nonso',
        errorMessage: 'Page not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
    title: '404',
    name: 'Nwabueze Nonso',
    errorMessage: 'Page not found.'
    })
})

app.listen(port,() => {
    console.log('server is on port ' + port)
})
 