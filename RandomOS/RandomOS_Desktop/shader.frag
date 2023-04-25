#version 330
// 3D and 2D Game Engine "Random Game Engine"
uniform vec2 resolution;
uniform vec2 mouseposno;
vec3 SphereLight(vec2 uv, vec2 pos, vec3 col, int radius){
	return col * 0.01 / length(uv) * radius;
}
vec3 DrawFillRect(vec2 uv, vec2 pos, vec3 background_color, vec3 col, vec2 size){
	if (uv.x > pos.x && uv.x < pos.x + size.x && uv.y > pos.y && uv.y < pos.y + size.y){
		return col;
	}
	else {
		return background_color;
	}
}
vec3 DrawFillSphere(vec2 uv, vec2 pos, vec3 background_color, vec3 col, int radius){
	uv -= pos;
	if ((uv.x * uv.x + uv.y * uv.y) * 13200 < radius){
		return col;
	}
	else {
		return background_color;
	}
}
bool ColliderRect(vec2 uv, vec2 pos, vec2 size){
	pos -= 0.25;
	if (uv.x > pos.x && uv.x < pos.x + size.x && uv.y > pos.y && uv.y < pos.y + size.y){
		return true;
	}
	else {
		return false;
	}
}
bool ColliderSphere(vec2 uv, vec2 pos, int radius){
	uv -= pos;
	if (dot(uv, uv) * 13200 < radius){
		return true;
	}
	else {
		return false;
	}
}
void main(){
	vec2 uv = (2.0 * gl_FragCoord.xy - resolution.xy) / resolution.y;
	vec2 mousepos = mouseposno.xy / resolution.y;
	vec3 col = vec3(0);
	vec3 scene = col;
	scene = DrawFillRect(uv, vec2(0), col, vec3(1), vec2(1));
	col += scene;
	gl_FragColor = vec4(col, 1);
}