const path = require('path');
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express cofig
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Refael Dabush'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Refael Dabush'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Refael Dabush',
        helpText: 'This is some helpful text.'
    })
})

app.get('/weather', (req, res) => {
    if (req.query.address === "" || !req.query.mylocation === undefined) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    if (!req.query.address) {
    const location = req.query.mylocation.split(' ')

    forecast.forecast(location[0], location[1], (error, {forecasData, location}) => {
        if (error) {
            return res.send({ error })
        } 

        res.send([{
            forecast: forecasData,
            location,
            address: req.query.address
            }]) 
    })
} else {
    
    geocode.geocode(req.query.address, (error,{latitude, longitude, location} = {})  => {
        if (error){
            return res.send({error})
        }

        forecast.forecast(latitude, longitude, (error, {forecasData}) => {
            if (error) {
                return res.send({ error })
            } 

            res.send([{
                forecast: forecasData,
                location,
                address: req.query.address
                }]) 
        })
    })
}
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404 Help',        
        errorMessage: 'Help article not fond',
        name: 'Refael Dabush'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

   res.send({
       products: []
   }) 
})

app.get('*', (req, res) => {
    res.render('404',{
        title: 'Error 404',
        errorMessage: 'Page not found',
        name: 'Refal Dabush'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})