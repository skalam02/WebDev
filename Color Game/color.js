
var numSquares = 6
var colors = generateRandomColors(numSquares)
var boxes = document.getElementsByClassName("square")
var pickedColor = pickColor();
var colorDisplayed = document.getElementById("colorID")
var message = document.getElementById("message")
var h1Disp = document.querySelector("h1")
var newColorButton = document.getElementById("newColor")
var easyButton = document.getElementById("easy")
var hardButton = document.getElementById("hard")

fillBoxes();

addClickListeners();

colorDisplayed.textContent = pickedColor;

easyButton.addEventListener("click",  function() {
	this.classList.add("selected")
	hardButton.classList.remove("selected")
	numSquares = 3
	colors = generateRandomColors(numSquares)
	pickedColor = pickColor();
	colorDisplayed.textContent = pickedColor;
	for(var i =0;i<boxes.length;i++) {
		if(colors[i]) {
			boxes[i].style.backgroundColor = colors[i]
		} else {
			boxes[i].style.display = "none";
		}

	}
})
hardButton.addEventListener("click",  function() {
	this.classList.add("selected");
	easyButton.classList.remove("selected");
	numSquares = 6
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplayed.textContent = pickedColor;
	for(var i =0;i<boxes.length;i++) {
		boxes[i].style.backgroundColor = colors[i];
		boxes[i].style.display = "block";
	}

})

newColorButton.addEventListener("click", function() {
	message.textContent = ""
	newColorButton.textContent = "New Colors";
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplayed.textContent = pickedColor;
	fillBoxes()
	h1Disp.style.backgroundColor = "steelblue"

})




function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(x) { 
	var colorArray = []
	for (var i=0;i<x;i++) {

		var c1 = Math.floor(Math.random() *  256);
		var c2 = Math.floor(Math.random() *  256);
		var c3 = Math.floor(Math.random() *  256);
		colorArray[i] = "rgb("+c1+", "+c2+", "+c3+")"
	}
	return colorArray
}


function fillBoxes() {

	for (var i = 0;i<colors.length;i++) {
	boxes[i].style.backgroundColor = colors[i]
	}
}


function addClickListeners() {
	for (var i=0; i<colors.length; i++) {
	boxes[i].addEventListener("click", function() {
		if (this.style.backgroundColor === pickedColor) {
			message.textContent = "Correct!";
			newColorButton.textContent = "Play Again?";
			for (var i=0; i<colors.length; i++) {
				boxes[i].style.backgroundColor = pickedColor
				h1Disp.style.backgroundColor = pickedColor
			}			
				
		} else {
				this.style.backgroundColor = "#232323";
				message.textContent = "try again";
		}			
	}
)}
}









