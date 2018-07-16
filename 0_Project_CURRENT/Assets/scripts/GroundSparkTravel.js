var speed: float;
var slowdown: float =0.5;

function FixedUpdate () {
	transform.position.z+=speed*Time.deltaTime;
	//speed*=1-(slowdown*Time.deltaTime);
	speed=Mathf.Lerp(speed, 0, Time.deltaTime*slowdown);
}