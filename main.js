$(document).ready(function () {
    var topics = ["bird", "cat", "dog"];
    // Dynamically build buttons based on topics array

    function renderButtons() {
        $("#button-container").empty();
        for (var i = 0; i < topics.length; i++) {
            var button = $("<button>");
            $(button).attr("class", "topic")
            $(button).text(topics[i]);
            $("#button-container").append(button);
        }
    }

    function getGif() {
        var searchTerm = $(this).text();
        console.log("search term: " + searchTerm);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=CymhH6SlUPj3Xk8g8Y115zIFK0lyCDhV&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            // console.log(response.data.length);
            var newCollection, newRow, newCol, image, imageSource, animate, rating, ratingP;
            
            for (var i = 0; i < response.data.length; i++) {
                // Create new collection for each new request
                if (i === 0) {
                    newCollection = $("<div class='container'>");
                }

                // Define bootstrap grid
                if (i % 4 === 0) {
                    newRow = $("<div class='row'>")
                    $(newCollection).append(newRow);
                }

                newCol = $("<div>");
                $(newCol).attr("class", "col-md-3");

                image = $("<img>");
                imageSource = response.data[i].images.fixed_height_still.url;
                animate = response.data[i].images.fixed_height.url;

                $(image).attr("src", imageSource);
                $(image).attr("data-still", imageSource);
                $(image).attr("data-animate", animate);
                $(image).attr("data-state", "still");
                $(image).addClass("gif img-responsive center-block");

                rating = response.data[i].rating;
                ratingP = $("<p>");
                $(ratingP).text("Rated " + rating.toUpperCase());

                $(newCol).append(image);
                $(newCol).append(ratingP);
                $(newRow).append(newCol);
            }
            $("#gif-container").prepend(newCollection);
        });
    }

    function playGif() {
        console.log("click");
        if ($(this).attr("data-state") === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

    $(document.body).on("click", ".topic", getGif);
    $(document.body).on("click", ".gif", playGif);

    $("#submit-topic").on("click", function (event) {
        event.preventDefault();
        var userInput = $("#user-input").val();
        topics.push(userInput);
        renderButtons();
    });

    renderButtons();

})
