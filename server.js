// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 8000;
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

//Begin of Server's API
app.get('/all', (req, res) => {
    res.send(projectData)
        .status(200)
        .end();
});

//post request 
/**
 * post request will run after call api to handle the 
 * temprature 
 */
app.post('/submitData', (req, res) => {
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.content = req.body.content;
    projectData.city = req.body.city;
    projectData.weather = req.body.weather;
    res.send({ 'message': "request success" })
        .status(200)
        .end();
});
//End of Server's API

// Setup Server

app.listen(PORT, function() {
    console.log(`app running on port ${PORT}`);
});