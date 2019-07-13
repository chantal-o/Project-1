
function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: {lat: 43.6629, lng: -79.3957}
  });
  directionsDisplay.setMap(map);
  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  //document.getElementById('userstart').addEventListener('change', onChangeHandler);
  document.getElementById('submit').addEventListener('click', onChangeHandler);
}


 function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: document.getElementById('userstart').value,
    destination: document.getElementById('userend').value,
    travelMode: 'DRIVING'
  }, function(response, status) {
      console.log(response);
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      var distance = response.routes[0].legs[0].distance.value; 
      console.log(distance);
      $("#tripdistance").val(distance/1000);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

$("#submit").on("click", function(){
event.preventDefault();

});
