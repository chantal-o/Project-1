<<<<<<< HEAD
=======
<<<<<<< HEAD
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

=======
>>>>>>> d56fbd6757d427ed423f0d249de16023401cc6e8


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

<<<<<<< HEAD
    });
=======
    });
>>>>>>> 958e14910647f8cad70fe7a69753d789c7d5f525
>>>>>>> d56fbd6757d427ed423f0d249de16023401cc6e8
