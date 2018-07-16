var cam : GameObject;
var flareMat : Material;
var flareA : float = 0.5;
var hitRadius : int;
var flareObj: Transform;
var ray: GameObject;
var hit : RaycastHit;	
var myMask = 1 << 10;
var hitting : boolean = false;

function Start(){
	cam = gameObject.Find("Cam/Main Camera");	
	InvokeRepeating("HitCheck",0,0.1);
}

function LateUpdate(){

	if (hitting){
		if (flareA > 0.001){
			Fade(0);
		}
	} else if (flareA < .999) Fade(1);
}


function HitCheck () {
	//**new
	ray.transform.position = cam.transform.position;
	ray.transform.LookAt(flareObj);
	
	//flareObj.transform.localEulerAngles.z = cam.transform.parent.position.x*-.5;
	
	if(Physics.Raycast(ray.transform.position,ray.transform.forward, hit, 400, myMask)) {
		hitting = true;	
	}else hitting = false;
	//	print("hit");
	
	Debug.DrawRay (ray.transform.position, ray.transform.forward*400, Color.red);
}


function Fade(which: int) {
	
	flareA=Mathf.Lerp(flareA, which, Time.deltaTime*7);
	
	flareMat.SetColor("_TintColor", Vector4(.5, .5, .5, flareA));
}