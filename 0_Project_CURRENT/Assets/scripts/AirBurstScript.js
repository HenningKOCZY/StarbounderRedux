var burstFrame : Texture2D[];
private var frameCnt : int = 0;
private var frameCnt2 : int = 0;
var ship: GameObject;


function Start(){
	ship = GameObject.Find("Ship");
}

function Update () {


	transform.parent.position=Vector3(ship.transform.position.x,ship.transform.position.y,ship.transform.position.z-1);

	
}

function FixedUpdate(){
		
	frameCnt=Mathf.Floor(frameCnt2/3);
	
	if (frameCnt>9) {
		Destroy(gameObject.transform.parent.gameObject);
	}
	
	GetComponent.<Renderer>().material.mainTexture = burstFrame[frameCnt];
	frameCnt2++;	
}