
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
  document.getElementById('start').addEventListener('change', onChangeHandler);
  document.getElementById('end').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: document.getElementById('start').value,
    destination: document.getElementById('end').value,
    travelMode: 'DRIVING'
  }, function(response, status) {
      console.log(response);
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

=======
>>>>>>> fe042cabe1a0693e37a2e31e0ad4d3acb5de60f9
var btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});


  // Initialize Firebase
 // This is the code we copied and pasted from our app page
    var config = {
  apiKey: "AIzaSyABaRJDJIVvfxyklIZQ0loaONbTRWe300k",
  authDomain: "uoft-mfr-class.firebaseapp.com",
  databaseURL: "https://uoft-mfr-class.firebaseio.com",
  projectId: "uoft-mfr-class",
  storageBucket: "uoft-mfr-class.appspot.com",
  messagingSenderId: "72424420546",
  appId: "1:72424420546:web:818efc42ad4285ef"
};

    firebase.initializeApp(config);

    // Variables
    // ================================================================================

    // Get a reference to the database service
    var database = firebase.database();

    // Initial Values
    var type = "";
    var year = "";
    var make = "";
    var model = "";
    var distance = "";

    // Capture Button Click
    $("#add-user").on("click", function(event) {
      // Don't refresh the page!
      event.preventDefault();

    
      type = $("#vehicle-type").val().trim();
      year = $("#vehicle-year").val().trim();
      make = $("#vehicle-make").val().trim();
      model = $("#vehicle-model").val().trim();
      distance = $("#distance-units").val().trim();

      database.ref().set({
        type: type,
        year: year,
        make: make,
        model: model,
        distance: distance,
      });

    });