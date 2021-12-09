//the development checkpoints
/**
 *1= create two variable apiKey and baseURL to communicate with open weather mape api *
 *2- get all input values entered by user *
 *3- get all output containers 
 *
 */

/* Global Variables */
const apiKey = 'c34fe58fabf4757d0aaad86093da5991';
const searchType = "zip"; //search type is depend on searching with api it can be q for city name or zip for zip code search
const apiStr = `&appid=${apiKey}`;
let baseURL = `api.openweathermap.org/data/2.5/weather?${searchType}=`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


//input variables
let zipCode = document.getElementById('zip').innerText;
let feelingText = document.getElementById('feelings').innerText;

//output divs
let dateDiv = document.getElementById('date');
let tempDiv = document.getElementById('temp');
let contentDiv = document.getElementById('content');