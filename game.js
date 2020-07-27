var keyState = {};    
window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);    
window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);

x = 100;


function update(event)
{
	//LEFT
	if(keyState[122]) toggleFullScreen("canvas");
	
	if(keyState[37]) c_camera.position[1] += -0.1
	if(keyState[38]) c_camera.position[0] += 0.1
	if(keyState[39]) c_camera.position[1] += 0.1
	if(keyState[40]) c_camera.position[0] += -0.1
	if(keyState[32]) c_camera.position[2] += 0.1
	if(keyState[16]) c_camera.position[2] += -0.1
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