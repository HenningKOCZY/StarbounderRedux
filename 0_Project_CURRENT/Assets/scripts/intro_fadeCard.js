var color: Color;
var speed: int = 1;
var bg: GameObject;
function Start(){
	color = GetComponent.<Renderer>().material.color;
}

function FixedUpdate(){
	
}

function FadeOn(){
	color.a += Time.deltaTime*speed;
	GetComponent.<Renderer>().material.color = color;
}

function FadeOff(){
	color.a -= Time.deltaTime*speed;
	bg.GetComponent.<Renderer>().material.color.a = color.a;
	GetComponent.<Renderer>().material.color.a = color.a;
}

function Update () {
}