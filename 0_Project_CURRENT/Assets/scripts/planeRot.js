var speed: float;


function Start() {
	transform.localEulerAngles.y=Random.Range(0, 360);
}

function FixedUpdate () {
	transform.localEulerAngles.y+=speed;
}