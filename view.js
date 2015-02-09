var VIEW = (function(interf){

	interf.View = function(){
		var canvas = document.getElementById('c');
		var context = canvas.getContext('2d');
		var angle = 0;
		var press = false;
		var release = false;
		var pressTime;
		var img;
		var resourceLoad = false;
		var pointerPos;
		this.init = function(){
			window.addEventListener('resize', resizeCanvas, false);
			window.addEventListener('touchend', onRelease, false);	
			window.addEventListener('touchstart', onPress, false);	
			window.addEventListener('touchmove', onMove, false);
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


		function getPointerPos(e) {
			if (e.touches !== undefined && e.touches.length == 1) {
				return {x: e.touches[0].pageX, y: e.touches[0].pageY};	
			}
			else {
				return {x: e.pageX, y: e.pageY};	
			}
		}


		function onMove(event){
			event.preventDefault();
			pointerPos = getPointerPos(event);
		}
		function onPress(event){
			press = true;
			
			pointerPos = getPointerPos(event);
		}

		function onRelease(event){
			release = true;
			pointerPos = getPointerPos(event);
		}

		function resizeCanvas() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}

		function redraw(dt) {

			if(press){

			pressTime = (new Date()).getTime();

			press = false;

			}
			
			if(release){
				var delta = (new Date()).getTime() - pressTime;
				alert(pointerPos.x + ' y: ' + pointerPos.y);
				release = false;
			}

		var grd = context.createLinearGradient(0, 0, 0, canvas.height);
      // light blue
      grd.addColorStop(0, '#8ED6FF');   
      // dark blue
      grd.addColorStop(1, '#004CB3');
      context.fillStyle = grd;

context.fillRect(0, 0, canvas.width, canvas.height);
					
			context.translate(canvas.width / 2, canvas.height / 2);
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
