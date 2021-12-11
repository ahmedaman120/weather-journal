//the development checkpoints
/**
 *1= create two variable apiKey and baseURL to communicate with open weather mape api *
 *2- get all input values entered by user *
 *3- get all output containers *
 *4- call api with get request to get tempreature *
 *      1- after getting the zip code we will concate the baseURL with the zip code
 *      2- call api to get temp
 * 5- after update ui it must to make input validation and error handling
 *
 */

/* Global Variables */
const apiKey = 'c34fe58fabf4757d0aaad86093da5991';
const searchType = "zip"; //search type is depend on searching with api it can be q for city name or zip for zip code search
const apiStr = `&appid=${apiKey}`;
let baseURL = `http://api.openweathermap.org/data/2.5/weather?${searchType}=`;

//helper functions
//function to convert kelvin temp to Fahrenheit
function convertKelvitToFahrenheit(tempInK) {
    return (tempInK * 1.8) - 459.67;
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//data object that will sent to server
let dataObj = {
    "date": d,
    "content": '',
    "temp": null,
    "city": '',
    "weather": {}
};

//output divs
let dateDiv = document.getElementById('date');
let tempDiv = document.getElementById('temp');
let contentDiv = document.getElementById('content');


//button that id is `generate` action
const btnSubmit = document.getElementById('generate');

//get weather function
const getWeatherFromOut = async(URL) => {
    let res = await fetch(URL);
    try {
        if (res.status === 404) {
            res.json().then((d) => {
                alert(d.message);
            });
            return;
        }
        let resJSON = await res.json();
        return resJSON;
    } catch (error) {
        console.log(`error ${error}`);
    }
};
/**
 * post request to http://localhost:8000/submitData
 */
const postWeather = async(postURL, data = {}) => {
    const res = await fetch(postURL, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    try {
        let message = await res.json(); //this will pass to UI 
        return message;
    } catch (err) {
        console.log(err);
    }
};


//get Request to  http://localhost:8000/all 
const getWeatherFromLocal = async(getURL) => {
    const res = await fetch(getURL);
    try {
        let dataUI = await res.json();
        return dataUI;
    } catch (err) {
        console.log(err);
    }
};

//update UI after post request 
const updateUI = async(getURL) => {
    const dataUI = await getWeatherFromLocal('/all');
    console.log(dataUI);
    dateDiv.innerHTML = `<span> Date: ${dataUI.date} </span>`;
    tempDiv.innerHTML = `<span> Temperature: ${Number(dataUI.temp).toFixed(2)}°F</span>`;
    contentDiv.innerHTML = `<span> Feeling: ${dataUI.content} </span>`;
};
btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    //input variables hold the input values in value attribute 
    let zipCode = document.getElementById('zip').value;
    let feelingText = document.getElementById('feelings').value;
    if (zipCode == '' || feelingText == '') {
        alert('please fil zip code and your feelings to get the result. Thank you');
    } else {
        if (!Boolean(Number(zipCode))) {
            alert('please enter zip code of US with 5 digits eg 64504');
            return;
        } else {
            const URL = baseURL + zipCode + apiStr;
            getWeatherFromOut(URL)
                .then((resData) => {
                    //select data from resData to add approperait attributes of dataObj
                    dataObj.city = resData.name;
                    dataObj.date = d;
                    dataObj.temp = convertKelvitToFahrenheit(resData.main.temp);
                    dataObj.content = feelingText;
                    dataObj.weather = resData.weather[0];
                    postWeather('/submitData', dataObj)
                        .then((resFromLocal) => {
                            if (resFromLocal.message !== 'request success') {
                                console.log("please check the info");
                            } else {
                                updateUI('/all');
                            }
                        });
                });
        }
    }



});