function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    $("#coordinatesText").text("Geolocation not supported");
  }
}

function showPosition(position) {
    let coordinatesString = "lat: " + position.coords.latitude +  " - lon: " + position.coords.longitude;
    $("#coordinatesText").text(coordinatesString);
    console.log(coordinatesString);
}

$(document).ready(function () {
    getLocation();
});