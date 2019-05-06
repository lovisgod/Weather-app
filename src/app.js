const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname)
console.log(path.join(__dirname, '../public'));

const app = express();


//Define Path for Express
const publicDirPath  = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath);

//Setup handlebars engine and Views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

//setup static directory to serve 
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title:"Welcome to the weather app",
        body:"Created By Ayooluwa"
    });

})


app.get('/help', (req, res) => {
    //the first value passed in is the name of the view to render
    //the second value is an objects with keys and values to render...
    res.render('help', {
        title:"Hello From This Side",
        message:'What do you want me to help you with !!!!!!!!!!'
    });
     
})

app.get('/about', (req,res) => {
    res.render('about', {
        title:'This is all about me',
        body:'hope this pages looks good'
    });
}) 

app.get('/get-weather', (req,res) => {
    if(!req.query.address){
        return res.send('Error!! no address was provided')
    }
    //set a default value for the second parameter
geocode(req.query.address, (err, {lattitude, longitude, Location_name} ={}) => {
    if (err) {
        return res.send({err});
    
    } else {
        forecast(lattitude, longitude, (error, data) => {
            if (error) {
                return res.send({error})
            } else {
                 res.send({
                     forecast : data,
                     Location_name,
                     address:req.query.address
                 })
            }
        })
    }
})
})


app.get('*', (req, res) => {
    res.render('error-404', {
        body:'ERROR 404 JUST OCCURED'
    }); 
})

app.listen(3000, () => {
    console.log("server running on port 3000....")
})