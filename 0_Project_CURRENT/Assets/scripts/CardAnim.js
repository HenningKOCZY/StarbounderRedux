var cardFrame : Texture2D[];
var parentTo: Transform;
var randomRot: boolean = false;
var lookAtCam: boolean = false;
var FPS: int =30;
var frameCnt : int = 0;
private var cam : GameObject;
var startTime: float;
var cardGo: boolean = false;

function Start(){
	 cam = GameObject.Find("Main Camera");
	 GetComponent.<Renderer>().material.mainTexture = cardFrame[0];
	 if (randomRot) transform.localEulerAngles.y=Random.Range(0, 360);
}


function Update(){
	if(!cardGo) frameCnt = 0;
	else GetComponent.<Renderer>().material.mainTexture = cardFrame[frameCnt];
}

function FixedUpdate () {
	if(cardGo){
		frameCnt = (Time.time-startTime)*FPS;		
		if (frameCnt >= cardFrame.length) {
			Reset();
		}
		if (lookAtCam) transform.root.LookAt(cam.transform.position);
		if (parentTo) transform.root.position=parentTo.position;
	}
}

function Reset(){
	frameCnt = 0;
	GetComponent.<Renderer>().material.mainTexture = cardFrame[frameCnt];
	cardGo = false;
}