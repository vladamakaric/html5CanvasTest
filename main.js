window.onload = function() {
	var app = new VIEW.View();
	app.init();

	var prevTime = (new Date()).getTime();
	window.requestAnimationFrame(mainLoop);

	function mainLoop(){
		var currTime = (new Date()).getTime();
		var dt = currTime - prevTime;
		prevTime = currTime;
		app.loop(dt);	
		window.requestAnimationFrame(mainLoop);
	}
}

