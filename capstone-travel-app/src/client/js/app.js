
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
    const countryUrl = 'https://restcountries.eu/rest/v2/alpha/';

    // Async GET from OPW API
    const pullGeo = async (baseurl,city,username,tripDate) => {
        const geo = await fetch(baseurl+'&placename='+city+'&username='+username);
        try{
            let geoJSON = await geo.json();
            // limited to the first location from the array
            
            // For US we want the second result because 
            // "For the US the first returned zip code is determined using zip code area shapes"
            if (geoJSON.postalCodes.length>1 && geoJSON.postalCodes[1].countryCode=="US") {
                geoJSON = geoJSON.postalCodes[1]    
            }
            else {geoJSON = geoJSON.postalCodes[0]}
            
            let countdownDays = dateCountdown(tripDate);

            if (countdownDays<= 0) {
                alert('Your trip date should be in the future. Showing the weather for today.')
                countdownDays= 0;
            }
            if (countdownDays>15 ) {
                alert('Your trip needs to be at most 15 days in the future. Showing the weather for 15 days from today.')
                countdownDays=15;
            } 

         
            geoJSON.countdown = countdownDays;
            geoJSON.tripdate = tripDate;
            
            
            return geoJSON;
        }
        catch(error){console.log('ERROR!',error)
        alert ("There was an issue with your destination")}
    };
    const pullWeather = async (baseurl,key,lat,lon,prevData) => {
        const weather = await fetch(baseurl+'?key='+key+'&lat='+lat+'&lon='+lon);
        try{
            const weatherJSON = await weather.json();
            // just temperature for now
            prevData.temperature = weatherJSON.data[prevData.countdown].temp
         
            return prevData;
        }
        catch(error){console.log('ERROR!',error)
        alert ("There was an issue with your destination")}
    };
    const pullImage = async(baseurl,key,prevData) => {
        // replace spaces with + signs
        const fixedPlaceName = prevData.placeName.split(' ').join('+')
        // add state, for non-US country code
        let updatePlaceName = fixedPlaceName.split('+').join(' ')
        if(prevData.countryCode=="US"){updatePlaceName = updatePlaceName + ', ' +prevData.adminCode1}
        else {updatePlaceName = updatePlaceName + ', '+prevData.countryCode};
        // store the complete placename
        prevData.updatedplacename = updatePlaceName;
        
        const imageData = await fetch(baseurl+'?key='+key+'&q='+fixedPlaceName+'&category=travel')
        try{
            const imageJSON = await imageData.json();
            //only using the first result
            prevData.imageUrl = imageJSON.hits[0].largeImageURL;
            
            return prevData;
            //prevData.imageUrl = 
        }
        catch(error){console.log('ERROR!',error)
        alert ("There was an issue with your destination")}
    }
    const pullCountry = async(baseurl,prevData)=>{
        const countryData = await fetch(baseurl+prevData.countryCode)
        try{
            const countryJSON = await countryData.json();
            prevData.flagUrl = countryJSON.flag;
            prevData.countryName = countryJSON.name;
            return prevData;
        }
        catch(error){console.log('ERROR!',error)}
    }
    // Async POST to my server
    const postData = async (url = '', geoObj)=>{
            
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
        return 'done posting';
    };

    const retrieveAndUpdate = async () => {
        const request = await fetch('http://localhost:3000/retrieve');
            try{
                const recentData = await request.json()
                document.getElementById('tripdateDisplay').innerHTML = 
                `Trip Date: ${recentData.tripdate}`;
                document.getElementById('countdown').innerHTML = 
                `Days Left: ${recentData.countdown}`;
                document.getElementById('temperature').innerHTML = 
                `Temp Forecast (C): ${recentData.temperature}`;
                document.getElementById('placename').innerHTML = 
                `Placename: ${recentData.updatedplacename}`;
                // replace the main image 
                swapImageLink("main_image",recentData.imageUrl);
                // replace the flag image
                swapImageLink("flag",recentData.flagUrl);
                document.getElementById('country').innerHTML = recentData.countryName;

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
            return pullWeather(weatherBaseUrl,weatherKey,data.lat,data.lng,data)
        })
        .then(function(data){
            return pullImage(pixabayBaseUrl,pixabayKey,data)
        })
        .then(function(data){
            return pullCountry(countryUrl,data)
        })
        .then(function(data){
            
            postData('http://localhost:3000/add',data);
        })
        .then(function(){
            retrieveAndUpdate();
        }
        )
    };


};

export {travelApp};



    // Helper Functions
    const dateCountdown = (dateInput) => {
        // Create a new date instance dynamically with JS
        const today = new Date();
        const future = new Date(dateInput);
        const timeDiff = (future - today) / (1000*60*60*24);
        // need to add 1 for incomplete day difference    
        return Math.ceil(timeDiff)+1;
    }
    const swapImageLink = (elementName,link) => {
        document.getElementById(elementName).src = link;
        return;
    }
export{dateCountdown};