// setting up global variables
var btn = document.querySelector("#btn");

var containerHistoricCities = document.querySelector("#searched-Cities");

var containerCurrent = document.querySelector("#targetedCity");

var containerForecast = document.querySelector("#forecastCity");

var apiKey = "f03da6658f72e2e0e0e2d12e07dcc689";

// local stores

var storeData = JSON.parse(localStorage.getItem('cities')) || [];

var urlIcon; 
    if (location.protocol === 'https:') {
    urlIcon = 'https://openweathermap.org/img/wn/';
    } else {
    urlIcon = 'https://openweathermap.org/img/wn/';
 }
    
// doing weather conditions for cities 
var weatherCondition = [];

function start(){
    loadCity();
}

// trying to retrieve info from local storage

var loadCity = function(){
    cleanElement(containerHistoricCities);
    if(storeData){
        var ulElement = document.createElement("ul");
        
        ulElement.classList.add("list-unstyled");
        ulElement.classList.add("w-100");

        for(var i = 0; i <storeData.length; i++){

            var liElement = document.createElement("li");

            // need to append?
            liElement.innerHTML = "<button type ='button'class='list-group-item list-grou-item-action'attr='"+storeData[i]+"'>" +storeData[i] +"</button>";
            
            ulElement.appendChild(liElement);
        }

        containerHistoricCities.appendChild(ulElement);

    }
};

$(document).on("click", ".list-group-item", function(event) {

    event.preventDefault();

    var city = $(this).attr("attr");
    callApiFetch(city);
});

var cleanElement = function(element){
    element.innerHTML = "";
};

var findUV = function(uv){
    var indexUV = parseFloat(uv);
    var bgColor;     
    if(indexUV < 3){
        bgColor = "bg-success";    
        
    }
    else if( indexUV < 6){
            bgColor = "bg-warning";

        }
        else if(indexUV < 8){
                bgColor = "bg-danger"; 

            }
            else {
                    bgColor = "bg-dark";

                }
                return bgColor;
};

// var converTemp = function(temp){
//     return (Math.floor((parseFloat(temp) -32) * (5/9))).toString();
// };

// var convertWSpeed = function(speed){
//     return (Math.floor(parseFloat(speed)  * (1.609)).toString();

var weatherHTML = function (city, uv) {

    cleanElement(containerCurrent);

    cleanElement(containerForecast); 

    var ctn1 = document.createElement("div"); 

    ctn1.classList.add("col-6"); 
    
    var ctn2 = document.createElement("div");     

    ctn2.classList.add("col-6");   

    var cityEl = document.createElement("h2");

    var imageCurrent = document.createElement("img");

    cityEl.textContent = city + " (" + weatherCondition[0].dateT +")";

    imageCurrent.setAttribute("src", weatherCondition[0].icon);

    imageCurrent.classList.add("bg-info");

    ctn1.appendChild(cityEl);

    ctn2.appendChild(imageCurrent);

    var ctn3  = document.createElement("div");

    ctn3.classList.add("col-12");

    ctn3.innerHTML =    "<p>Temperature: " + weatherCondition[0].temp + " °F / " + weatherCondition[0].temp + 
                        "<p>Humidity: " + weatherCondition[0].humidity + "% </p>" +
                        "<p>Wind Speed: " + weatherCondition[0].speed + " MPH / " + weatherCondition[0].speed +
                        "<p>UV index: <span class='text-white "+ findUV(uv) + "'>" + uv + "</span></p>";
    containerCurrent.appendChild(ctn1);
    containerCurrent.appendChild(ctn2);
    containerCurrent.appendChild(ctn3);

    var ctn6 = document.createElement("div");         

    ctn6.classList.add("row");                   

    var ctn7 = document.createElement("div");     
    
    
    ctn7.classList.add("col-12");                     

    ctn7.innerHTML = "<h2>5-Day Forecast</h2>";

    ctn6.appendChild(ctn7);

    containerForecast.appendChild(ctn6);

    var ctn8 = document.createElement("div");         

    ctn8.classList.add("d-flex");                     


    // creating loop for info about weather in the array weatherCondition
    for(var i=1; i<weatherCondition.length; i++){    
        
        var ctn4  = document.createElement("div");      

        ctn4.classList.add("card");                     

        ctn4.classList.add("bg-primary");               

        ctn4.classList.add("text-white");               

        ctn4.classList.add("rounded");                  

        ctn4.classList.add("mr-2");       

        ctn4.classList.add("flex-fill")

        var ctn5  = document.createElement("div");      

        ctn5.classList.add("card-body");
       
        var title = document.createElement("h6");

        title.classList.add("card-title");

        var imageForecast = document.createElement("img");

        title.textContent = weatherCondition[i].dateT;

        imageForecast.setAttribute("src", weatherCondition[i].icon);

        var pEl1 = document.createElement("p");

        var pEl2 = document.createElement("p");

        pEl1.classList.add("small");

        pEl1.textContent =   "Temperature: " + weatherCondition[i].temp + " °F";

        pEl2.classList.add("small");

        pEl2.textContent =  "Humidity: " + weatherCondition[i].humidity + "%";

        ctn5.appendChild(title);

        ctn5.appendChild(imageForecast);

        ctn5.appendChild(pEl1);
        ctn5.appendChild(pEl2)
        ctn4.appendChild(ctn5);        
        ctn8.appendChild(ctn4);
    }
    containerForecast.appendChild(ctn8);
    
};

// need to store city in local storage

var storeCity = function(city){

    var flag = false
    if(storeData){
        for(var i = 0; i < storeData.length; i++){
            if(storeData[i] === city){
                flag = true;
            }
        }
        if(flag){
            displayAlertMessage("The City: "+city+" already exists")
            //return
        }
    }
    if(!flag){
        storeData.push(city);
        localStorage.setItem("cities",JSON.stringify(storeData));
    }
    
    loadCity();
}
var searchForDate9AM = function (str) {
    var hour = str.split(" ")[1].split(":")[0];
    var flag = false;
    
    if(hour === "09"){
        flag = true;
    }        
    
    return flag;
};
var formatDate = function(date){
    return date; 
}
// saved to local storage
var saveCity = function(city){
    //  
}

// creating array to store weather info 
var createDataObject = function(list, position){

    
    if(weatherCondition.length)
        weatherCondition = [];


        var obj = {
            dateT : formatDate(list[0].dt_txt),
            humidity : list[0].main.humidity,
            speed: list[0].wind.speed,
            temp: list[0].main.temp,
            icon : urlIcon + list[0].weather[0].icon + ".png",
            lat : position.lat,
            lon: position.lon
        };

        weatherCondition.push(obj);

    for(var i=1; i<list.length; i++){

        if(searchForDate9AM(list[i].dt_txt)){
            obj = {
                dateT : formatDate(list[i].dt_txt),
                humidity : list[i].main.humidity,
                speed: list[i].wind.speed,
                temp: list[i].main.temp,
                icon : urlIcon + list[i].weather[0].icon + ".png",
                lat : position.lat,
                lon: position.lon
            };
            weatherCondition.push(obj);
        }
    }

};

var displayAlertMessage = function(msg) {
    alert(msg);
};

// need to grab info about weather from API

var callApiFetch = function(city){

    var url;
    if (location.protocol === 'https:') {
        url = 'https://api.openweathermap.org/data/2.5/forecast?appid=f03da6658f72e2e0e0e2d12e07dcc689&units=imperial&q='+city;
     } else {
        url = 'https://api.openweathermap.org/data/2.5/forecast?appid=f03da6658f72e2e0e0e2d12e07dcc689&units=imperial&q='+city;
     }

    fetch(url)

    .then(function(weatherResponse) {
        return weatherResponse.json();
     })
    .then(function(weatherResponse) {

        if (weatherResponse.cod != "200") {
            
            displayAlertMessage("Unable to find "+ city +" in OpenWeathermap.org");

            return;
        } else {
            createDataObject(weatherResponse.list, weatherResponse.city.coord);
            }

            var url1;
        if (location.protocol === 'https:') {
            url1 = 'https://api.openweathermap.org/data/2.5/uvi?appid=f03da6658f72e2e0e0e2d12e07dcc689&lat='+weatherCondition[0].lat+'&lon='+weatherCondition[0].lon;
        } else {
            url1 = 'https://api.openweathermap.org/data/2.5/uni?appid=f03da6658f72e2e0e0e2d12e07dcc689&lat='+weatherCondition[0].lat+'&lon='+weatherCondition[0].lon;
        }

        fetch(url1)

        .then(function(uvResponse) {
          return uvResponse.json();
        })
        .then(function(uvResponse) {

          if (!uvResponse) {   
            displayAlertMessage('OpenWeathermap.org could not find anything for latitude and Longitude');

            return;
          } else {

            storeCity(city);

            // send to hTML
            weatherHTML(city, uvResponse.value);
          }
        })
    })

    .catch(function(error) {

        console.log(error);

        displayAlertMessage("Unable to connect to OpenWeathermap.org");
        return;
      });
};

var search = function(event){
    event.preventDefault();

    //grabbing input value
    var inputElement = document.querySelector("#searchCity");
    var textInput = inputElement.value.trim();

    if(inputElement.value === ""){
        alert("Weather Dashbord\n   You must enter a City");
        return;
    }
    
    else{
   
        callApiFetch(textInput);

    }

};

start();

btn.addEventListener("click", search);