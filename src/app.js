const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');


const app = express();

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and view location
app.set("view engine", "hbs"); // It helps to create dynamic templates using handlebars.
app.set("views", viewsPath); // It helps to create dynamic templates using handlebars.
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

 app.get('', (req, res) => {
   res.render('index', {
     title: 'Weather App',
     name: 'Shubham Kumar'
   });
 }); 

 app.get('/about', (req, res) => {
   res.render('about', {
     title: 'About me',
     name: 'Shubham Kumar'
   });
 });

 app.get('/help', (req, res) => {
   res.render('help', {
     helpText: 'This is some helpful Text.',
     title: 'Help',
     name: 'Shubham kumar' 
   });
 });

 app.get('/help/*', (req, res) => {
   res.render('404', {
     title: '404',
     name: 'Shubham Kumar',
     errorMessage: 'Help article not found.'
   })
 })

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Address must be provided'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({error})
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error})
      }

      return res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })

  })
});

app.get("/products", (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Shubham Kumar',
    errorMessage: 'Page not found.'
  })
;});

app.listen(3000, () => {
  console.log(" Server is up on port 3000. ");
});
