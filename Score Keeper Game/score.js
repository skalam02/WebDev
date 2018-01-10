var p1Button = document.getElementById("p1")
var p2Button = document.getElementById("p2")
var resetButton = document.getElementById("reset")
var p1Disp = document.getElementById("p1Display")
var p2Disp = document.getElementById("p2Display")
var p1Score = 0
var p2Score = 0
var limNumber = 5
var gameOver = false

p1Button.addEventListener("click", function() {
	if(!gameOver) {
		p1Score++;
		if (p1Score === limNumber) {
			p1Disp.classList.add("winner");
			gameOver = true;
		}
		p1Disp.textContent = p1Score;
	}
})

p2Button.addEventListener("click", function(){
	if(!gameOver) {
		p2Score++;
		if (p2Score === limNumber) {
			p2Disp.classList.add("winner");
			gameOver = true;
		}
		p2Disp.textContent = p2Score;
	}
})

resetButton.addEventListener("click", function() 
	{
	p1Score=0;
	p2Score=0; 
	p1Disp.textContent = p1Score;
	p2Disp.textContent = p2Score;
	gameOver = false
	p1Disp.classList.remove("winner");
	p2Disp.classList.remove("winner");


})



