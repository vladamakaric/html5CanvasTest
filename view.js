var VIEW = (function(interf){

	interf.View = function(){
		var htmlCanvas = document.getElementById('c');
		var context = htmlCanvas.getContext('2d');
		var angle = 0;
		var press = false;
		var release = false;
		var pressTime;
		var img;
		var resourceLoad = false;
		this.init = function(){
			window.addEventListener('resize', resizeCanvas, false);
			window.addEventListener('touchend', onRelease, false);	
			window.addEventListener('touchstart', onPress, false);	
		    img = new Image;
			img.onload = function(){
			resourceLoad = true;
			};
			img.src = "http://www.sastrugimarketing.com/art/svg-logo.svg";
			resizeCanvas();
		}

		this.loop = function(dt){
			if(!resourceLoad) return;

			redraw(dt);
		}

		function onPress(){
			press = true;
		}

		function onRelease(){
			release = true;
		}
		function resizeCanvas() {
			htmlCanvas.width = window.innerWidth;
			htmlCanvas.height = window.innerHeight;
		}

		function redraw(dt) {

			if(press){

			pressTime = (new Date()).getTime();

			press = false;

			}
			
			if(release){

			var delta = (new Date()).getTime() - pressTime;

			alert(delta);
			release = false;
			}
			context.clearRect(0, 0, htmlCanvas.width, htmlCanvas.height);
			context.strokeStyle = 'blue';
			context.lineWidth = '20';
			context.strokeRect(0, 0, window.innerWidth, window.innerHeight);

			var rectWidth = 300;
			var rectHeight = 400;
			
			context.translate(htmlCanvas.width / 2, htmlCanvas.height / 2);
			context.rotate(angle);
			context.scale(0.5, 0.5);
			context.translate(-img.width/2, -img.height/2);
			angle+=0.001*dt;
			context.drawImage(img,0,0);
			context.setTransform(1, 0, 0, 1, 0, 0);
		}
	}
	return interf;
}(VIEW || {}));
