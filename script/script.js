let coordinates = {
    lat: 0.0,
    lon: 0.0,
    dir: 0.0
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        coordinates.lat = position.coords.latitude;
        coordinates.lon = position.coords.longitude;
        coordinates.dir = position.coords.heading;
        showPosition()
    });
  } else {
    $("#coordinates-text").text("Geolocation not supported");
  }
}

function showPosition(position) {
    let coordinatesString = "lat: " + coordinates.lat +  " - lon: " + coordinates.lon  +  " - dir: " + coordinates.dir ;
    $("#compass-direction-img").css({'transform': 'rotate(' + coordinates.dir + 'deg)'});
    $("#coordinates-text").text(coordinatesString);
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
          $("#wind-direction-img").css({'transform': 'rotate(' + data.hourly.winddirection_10m.pop() + 'deg)'});
          $("#wind-speed-text").text(data.hourly.windspeed_10m.pop() + 'km/h');
        },
        error: function() {
          console.log("open-meteo request error");
        }
    });
}

$(document).ready(function () {

    $(document.getElementById("refresh-button")).click(function(event){
        event.preventDefault();
        console.log("refresh");
        getLocation();
        getWeatherData();
    });

    getLocation();
    getWeatherData();
});