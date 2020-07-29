var keyState = {};    
window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);    
window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);

var mouse_pos = {};
var mouse_uv = {};

function getMousePos(canvas, evt)
{
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

function game_init()
{
	window.addEventListener('mousemove',function(e){
	mouse_pos = getMousePos(viewport, e);
	mouse_uv.x = mouse_pos.x/viewport.width - 0.5;
	mouse_uv.y = mouse_pos.y/viewport.height - 0.5;
}, false);
}

function update(event)
{
	//LEFT
	if(keyState[122]) toggleFullScreen("canvas");
	
	if(keyState[37]) c_camera.position[1] += -0.7;
	if(keyState[38]) c_camera.position[0] += 0.7;
	if(keyState[39]) c_camera.position[1] += 0.7;
	if(keyState[40]) c_camera.position[0] += -0.7;
	if(keyState[32]) c_camera.position[2] += -0.7;
	if(keyState[16]) c_camera.position[2] += 0.7;
	
	var angle = mouse_uv.x * 80 * Math.PI / 180;
	var angle2 = mouse_uv.y * 80 * Math.PI / 180;
	c_camera.rotation = [0.5 * (Math.cos(angle) + Math.cos(angle2)), -Math.sin(angle), Math.sin(angle2), 0.0];
}

function toggleFullScreen(id) {

  var div = document.getElementById(id);

  if ((document.fullScreenElement && document.fullScreenElement !== null) ||
    (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (div.requestFullScreen) {
      div.requestFullScreen();
    } else if (div.mozRequestFullScreen) {
      div.mozRequestFullScreen();
    } else if (div.webkitRequestFullScreen) {
      div.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}