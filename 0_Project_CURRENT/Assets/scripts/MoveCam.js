var target: Transform;
var goalHeight: float;
var sensitivity: float;
var defaultLerpSpeed: float;
private var lerpSpeed: float;
var cam: Camera;
var anim: Animation;
var mode: String = "play";
var lookTarget: Transform;
var goalZ: float=0.0;
var goalRY: float=0.0;
var ship: MoveShip;
var titlePF: Transform;
var titleObj: Transform;
var titleArtifactPFs: Transform[];
var titleArtifactObj: Transform;
var titleAudioName: String[];

var VC_interface: Transform;
var interfaceTilt: Transform;
var newRecord: Transform;
var levelTime: Transform;
var buttons: Transform;
var vcnPF: GameObject;
var curTime: Transform;
var recordTime: Transform;
var vcn: GameObject;
var vcn2: GameObject;
var vcn3: GameObject;

var Rvcn: GameObject;
var Rvcn2: GameObject;
var Rvcn3: GameObject;

var yPos: float;
var zPos: float;
var xAngle: float;
var yLerp: int;
var zLerp: int;
var xLerp: int;

var VCshipAdj: float[];

var loadingScript: LoadingScreen;
var go: boolean=false;

var gameMaster: GameMaster;
var gui : GUIScript;

private var level : int;
private var t : float;
var newRecordCheck: boolean = false;
var camXLerpSpeed: float;

var lp: Vector3;
var lv: Vector3;

private var diff: float = 0.0;


function Start() {
	lerpSpeed=defaultLerpSpeed;
	
	
//	iPhoneKeyboard.autorotateToPortrait = false; 
//	iPhoneKeyboard.autorotateToPortraitUpsideDown = false; 
//	iPhoneKeyboard.autorotateToLandscapeRight = false; 
//	iPhoneKeyboard.autorotateToLandscapeLeft = false;	
}

function loadMenu(){
	loadingScript.loadOn=true;
	//print("why no menu");
	PlayerPrefs.SetInt("Quit", 1);
	yield WaitForSeconds(0.2);
	Application.LoadLevel(0);	
}


function FixedUpdate () {
	if (goalHeight!=transform.position.y) 	{
		diff = Mathf.Clamp(Mathf.Abs(goalHeight-transform.position.y), 1, 8);
		transform.position.y=transform.position.y+(((goalHeight-transform.position.y)*0.1)*Time.deltaTime*40*diff);
	}
	
	if (mode!="stop") {
		transform.position.z=target.position.z;
		transform.position.x=Mathf.Lerp(transform.position.x, target.position.x, Time.deltaTime*camXLerpSpeed);
	}else {
		transform.position.z=Mathf.Lerp(transform.position.z, goalZ, Time.deltaTime*lerpSpeed);
	}
	lv=transform.position-lp;
	lp=transform.position;		
}

function Update(){
	if (mode!="stop") {
		cam.fieldOfView=Mathf.Lerp(cam.fieldOfView, 34+(ship.targetSpeed*0.08)+(1.2*diff), Time.deltaTime*2);
	}else {
		cam.fieldOfView=Mathf.Lerp(cam.fieldOfView, 35, Time.deltaTime*1.2);
	}
	if (mode=="win") {
		cam.transform.localPosition.y= 4.3;
		cam.transform.localPosition.z= -7.0;
		
		goalRY=Mathf.Clamp(goalRY-(ship.xf*Time.deltaTime*3),-1, 1);//Mathf.Lerp(goalRY,Mathf.Clamp(-ship.xf,-1,1),Time.deltaTime*3);	
		transform.localEulerAngles.y= 40* Mathf.Sin(goalRY);
		
	}

	if (mode=="play") {
		// drop cams
		if (ship.state.tunnel) {
			yPos=4.4;
			zPos=-13;
			xAngle=7;
			yLerp=4;
			zLerp=3;
			xLerp=zLerp;
		}
		else if (ship.state.tunnel2) {
			yPos=3;
			zPos=-13;
			xAngle=3;
			yLerp=4;
			zLerp=3;
			xLerp=zLerp;
		}
		else {
			yPos=6;//+(0.1*(cam.fieldOfView-35));
			zPos=-14;
			xAngle=10;
			yLerp=1;
			zLerp=1;
			xLerp=zLerp;
		}
		camXLerpSpeed = Mathf.Lerp(camXLerpSpeed, defaultLerpSpeed*2, Time.deltaTime);
		cam.transform.localPosition.y=Mathf.Lerp(cam.transform.localPosition.y, yPos, Time.deltaTime*yLerp);
		cam.transform.localPosition.z=Mathf.Lerp(cam.transform.localPosition.z, zPos, Time.deltaTime*zLerp);
		cam.transform.localEulerAngles.x=Mathf.Lerp(cam.transform.localEulerAngles.x, xAngle, Time.deltaTime*xLerp); 
		
	}	
}
	
	
function LateUpdate() {	
	if (mode=="title") 	{
//		if (gameMaster.device==DeviceType.iPhone) {	
//			for (touch in Input.touches) {
//				if (touch.phase==TouchPhase.Began)	 {
//					ship.reset(3);
//				}
//			}
//		} else { // computer CTRLs
			if ((Input.GetMouseButtonDown(0)) || (Input.GetButtonDown("Fire1"))) {
				ship.reset(3);
			}
//		}
	}
	
	if (mode=="win") 	{
		cam.transform.LookAt(Vector3(lookTarget.position.x, 3, lookTarget.position.z)+Vector3(-goalRY,0.9,0));
	}
}	


function switchTo(which: String) {
	if (which=="play") {
		anim.Stop();
		if (titleObj) {
			Destroy(titleObj.gameObject);
			Destroy(titleArtifactObj.gameObject);
		}
		lerpSpeed=defaultLerpSpeed;
		mode="play";
		cam.transform.localPosition=Vector3(0, 8, -13.5);
		cam.transform.localRotation=Quaternion.Euler(15, 0, 0);
		transform.position=Vector3(Mathf.Clamp(target.GetComponent.<Rigidbody>().position.x, -10, 10), gameMaster.startPos.y+5, 0 );
		goalHeight=gameMaster.startPos.y+5;
		transform.localRotation.y=0;
	}
	else if (which=="win") {
		goalRY=0.0;
		cam.transform.localPosition=Vector3(0, 4.8, -5);
		cam.transform.localRotation=Quaternion.Euler(20, 0, 0);
		mode="win";
		// adjust the alt of the ship to center for victory cruise
		ship.anim.transform.localPosition.y =VCshipAdj[gameMaster.shipNum];
		lerpSpeed=2.0;
		transform.position=Vector3(target.GetComponent.<Rigidbody>().position.x-12, 10, 0);
		transform.localEulerAngles.y=Random.Range(-35,35);
	}
	else if (which=="title") {
		// cam.transform.localPosition=Vector3(0, 8, -13.5);	
		print(ship.sfx);
		if (ship.sfx) {
			GetComponent.<AudioSource>().clip  = (Resources.Load(titleAudioName[gameMaster.worldNum]));
			GetComponent.<AudioSource>().Play();	
		}
		anim.Play("cameraTitle");
		transform.localEulerAngles.y=0;
		cam.transform.localRotation=Quaternion.Euler(15, 0, 0);
		cam.fieldOfView=35;
		mode="title";
		titleObj= Instantiate(titlePF, Vector3(0, 0, 0), Quaternion.identity) as Transform;
		titleArtifactObj= Instantiate(titleArtifactPFs[gameMaster.worldNum], Vector3(0, 0, 0), Quaternion.identity) as Transform;
		titleObj.parent=cam.transform;
		titleObj.localPosition=Vector3.zero;
		var titleScript: TitleScript = titleObj.GetComponent(TitleScript);
		titleScript.updateTitle(gameMaster.worldNum);

	}
}