var VIEW = (function(interf){

	interf.View = function(){
		var htmlCanvas = document.getElementById('c');
		var context = htmlCanvas.getContext('2d');
		var angle = 0;

		var pressTime;
		this.init = function(){
			window.addEventListener('resize', resizeCanvas, false);

			$( document ).on( "vmousedown", onPress); 
			$( document ).on( "vmouseup", onRelease); 
			resizeCanvas();
		}

		this.loop = function(dt){
			redraw(dt);
		}

		function onPress(){
			pressTime = (new Date()).getTime();
		}

		function onRelease(){
			var delta = (new Date()).getTime() - pressTime;
			alert(delta);
		}
		function resizeCanvas() {
			htmlCanvas.width = window.innerWidth;
			htmlCanvas.height = window.innerHeight;
		}

		function redraw(dt) {
			context.clearRect(0, 0, htmlCanvas.width, htmlCanvas.height);
			context.strokeStyle = 'blue';
			context.lineWidth = '20';
			context.strokeRect(0, 0, window.innerWidth, window.innerHeight);

			var rectWidth = 300;
			var rectHeight = 400;

			context.translate(htmlCanvas.width / 2, htmlCanvas.height / 2);
			context.rotate(angle);

			angle+=0.001*dt;
			context.fillStyle = 'blue';
			context.fillRect(rectWidth / -2, rectHeight / -2, rectWidth, rectHeight);
			context.setTransform(1, 0, 0, 1, 0, 0);
		}
	}
	return interf;
}(VIEW || {}));
