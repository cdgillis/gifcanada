// JavaScript 

var topics = ["moose", "beaver", "mountie", "canoeing", "great lakes", "snowboarding", "maritimes", "prairies", "territories", "rockies", "coast mountains", "sea to sky", "maple syrup"];
// var gifUrls = [];
// var gifUrlsStill = [];

for (topic in topics) {
  var canadaBtn = document.createElement("BUTTON");
  canadaBtn.setAttribute("data-animal", topics[topic]); // Create a <button> element
  var t = document.createTextNode(topics[topic]); // Create a text node
  canadaBtn.appendChild(t); // Append the text to <button>
  $('#canadaButtons').append(canadaBtn);
}

//  $('body').on('click', '.gif', function() {
//     var src = $(this).attr("src");
//   if($(this).hasClass('playing')){
//      //stop
//      $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
//      $(this).removeClass('playing');
//   } else {
//     //play
//     $(this).addClass('playing');
//     $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
//   }
// });
$('#newButton').on('click', function () {
  console.log($("#inputBox").val());
  var buttonText = $("#inputBox").val();
  var $newBtn = $("<button>").text(buttonText);
  $newBtn.attr("data-animal", buttonText);
  $('#canadaButtons').append($newBtn);

});

$('body').on('click', '.gif', function () {
// $('.gif').on('click', function () {
  console.log("Click function running");
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  console.log(state);
  // var playing = $(this).attr("data-playing");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    // console.log("still works");
    //updating the src with a URL
    $(this).attr("data-state", "animate"); // updating the data state
    // var index = $(this).attr("data-gif-id"); // data-gif-id not updating correctly
    // $(this).attr("src", gifUrls[parseInt(index)]); 
    $(this).attr("src", $(this).attr("data-animate")); 
  } else {
    // $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
    // var index = $(this).attr("data-gif-id");
    // $(this).attr("src", gifUrlsStill[parseInt(index)]); 
    $(this).attr("src", $(this).attr("data-still")); 
  }
  
});

$("#canadaButtons").on("click", "button", function () {
  var animal = $(this).attr("data-animal");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "+canadian&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // Step 1: Run this file, click a button, and see what the response object looks like in the browser's console.
    // Open up the data key, then open up the 0th, element. Study the keys and how the JSON is structured.

    console.log(response);

    // Step 2: since the image information is inside of the data key,
    // make a variable named results and set it equal to response.data

    // =============== put step 2 in between these dashes ==================
    var results = response.data;
    // ========================

    for (var i = 0; response.data.length; i++) {

      // Step 3: uncomment the for loop above and the closing curly bracket below.

      // Make a div with jQuery and store it in a variable named animalDiv.

      // Make a paragraph tag with jQuery and store it in a variable named p.

      // Set the inner text of the paragraph to the rating of the image in results[i].
      // Make an image tag with jQuery and store it in a variable named animalImage.
      // Set the image's src to results[i]'s fixed_height.url.
      // Append the p variable to the animalDiv variable.
      // Append the animalImage variable to the animalDiv variable.
      // Prepend the animalDiv variable to the element with an id of gifs-appear-here.

      // ============= put step 3 in between these dashes ======================
      var panel = $("<div class='panel'>");
      var animalDiv = $("<div>");
      var rating = results[i].rating;
      var upperCaseRating = rating.toUpperCase();

      var p = $("<p>").text("Rated: " + upperCaseRating);
      var animalImage = $("<img>")
      // animalImage.attr("src", results[i].images.fixed_height.url);
      animalImage.attr("src", results[i].images.fixed_height_still.url);
      // gifUrls.push(results[i].images.fixed_height.url); // Animated
      // gifUrlsStill.push(results[i].images.fixed_height_still.url);
      //  $("#photo").append('<img class="gif" src="' + response.data[i].images.fixed_height_still.url + '">');
      
      animalImage.attr("data-state", "still");
      // animalImage.attr("data-gif-id", i);
      
      animalImage.attr("data-still", results[i].images.fixed_height_still.url);
      animalImage.attr("data-animate", results[i].images.fixed_height.url);
     
      animalImage.addClass("gif");

      animalDiv.append(p);
      panel.append(animalImage);
      animalDiv.prepend(panel);

      $("#gifs-appear-here").prepend(animalDiv);
      // ==================================
    }

  });
});