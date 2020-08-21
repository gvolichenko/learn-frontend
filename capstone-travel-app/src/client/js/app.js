
// upon click i want the layout to change drastically

const travelApp = () => {
    document.getElementById('generate').addEventListener('click', performAction);

    /* Global Variables */
    const geoBaseUrl='http://api.geonames.org/postalCodeSearchJSON?maxRows=10';
    const geoUsername='gvolichenko';
    const weatherBaseUrl='http://api.weatherbit.io/v2.0/forecast/daily';
    const weatherKey = '12f912ce28cd4e22b9489e58e33fde80';
    const pixabayKey = '17953846-1440414bb91ba9252c04bc61e';
    const pixabayBaseUrl = 'https://pixabay.com/api/';

    // Async GET from OPW API
    const pullGeo = async (baseurl,city,username,tripDate) => {
        const geo = await fetch(baseurl+'&placename='+city+'&username='+username);
        try{
            let geoJSON = await geo.json();
            // limited to the first location from the array
            geoJSON = geoJSON.postalCodes[0]
            geoJSON.tripdate = tripDate;
            let countdownDays = dateCountdown(tripDate);
            // handle same days trips
            if (countdownDays==(-1)) countdownDays=0;
            geoJSON.countdown = countdownDays;
            // need to handle undefined here for obscure destinations
            return geoJSON;
        }
        catch(error){console.log('ERROR!',error)}
    };
    const pullWeather = async (baseurl,key,lat,lon,prevData) => {
        const weather = await fetch(baseurl+'?key='+key+'&lat='+lat+'&lon='+lon);
        try{
            const weatherJSON = await weather.json();
            // just temperature for now
            prevData.temperature = weatherJSON.data[prevData.countdown].temp
         
            return prevData;
        }
        catch(error){console.log('ERROR!',error)}
    };
    const pullImage = async(baseurl,key,prevData) => {
        const imageData = await fetch(baseurl+'?key='+key+'&q='+prevData.placeName+'&category=travel')
        try{
            const imageJSON = await imageData.json();
            //only using the first result
            prevData.imageUrl = imageJSON.hits[0].largeImageURL;
            swapImageLink(prevData.imageUrl)
            
            return prevData;
            //prevData.imageUrl = 
        }
        catch(error){console.log('ERROR!',error)}
    }
    // Async POST to my server
    const postData = async (url = '', geoObj)=>{
       /*
        const toPost = {lat:geoObj.lat,
        lng: geoObj.lng,
        placeName: geoObj.placeName ,
        tripdate: geoObj.tripdate,
        countdown: geoObj.countdown,};
        */
            
        const response = await fetch(url, {
            method: 'POST', 
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(geoObj), // body data type must match "Content-Type" header   
        });
        try {
            const newDataObj = await response.json();
            return newDataObj;
        }catch(error) {
        console.log("error", error);
        }

    };

    const retrieveAndUpdate = async () => {
        const request = await fetch('http://localhost:3000/retrieve');
            try{
                const recentData = await request.json()
                document.getElementById('tripdateDisplay').innerHTML = 
                `Trip Date: ${recentData.tripdate}`;
                document.getElementById('countdown').innerHTML = 
                `Days Left: ${recentData.countdown}`;
                document.getElementById('latitude').innerHTML = 
                `Latitude: ${recentData.lat}`;
                document.getElementById('longitude').innerHTML = 
                `Longitude: ${recentData.lng}`;
                document.getElementById('placename').innerHTML = 
                `Placename: ${recentData.placeName}`;
            }
            catch(error) {
                console.log("error",error);
            }
    };

    function performAction(e){
    
        const newCity =  document.getElementById('destination').value;
        const tripDate = document.getElementById('tripdate').value;

        // Need to check input here
        /*
        if(!isUsZip(newZip)){
            alert('Please enter a valid US zipcode.');
        } */
        
        // chaining promises below
        pullGeo(geoBaseUrl,newCity,geoUsername,tripDate)
        .then(function(data){
            const weather = pullWeather(weatherBaseUrl,weatherKey,data.lat,data.lng,data)
            return weather;
        })
        .then(function(data){
            const imgData = pullImage(pixabayBaseUrl,pixabayKey,data)
            return imgData;
        })
        .then(function(data){
            //console.log(data)
            postData('http://localhost:3000/add',data);
        })
        .then(function(){
            retrieveAndUpdate();
        }
        )
    };

    // Helper Functions
    const dateCountdown = (dateInput) => {
        // Create a new date instance dynamically with JS
        const today = new Date();
        const future = new Date(dateInput);
        const timeDiff = (future - today) / (1000*60*60*24);
        if (timeDiff<= (-1)) {
            alert('Your trip date should be in the future')}
        if (timeDiff>16 ) {
                alert('Your trip needs to be at most 16 days in the future')}    
        return Math.ceil(timeDiff);
    }
    const swapImageLink = (link) => {
        
        document.getElementById("main_image").src = link;
        return;
    }

    function isUsZip(str)
    {
    const regexp = /^[0-9]{5}(?:-[0-9]{4})?$/;
    
            if (regexp.test(str)){return true;}
            else{return false;}
    };
};

export {travelApp};