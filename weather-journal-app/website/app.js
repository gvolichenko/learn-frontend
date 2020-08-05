/* Global Variables */
const baseUrl='http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey='76a469593954e6e2dc828c770a16ff2f';
// Create a new date instance dynamically with JS
let d = new Date();
// need to add 1 to month to make it 1-12 instead of 0-11
let newDate = (d.getMonth()+1) + '.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);


// Async GET from OPW API
const pullWeather = async (baseurl,zip,apikey) => {
    const weather = await fetch(baseurl+zip+'&appid='+apikey);
    try{
        const weatherJSON = await weather.json();
        return weatherJSON;
    }
    catch(error){console.log('ERROR!',error)}
};

// Async POST to my server
const postWeather = async (url = '', dataObj)=>{
    // API returns temp in Kelvin for some reason ¯\_(ツ)_/¯
    const userFeeling =  document.getElementById('feelings').value;
    toPost = {temperature:(Math.round(dataObj.main.temp - 273.15)) , 
            date:newDate, 
            city: dataObj.name,
            userResponse:userFeeling};
        
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(toPost), // body data type must match "Content-Type" header   
      });
      try {
        const newDataObj = await response.json();
        return newDataObj;
      }catch(error) {
      console.log("error", error);
      }

};

const retrieveAndUpdate = async () => {
    const request = await fetch('/retrieve');
        try{
            const recentData = await request.json()
            document.getElementById('date').innerHTML = 
            `DATE: ${recentData.date}`;
            document.getElementById('city').innerHTML = 
            `CITY: ${recentData.city}`;
            document.getElementById('temp').innerHTML = 
            `TEMP (C): ${recentData.temperature}`;
            document.getElementById('content').innerHTML = 
            `USER INPUT: ${recentData.userResponse}`;
        }
        catch(error) {
            console.log("error",error);
        }
};

function performAction(e){
    const newZip =  document.getElementById('zip').value;
    // Needs a vaid zip code for the API call.
    if(!isUsZipCode(newZip)){
        alert('Please enter a valid US zipcode.');
    }
    // chaining promises below
    pullWeather(baseUrl,newZip,apiKey)
    .then(function(data){
        postWeather(url = '/add',data);
    })
    .then(function(){
        retrieveAndUpdate();
    }
    )
};


function isUsZipCode(str)
{
 regexp = /^[0-9]{5}(?:-[0-9]{4})?$/;
  
        if (regexp.test(str))
          {
            return true;
          }
        else
          {
            return false;
          }
};

