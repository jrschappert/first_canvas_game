// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var monster = {};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};
var mouseX = 0;
var mouseY = 0;

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);
addEventListener("mousemove", function (e) {
	mouseX = e.x;
	mouseY = e.y;
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
	// if (38 in keysDown) { // Player holding up
	// 	hero.y -= hero.speed * modifier;
	// }
	// if (40 in keysDown) { // Player holding down
	// 	hero.y += hero.speed * modifier;
	// }
	// if (37 in keysDown) { // Player holding left
	// 	hero.x -= hero.speed * modifier;
	// }
	// if (39 in keysDown) { // Player holding right
	// 	hero.x += hero.speed * modifier;
	// }
	hero.x = mouseX - 16;
	hero.y = mouseY - 16;

	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	// if (heroReady) {
	// 	ctx.drawImage(heroImage, hero.x, hero.y);
	// }

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}
	ctx.lineWidth = 2;
	ctx.beginPath(); // Start a new path
	ctx.moveTo(0, mouseY); // Move the pen to (30, 50)
	ctx.lineTo(mouseX, mouseY); // Draw a line to (150, 100)
	ctx.strokeStyle = '#3B3B3B';
	ctx.stroke(); // Render the path

	ctx.beginPath();
	ctx.moveTo(mouseX, mouseY);
	ctx.lineTo(mouseX, 500);
	ctx.strokeStyle = '#5D62A1';
	ctx.stroke(); // Render the path

	ctx.beginPath();
	ctx.arc(250, 250, mouseX/4, 0, 2 * Math.PI);
	ctx.strokeStyle = '#ffffff';
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(250-mouseX/4, 250);
	ctx.lineTo(250+mouseX/4, 250);
	ctx.strokeStyle = '#3B3B3B';
	ctx.stroke(); // Render the path

	ctx.beginPath();
	ctx.arc(250, 250, mouseY/4, 0, 2 * Math.PI);
	ctx.strokeStyle = '#ffffff';
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(250, 250-mouseY/4);
	ctx.lineTo(250, 250+mouseY/4);
	ctx.strokeStyle = '#5D62A1';
	ctx.stroke(); // Render the path

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught + ", X: " + mouseX + ", Y: " + mouseY, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
