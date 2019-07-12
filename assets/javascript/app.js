// ===== Scroll to Top ==== 
$(window).scroll(function() {
  if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
      $('#return-to-top').fadeIn(200);    // Fade in the arrow
  } else {
      $('#return-to-top').fadeOut(200);   // Else fade out the arrow
  }
});
$('#return-to-top').click(function() {      // When arrow is clicked
  $('body,html').animate({
      scrollTop : 0                       // Scroll to top of body
  }, 500);
});



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

$ (document).ready(function(){


  var APIKey = "fbe9ed99-8402-469d-a1b7-b05ed17723ca";

   // Here we are building the URL we need to query the database
   var queryURL = "http://impact.brighterplanet.com/automobile_trips.json";

   // Here we run our AJAX call to the Brighter Planet API - NEED TO USE DATA FROM GOOGLE API FOR DISTANCE
   $.ajax({
     url: queryURL,
     method: "GET",
     data: {
       distance: "30",
       year: "2008",
       make: "Mazda",
       model: "3",
       key: APIKey
     }
   })
     // We store all of the retrieved data inside of an object called "response"
     .then(function(response) {

       // Log the resulting object
       console.log(response);

       // Transfer content to HTML - TURN DESIRED RESULTS INTO A VARIABLE, APPEND TO TARGET DIV; are we using multiple divs? Or a table within one div?

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
    var start = "";

    // Capture Button Click
    $("#submit").on("click", function(event) {
      // Don't refresh the page!
      event.preventDefault();


      alert ("hello")
      

      type = $("#vehicle-type").val().trim();
      year = $("#vehicle-year").val().trim();
      make = $("#vehicle-make").val().trim();
      model = $("#vehicle-model").val().trim();
      distance = $("#distance-units").val().trim();
      start = $("#userstart").val().trim();

      console.log (distance);

      database.ref().push({
        type: type,
        year: year,
        make: make,
        model: model,
        distance: distance,
        start: start,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    });

});


