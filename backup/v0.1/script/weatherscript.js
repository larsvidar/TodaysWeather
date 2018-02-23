	console.log("Script loaded!");	
	
	var weatherName = "";
	var photoId = "";
	var unit = "C";
	var temp;
	var flickrApiKey = "886f7c9d1bb1f055a15aef593b21e3de";
	var weatherApiKey = "0f382549769008ecd3955c099269ed68";
	var weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";	
	var photoURL = "https://wallpaperscraft.com/image/lightning_field_road_blackness_bad_weather_sky_peal_elements_60125_1920x1080.jpg";
	var flickrApiSearch = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1";
	var flickrApiGetSize ="https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&nojsoncallback=1";
	var weatherOptions = {
		appid: weatherApiKey,
		units: "metric",
		q: "Oslo"
	}
	var flickrSearchOptions = {
      api_key: flickrApiKey,
	  photo_id: photoId,
	  tags: "sky,landscape,outdoor,-portrait,-indoor",
	  tag_mode: "all",
	  media: "photos",
	  safe_search: 1,
    };
	var flickrSizeOptions = {
		api_key: flickrApiKey,
		photo_id: photoId,
	}
	
	
	//Function for Openweathermap.org API-call
	function getWeather(response) {
			weatherName = response.weather[0].main;
			$("#place").text(response.name);
			temp = Math.round(response.main.temp);
			flickrSearchOptions.tags = weatherName + ",landscape,outdoor,-portrait,-indoor";
			showWeather();
	} //End of getWeather function
	
	//Function for displaying weather data
	function showWeather() {
		$("#weather-result").html("<p><span id='weather'>" + weatherName + "</span></p><p><span id='temp'>" + setTemp(temp) + String.fromCharCode(176) + unit + "</span></p>");
	} //End of showWeather function
	
	function setTemp(temperature) {
		if (unit === "F") {
			return Math.round((temp * 1.8) + 32);
		} else {
			return temp;
		}
	}
	
	
	//Function for getting a list of images from Flickr
	function searchImages() {
		$.getJSON(flickrApiSearch, flickrSearchOptions, getPhotos);
	}
	
	//Function for finding a random related image on Flickr
	function getPhotos(response) {
		var photoNumber = Math.floor(Math.random() * response.photos.photo.length);
		photoId = response.photos.photo[photoNumber].id;
		flickrSizeOptions.photo_id = photoId;
		$.getJSON(flickrApiGetSize, flickrSizeOptions, displayPhoto);
	} // end of getPhotos function
	
	//Function for finding a good resoulution of the selected Flickr photo
	function displayPhoto(response) {
		photoURL = response.sizes.size[response.sizes.size.length - 2].source;
		setBackground();
	}//end of displayPhoto function
	
	//Function for setting background image
	function setBackground() {
		$("body").css("background-image", "url(" + photoURL + ")");
	}
	
	
	//Function for getting the users position
	function getPosition() {
	navigator.geolocation.getCurrentPosition(function(position) {
		weatherOptions.lon = position.coords.longitude;
		weatherOptions.lat = position.coords.latitude;
		delete weatherOptions.q;
		go();
	});
	}//end getPosition function
	
	//Function for setting city from search
	function setCity(city) {
		delete weatherOptions.lon;
		delete weatherOptions.lat;
		weatherOptions.q = city;
	}//end of setCity function
	
	
	//Function for starting chain of events
	function go() {
		$.getJSON(weatherApiUrl, weatherOptions, getWeather);
	}//end of go function
	
	
	//Event for search field and button
	$("#search").change(function () {
		setCity($("#search").val());
		go();
		searchImages();
	}); //End of #search event
	
	//Event for changing units
	$("#tempunit").change(function() {
		if ($("#tempunit").prop("checked") === true) {
			unit = "F";
		} else {
			unit = "C";
		}
		setTemp(temp);
		showWeather();
	}); //End of #tempunit event
	
	//Event for setting home location
	$("#home").click(function() {
		getPosition();
		searchImages();
	});
	
	getPosition();
	showWeather();
	searchImages();
	





















//OpenWeatherMap API-key: 0f382549769008ecd3955c099269ed68


/*	var weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=oslo&appid=0f382549769008ecd3955c099269ed68';
	var data = {
		q : "Portland,OR",
		units : "metric"
	};
  
	function showWeather(weatherReport) {
    $('#temperature').text(weatherReport.main.temp);
	}
	$.getJSON(weatherAPI, data, showWeather);
*/