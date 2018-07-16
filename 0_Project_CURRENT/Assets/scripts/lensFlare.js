var cam : Transform;
var flareMats : Material[];
var flareA : float = 0.5;
var hitRadius : int;
var flareObj: Transform;
private var hits: int = 5;
var flare2: Transform;
//var flare3: Transform;
var state: int = 0;
var flareHolder: Transform;
private var yOff: float = 26;
var ray: GameObject;
function Start(){
	var camGO: GameObject = gameObject.Find("Cam/Main Camera");	
	cam = camGO.transform;
}

function LateUpdate () {

	ray.transform.LookAt(cam);
	//flareHolder.position=cam.position;
	flareObj.localPosition.z=-0.1+cam.position.y*0.005;
	flareObj.localPosition.y=0.5+cam.position.y*-0.015;

	var hit : RaycastHit;
	var myMask = 1 << 10;
	if(Physics.Raycast(transform.position,transform.forward, hit, 400, myMask)) {
		Fade(0);
	}else Fade(1);
	Debug.DrawRay (transform.position, transform.forward*400, Color.red);
}


function Fade(which: int) {
	flareA=Mathf.Lerp(flareA, which, Time.deltaTime*12);
	flareMats[0].SetColor("_TintColor", Vector4(.5, .5, .5, flareA));
}