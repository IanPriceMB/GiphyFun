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
        var gameDiv = $("<div id='gameLanding'" + i + ">")
        var rating = response.data[i].rating;
        var pOne = $("<p>").text("Rating: " + rating);
        gameDiv.append(pOne);
        var imgURL = response.data[i].images.original.url;
        var image = $("<img>").attr("src", imgURL);
        gameDiv.append(image);
        $(".imageLanding").prepend(gameDiv);
    }
    });
    }

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