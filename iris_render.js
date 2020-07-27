//START

var shader_program;
var aspect_ratio;
var square_vertices_buffer;
var viewport_height, viewport_width;

//Current camera object!
var c_camera = {};
c_camera.position = [-5.0, 1.0, 1.0];
c_camera.size = [640.0/360.0, 1.0, 1.0]
c_camera.facing_dir = [1.0, 0.0, 0.0]

//Current scene object!
var c_scene = {};
c_scene.clear_color = [1.0, 1.0, 1.0];
c_scene.name = "Cena 1";

var start_time = new Date();

var dt;
var ts = 0;
var gl;

//The LOOP Function
function loop(timestamp)
{
	var progress = timestamp - dt;
	
	update();
	draw();
	
	dt = timestamp;
	window.requestAnimationFrame(loop);
}

function init()
{	
	const viewport = document.querySelector("#canvas");
	gl = viewport.getContext("webgl2");
	
	viewport_height = viewport.height;
	viewport_width = viewport.width;
	
	aspect_ratio = viewport.width / viewport.height;
	console.log("Canvas size: " + viewport.width + "x" + viewport.height + " (" + aspect_ratio+")");
	
	if (!gl)
	{
		alert("Couldn't initialize WebGl.\nYour device is outdated.");
		return;
	}
	
	gl.clearColor(1.0, 1.0, 1.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	init_shaders();
	init_buffers();
	
	window.requestAnimationFrame(loop);
}

function init_shaders()
{
	var ps = getShader("shader-ps");
	var vs = getShader("shader-vs");
	
	shader_program = gl.createProgram();
	gl.attachShader(shader_program, ps);
	gl.attachShader(shader_program, vs);
	gl.linkProgram(shader_program);
	
	//If fail to create shader, alert the userAgent
	if (!gl.getProgramParameter(shader_program, gl.LINK_STATUS))
	{
		alert("Couldn't initialize the shader program.");
	}
	
	gl.useProgram(shader_program);
	
	vertexPositionAttribute = gl.getAttribLocation(shader_program, "aVertexPosition");
	gl.enableVertexAttribArray(vertexPositionAttribute);
}

function getShader(id)
{	
	var shader_script, shader_source, current_child, shader;

	shader_script = document.getElementById(id);

	if (!shader_script)
	{
		return null;
	}

	shader_source = "";
	current_child = shader_script.firstChild;

	while(current_child)
	{
		if (current_child.nodeType == current_child.TEXT_NODE)
		{
		  shader_source += current_child.textContent;
		}

		current_child = current_child.nextSibling;
	}
  
	if (shader_script.type == "x-shader/x-fragment") {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	} else if (shader_script.type == "x-shader/x-vertex") {
		shader = gl.createShader(gl.VERTEX_SHADER);
	} else {
		// Unknown Shader type.
		return null;
	}
	
	gl.shaderSource(shader, shader_source);
	gl.compileShader(shader);
	
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
	{
		console.log("Couldn't compile shader: " + gl.getShaderInfoLog(shader));
		return null;
	}
	
	return shader;
}

function init_buffers()
{
	square_vertices_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, square_vertices_buffer);
	
	var vertices = [
		-1.0, -1.0, 0.0,
		1.0, -1.0, 0.0,
		1.0, 1.0, 0.0,
		-1.0, 1.0, 0.0
	];
	
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

function send_uniforms() {
	
	shader_program.aspect_ratio = gl.getUniformLocation(shader_program, "aspect_ratio");
	shader_program.time = gl.getUniformLocation(shader_program, "time");
	shader_program.resolution = gl.getUniformLocation(shader_program, "resolution");
	shader_program.clear_color = gl.getUniformLocation(shader_program, "clear_color");
	
	gl.uniform1f(shader_program.aspect_ratio, aspect_ratio);
	gl.uniform1f(shader_program.time, wall_clock_time()/1000);
	gl.uniform2fv(shader_program.resolution, [viewport_width, viewport_height]);
	gl.uniform3fv(shader_program.clear_color, c_scene.clear_color);

	//Send camera uniforms
	shader_program.camera_position = gl.getUniformLocation(shader_program, "camera_position");
	shader_program.camera_size = gl.getUniformLocation(shader_program, "camera_size");
	shader_program.camera_facing_dir = gl.getUniformLocation(shader_program, "camera_facing_dir");

	gl.uniform3fv(shader_program.camera_position, c_camera.position);
	gl.uniform3fv(shader_program.camera_size, c_camera.size);
	gl.uniform3fv(shader_program.camera_facing_dir, c_camera.facing_dir);
	
	//Send model uniforms
	//shader_program.model_size = gl.getUniformLocation(shader_program, "model_size");

	//gl.uniform3fv(shader_program.model_size, [4.0, 4.0, 4.0]);
}

function draw()
{
	send_uniforms();
	
	gl.clearColor(0.7, 0.7, 1.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, square_vertices_buffer);
	gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}

//Returns the time elapsed since the beggining of time.
function wall_clock_time()
{
	var current_time = new Date();
	return current_time - start_time;
}