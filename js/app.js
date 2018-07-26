/*
 * Create a list that holds all of your cards
 */
//The cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card]

//card deck of all game cards
const deck = document.getElementById("card-deck");

//declare move variable
let moves = 0;
let counter = document.querySelector(".moves");

//star icons variables
const stars = document.querySelectorAll(".fa-star");

//matched cards variable declaration
let matchedCard = document.getElementsByClassName("match");

//star list variable
let starsList = document.querySelectorAll(".stars li");

//close icon of the popUp congratulation
let closeicon = document.querySelector(".close");

//declare the popUp as modal Variable
let modal = document.getElementById("popup1");

//open cards array declaration
var openedCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

//When page is refreshed or load, card shuffles.
document.body.onload = startGame();

//starts a new play
function startGame(){
    //shuffle deck
    cards = shuffle(cards);
    //loop to remove existing card classes
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }

    //reset the moves
    moves = 0;
    counter.innerHTML = moves;
    //reset the rating
    for (var i = 0; i < stars.length; i++){
        stars[i].style.color = "#ffd400";
        stars[i].style.visibility = "visible";
    }
    //rset the timer
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 // when clicked, toggles open and show class/display cards
 var displayCard = function (){
     this.classList.toggle("open");
     this.classList.toggle("show");
     this.classList.toggle('disabled');
 };

 //check if cards matched
 function cardOpen () {
     openedCards.push(this);
     var len = openedCards.length;
     if(len === 2){
         moveCounter();
         if(openedCards[0].type === openedCards[1].type){
             matched();
         } else {
             unmatched();
         }
    }
};

//Action when cards match
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}

// Action when cards didn't match
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1100);
}

// Temporal disabling of cards
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add("disabled");
    });
}

// Enabling and disabling of matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove("disabled");
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

//Player's moves and Timing
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    if(moves == 1){
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    //Rating against number of moves
    if(moves > 8 && moves < 12){
        for(i = 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for(i = 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

// Timing of the Game
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

/*
* Congratulation PopUp
* Show modal
* Show total moves
* Show time and
* Show Ratings
* When all cards match.
*/
function congratulations(){
    if(matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        //Display congratulations popup
        modal.classList.add("show");

        //Star Rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //Display move, time and rating on popup
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        closeModal();
    };
}

//close icon on popup
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}

//play again button
function playAgain(){
    modal.classList.remove("show");
    startGame();
}

//using for loop to add eventListener to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", congratulations);
};