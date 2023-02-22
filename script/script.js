let coordinates = {
    lat: 0.0,
    lon: 0.0,
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        coordinates.lat = position.coords.latitude;
        coordinates.lon = position.coords.longitude;
        showPosition()
    });
  } else {
    $("#coordinatesText").text("Geolocation not supported");
  }
}

function showPosition(position) {
    let coordinatesString = "lat: " + coordinates.lat +  " - lon: " + coordinates.lon;
    $("#coordinatesText").text(coordinatesString);
    console.log(coordinatesString);
}

function getWeatherData() {
    $.ajax({
        url: "https://api.open-meteo.com/v1/forecast",
        data: {
            latitude: coordinates.lat,
            longitude: coordinates.lon,
            hourly: ["temperature_2m", "relativehumidity_2m", "windspeed_10m", "winddirection_10m"]
        },
        success: function(data) {
          console.log(data);
        },
        error: function() {
          console.log("open-meteo request error");
        }
    });
}

$(document).ready(function () {

    $(document.getElementById("refreshButton")).click(function(event){
        event.preventDefault();
        console.log("refresh");
        getLocation();
        getWeatherData();
    });

    getLocation();
    getWeatherData();
});