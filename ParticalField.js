// Partical field

; 'use strict' ;

var field = new ParticalField();
// field.animate();

// ------------------------

function print(string){
	var item = document.getElementById("console");
	string = "\n" + string; 
	item.innerHTML = item.innerHTML+=(string);
}

function ParticalField(canvasID, options) {

	// set window
	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	// properties

	this.movementSpeed;
	this.particals = [];
	this.particalColor = "rgb(14,50,127)";
	this.numberOfParticals;
	this.canvas;
	this.context;
	this.lastTime = 0;

	if (canvasID) {
		initWithCanvas(canvasID);
	};

	this.initWithCanvas = function (canvasID) {
		this.canvas = document.getElementById(canvasID);
		this.context = this.canvas.getContext('2d');
	};

	this.animate = function() {
		animationID = window.requestAnimationFrame(this.prepForRedraw);
	};

	this.size = function(height, width) {
		this.canvas.height = height;
		this.canvas.width = width;
	}

	this.Partical = function() {
		var x = randomPointBetweenBounds(0, this.canvas.width);
		var y = randomPointBetweenBounds(0, this.canvas.height);
		return new Location2D(x,y);
	}

	this.populateParticals = function(timestamp) {
		this.particals.length = this.numberOfParticals;
		for (var i = 0; 0 < this.numberOfParticals; i++) {
			this.particals[i] = new this.Partical();
		}
	}

	this.prepForRedraw = function (timestamp) {
		this.draw(timestamp);
		this.animate();
	}

	this.draw = function() {

		this.context.clearRect(0,0,this.canvas.width, this.canvas.height);

		var modifier = (((timestamp - this.lastTime)*0.004) / 100);

		for (var partical in particals) {
			this.context.fillStyle = this.particalColor;
			star.x = star.x * modifier;
			star.y = star.y * modifier;

			this.context.fillRect(star.x, star.y, 3,3);
		}

		this.lastTime = time;
	}

};


function Location2D(x,y) {
	this.x = x;
	this.y = y;
}

function randomPointBetweenBounds(lowerBound, upperBound) {
	return lowerBound + (Math.random() * (upperBound - lowerBound));
}