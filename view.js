var VIEW = (function(interf){

	interf.Event = { 
		press: false,
		release: false,
		pointerPos: {x:0, y:0}};

	interf.View = function(){
		var canvas = document.getElementById('c');
		var context = canvas.getContext('2d');
		var angle = 0;
		var press = false;
		var release = false;
		var pressTime;
		var img;
		var resourceLoad = false;
		var pointerPos= {x:0,y:0};

		var deltaAngle = 0; 

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
			if(interf.Event.release){
				interf.Event.release = false;
			}

			if(press){
				press = false;
				interf.Event.press = true;
			}
			
			if(release){
				release = false;
				interf.Event.release = true;
				interf.Event.press = false;

				if(pointerPos.x < canvas.width/2)
					deltaAngle = Math.PI/2;
				else
				{
					deltaAngle = -Math.PI/2;
				}
			}

			VIEW.Event.pointerPos.x = pointerPos.x;
			VIEW.Event.pointerPos.y = pointerPos.y;

			var grd = context.createLinearGradient(0, 0, 0, canvas.height);
			// light blue
			grd.addColorStop(0, '#8EF6FF');   
			// dark blue
			grd.addColorStop(1, '#004CB3');
			context.fillStyle = grd;

			context.fillRect(0, 0, canvas.width, canvas.height);
	
			context.translate(canvas.width / 2, canvas.height / 2);
			context.rotate(angle);

			
			var diag = Math.sqrt(img.width*img.width+ img.height*img.height);
			var scale = Math.min(canvas.width/diag, canvas.height/diag);
			context.scale(scale, scale);
			context.translate(-img.width/2, -img.height/2);

			if(Math.abs(deltaAngle) > 0.06){
				var e = 0.05;
				if(deltaAngle>0){
					angle -= e;
					deltaAngle -=e;
				}else {
					angle += e;
					deltaAngle +=e;
				}

			}else { angle -= deltaAngle; deltaAngle = 0;}

			context.drawImage(img,0,0);
			context.setTransform(1, 0, 0, 1, 0, 0);
		}
	}
	return interf;
}(VIEW || {}));
