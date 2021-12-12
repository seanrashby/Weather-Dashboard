// setting up global variables
var btn = document.querySelector("#btn");

var containerHistoricCities = document.querySelector("#searched-Cities");

var containerCurrent = document.querySelector("#targetedCity");

var containerForecast = document.querySelector("#forecastCity");

var apiKey = "f03da6658f72e2e0e0e2d12e07dcc689";

// local stores

var storeData = JSON.parse(localStorage.getItem('cities')) || [];

var urlIcon; 
    if (location.protocol === 'http:') {
    urlIcon = 'http://openweathermap.org/img/wn/';
    } else {
    urlIcon = 'https://openweathermap.org/img/wn/';
 }
    
// doing weather conditions for cities 
var weatherConditions = [];

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

var cleaningElement = function(element){
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

var weatherHTML = function (city, uv) {

    cleaningElement(containerCurrent);

    cleaningElement(containerForecast); 

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

    ctn3.innerHTML =    "<p>Temperature: " + weatherCondition[0].temp + " °F / " + converTemp(weatherCondition[0].temp) + " °C</p>" + 
                        "<p>Humidity: " + weatherCondition[0].humidity + "% </p>" +
                        "<p>Wind Speed: " + weatherCondition[0].speed + " MPH / " + convertWSpeed(weatherCondition[0].speed) + " KPH </p>" +
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


