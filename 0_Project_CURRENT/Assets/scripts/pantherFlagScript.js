var projectorMat : Material;
var bubbleLightsMat : Material;
var projectorObj : Transform;
var projectorRaysObj : Transform;
var shadowObj : Transform;
var gameMaster: GameMaster;
var ship : MoveShip;
var hologramMat : Material;
//var hologramLight : Light;
var on : int = 0;
var turnOn : boolean = false;
var flyIn: boolean = false;
var projectorMatColor : Vector4;
var hologramColor : Vector4;
var hologramGrp : Transform;
var hologramObj : GameObject;
var pFlag : GameObject;
var bubble: Transform;
var base: GameObject;
var shipTrans : Transform;
var shipSub : Transform;
var stoppedMoment: float;
var reposShip : boolean = false;
var shipTransPos : Vector3;
var allowRelease : boolean = false;
var platformDescend: AudioClip;

function Start(){
	InitFlag();	
}

function InitFlag(){	
	on=PlayerPrefs.GetInt(("Level"+gameMaster.level+"PantherFlag"),0);
	bubble.gameObject.GetComponent.<Renderer>().materials[1].SetTexture("_Shad", Resources.Load("ship/world"+gameMaster.worldNum+" Refl"));
	base.GetComponent.<Renderer>().material.SetTexture("_Shad", Resources.Load("ship/world"+gameMaster.worldNum+" Refl"));
	projectorMat = projectorObj.GetComponent.<Renderer>().material;
	bubbleLightsMat = bubble.gameObject.GetComponent.<Renderer>().materials[0];
	hologramGrp.localPosition.y = 1;
	shadowObj.localPosition.x = -.9;
	
	if(!on){
		pFlag.transform.position = Vector3(0,0,-400);
		bubble.localPosition = Vector3(0,0,-3.8);
	}
	else{
		pFlag.transform.localPosition = Vector3(0,0,0);	
		bubble.position = Vector3(0,0,-400);
	}
	if(gameMaster.shipNum==10){
		if(!on) {
			projectorMatColor= Vector4(1,.1,.2,1);
			projectorMat.SetColor("_TintColor",projectorMatColor);
			bubbleLightsMat.SetColor("_TintColor",projectorMatColor);
			
			hologramColor=Vector4(1,0,0,.7);
			hologramMat.SetColor("_TintColor",hologramColor);
			
			//hologramLight.color=Vector4(1,.1,.2,1);
			
			hologramGrp.localScale = Vector3(0,3,0);
			
			hologramObj.GetComponent.<Animation>().Stop();
			projectorRaysObj.GetComponent.<Animation>().Stop();
			projectorObj.GetComponent.<Animation>().Stop();
			projectorRaysObj.localScale = Vector3(0,0,0);
			
			shadowObj.GetComponent.<Animation>().Stop();
			shadowObj.localScale = Vector3(0,0,0);
			
		}else {
			if(ship.sfx) base.GetComponent.<AudioSource>().Play();
			projectorMatColor= Vector4(.28,.55,1,1);
			projectorMat.SetColor("_TintColor",projectorMatColor);
			
			hologramColor=Vector4(0.33,0.33,0.33,.365);
			hologramMat.SetColor("_TintColor",hologramColor);
			
			//hologramLight.color=Vector4(.13,.64,1,1);
			
			hologramGrp.localScale = Vector3(1.2,1.2,1.2);
			
			hologramObj.GetComponent.<Animation>().Play();
			projectorRaysObj.GetComponent.<Animation>().Play();
			projectorObj.GetComponent.<Animation>().Play();
			shadowObj.GetComponent.<Animation>().Play();
		}
		if(ship.state.cruising || !ship.sfx || ship.state.paused) base.GetComponent.<AudioSource>().Stop();
	}
}

function OnTriggerEnter(){
	if(!on){
		stoppedMoment = Time.time;
		ship.fakeCC=true;
		ship.checkLanding();
		base.GetComponent.<AudioSource>().PlayOneShot(platformDescend);
		pFlag.GetComponent.<Animation>().Play();
		ship.state.started=false;
		ship.stopDead();
		ship.state.fullStop = true;
		//ship.state.started= false;
		reposShip=true;
		ship.xf=0;
		ship.xf2=0;
		yield WaitForSeconds(1.5);
		hologramObj.GetComponent.<Animation>().Play();
		projectorRaysObj.GetComponent.<Animation>().Play();
		projectorObj.GetComponent.<Animation>().Play();
		shadowObj.GetComponent.<Animation>().Play();
		turnOn=true;
		on=1;
		yield WaitForSeconds(.6);
		allowRelease = true;
		yield WaitForSeconds(.7);
		base.GetComponent.<AudioSource>().Play();
	}
}

function OnTriggerExit(){
	ship.state.stopDead=false;	
	//ship.state.started=true;
}

function Update(){
	if(gameMaster.shipNum==10){
		if (on){
			if(!ship.state.paused &&  !ship.state.cruising && !base.GetComponent.<AudioSource>().isPlaying && ship.sfx){
				base.GetComponent.<AudioSource>().Play();
			}
			if((ship.state.paused || ship.state.cruising || !ship.sfx) && base.GetComponent.<AudioSource>().isPlaying) base.GetComponent.<AudioSource>().Stop();
		}
	}
}

function endRepos(){
	yield WaitForSeconds(.4);
	shipTrans.position = Vector3(bubble.position.x,bubble.position.y+0.65,bubble.position.z);
	shipSub.localEulerAngles = Vector3(0,0,0);
	reposShip=false;
}

function LateUpdate () {
	if(gameMaster.shipNum==10){
		if(reposShip){
			shipTrans.position = Vector3.Lerp(shipTrans.position, Vector3(bubble.position.x,bubble.position.y+0.65,bubble.position.z), Time.deltaTime*10);
			shipSub.localRotation = Quaternion.Slerp(shipSub.rotation, gameObject.transform.rotation, Time.deltaTime*10);
			//shipTransPos = shipTrans.position;
			endRepos();
		}
		if(turnOn){
			shadowObj.localPosition.x = Mathf.Lerp(shadowObj.localPosition.x, -1.1, Time.deltaTime*4);
			shadowObj.localScale= Vector3.Lerp(shadowObj.localScale,Vector3(1,1.3,1.3),Time.deltaTime*4);
			
			hologramGrp.localScale = Vector3.Lerp(hologramGrp.localScale,Vector3(1.2,1.2,1.2),Time.deltaTime*4);
			hologramGrp.localPosition.y = Mathf.Lerp(hologramGrp.localPosition.y, 1.3, Time.deltaTime*4);
			
			projectorMatColor = Vector4.Lerp(projectorMat.GetColor("_TintColor"),Vector4(.28,.55,1,1),Time.deltaTime*4);
			projectorMat.SetColor("_TintColor",projectorMatColor);
			bubbleLightsMat.SetColor("_TintColor",projectorMatColor);
			
			hologramColor = Vector4.Lerp(hologramMat.GetColor("_TintColor"),Vector4(0.33,0.33,0.33,.365),Time.deltaTime*4);
			hologramMat.SetColor("_TintColor",hologramColor);
			
			//hologramLight.color = Vector4.Lerp(hologramLight.color,Vector4(.13,.64,1,1),Time.deltaTime*4);
			
			if( projectorMatColor == Vector4(.28,.55,1,1)) turnOn = false;
			
			
		}
		if(allowRelease){
       		if (Input.GetAxisRaw("Vertical")>0 || ship.yf==true || Input.touchCount>0) {
       			print("releasing");
				//ship.state.stoppedTime = Time.time-stoppedMoment;
				ship.state.fullStop = false;
				ship.state.stopDead = false;
				ship.state.started = true;
				ship.speedUpZ();	
				allowRelease = false;
			}	
		}
	}
}