$(document).ready(function() {
var games = ["Final Fantasy VII", "The Witcher", "League of Legends", "Banjo-Kazooie"];

function displayGameInfo() {
var game = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=kWSeR23xjNTajEuvZtpJ7hnSTQeQTyk6&limit=10";
$.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
    console.log(response) 

    for (var i = 0; i < response.data.length; i++){
        var animated = response.data[i].images.fixed_height.url;
        var still = response.data[i].images.fixed_height_still.url;

        var gameDiv = $("<div id='gameLanding'" + i + ">")
        var rating = response.data[i].rating;
        var pOne = $("<p>").text("Rating: " + rating);
        gameDiv.append(pOne);
        var imgURL = response.data[i].images.original.url;
        var image = $("<img>").attr("src", still);
        image.attr("data-still", still);
        image.attr("data-animate", animated);
        image.addClass('game-image')
        image.attr("data-state", "still");
        gameDiv.append(image);
        $(".imageLanding").prepend(gameDiv);
    }
    });
    }
$(document).on("click", ".game-image", function() {

  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }
  else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
  

function renderButtons() {
    $(".buttonLanding").empty();
    for (var i = 0; i < games.length; i++) {
      var a = $("<button>");
      a.addClass("game-btn");
      a.attr("data-name", games[i]);
      a.text(games[i]);
      $(".buttonLanding").append(a);
    }
  }
$("#addGame").on("click", function(event) {
    event.preventDefault();
    var game = $("#gameInput").val().trim();
    games.push(game);
    renderButtons();
  });
$(document).on("click", ".game-btn", displayGameInfo);
renderButtons();
})