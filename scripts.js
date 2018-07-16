$(document).ready(function() {
const games = ["Final Fantasy VII", "The Witcher", "League of Legends", "Banjo-Kazooie"];

function displayGameInfo() {
let game = $(this).attr("data-name");
let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=kWSeR23xjNTajEuvZtpJ7hnSTQeQTyk6&limit=10";

$.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {

    for (var i = 0; i < response.data.length; i++){
        const animated = response.data[i].images.fixed_height.url;
        const still = response.data[i].images.fixed_height_still.url;

        const gameDiv = $("<div id='gameLanding'" + i + ">")
        const rating = response.data[i].rating;
        const p = $("<p>").text("Rating: " + rating);

        gameDiv.append(p);
        const image = $("<img>").attr("src", still);
        
        image.attr("data-still", still);
        image.attr("data-animate", animated);
        image.addClass('game-image')
        image.attr("data-state", "still");
        gameDiv.append(image);

        if (i%2===0){
          $("#imageLanding1").prepend(gameDiv);
        } else {
          $("#imageLanding2").prepend(gameDiv);
        }

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
      a.addClass("game-btn btn btn-secondary");
      a.attr("data-name", games[i]);
      a.text(games[i]);
      $(".buttonLanding").append(a);
    }
  }
  renderButtons();
  
$("#addGame").on("click", function(event) {
    event.preventDefault();
    var game = $("#gameInput").val().trim();
    if(!game) {
      alert('specify a game')
    } else {
      games.push(game);
      renderButtons();
    }
  });

  $(document).on("click", ".game-btn", displayGameInfo);
})