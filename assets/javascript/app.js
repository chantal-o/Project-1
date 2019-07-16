// ===== Scroll to Top ====
$(window).scroll(function() {
  if ($(this).scrollTop() >= 50) {
    // If page is scrolled more than 50px
    $("#return-to-top").fadeIn(200); // Fade in the arrow
  } else {
    $("#return-to-top").fadeOut(200); // Else fade out the arrow
  }
});
$("#return-to-top").click(function() {
  // When arrow is clicked
  $("body,html").animate(
    {
      scrollTop: 0 // Scroll to top of body
    },
    500
  );
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
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
// var emission="";

var directionsService;
var directionsDisplay;

function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: { lat: 43.6629, lng: -79.3957 }
  });
  directionsDisplay.setMap(map);
  
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route(
    {
      origin: document.getElementById("userstart").value,
      destination: document.getElementById("userend").value,
      travelMode: "DRIVING"
    },
    function(response, status) {
      console.log(response);
      if (status === "OK") {
        directionsDisplay.setDirections(response);
        var distance = response.routes[0].legs[0].distance.value;
        console.log(distance);
        $("#tripdistance").val(distance / 1000);
      } else {
        window.alert("Directions request failed due to " + status);
      }
      //Define Variables for AJAX call to Brigher Planet API
      var APIKey = "fbe9ed99-8402-469d-a1b7-b05ed17723ca";
   var APIDistance = distance;
   var APIYear = $("#vehicle-year");
   var APIMake = $("#vehicle-make");
   var APIModel = $("#vehicle-model");

      // URL to to query the Brighter Planet database
      var queryURL = "https://impact.brighterplanet.com/automobile_trips.json";

      // Here we run our AJAX call to the Brighter Planet API
      $.ajax({
        url: queryURL,
        method: "GET",
        data: {
          distance: APIDistance / 1000,
          year: APIYear.val(),
          make: APIMake.val(),
          model: APIModel.val(),
          key: APIKey
        }
      })

        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
          console.log(response);

          // Transfer content to HTML - table within "emission" div
          // Create table row for results
          var tRow = $("<tr>");

          // Define entires for new row
          var searchQueryTd = $("<td>").text(APIYear.val() + " " + APIMake.val() + " " + APIModel.val());
          var distanceTd = $("<td>").text(APIDistance/1000);
          var CO2EmittedTd = $("<td>").html("<b>" + parseFloat(response.decisions.co2_emission.description).toFixed(3) + "</b>");


          // Build list of fun offset ideas
          var offsetIdeasTd = $("<td>").html("Be vegan for " + "<b>" + parseFloat(response.equivalents.days_of_veganism).toFixed(3) + "</b>" + " days!" + "<br>" + "Recycle " + "<b>" + (response.equivalents.recycled_kgs_of_trash).toFixed(3) + "</b>" + " kgs of trash!" + "<br>" + "Convert " + "<b>" + parseFloat(response.equivalents.lightbulbs_to_CFLs_for_a_week).toFixed(3) + "</b>" + " lightbulbs into CFLs for a week!");

          // Append entries to new row
          tRow.append(searchQueryTd, distanceTd, CO2EmittedTd, offsetIdeasTd);

          // Append new row to table body
          $("tbody").append(tRow);

          type = $("#vehicle-type").val().trim();
          year = $("#vehicle-year").val().trim();
          make = $("#vehicle-make").val().trim();
          model = $("#vehicle-model").val().trim();
          start = $("#userstart").val().trim();
      
          database.ref().push({
            type: type,
            year: year,
            make: make,
            model: model,
            distance: distance,
            start: start,
            emission: CO2Emitted,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
          });
        });
    }
  );
}

$(document).ready(function() {
  // Capture Button Click
  $("#submit").on("click", function(event) {
    // Don't refresh the page!
    event.preventDefault();

    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });

  database
    .ref()
    .orderByChild("dateAdded")
    .limitToLast(1)
    .on("child_added", function(snapshot) {
      // Change the HTML to reflect
      $("#vehicle-type").val(snapshot.val().type);
      $("#vehicle-year").val(snapshot.val().year);
      $("#vehicle-make").val(snapshot.val().make);
      $("#vehicle-model").val(snapshot.val().model);
      $("#distance-units").val(snapshot.val().distance);
      $("#userstart").val(snapshot.val().start);
    });
});
