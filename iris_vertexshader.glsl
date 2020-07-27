attribute vec3 aVertexPosition;
uniform float aspect_ratio;
uniform float time;

void main(void) {
	gl_Position = vec4(sin(time) * 0.6, 0.0, 0.0, 0.0) + vec4(aVertexPosition * vec3(1.0, aspect_ratio, 1.0), 1.0);
}