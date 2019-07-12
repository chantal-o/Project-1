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

// ======= Building Brighter Planet Ajax Call
var APIKey = "fbe9ed99-8402-469d-a1b7-b05ed17723ca";

    // Here we are building the URL we need to query the database
    var queryURL = "http://impact.brighterplanet.com/automobile_trips.json";

    // Here we run our AJAX call to the Brighter Planet API - NEED TO USE DATA FROM GOOGLE API FOR DISTANCE, prob turn it into a variable to grab here
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


// =======


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

      // YOUR TASK!!!
      // Code in the logic for storing and retrieving the most recent user.
      // Don't forget to provide initial data to your Firebase database.
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
