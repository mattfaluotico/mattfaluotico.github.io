var starfield = null;

window.requestAnimationFrame = 	window.requestAnimationFrame || window.mozRequestAnimationFrame ||
								window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

window.onload = function() {
	starfield = new jsStarfield;
	starfield.init("main_canvas");
	
	// var gui = new dat.GUI();
	// gui.add(starfield, 'amount', 0, 200000).onFinishChange(function(value)
	// {
	// 	starfield.set_amount(value);
	// });
	// gui.add(starfield, 'speed', 0, 1500);
	// gui.add(starfield, 'follow_mouse', 0, 2500).onFinishChange(function(value)
	// {
	// 	if (value === false)
	// 		starfield.reset_origin();
	// })
	// gui.add(starfield, 'method', [ 'rects', 'buffer'] );
	
	_loop_();
};

window.addEventListener('resize', function() {
	starfield.resize(window.innerWidth, window.innerHeight);
});

function _loop_() {
	anim_id = window.requestAnimationFrame( _update_ );
}

function _update_(time) {
	starfield.update(time);
	_loop_();
}

function Vector2(x, y) {
	this.x = x;
	this.y = y;
}

function Vector3(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
}

function rand_range(min, max) { return min + Math.random() * (max-min); }

function jsStarfield() {
	this.stars = [];
	
	this.max_depth = 1000;
	this.max_size = 5;
	this.speed = 200;
	this.amount = 1200;
	
	this.follow_mouse = false;
	this.method = "rects";
	
	this.last_frame = 0;
	this.fps_time = 0;
	this.fps_count = 0;
	this.fps = 0;
	
	this.origin = new Vector2(0, 0);
	
	this.init = function(canvas)
	{
		this.canvas = document.getElementById(canvas);
		this.ctx = this.canvas.getContext('2d');
		this.resize(window.innerWidth, window.innerHeight);
				
		this.reset_origin();
		
		this.canvas.addEventListener('mousemove', function(event)
		{
			if (starfield.follow_mouse == true)
				starfield.set_origin(event.x, event.y);
		});
		
		// clear the array
		this.stars.length = 0;
		this.init_stars();
	};
	
	this.set_amount = function(amount)
	{
		this.amount = Math.floor(amount);
		
		if (this.amount < this.stars.length)
		{
			this.stars.length = this.amount;
		}
		else
		{
			var amt = this.amount - this.stars.length;
			
			for (var i=0; i<amt; i++)
				this.stars.push(new Vector3(rand_range(-this.canvas.width,this.canvas.width), 
											rand_range(-this.canvas.height,this.canvas.height), 
											rand_range(1, this.max_depth)) );	
		}
	};
	
	this.init_stars = function()
	{
		// init the stars
		for (var i=0 ; i<this.amount ; i++)
			this.stars.push(new Vector3(rand_range(-this.canvas.width,this.canvas.width), 
										rand_range(-this.canvas.height,this.canvas.height), 
										rand_range(1, this.max_depth)) );	
	};
	
	this.update = function(time)
	{
		var delta_time = (time - this.last_frame)*0.001;
		this.update_stars(delta_time);
		
		if (this.method === "rects")
			this.draw_rects();
		else
			this.draw_buffer();
			
		this.last_frame = time;
	};	
	
	this.update_stars = function(delta_time)
	{
		var distance = this.speed * delta_time;
		
		for (var i=0; i<this.stars.length; i++)
		{
			var star = this.stars[i];
			
			star.z -= distance;
			
			if (star.z <= 0)
			{
				star.x = rand_range(-this.canvas.width,this.canvas.width);
				star.y = rand_range(-this.canvas.height,this.canvas.height);
				star.z = this.max_depth;
			}
		}	
	};
	
	this.resize = function(width, height)
	{
		this.canvas.width = width;
		this.canvas.height = height;
		
		this.canvas.style.width = width + "px";
		this.canvas.style.height = height + "px";
		
		// get the buffer
		this.img_data = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
		
		this.reset_origin();
	};
	
	function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

	this.draw_rects = function()
	{
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		for (var i=0; i<this.stars.length; i++)
		{
			this.ctx.fillStyle = getRandomColor();
			var star = this.stars[i];
			var k = 256 / star.z;
			var x = star.x*k + this.origin.x;
			var y = star.y*k + this.origin.y;
			
			var size = ((this.max_depth-star.z)/this.max_depth) * this.max_size;
			this.ctx.fillRect(x, y, size, size);
		}	
	};
	
	this.draw_buffer = function()
	{
		var pos = 0, x, y;
		var length = this.img_data.data.length;
		var width = this.img_data.width*4;
		
		for ( pos = 0; pos < length ; pos++ )
			this.img_data.data[pos] = 0;
		
		for (var i=0; i<this.stars.length; i++)
		{
			var star = this.stars[i];

			var k = 256 / star.z;
			var x = Math.floor(star.x*k + this.origin.x);
			var y = Math.floor(star.y*k + this.origin.y);
				
			if (x > 0 && x < this.canvas.width && y > 0 && y < this.canvas.height)				
			{
				pos = y * width + (x*4);
				
				this.img_data.data[pos] = 255;
				this.img_data.data[pos+1] = 255;
				this.img_data.data[pos+2] = 255;	
				this.img_data.data[pos+3] = ((this.max_depth-star.z)/this.max_depth) * 255;				
			}
		}	
	
		this.ctx.putImageData( this.img_data, 0, 0 );
	};
	

	this.set_origin = function(x, y)
	{
		this.origin.x = x;
		this.origin.y = y;
	};
	
	this.reset_origin = function()
	{
		this.origin.x = this.canvas.width/6;
		this.origin.y = this.canvas.height/2;
	};		
}


