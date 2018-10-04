//Creating array of icons and declaring variables
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
const cardsContainer = document.querySelector(".deck");
const winner = document.querySelector(".popup");
let openedCards = [];
let matchedCards = [];

//Initializing the game
gameLayout();

//Creating layout for the game
function gameLayout() {
	shuffle(icons);
	for (let i = 0; i < icons.length; i++) {
		const card = document.createElement("li");
		card.classList.add("card");
		card.innerHTML = `<i class="${icons[i]}"></i>`;
		cardsContainer.appendChild(card);
		click(card);
		removePopup();
	}
}

//Click Event on cards
function click(card) {
	
	//Getting the click event
	card.addEventListener("click", function() {
		const card1 = openedCards[0];
		const card2 = this;
		startTimer();
		if (openedCards.length === 1) {
			card2.classList.add("open", "show");
			openedCards.push(this);
			
			//Comparison of two cards
			if (card1.innerHTML === card2.innerHTML) {
				card1.classList.add("match", "disable");
				card2.classList.add("match", "disable");
				openedCards = [];
				matchedCards.push(card1);
				matchedCards.push(card2);
				gameOver();
				addMoves();
			} else {
				setTimeout(function() {
					card1.classList.remove("open", "show");
					card2.classList.remove("open", "show");
					openedCards = [];
					addMoves();
				}, 600);
			}
		} else {
			card2.classList.add("open", "show");
			openedCards.push(this);
		}
	});
}

//Game over function
function gameOver() {
	if (icons.length === matchedCards.length) {
		addPopup();
		stopTimer();
	}
}

//Reset game and Play again button
function restart() {
	cardsContainer.innerHTML = "";
	gameLayout();
	matchedCards = [];
	moves = 0;
	movesContainer.innerHTML = moves;
	starsContainer.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
	stopTimer();
	resetTimer();
}
const reset = document.querySelector(".restart");
reset.addEventListener("click", function() {
	restart();
});
const button = document.querySelector("#playAgain");
button.addEventListener("click", function() {
	restart();
	winner.style.display = "none";
});

//Counting the moves
const movesContainer = document.querySelector(".moves");
let moves = 0;

function addMoves() {
	moves++;
	movesContainer.innerHTML = moves;
	rating();
}

//Player ratings
const starsContainer = document.querySelector(".stars");

function rating() {
	if (moves > 15 && moves < 25) {
		starsContainer.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
	} else if (moves >= 25) {
		starsContainer.innerHTML = '<li><i class="fa fa-star"></i></li>';
	}
}

//Popup message
const starScore = document.querySelector("#starScore");
const playTime = document.querySelector("#playTime");
const number_moves = document.querySelector("#moves");

function removePopup() {
	winner.style.display = "none";
}

function addPopup() {
	winner.style.display = "block";
	if (moves > 15 && moves < 25) {
		starScore.innerHTML = 2;
	} else if (moves >= 25) {
		starScore.innerHTML = 1;
	}
	playTime.innerHTML = time;
	number_moves.innerHTML = moves + 1;
}

//Timer control
const timeDisplay = document.querySelector(".timer");
let time = 0;
let gameTimer;
let timerRunning = false;

function startTimer() {
	if (!timerRunning) {
		timerRunning = true;
		gameTimer = setInterval(function() {
			time++;
			timeDisplay.innerText = time;
		}, 1000);
	}
}

function stopTimer() {
	if (timerRunning) {
		timerRunning = false;
		clearInterval(gameTimer);
		timeDisplay.innerText = time;
	}
}

function resetTimer() {
	time = 0;
	timeDisplay.innerText = time;
}

// Shuffle function
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}
