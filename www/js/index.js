var app = {
	// Application Constructor
	initialize    : function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents    : function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady : function() {
		app.receivedEvent('deviceready'); //showPosition();
	},
	// Update DOM on a Received Event
	receivedEvent : function(id) {
		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');

		console.log('Received Event: ' + id);
	}
};
document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
	console.log('log::navigator.geolocation is working');
	getLocation();
}
//

function getLocation() {
	navigator.geolocation.getCurrentPosition(geoCallback, onError);
}
var latitude, longitude; //global variables

function geoCallback(position) {
	console.log(position);
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;

	getWeather();
}

function onError(message) {
	console.log('log::getLocation error message');
}

function getWeather() {
	var url1 = 'https://fcc-weather-api.glitch.me/api/current?lat=';
	var url2 = '&lon=';
	const urlFinal = url1 + latitude + url2 + longitude; //completed weather api request address
	console.log('log:urlFinal = ' + urlFinal);
	console.log(typeof urlFinal); //checking datatype

	var http = new XMLHttpRequest();
	http.open('GET', urlFinal);
	http.send();

	http.onreadystatechange = (e) => {
		//attribute that is a function that will run when http request finished

		var response = http.responseText;
		console.log(typeof response); //checking returned datatype

		var responseObject = JSON.parse(response);

		console.log(typeof responseObject); //making sure response is converted to object

		console.log(responseObject);
		var city = responseObject['name'];
		var country = responseObject['sys']['country']; //access element in object by the name: country

		var weather = responseObject['weather'][0]['description'];

		//console.log(city);
		//console.log(country);
		//console.log(weather);
		document.getElementById('pos').innerHTML = 'Welcome to ' + city + ' in ' + country;

		function displayWeather() {
			console.log(weather);

			document.getElementById('weather display').innerHTML = 'Current Weather in ' + city + ' is ' + weather;
		}
	};
}
