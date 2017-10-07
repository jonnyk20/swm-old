(function() {
	// Source: http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
	// shim layer with setTimeout fallback
	window.requestAnimFrame = (function(){
  		return  window.requestAnimationFrame   ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
	})();

	var lastTime = (new Date()).getTime();
	var displayNode = document.getElementById('display');
	var numSeconds = 0;
	(function timer() {
		requestAnimFrame(timer);
		var currentTime = (new Date()).getTime();

		if (currentTime - lastTime >= 1000) {

			console.log("Last Time: " + lastTime);
			console.log("Current Time: " + currentTime);

			lastTime = currentTime;
			numSeconds++;
			displayNode.innerText = numSeconds;
		}
	}());
}());