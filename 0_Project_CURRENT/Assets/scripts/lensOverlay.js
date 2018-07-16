var flareHolder: Transform;
var cam : Transform;

function Start(){
	var camGO: GameObject = gameObject.Find("Cam/Main Camera");	
	cam = camGO.transform;
}

function LateUpdate () {
	flareHolder.position=cam.position;
}