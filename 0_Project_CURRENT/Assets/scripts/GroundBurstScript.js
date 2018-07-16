var cam : GameObject;
var burstFrame : Texture2D[];
private var frameCnt : int = 0;
private var frameCnt3 : int = 0;
var speed: float;
var ship: GameObject;
var lag : float = 0;
var shipOldZ: float;
//var moveShip: MoveShip;

function Start(){
	cam = GameObject.Find("Main Camera");
	ship = GameObject.Find("Ship");
	shipOldZ=ship.transform.position.z;
}

function Update () {
	gameObject.transform.parent.LookAt(cam.transform.position,Vector3(0,1,0));
	
	var hit : RaycastHit;
	
	
	
	if (Physics.Raycast (gameObject.transform.position, -Vector3.up, hit, 2)) lag+=(shipOldZ-ship.transform.position.z)*.15;
	else lag+=(shipOldZ-ship.transform.position.z)*.25;
	transform.parent.position.z=ship.transform.position.z+lag;//-moveShip.Zspeed;
	//Debug.DrawRay(gameObject.transform.position, -Vector3.up*2, Color.green);
	
	shipOldZ=ship.transform.position.z;
}

function FixedUpdate(){
		
	frameCnt=Mathf.Floor(frameCnt3/3);
	
	if (frameCnt>10) {
		Destroy(gameObject.transform.parent.gameObject);
	}
	
	GetComponent.<Renderer>().material.mainTexture = burstFrame[frameCnt];
	frameCnt3++;	
}