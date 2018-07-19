var shipObj: GameObject ;
var sub: Transform;
var anim: Animation;
var anim2: Animation;
var shad: Projector;

var engineAudio: GameObject;
var shipMatOffset: float[];
var shipMatScale: float[];

var shipWarpRefl: Texture2D[];
var f: int = 1;

var topSurface: GameObject;
var sideSurface: GameObject;
var frontSurface: GameObject;
//var shipLight10s: Light;

var brakeValue: float;
var speedbarMat: Material;
var jumpValue: float = 0;
var jumpValueTar: float;
var jumpBarMat: Material;
var progBar: GameObject;
var guiCam: Camera;

var ultraMaxZSpeed: float;
var defPantherMaxZ: float;
//var boostTime: float;
//var boostZ: float;

//var warpGates : WarpGateScript[];
var i : int;

var a1 : GUIQuadObj;
var a2 : GUIQuadObj;
var a3 : GUIQuadObj;
var engineFlareMat: Material;
var splode: GameObject;
var splodeParticles: Component;
var splodeScript : CardAnim;
//var boosterLights = new Light[2];
var shipBoosterMat: Material;
var shipMat: Material;
//var shipBaseMat: Material;
//var shipPatternMat: Material;
//var pantherBaseMat: Material;
//private var engineBones = new Transform[2];
//private var engineSparks = new ParticleEmitter[2];
// side sparks 
private var splodeInst : GameObject;
var sparkDownPF: GameObject;
var engineSparkMat: Material;
var cam: MoveCam;
private var camTrans: Transform;
var gui: GUIScript;
var gameMaster: GameMaster;
var Zspeed: float;
var Xspeed: float = 0.0;
var maxXspeed: float;
var maxZSpeed: float;
var minZSpeed: float = 0;
var minZBrake: float = 40;
private var brakeOverride: boolean = false;
var grav: float;
private var defGrav: float;

var jumpforce: float;
var jumpMult: float = 1.0;
private var pantherSlowInAirSpeed: float = 35;
private var pantherSlowInAirLimit: float = 62;
private var pantherSJumpPenalty: float = 6;
private var pantherDJumpPenalty: float = -8;
private var pantherSJumpMult: float = 1.08;
private var pantherDJumpMult: float = 1.18;

var dynJumpForce: boolean;
var defaultHandling: float;
var airHandling: float;
var accelTouchMax : float = 240;
var accelTouchMin : float = 80;
var targetSpeed : float;
var airSparksPF : GameObject;
var airSparksMat: Material;

var airBurst : GameObject;
var airBurstScript : CardAnim;
var airBurstScript2 : AirBurst2;
var airBurstMat: Material;
var elecBurst: GameObject[];
var warpPath: GameObject;
var warpPathAniObj: GameObject;
var elecBurstScript: CardAnim[];
private var artCount: int;
private var artCountSaved: int;
var artBurst: GameObject;
var artBurstScript: CardAnim;
var warpTubePF: Transform;
//var warpPathPF: GameObject;
var pTracksPF: GameObject;
var cruiseLightsPF: Transform;
var camFlare: GameObject;
var level : int;
var levelAttempts: int=1;
var warpTubeObj: Transform;
//private var cruiseLightsObj: Transform;
private var blackerPause: float;
//var engineFlare1: Transform;
//var engineFlare2: Transform;
private var zForce: float;
var shipNum: int;
var brakes: boolean = true;
private var gateDist: float =5.5;
var explosionMaterial : Material;
var explosionParticleMat : Material;
var explosionMark: GameObject;
var boosterColor: Color;
var winDist: float;
var paused: boolean= false;
private var xfLim: float = 0.0;
private var xfRaw: float = 0.0;
private var zBoost: float = 0.0;
private var zBoostGoal: float =0.0;

var collLeft: float =0.0;
var collRight: float = 0.0;
var sideJumpTolerance: float;

//var highestY: float = 0.0;
var actualY: float = 0.0;


var xf: float;
var qf: boolean;
var qbClear: boolean = true;
var xf2: float;
var yf: boolean;
private var yfPhase: int = 0;
var goalQ: Quaternion;
private var xRot: float;
private var xRotSpeed: float=10;
private var yv2: float = 0;


var pTen: int = -1;
var pDigit: int = -1;

var curTime: float = 0;
var newRecord: boolean = false;
var sfx: int;

var rc: int;
var rcb: int;
var deltaY : float;
var rcs: String;
var efRando: float;
var rando: float;
var randob: float;
var efRandob: float;
var musicSource: GameObject;
var musicSourceScript: Music;
var cc: int = 0;
var fakeCC : boolean = false;
var guiObjs : GUIQuadObj[];

var restarted : boolean = false;

class CharacterState {
	var started: boolean = false;
	//var startedTime: float;
	var elapsedTime: float = 0;
	var crashing: boolean = false;
	var cruising: boolean = false;
	var winning: boolean = false;
	var stopDead: boolean = false;
	var fullStop: boolean = false;
	//var stoppedTime: float = 0;
	var stunned: boolean = false;
	var handling: float;
	var lv: Vector3;
	var title: boolean = false;
	var progress: float;
	var jumps: int = 0;
	var jbClear: boolean=true;
	var tunnel : boolean = false;
	var tunnel2 : boolean = false;
	var tunnel3 : boolean = false;
	var jumpStore: boolean=false; // for storing a jump button press while close enough to a platform, but not technically on
	var paused: boolean=false;
	var lastY: float=-50; 
	var jumpTimer: float = 0.0;
	var xDisabled: int = 0;
	var fJumping: boolean = false;
	//var boostTimer: float = -1.0;
	var landing: boolean = false; // for adjusting panther ship xRot immediately after landing
	var landed: boolean = false; // keeps multiple landings beings detected on consecutive collisionStays when jumps gets reset to 0 cos youre still falling
	var grounded: boolean = false; // ultimate "are you on solid ground?" state check
	
}

class SoundClips {
	var metalHit: AudioClip;
	var jump: AudioClip[];
	var explosion: AudioClip[];
	var winGate: AudioClip;
	var VCsound: AudioClip[];
	var artSound: AudioClip;
	var engineSound: AudioClip[];
}

var state : CharacterState = CharacterState();
var sound : SoundClips = SoundClips();

function Start() {
	System.GC.Collect();
	sfx= PlayerPrefs.GetInt("Sfx", 1);
	guiCam= gameObject.Find("GUICameraL1").GetComponent.<Camera>();
	musicSource=gameObject.Find("MusicSource(Clone)");
	musicSourceScript=musicSource.GetComponent("Music");
	if(!sfx) engineAudio.active=false;
	defGrav=grav;
	initShip();
	reset(2);
	blackerPause=gui.blackerPause;
	//artCountSaved = gameMaster.artCount;
}

function Awake(){
	var guiQuadMgr : GameObject = GameObject.Find("GUIQuadMgr");
	
	guiObjs = guiQuadMgr.GetComponentsInChildren.<GUIQuadObj>();
	
	boosterColor = Vector4(PlayerPrefs.GetFloat("BoostColor_R", 0), PlayerPrefs.GetFloat("BoostColor_G", 0.5), PlayerPrefs.GetFloat("BoostColor_B", 1),1);	
	explosionMaterial.SetColor("_Emission",Vector4(boosterColor.r/2,boosterColor.g/2,boosterColor.b/2,1));
	explosionParticleMat.SetColor("_TintColor",Vector4(((1-boosterColor.r)/4+boosterColor.r),((1-boosterColor.g)/4+boosterColor.g),((1-boosterColor.b)/4+boosterColor.b),1));
	airBurst.GetComponent.<Renderer>().material.SetColor("_Emission",Vector4(boosterColor.r/2,boosterColor.g/2,boosterColor.b/2,1));
}


function initShip() {	
	var parentToObj: Transform=transform.Find("sub/animSub");
	
	shipNum = gameMaster.shipNum;
	
	if(sfx && engineAudio.active){
		if(shipNum!=10) engineAudio.GetComponent.<AudioSource>().clip = sound.engineSound[0];
		else engineAudio.GetComponent.<AudioSource>().clip = sound.engineSound[1];
	}
	shipObj = Instantiate(Resources.Load("ship"+shipNum), Vector3.zero, Quaternion.identity);
	shipObj.transform.parent=parentToObj;
	shipObj.transform.localPosition=Vector3.zero;
	
	camTrans=cam.GetComponent(Transform);
	if (shipNum!=10) {

		ultraMaxZSpeed=maxZSpeed;
		var ccs: Transform = transform.Find("collCheckL");
		ccs.gameObject.active=false;
		ccs = transform.Find("collCheckR");
		ccs.gameObject.active=false;
	} else {	
		shipObj.transform.localPosition=Vector3(0, -0.5, -0.1);
		maxZSpeed=defPantherMaxZ; // normal ship: 70

		ultraMaxZSpeed=maxZSpeed;
		anim=shipObj.GetComponent.<Animation>();
		anim["jump"].layer=1;
		anim["lJump"].layer=1;
		anim["rJump"].layer=1;
		anim["fJump"].layer=1;
		anim["boost"].layer=1;
		anim["doubleJump"].layer=1;

	}

	var baseColor: Color = Vector4(PlayerPrefs.GetFloat("BaseColor_R",0.5),PlayerPrefs.GetFloat("BaseColor_G",0.5),PlayerPrefs.GetFloat("BaseColor_B",0.5),1);
	var patColor: Color = Vector4(PlayerPrefs.GetFloat("PatColor_R",0.5),PlayerPrefs.GetFloat("PatColor_G",0),PlayerPrefs.GetFloat("PatColor_B",0),1);
	
	shipMat.SetColor("_BaseColor", baseColor*.5 );
	shipMat.SetColor("_PatColor", patColor*.6 );
	shipMat.SetTexture("_MultTex", Resources.Load("ship/ship"+shipNum));
	shipMat.SetTexture("_DecalTex", Resources.Load("patterns/"+PlayerPrefs.GetInt("texture",6)));
	shipMat.SetTextureOffset("_DecalTex", Vector2( (1/(-1*-.96))*(PlayerPrefs.GetFloat("offset",0)+.48) , 0));
	shipMat.SetTexture("_Shad", Resources.Load("ship/world"+gameMaster.worldNum+" Refl"));
	
	shipMat.SetTextureOffset("_Shad", Vector2(0,shipMatOffset[shipNum]));
	shipMat.SetTextureScale("_Shad", Vector2(1,shipMatScale[shipNum]));	

	shipBoosterMat.SetColor("_Emission",Vector4(((1-boosterColor.r)/2+boosterColor.r),((1-boosterColor.g)/2+boosterColor.g),((1-boosterColor.b)/2+boosterColor.b),1));
	engineFlareMat.SetColor("_TintColor",Vector4(boosterColor.r/2,boosterColor.g/2,boosterColor.b/2,0.5));

	artCount=artCountSaved;
}

function UpdateArtIcons(){
	if(gameMaster.gamePhase<2){
		artCount=artCountSaved;
		a1.UV.x = ((Mathf.Floor(artCount/100))*16) + 464;	
		a2.UV.x = ((Mathf.Floor((artCount%100)/10))*16) + 464;
		a3.UV.x = ((artCount%10)*16) + 464;
	}
	else {
		a1.UV.x = 448;
		a2.UV.x = 448;
		a3.UV.x = 448;
	}	
}

function adjustyv2() {
	var timer: float = 0.8;
	var startY: float = state.lv.y;
	state.landing=true;
	while (timer>0.0 && state.landing) {
		//print("delta Time: "+ Time.deltaTime*10);
		timer-=Time.deltaTime*10;
		yv2=startY*timer;
		// print("Timer: "+timer);
		yield;
	}
	state.landing=false;
	sub.localPosition.z=0;
}


function FixedUpdate() {
// inputs	
	
	if (!state.crashing && !state.winning) {
		
//		if (gameMaster.device==DeviceType.iPhone) {
//			if (state.started) {
//				//xf = -(Input.acceleration.y*3*((Mathf.Abs(Input.acceleration.y)+0.6)*.75));
//				xf = -(Input.acceleration.y*2);
//				brakes=false;
//				yf=false;
//			}
//			if(!state.paused){
//	        	for (var i = 0; i < Input.touchCount; ++i){
//	        		if (Input.GetTouch(i).position.x>Screen.width-(Screen.width/4)) {
//	        			if(Input.GetTouch(i).phase==TouchPhase.Began || Input.GetTouch(i).phase!=TouchPhase.Ended){
//	        				yf = true;
//	        			}else yf = false;
//	        			//if (jumpTouches == 0) yf = false;       			
//	        		}else if (Input.GetTouch(i).position.x<Screen.width/4) {
//	        			if(Input.GetTouch(i).phase!=TouchPhase.Ended){
//	        				brakes = true;
//	        			}else brakes = false;
//	        		}
//        		}
//        	}
//		} else { // computer ctrls
			yf= Input.GetButton("Fire1");
			if (state.started) {
				xf = Input.GetAxis("Horizontal");
				xfRaw=Input.GetAxisRaw("Horizontal");
			}
			if (!state.cruising) {
				qf = Input.GetButton("jumpAhead");
				if (Input.GetAxisRaw("Vertical")>0) brakes=false; 
				else brakes=true;
			}
//		}
		if (brakeOverride) brakes=false;
	}
	if (!yf) {
		state.jbClear=true;
	}
	if (!qf) {
		qbClear=true;
	}
	if (qf && qbClear && !state.cruising) resetRepoShip();

	
	state.jumpTimer-=Time.deltaTime;
	//if (rigidbody.position.y>highestY) highestY=rigidbody.position.y;

	if(shipNum!=10){	
		// gravity and hop limiting
		if (!state.cruising && !state.crashing)	GetComponent.<Rigidbody>().velocity.y-=(grav*Time.deltaTime);
		actualY=GetComponent.<Rigidbody>().velocity.y;
		if (state.jumpTimer<0 && GetComponent.<Rigidbody>().velocity.y>jumpforce) GetComponent.<Rigidbody>().velocity.y=jumpforce;
		if (state.jumpTimer<-0.5 && GetComponent.<Rigidbody>().velocity.y>1) GetComponent.<Rigidbody>().velocity.y=1;
	// fall off the bottom
		if (GetComponent.<Rigidbody>().position.y<-25.5 && !state.crashing) crash(0);
	
	// double jump
		if (yf && state.jumps>0 && state.jbClear) {
			if (!state.paused) {
				rc =raycheckDown(2);
				if (rc==0) {
					if (state.jumps==1) {
						jump(2);
						state.jumps=2;
						
					}
				}
				else {
					jump(2);
					state.jumps=1;
					
				}
			}
		}
		
	// jump
		if ((yf && state.jbClear) && state.jumps==0 && !state.paused && !state.cruising) {
	//		print("jump!");
		// ** new
			//takeoffZ = rigidbody.position.z;
			jump(1);
			state.jumps=1;
			state.handling=airHandling;
			//highestY=0;
			
		}
		// store some vars from this update cycle for use in the next
		// raycheckDown(2);
		state.lv=GetComponent.<Rigidbody>().velocity;
		deltaY = Mathf.Abs(state.lastY-GetComponent.<Rigidbody>().position.y);
		if (state.grounded && deltaY > 0.01 && deltaY < 0.3) {
			GetComponent.<Rigidbody>().velocity.y=Mathf.Clamp(GetComponent.<Rigidbody>().velocity.y, -20.0, 0.0);
		}
		state.lastY=GetComponent.<Rigidbody>().position.y;
		if (state.landed) {
			state.jumps=0;
			state.landed=false;
			jumpValueTar = 0;
		}
	}
	else {//panther code
		if(state.fullStop!=true){
			if (state.xDisabled==1)  xf = Mathf.Clamp(xf, 0.6 , 4.0);
			else if (state.xDisabled==-1)  xf = Mathf.Clamp(xf, -4.0 , -0.6);
			collLeft=Mathf.Clamp(collLeft-Time.deltaTime, 0, sideJumpTolerance);
			collRight=Mathf.Clamp(collRight-Time.deltaTime, 0, sideJumpTolerance);
			
			if(!state.stopDead){
			
				// forward speed, slow down after crash, and progress
				if (!state.cruising && !state.stunned) { // && state.started) {
					if (!brakes) targetSpeed+=((maxZSpeed-targetSpeed+20)/2)*Time.deltaTime*4.5;
					else targetSpeed-=((targetSpeed+50)/4)*(Time.deltaTime*4.5);
					
				// boost speed, slow down when in air, but clamp it
//					if (state.boosting) {
//						maxZSpeed=Mathf.Clamp(maxZSpeed-35.0*Time.deltaTime, 65, ultraMaxZSpeed);
//						targetSpeed=maxZSpeed;
//						if (maxZSpeed<=defPantherMaxZ) {
//							state.boosting=false;
//							maxZSpeed=defPantherMaxZ;
//						}
//					}
					if (!state.grounded) {
						maxZSpeed=Mathf.Clamp(maxZSpeed-(pantherSlowInAirSpeed*Time.deltaTime), pantherSlowInAirLimit, ultraMaxZSpeed);
					}
					targetSpeed=Mathf.Clamp(targetSpeed, minZSpeed, maxZSpeed);
				}
			
			
			}//end stopdead if
			
			state.progress= transform.position.z;
			
			// gravity and hop limiting
			if (!state.cruising && !state.crashing)	GetComponent.<Rigidbody>().velocity.y-=grav*Time.deltaTime;
			actualY=GetComponent.<Rigidbody>().velocity.y;
			if (state.jumpTimer<0 && GetComponent.<Rigidbody>().velocity.y>jumpforce*jumpMult) GetComponent.<Rigidbody>().velocity.y=jumpforce*jumpMult;
			if (state.jumpTimer<-0.5 && GetComponent.<Rigidbody>().velocity.y>1) GetComponent.<Rigidbody>().velocity.y=1;
			// fall off the bottom
			if (GetComponent.<Rigidbody>().position.y<-25.5 && !state.crashing) crash(0);
		
			// jumps
			if ((yf && state.jbClear) && !state.paused && !state.cruising && !state.stunned) {
				if (!state.grounded) {
					var rcb: int=raycheckDown(2);
					if (rcb>0) {
						//takeoffZ = rigidbody.position.z;	
						jump(1);}
					else {
						var rcf: int = raycheckFront();
						if (rcf>0) { jump(6); }
						else if (collLeft>0.001) {
							jump(3);
						}
						else if (collRight>0.001) {
							jump(4);
						} 
						else if (state.jumps==1) jump(2);}
				}
				else {	
					// ** new
					//takeoffZ = rigidbody.position.z;	
					jump(1);
				}
			}
			
	
		// store some vars from this update cycle for use in the next
			state.lv=GetComponent.<Rigidbody>().velocity;
			state.lastY=GetComponent.<Rigidbody>().position.y;
			if (state.landed) {
				state.jumps=0;
				state.landed=false;
			}
			if (!state.crashing && !state.stunned && !state.winning) {
				GetComponent.<Rigidbody>().velocity.z=targetSpeed;
			}	else GetComponent.<Rigidbody>().velocity.z=Mathf.Lerp(GetComponent.<Rigidbody>().velocity.z, 0.0, Time.deltaTime*6);
			//if (state.boostTimer>0) { var xf2Adj: float = 1-(state.boostTimer/boostTime); }
			// else xf2Adj=1.0;
			xf2 = Mathf.Lerp(xf2, Mathf.Clamp((xf*-20)-GetComponent.<Rigidbody>().velocity.x, -50, 50), Time.deltaTime*8);
		}
	}

		//raycheckSide(0);
		//raycheckSide(1);
		//raycheckFront();
		//raycheckDown(1);

	if (state.crashing && !restarted) {
		if (splode.transform.position.y<cam.transform.position.y) cam.goalHeight=splode.transform.position.y;	
	}
	else if (state.winning){
		cam.goalHeight=warpPath.transform.position.y;	
	}
	else if (!state.cruising) {
	// cam goals
		if (cam.goalHeight<transform.position.y-cam.sensitivity) cam.goalHeight+=1.0;
		//else if (cam.goalHeight>transform.position.y) cam.goalHeight=Mathf.Clamp(transform.position.y, -24, 1000);
		else if (cam.goalHeight>transform.position.y) cam.goalHeight = transform.position.y;	
	}

}

	
function Update(){	
	guiUpdate();
	
	if(gameMaster.worldNum==1 && !state.cruising) if(!topSurface) level10Init();
		
	if (shipNum!=10) {
// forward speed, slow down after crash, and progress
	if(!state.stopDead){
		if (!state.cruising) {// && state.started) {
			if (!brakes) targetSpeed+=((maxZSpeed-targetSpeed+20)/2)*Time.deltaTime*2;
			else targetSpeed-=((targetSpeed+50)/4)*Time.deltaTime*4;
			targetSpeed=Mathf.Clamp(targetSpeed, minZSpeed, maxZSpeed);
		}
		zForce= GetComponent.<Rigidbody>().velocity.z/maxZSpeed;
	}
	state.progress= transform.position.z;
	
	if (!state.crashing && !state.winning) {
		GetComponent.<Rigidbody>().velocity.z=targetSpeed;
			
	}
	else GetComponent.<Rigidbody>().velocity.z=Mathf.Lerp(GetComponent.<Rigidbody>().velocity.z, 0.0, Time.deltaTime*6);
	xf2 = Mathf.Lerp(xf2, (xf*-20)-GetComponent.<Rigidbody>().velocity.x, Time.deltaTime*10);

// start the motion of the ship and the clock when brakes released
	if (!state.started) {
		state.elapsedTime=0;
		if (!brakes) {
			xf=0;
			state.started=true;
			//state.startedTime=Time.time;
			speedUpX();
			speedUpZ();
			if (sfx && engineAudio.activeSelf) engineAudio.GetComponent.<AudioSource>().Play();
		}
	} else if (!state.crashing) {
		state.elapsedTime+=Time.deltaTime/gameMaster.gameSpeed;
		//state.elapsedTime=((Time.time-state.startedTime)/gameMaster.gameSpeed)+state.progressedTime;
	}

// ship engines
	/*
	for (bone in engineBones) {
		rando= Random.Range(-1.4, -1.2);
		bone.localPosition.z=rando;
	}
	
	efRando = Random.Range(0.4, 0.5);
	engineFlare1.localScale=Vector3(efRando, efRando, efRando);
	if (shipNum != 4 && shipNum != 6 && shipNum!=10) engineFlare2.localScale=Vector3(efRando, efRando, efRando);
	*/
	
	if (!state.crashing && !state.cruising) {

// check gateways
		if (transform.position.z>winDist && winDist>0) checkGates();

	}
	
// spacecraft tilt 
	sub.transform.localPosition.y=Mathf.Abs(GetComponent.<Rigidbody>().velocity.x*0.01)+0.8;
	sub.eulerAngles = Vector3(0, -xf2*0.5, xf2);
	
// pitch up down and when to free fall/ take away a jump 
	if (state.jumps>0) {
		xRot = Mathf.Lerp(xRot, -1.5*GetComponent.<Rigidbody>().velocity.y, Time.deltaTime*xRotSpeed);
		sub.eulerAngles.x = Mathf.Clamp(xRot, -50, 40); } 
	else if (GetComponent.<Rigidbody>().velocity.y<-10) {
		if (gameMaster.worldNum==1) level10off();
		xRot=0; xRotSpeed=4;
		state.jumps=1;
		state.grounded=false;
	}
	zForce= GetComponent.<Rigidbody>().velocity.z/maxZSpeed;
	
	if (!state.cruising) GetComponent.<Rigidbody>().velocity.x=Mathf.Lerp(GetComponent.<Rigidbody>().velocity.x, xf*Xspeed, Time.deltaTime*state.handling);
	
	if(sfx && state.started){
		engineAudio.GetComponent.<AudioSource>().pitch = (targetSpeed/ultraMaxZSpeed+.2)*1.4;
		engineAudio.GetComponent.<AudioSource>().volume = 1-(Mathf.Abs(((targetSpeed/ultraMaxZSpeed)*2)-1.1));
	}
}
// else panther code below vv
	else {
		if(!state.fullStop){
			anim["run"].speed=Mathf.Clamp(0.1+targetSpeed/60.0, 0.75, 10);
			anim["lStep"].speed=Mathf.Clamp(0.1+Mathf.Abs(xf2)/30.0, 0.8, 10);
			anim["rStep"].speed=Mathf.Clamp(0.1+Mathf.Abs(xf2)/30.0, 0.8, 10);
			if (targetSpeed<8) 
				if (xf2<-2) anim.CrossFade("rStep", 0.2); 
				else if (xf2>2) anim.CrossFade("lStep", 0.2);
				else anim.CrossFade("idle", 0.2); 
			else anim.CrossFade("run");
		
		// start the motion of the ship and the clock when brakes released
			if (!state.started) {
				//state.elapsedTime=0;
				if (!brakes) {
					xf=0;
					state.started=true;
					//state.startedTime=Time.time;
					speedUpX();
					speedUpZ();
				}
			} else if (!state.crashing) {
				state.elapsedTime+=Time.deltaTime/gameMaster.gameSpeed;
			}
		
		// ship engines
			/*
			for (bone in engineBones) {
				var randob: float= Random.Range(-0.65, -0.55);
				bone.localPosition.z=randob;
			}
			
			var efRandob = Random.Range(0.4, 0.5);
			engineFlare1.localScale=Vector3(efRandob, efRandob, efRandob);
			*/
		if (!state.crashing && !state.cruising && !state.winning) {
			// check gateways
			if (transform.position.z>winDist && winDist>0) checkGates();
		}
			
		// spacecraft tilt
			sub.transform.localPosition.y=Mathf.Abs(GetComponent.<Rigidbody>().velocity.x*0.01)+0.8;
			sub.eulerAngles = Vector3(0, (Mathf.Atan2(-xf2, targetSpeed+1)*Mathf.Rad2Deg)*Mathf.Clamp(((targetSpeed*1.2)/defPantherMaxZ), 0, 1), xf2*0.5);

			//sub.eulerAngles = Vector3(0, -xf2*((40+Mathf.Clamp(targetSpeed, 0, defPantherMaxZ-(1+state.boostTimer*100)))/ultraMaxZSpeed), xf2*0.5);
			//yRot = Mathf.Lerp(yRot, Mathf.Atan2(-xf2*Mathf.Clamp(targetSpeed/40, 0, 1), targetSpeed+1)*Mathf.Rad2Deg, Time.deltaTime*2);
			//sub.eulerAngles = Vector3(0, yRot, xf2*0.5);
		
		// pitch up down and when to free fall/ take away a jump
		if (state.jumps>0 || state.landing) {
			// xRot = Mathf.Lerp(xRot, -1.7*rigidbody.velocity.y, Time.deltaTime*xRotSpeed); 
			if (!state.landing) yv2=GetComponent.<Rigidbody>().velocity.y;
			//else print(yv2);
			xRot = Mathf.Lerp(xRot, -1.7*yv2, Time.deltaTime*xRotSpeed); 
			if (state.fJumping) { sub.eulerAngles.x = Mathf.Clamp(xRot, 0, 90); sub.localPosition.z=Mathf.Clamp(xRot*-0.02, -2, 0); }
			else { sub.eulerAngles.x = Mathf.Clamp(xRot, -70, 90); sub.localPosition.z=Mathf.Clamp(xRot*-0.02, -2, 0); }
		}
		else if (GetComponent.<Rigidbody>().velocity.y<-10) {
			xRotSpeed=6;
			xRot=0;
			state.jumps=1;
			state.grounded=false;
			state.landing=false;
			anim.Rewind("jump"); anim.CrossFade("jump");
			if (gameMaster.worldNum == 1) level10off();
		}

		if (!state.cruising)	GetComponent.<Rigidbody>().velocity.x=Mathf.Lerp(GetComponent.<Rigidbody>().velocity.x, xf*Xspeed, Time.deltaTime*state.handling);

		} else {
			anim.CrossFade("idle", 0.2);
			xf=0;
			GetComponent.<Rigidbody>().velocity.x=0;
		}
		if(engineAudio.activeSelf){
			if(sfx && state.grounded && engineAudio.active && !state.paused && state.started && !state.stopDead && !state.fullStop){
				if(!engineAudio.GetComponent.<AudioSource>().isPlaying) engineAudio.GetComponent.<AudioSource>().Play();
				
				if((targetSpeed/ultraMaxZSpeed) > .7) engineAudio.GetComponent.<AudioSource>().clip = sound.engineSound[2];
				else engineAudio.GetComponent.<AudioSource>().clip=sound.engineSound[1];
			//engineAudio.audio.pitch = (targetSpeed/ultraMaxZSpeed)*1.2;
			//engineAudio.audio.volume = .6;
			//engineAudio.audio.volume = Mathf.Clamp(2-((targetSpeed/ultraMaxZSpeed)*2),.09,1);
			}
			else {
				if(engineAudio.GetComponent.<AudioSource>().isPlaying) engineAudio.GetComponent.<AudioSource>().Stop();
			}
		}
	}

	if(!state.paused){
//		if (gameMaster.device==DeviceType.iPhone) {	
//			for (touch in Input.touches) {  
//				 if (touch.position.x>Screen.width/4 && touch.position.x<Screen.width-(Screen.width/4)) {   
//		            if  (Mathf.Abs(touch.deltaPosition.y) > 10){
//		            	//Application.LoadLevel(0);	
//		            	
//		            	if (!state.paused && !state.cruising && !state.crashing) { 
//							Time.timeScale=0.0; state.paused=true; gui.switchGUI("paused"); if (sfx && engineAudio.active) engineAudio.GetComponent.<AudioSource>().Stop();//gui.inputWait(.5); 
//						}
//						//	else { Time.timeScale=1.0; state.paused=false; paused=false; 
//						//}
//		            }
//				}
//			}
//		}else{
			if(Input.GetButton("pause")){
				if (!state.paused && !state.cruising && !state.crashing) { 
					Time.timeScale=0.0; state.paused=true; gui.switchGUI("paused"); if (sfx && engineAudio.active) engineAudio.GetComponent.<AudioSource>().Stop();
				}
			}
//		}
	}
}

function vcfly() {
	var timer: float = 1.0;
	var oldZ: float = 0;
	var goalZtemp: float = 0 ;

	while (state.cruising) {
		if (shipNum==10) anim.Play("fly");
		timer-=Time.deltaTime;
		if (timer<0) {
			oldZ=goalZtemp;
			do { goalZtemp=oldZ+Random.Range(-8.0, 8.0);
			} while (goalZtemp<-12 || goalZtemp>12);
			timer=Random.Range(1.0, 3.5)*(Mathf.Abs(oldZ-goalZtemp)/8);
			//print("diff: "+Mathf.Abs(oldZ-goalZtemp)+" +time: "+timer);
		}
		GetComponent.<Rigidbody>().rotation=Quaternion.Slerp(GetComponent.<Rigidbody>().rotation, Quaternion.Euler(0,0,goalZtemp), Time.deltaTime*2);
		GetComponent.<Rigidbody>().position.y=Random.Range(2.995, 3.005);
		//anim2.transform.position.y=Random.Range(2.99, 3.01);

		yield;		
	}
}

function guiUpdate(){
	
	if(!state.stopDead)brakeValue = -0.5*(state.lv.z/ultraMaxZSpeed);
	else brakeValue= 0;
	
	speedbarMat.mainTextureOffset.y = Mathf.Lerp(speedbarMat.mainTextureOffset.y, brakeValue, Time.deltaTime*15);
	
	jumpValueTar=state.jumps*.25;
	
	
	if (jumpValue!=jumpValueTar){
		if(jumpValue<jumpValueTar){
		/*
			if(shipNum==10 && state.jumps==2) {
				if(state.boostTimer>0) jumpValue += Time.deltaTime/2.45 ;
			}
			else*/ jumpValue += Time.deltaTime*1.1;	
		}else{ 
			jumpValue -= Time.deltaTime*2;
		}
		if(jumpValueTar==0) jumpValue = Mathf.Clamp(jumpValue, 0, 0.2);
		else if(jumpValueTar==0.25) jumpValue = Mathf.Clamp(jumpValue, 0, 0.25);
		else if(jumpValueTar==0.5) jumpValue = Mathf.Clamp(jumpValue, 0.3, 0.5);
	}
	//print(jumpValue);
	jumpBarMat.mainTextureOffset.y = jumpValue;	
	//progBar.transform.localScale.x = Mathf.Clamp(state.progress/winDist,0,1);
}

function level10off(){
	topSurface.GetComponent.<Animation>().Play("10_off");	
	sideSurface.GetComponent.<Animation>().Play("10_off");	
	frontSurface.GetComponent.<Animation>().Play("10_off");
	//shipLight10s.animation.Play("10_light_off");
}


function jump(which: int) { // 1: single  2: doubleJump  3: left wall jump  4: right wall jump  5: panther boost 6: front wall jump
	//print("which = "+which);
	state.jbClear=false;
	state.grounded = false;
	state.landing=false;
	state.handling=airHandling;
	GetComponent.<Rigidbody>().position.y+=0.4;
	xRot=0; xRotSpeed=25;
	if (which==1) {
		playSound("jump");
		if (gameMaster.worldNum == 1) level10off();		
	}
	else if (shipNum!=10) playSound("jump2");
	else if (shipNum==10){
		if(which==2) playSound("jump2");
		else playSound("jump");
	}
	if (shipNum==10) {
		if (which==1) { 
			// for inclines
			if (actualY>0) {
				jumpMult=pantherSJumpMult+(actualY*0.05);
				print("incline Jump! +"+(actualY*0.05));
			} else	jumpMult=pantherSJumpMult; 
			GetComponent.<Rigidbody>().velocity.y=jumpforce*jumpMult; 
			maxZSpeed-=pantherSJumpPenalty;
			anim.Stop("jump"); anim.Play("jump"); 	
			state.jumps=1; 
		}
		else if (which==2) 	{ anim.Stop("doubleJump"); anim.Play("doubleJump"); jumpMult=pantherDJumpMult; maxZSpeed-=pantherDJumpPenalty; GetComponent.<Rigidbody>().velocity.y=jumpforce*pantherDJumpMult; state.jumps=2; }
		else if (which==4) {
			//	print ("Rjump");
			// anim.Stop();
			// anim.Play("doubleJump");
			maxZSpeed=defPantherMaxZ;
			jumpMult=1.3;
			GetComponent.<Rigidbody>().velocity.y=jumpforce*jumpMult;
			anim.Play("rJump");
			collRight=0.0;
			disableX(-1);
			GetComponent.<Rigidbody>().position.x-=1.0;
			GetComponent.<Rigidbody>().velocity.x=-25+(8*xfRaw);
			//print(-25+(8*xfRaw));
			xf2=40;
			//xf=0;
			state.jumps=1;
		}
		else if (which==3) {
			// print ("Ljump");
			// anim.Stop();
			// anim.Play("doubleJump");
			maxZSpeed=defPantherMaxZ;
			jumpMult=1.3;
			GetComponent.<Rigidbody>().velocity.y=jumpforce*jumpMult;
			anim.Play("lJump");
			collLeft=0.0;
			disableX(1);
			GetComponent.<Rigidbody>().position.x-=1.0;
			GetComponent.<Rigidbody>().velocity.x=25+(8*xfRaw);
			//print(25+(8*xfRaw));
			xf2=-40;
			//xf=0;
			state.jumps=1;
		} 
		/*
		else if (which==5) {
			jumpMult=1.0;
			//anim.Play("boost"); 
			anim.CrossFade("boost", 0.1); 
			//speedUpX();
			rigidbody.velocity.y=jumpforce*0.25;
			maxZSpeed=defPantherMaxZ+boostZ;
			state.jumps=2;
		}*/
		else if (which==6) {
			state.fJumping=true;
			jumpMult=2.0;
			anim.Stop("fJump"); anim.Play("fJump"); 	GetComponent.<Rigidbody>().velocity.y=jumpforce*jumpMult; state.jumps=1;
			//rigidbody.position.z-=1.0;
			//rigidbody.velocity.z=-30;
			bounceBack();
		}
	} else { // for normaL ships
		// for inclines
		if (actualY>0 && state.grounded) {
			jumpMult=1.04+(actualY*0.07);
			print("incline Jump! +"+(actualY*0.07));
		} else	jumpMult=1.04; 
		GetComponent.<Rigidbody>().velocity.y=jumpforce*jumpMult;
	}

	
	if(which>0 && which<=2){
		jumpCards(which,Time.time);
	}
	state.jumpTimer=0.06;
}

function jumpCards(which: int, startTime: float) { // which 2 means mirror the card in x
	if (which==2) airBurstScript.transform.localScale.x*=-1;
	airBurstScript.cardGo=true;
	airBurstScript.startTime=startTime;
	//print("ship y = "+shipObj.transform.position.y);
	airBurstScript2.yPos = shipObj.transform.position.y;
}

function winCards(pos: Vector3) { // makes cam flare and path after win gate

	elecBurst[0].transform.position = pos;	
	elecBurst[1].transform.position = GetComponent.<Rigidbody>().position;
	
	warpPath.transform.position = Vector3(GetComponent.<Rigidbody>().position.x,GetComponent.<Rigidbody>().position.y,GetComponent.<Rigidbody>().position.z-5);
	warpPathAniObj.GetComponent.<Animation>().Play("warpPath");
	
	for	(i=0; i<2; i++) {
		elecBurstScript[i].cardGo = true;
		elecBurstScript[i].startTime=Time.time;
	}

}



function ArtiBurst(pos: Vector3) { // makes cam flare when artifact is collected
	if (sfx) GetComponent.<AudioSource>().PlayOneShot(sound.artSound);
	artBurst.transform.position = pos;
	artBurst.transform.parent=camTrans;
	artBurstScript.startTime=Time.time;
	artBurstScript.cardGo=true;
	yield WaitForSeconds(1);
	artBurst.transform.parent=null;
	artBurst.transform.position = Vector3(0,0,-100);

}


function OnCollisionEnter (collision : Collision) {
	if (collision.gameObject.tag=="Kill"  && !state.crashing) crash(0);
	if (!state.grounded) {
		//print("checkLanding: "+state.lv.y);
		//if (state.jumpTimer<-0.3) {  checkLanding(); }
		if (state.lv.y<-1) {  checkLanding(); }
	}
}

function OnCollisionStay() {
	if (!state.grounded) {
		//if (state.jumpTimer<-0.3) {  checkLanding(); }
		if (state.lv.y<-1) {  checkLanding(); }
		//checkLanding();
	}
}


function checkSides() {
	var cc: int = raycheckSide(0);	
	if (cc>0) {
		state.jumps=0;
		//state.contactTimerL=10;
		return "left";
	}
	cc = raycheckSide(1);
	if (cc>0) {
		state.jumps=0;
		return "right";
		//state.contactTimerR=10;
	}
	return "none";
}


function checkLanding() {
	//print("landingCheck");
	cc = raycheckDown(1);	
	if (cc>0 || fakeCC==true) {
		state.fJumping=false;
		state.jumps=0;
		state.landed=true;
		state.grounded=true;
		airBurstScript.Reset();
		state.handling=defaultHandling;
		playSound("land");
		if (shipNum!=10) {
			anim.Play("hop2");
			anim.PlayQueued("idle");
			sub.localEulerAngles.x=0;
		} else {
			if (maxZSpeed<defPantherMaxZ) maxZSpeed=defPantherMaxZ;
			jumpMult=1.0;
			// print("start landing");
			adjustyv2();
			anim.Stop();
			anim.Rewind("run");
			anim.Play("land");
			anim.PlayQueued("run");
		}

		GetComponent.<Rigidbody>().velocity.y=0;
		//sub.localEulerAngles.x=0;
		if (!state.cruising) cam.goalHeight=state.lastY;
	}
	if (gameMaster.worldNum == 1) if (state.grounded==true) level10on();
	cc=0;
	fakeCC=false;
}

function level10on(){
	topSurface.GetComponent.<Animation>().Play("10_on");	
	sideSurface.GetComponent.<Animation>().Play("10_on");	
	frontSurface.GetComponent.<Animation>().Play("10_on");
	//shipLight10s.animation.Play("10_light_on");
	yield WaitForSeconds(.3);
	if(!topSurface.GetComponent.<Animation>().isPlaying) topSurface.GetComponent.<Animation>().Play("10_idle");	
	if(!sideSurface.GetComponent.<Animation>().isPlaying)sideSurface.GetComponent.<Animation>().Play("10_idle");	
	if(!frontSurface.GetComponent.<Animation>().isPlaying)frontSurface.GetComponent.<Animation>().Play("10_idle");
	//if(!shipLight10s.animation.isPlaying)shipLight10s.animation.Play("10_light_idle");
}


function OnTriggerEnter(collision : Collider) {
	if (collision.gameObject.name=="camDropBox") state.tunnel = true;
	if (collision.gameObject.name=="camDropBox2") state.tunnel2 = true;
	if (collision.gameObject.tag=="artifact" && collision.transform.position.z>0) { // >0 necessary to stop double collisions and therefore playing the second at -100, for some reason
		ArtiBurst(collision.transform.position);
		collision.transform.position.z=-100;
		if (collision.gameObject.name=="artifact1") {
			if(!gui.a1state) artCount+=100;
			gui.a1state=1;
			a1.UV.x = 480;
		}
		if (collision.gameObject.name=="artifact2") {
			if(!gui.a2state) artCount+=10;
			gui.a2state=1;
			a2.UV.x = 480;
		}
		if (collision.gameObject.name=="artifact3") {
			if(!gui.a3state) artCount+=1;
			gui.a3state=1;
			a3.UV.x = 480;
		}
		else if (collision.gameObject.name=="artifact0") { // special for tutorial
			gui.a1state++;
		//	if (gui.a1state==0) gui.a1state=1;
		//	else if (gui.a2state==0) gui.a2state=1;
		//	else if (gui.a3state==0) gui.a3state=1;
		}
	}
}

function OnTriggerExit(collision: Collider) {
	if(!state.crashing){
		if (collision.gameObject.name=="camDropBox") state.tunnel = false;
		if (collision.gameObject.name=="camDropBox2") state.tunnel2 = false;
	}
}

function raycheckDown(which: int) {
	var hit : RaycastHit;
	var xRad: float = 0.9;
	var zRad: float = 0.8;
	var yRad: float = 0.9;
	var rayDist: float = 0.73;
	if (which==2) rayDist=1.2;
	var pos = transform.position;
	var count: int = 0;
	Debug.DrawRay(Vector3(pos.x+xRad, pos.y+yRad, pos.z+zRad), -Vector3.up*(rayDist), Color.green);
	Debug.DrawRay(Vector3(pos.x-xRad, pos.y+yRad, pos.z+zRad), -Vector3.up*(rayDist), Color.green);
	Debug.DrawRay(Vector3(pos.x+xRad, pos.y+yRad, pos.z-zRad), -Vector3.up*(rayDist), Color.green);
	Debug.DrawRay(Vector3(pos.x-xRad, pos.y+yRad, pos.z-zRad), -Vector3.up*(rayDist), Color.green);
	//cast 4 down
	if (Physics.Raycast (Vector3(pos.x+xRad, pos.y+yRad, pos.z+zRad), -Vector3.up, hit, rayDist)) if(hit.collider.tag!="Kill") count++;
	if (Physics.Raycast (Vector3(pos.x-xRad, pos.y+yRad, pos.z+zRad), -Vector3.up, hit, rayDist)) if(hit.collider.tag!="Kill") count++;
	if (Physics.Raycast (Vector3(pos.x+xRad, pos.y+yRad, pos.z-zRad), -Vector3.up, hit, rayDist)) if(hit.collider.tag!="Kill") count++;
	if (Physics.Raycast (Vector3(pos.x-xRad, pos.y+yRad, pos.z-zRad), -Vector3.up, hit, rayDist)) if(hit.collider.tag!="Kill") count++;
	
	if (gameMaster.worldNum == 1) if(count>0) level10on();
	
	return count;
}

function raycheckSide(which: int) { // 0 = left check.  1 = right check
	var hit : RaycastHit;
	var zRad: float = 1.0;
	var yH: float = 0.5;
	var rayDist: float = 1.5;
	var pos = transform.position;
	var count: int = 0;
	if (which==0) { // left
		Debug.DrawRay(Vector3(pos.x, pos.y+yH, pos.z+zRad), -Vector3.right*(rayDist), Color.green);
		Debug.DrawRay(Vector3(pos.x, pos.y+yH, pos.z-zRad), -Vector3.right*(rayDist), Color.green);
		if (Physics.Raycast (Vector3(pos.x, pos.y+yH, pos.z+zRad), -Vector3.right, hit, rayDist)) count++;
		if (Physics.Raycast (Vector3(pos.x, pos.y+yH, pos.z-zRad), -Vector3.right, hit, rayDist)) count++;
	}
	else if (which==1) { // right
		Debug.DrawRay(Vector3(pos.x, pos.y+yH, pos.z+zRad), Vector3.right*(rayDist), Color.green);
		Debug.DrawRay(Vector3(pos.x, pos.y+yH, pos.z-zRad), Vector3.right*(rayDist), Color.green);
		if (Physics.Raycast (Vector3(pos.x, pos.y+yH, pos.z+zRad), Vector3.right, hit, rayDist)) count++;
		if (Physics.Raycast (Vector3(pos.x, pos.y+yH, pos.z-zRad), Vector3.right, hit, rayDist)) count++;
	}

	return count;
}


function raycheckFront() {
	var hit : RaycastHit;
	var xRad: float = 0.9;
	var zRad: float = 0.5;
	var yRad: float =1.6;
	var rayDist: float = 4.0;
	var pos = transform.position;
	var count: int = 0;
	Debug.DrawRay(Vector3(pos.x+xRad, pos.y+0.5, pos.z+zRad), Vector3.forward*(rayDist), Color.green);
	Debug.DrawRay(Vector3(pos.x-xRad, pos.y+0.5, pos.z+zRad), Vector3.forward*(rayDist), Color.green);
	Debug.DrawRay(Vector3(pos.x+xRad, pos.y+yRad, pos.z+zRad), Vector3.forward*(rayDist), Color.green);
	Debug.DrawRay(Vector3(pos.x-xRad, pos.y+yRad, pos.z+zRad), Vector3.forward*(rayDist), Color.green);
	//cast 4 down
	if (Physics.Raycast (Vector3(pos.x+xRad, pos.y+0.5, pos.z+zRad), Vector3.forward, hit, rayDist)) count++;
	if (Physics.Raycast (Vector3(pos.x-xRad, pos.y+0.5, pos.z+zRad), Vector3.forward, hit, rayDist)) count++;
	if (Physics.Raycast (Vector3(pos.x+xRad, pos.y+yRad, pos.z+zRad), Vector3.forward, hit, rayDist)) count++;
	if (Physics.Raycast (Vector3(pos.x-xRad, pos.y+yRad, pos.z+zRad), Vector3.forward, hit, rayDist)) count++;
	if (Physics.Raycast (Vector3(pos.x, pos.y+1, pos.z+zRad), Vector3.forward, hit, rayDist)) count++;
	return count;
}

function crash(type: int) { //type: 0=wall hit, 1=falling death (no sound or splode or wait)
	var secs: float = 0.0;
	shad.enabled=false;
	state.crashing=true;	
	shad.enabled=false;
	cam.goalZ=GetComponent.<Rigidbody>().position.z+2;
	//print(rigidbody.position);
	cam.mode="stop";
	minZSpeed = 0;
	targetSpeed=0;
	xf=0;	
	brakes=true;

	if (type==0) {	
		playSound("explode");
		splode.transform.position = GetComponent.<Rigidbody>().position;
//		splodeParticles.GetComponent.<ParticleEmitter>().emit = true;
		splodeScript.lookAtCam = true;
		splodeScript.cardGo = true;
		//splodeScript.FPS=30*(1/gameMaster.gameSpeed);
		splodeScript.startTime = Time.time;
		secs=1.55;
	}
	levelAttempts++;
	var posStore: Vector3 = GetComponent.<Rigidbody>().position;
	GetComponent.<Rigidbody>().position.y=1000;
	// rigidbody.position.z-=10;
	GetComponent.<Rigidbody>().velocity.z=0;
	yield WaitForSeconds(0.2);
	explosionMark.transform.position=posStore; 
	var exploSub: Transform = explosionMark.transform.Find("shadowProjectorExplosion");
	exploSub.localEulerAngles.z=Random.Range(0,360);
	yield WaitForSeconds(secs);
	reset(0);
}

function win() {
	//artCount=(gui.a1state*100)+(gui.a2state*10)+gui.a3state;
	var ultimateWin: boolean = false;
	PlayerPrefs.SetInt("Level"+level+"ArtCount", artCount);
	
	if (shipNum==10) if (gameMaster.pantherFlagScript.on==1) {
		PlayerPrefs.SetInt(("Level"+level+"PantherFlag"), 1);
		print("panther woooooo");	
	}
	//curTime = state.elapsedTime;
//	print("current time: "+curTime);
//	print("record time: "+PlayerPrefs.GetFloat("Level"+level+"Time", 60.00));
//	print("artifact: "+artCount);
	if (gameMaster.saveTime(gui.curTime)) newRecord=true; // savetime here. Like panthers and artifacts, must set player prefs before deciding whether to victory cruise or outro
	else newRecord=false;
	// print ("Level: "+level+"   Time: "+gui.curTime);
	playSound("win");
	cam.mode="stop";
	state.winning=true;
	if (sfx && engineAudio.active) engineAudio.GetComponent.<AudioSource>().Stop();
	minZSpeed = 0;
	targetSpeed=0;
	xf=0;
	cam.goalZ=warpPath.transform.position.z+7;
	
	GetComponent.<Rigidbody>().position.y=1000;
	yield WaitForSeconds(2.5);
	gui.camBlack("down");
	yield WaitForSeconds(blackerPause);

// ultimate win conditions
	if (gameMaster.gamePhase<2) { // <2 means Safe for the unlikely eventuality that someone beats the last level and gets the last artifact on the same run!
		// nested ifs so it doesn't run count___ for everything, every time
		if (gameMaster.countArtifacts()==180) {
			ultimateWin=true;
			PlayerPrefs.SetInt("GamePhase", 2);
			gameMaster.gamePhase=2;
			PlayerPrefs.SetInt("ShipNum", 10);
			PlayerPrefs.SetInt("Level", 61);
			PlayerPrefs.SetInt("TutorialState", 2);
			PlayerPrefs.SetInt("CinemaState", 4);
			PlayerPrefs.SetInt("Quit", 1);
			// print("goto Outro 2");	
			Application.LoadLevel(4);	} 
		if (gameMaster.gamePhase==0) {
			//print("Levels beaten: "+gameMaster.countLevels());
			if (gameMaster.countLevels()==60) {
				ultimateWin=true;
				PlayerPrefs.SetInt("GamePhase", 1);
				PlayerPrefs.SetInt("MaxLevel", 59);
				gameMaster.gamePhase=1;
				PlayerPrefs.SetInt("CinemaState", 3);
				PlayerPrefs.SetInt("Quit", 1);
				//print("goto Outro 1");
				Application.LoadLevel(3);	} } }
	else if (gameMaster.gamePhase==2) { 
		if (gameMaster.countPanthers()==60) {
			ultimateWin=true;
			PlayerPrefs.SetInt("GamePhase", 3);
			PlayerPrefs.SetInt("CinemaState", 5);
			gameMaster.gamePhase=3; // no longer counting panthers
			PlayerPrefs.SetInt("Quit", 1);
			Application.LoadLevel(6); } }
	// else {
	if (!ultimateWin) {
		if (level<60) victoryCruise();
	
		if (level>=60 && level<=61) {	
			if (PlayerPrefs.GetInt("FromLS", 0)==1) {
				PlayerPrefs.SetInt("Quit",2);
				Application.LoadLevel(0);
			} else {
				if (level==60){
					//gameMaster.level=0;
					PlayerPrefs.SetInt("Level", 0);
					Application.LoadLevel(1);	
				}
				if (level==61){
					PlayerPrefs.SetInt("Quit", 2);
					Application.LoadLevel(0);
				}
			}
	
		}	
	}
}

function victoryCruise() {
	Time.timeScale=1;
	disableGUI();
	System.GC.Collect();
	gui.updateVC();
	gui.switchGUI("victoryCruise");
	RenderSettings.fogStartDistance  = 10;
	RenderSettings.fogEndDistance  = 300;
	//rigidbody.isKinematic=true;
	playSound("vc");
	anim.Stop();
	state.winning=false;
	state.cruising=true;
	state.crashing=false;
	state.jumps=2;
	vcfly();
	cam.goalHeight=0;
	if (newRecord) cam.newRecordCheck = true;
	//print("Attempts: "+ levelAttempts);
	//boosterLightSwitch(false);
	gameMaster.incrementLevel();
	//gameMaster.bgScript.switchTo("win");
	Destroy(gameMaster.bgScript.currBG.gameObject);
	gameMaster.killLevel();
	// cam.VCnumbers(state.elapsedTime);
	anim2.Play("winCruise1");	
	repoShip();	
	// rigidbody.position.x=Random.Range(-130,130);
	GetComponent.<Rigidbody>().position.x=0;
	cam.switchTo("win");
	gui.message="none";
	explosionMark.transform.position=Vector3(0,0,-50);
//	gui.updateVC();
//	gui.switchGUI("victoryCruise");
	
	targetSpeed=0;
	//make star streaks
	warpTubeObj= Instantiate(warpTubePF, Vector3(0, 0, 0), Quaternion.identity) as Transform;
	// make star lights
	//cruiseLightsObj=Instantiate(cruiseLightsPF, Vector3(0, 1, -10), Quaternion.identity) as Transform;
	for(i=1; i<=20; i++){
		shipWarpRefl[i] = Resources.Load("ship/world"+gameMaster.worldNum+"_warpRefl/world"+gameMaster.worldNum+"_warpRefl_"+i);
	}
	InvokeRepeating("ReflectWarpTube",0,0.04);
	//var lsScript: LightShooter = cruiseLightsObj.GetComponent(LightShooter);
	//lsScript.worldNum=gameMaster.worldNum;
	// cruiseLightsObj.parent = cam.transform;
	//cruiseLightsObj.localPosition = Vector3(0, 1, -10);	
	gui.resetVC();
	
	gui.camBlack("up");
	gui.playAnim(1.9);
}

function ReflectWarpTube(){
	shipMat.SetTexture("_Shad", shipWarpRefl[f]);
	f++;
	if(f>20) f=1;
}

function enableGUI(){
	if (gui.state=="play" && level<60){
		for(i=0;i<guiObjs.Length;i++){
			guiObjs[i].Enabled = true;
			guiObjs[i].Visible = true;
		}
	}else{
		for(i=0;i<guiObjs.Length;i++){
			if(guiObjs[i].name=="Brake" || guiObjs[i].name=="Jump") {
				guiObjs[i].Enabled = true;
				guiObjs[i].Visible = true;
			}else{
				guiObjs[i].Enabled = false;
				guiObjs[i].Visible = false;
			}
		}
	}
	guiCam.enabled=true;
	//speedbarMat.color.a = 100;
	//jumpBarMat.color.a = 100;
}

function disableGUI(){
	for(i=0;i<guiObjs.Length;i++){
		guiObjs[i].Enabled = false;
		guiObjs[i].Visible = false;
	}
	guiCam.enabled=false;
	//speedbarMat.color.a = 0;
	//jumpBarMat.color.a = 0;
}

function titleScreen() {
	disableGUI();
	musicSourceScript.StopTrack();
	if(gameMaster.worldNum!=1){
		RenderSettings.fogStartDistance  = 110;
		RenderSettings.fogEndDistance  = 190;
	}
	else{
		RenderSettings.fogStartDistance  = 150;
		RenderSettings.fogEndDistance  = 300;	
	}
	state.cruising=true;
	state.crashing=false;
	state.jumps=2;
	cam.goalHeight=-1;
	targetSpeed=0;
	cam.switchTo("title");
	anim2.Play("titleCruise");	
	repoShip();	
	if (sfx && engineAudio.active) engineAudio.GetComponent.<AudioSource>().Stop();
	GetComponent.<Rigidbody>().position=Vector3(0, 1000, 0);
	gui.camBlack("up");	
}

function repoShip() {
	//print("repoShip");
	xf=0;
	grav=0;
	targetSpeed = 0;
	GetComponent.<Rigidbody>().velocity=Vector3(0,0,0);
	GetComponent.<Rigidbody>().position=gameMaster.startPos+Vector3(0, 5, 0);	
	state.lastY=GetComponent.<Rigidbody>().position.y;
	GetComponent.<Rigidbody>().rotation=Quaternion.identity;
	anim2.transform.localPosition.z=0;
	
 	//sparksAnim[1].Play("scaleOut");
	//sparkLights[1].enabled=false;
	//sparksAnim[0].Play("scaleOut");
	//sparkLights[0].enabled=false; 
	yield WaitForSeconds(blackerPause);
	grav=defGrav;
	state.grounded=false;
	state.jumpTimer=0.25;
}


function resetRepoShip() {
	//print("repoShip");
	qbClear=false;
	xf=0;
	grav=0;
	targetSpeed = 0;
	GetComponent.<Rigidbody>().velocity=Vector3(0,0,0);
	GetComponent.<Rigidbody>().position=gameMaster.resetPos[gameMaster.rPointCounter]+Vector3(0, 5, 0);	
	state.lastY=GetComponent.<Rigidbody>().position.y;
	GetComponent.<Rigidbody>().rotation=Quaternion.identity;
	anim2.transform.localPosition.z=0;
	yield WaitForSeconds(blackerPause);
	grav=defGrav;
	state.grounded=false;
	state.jumpTimer=0.25;
	gameMaster.rPointCounter++;
}
/*
function boosterLightSwitch(which: boolean) {
	for (var lite: Light in boosterLights) {
		if (lite) lite.enabled=which;
	}
}
*/

function level10null(){
	topSurface = null;
	sideSurface = null;
	frontSurface = null;
	//shipLight10s = null;	
}

function level10Init(){
	topSurface = gameObject.Find("topSurfaces");
	sideSurface = gameObject.Find("sideSurfaces");
	frontSurface = gameObject.Find("frontSurfaces");
	//var shipLightTemp : GameObject = gameObject.Find("/Ship/ShipLighting1(Clone)/bottomLight");
	//shipLight10s = shipLightTemp.GetComponent(Light);
}

function reset(type: int) { // 0: regular 1: after victory cruise 2: vary beginning 3: skip title check
	System.GC.Collect();
	if(gameMaster.worldNum==1) level10null();
	//print("reset("+type+")...");
	if (type!=2) {
		gui.camBlack("down");
		//gui.camBlack("in");
		yield WaitForSeconds(blackerPause);
		//Destroy(splodeInst);
	}

	if (warpTubeObj) {
		levelAttempts=1;
		Destroy(warpTubeObj.gameObject);
		//Destroy(cruiseLightsObj.gameObject);
		//boosterLightSwitch(true);	
	}
	if (restarted) {
		levelAttempts++;
		restarted=false;
	}
	if (gui.state=="tutorial") gui.lineCount=-1;
	//state.stoppedTime = 0;
	level=gameMaster.level;
	artCountSaved=PlayerPrefs.GetInt(("Level"+level+"ArtCount"), 000);	
	Xspeed=0;	
	state.started=false;
	state.elapsedTime=0;
	state.stopDead=false;
	state.fullStop=false;
	gameMaster.killLevel();
	state.jumpStore=false;
	minZSpeed = 0;
	brakeOverride=false;
	targetSpeed = 0.0;
	gameMaster.updateWorld();
	if (sfx && engineAudio.active) engineAudio.GetComponent.<AudioSource>().Stop();
	
	CancelInvoke("ReflectWarpTube");
	for(i=1; i<=20; i++){
		shipWarpRefl[i] = null;
	}
	shipMat.SetTexture("_Shad", Resources.Load("ship/world"+gameMaster.worldNum+" Refl"));
	// gui.VCbuttonState=0;
	
	state.tunnel = false;
	state.tunnel2 = false;
	jumpMult=1.0;
	
	resetCards();
	explosionMark.transform.position=Vector3(0,0,-50);
		
	if (gameMaster.level%10==0 && levelAttempts==1 && type!=3 && gameMaster.worldNum!=6) {
		titleScreen();
		gui.switchGUI("clear");
	} else {
		if (gameMaster.worldNum==6) gui.switchGUI("tutorial");
		else gui.switchGUI("play");
		disableGUI();
		enableGUI();
		state.title=false;
		
		if (gameMaster.worldNum==5 || gameMaster.worldNum==1) RenderSettings.fogStartDistance  = 100; 
		else RenderSettings.fogStartDistance  = 10;
		RenderSettings.fogEndDistance  = 300;
		//engineAudio.audio.Play();
		shad.enabled=true;
		state.crashing=false;
		state.cruising=false;
		state.jumps=2;
		state.landed=false;
		gui.message="none";
		gameMaster.makeLevel();
		xf=0;
		sub.rotation=Quaternion.Euler(0,0,0);
		cam.switchTo("play");
		//gameMaster.bgScript.switchTo("play");
		anim2.Stop();
		if (shipNum==10) { anim.Stop("jump"); anim.Play("jump"); } // start panther out mid-jump rather than standing
		else anim.Play("idle");
		yf= false;
		state.jbClear=true;
		//repoShip();
		brakes=true;
		musicSourceScript.SetTrack();
	}
	artCount=artCountSaved;
	UpdateArtIcons();
	System.GC.Collect();
	
	
	gameMaster.resetEasy();
	if (gameMaster.worldNum == 1) level10Init();
}

function checkGates() {
	for (var gate: Transform in gameMaster.gateways) {
		if (gate && !state.winning) {
			var dist = Vector3.Distance(gate.position+Vector3(0, 3, 0), transform.position);
			if (dist<gateDist)  { winCards(gate.position); win();}
		}
	}
}

function stopDead() {
	if(!state.stopDead){
		print("Stoppin....Dead");
		playSound("land");
		
		state.stopDead=true;
		GetComponent.<Rigidbody>().velocity.z=0;
		minZSpeed=0;
		targetSpeed=0;
	}
}

function bounceBack() {

		GetComponent.<Rigidbody>().position.z-=1.0;
		GetComponent.<Rigidbody>().velocity.z=-30;
		//rigidbody.velocity.x=0;
		targetSpeed=0;
		state.stunned=true;
		yield WaitForSeconds(0.2);
		state.stunned=false;
}

function resetCards(){
	//reset explosion
	//if (splodeInst) Destroy(splodeInst);
	//splodeInst = Instantiate(splode, Vector3(0,0,-100), Quaternion.identity) as GameObject;
	splode.transform.localEulerAngles =  Vector3(336,180,180);
	splode.transform.position = Vector3(0,0,-100);
	splodeScript = splode.GetComponentInChildren(CardAnim);
	splodeParticles = splode.GetComponentInChildren(ParticleEmitter);
//	splodeParticles.GetComponent.<ParticleEmitter>().emit = false;
	//reset win cards
	for (i=0;i<2;i++) {
		elecBurst[i].transform.parent = null;
		elecBurst[i].transform.position = Vector3(0,0,-100);
	}
	warpPath.transform.position = Vector3(0,0,-100);
	warpPathAniObj.GetComponent.<Animation>().Rewind("warpPath");
}

function playSound(which: String) { // jump, land, win, explode
	if (sfx==1) {
		if (which=="jump") {
			if(shipNum!=10){
				rando = Random.Range(0, 2);
				GetComponent.<AudioSource>().PlayOneShot(sound.jump[rando]);
			}else{
				GetComponent.<AudioSource>().PlayOneShot(sound.jump[4]);
			}
		}
		if (which=="jump2") {
			if(shipNum!=10) GetComponent.<AudioSource>().PlayOneShot(sound.jump[2]);
			
			else GetComponent.<AudioSource>().PlayOneShot(sound.jump[5]);
		}
		else if (which=="land") {
			GetComponent.<AudioSource>().PlayOneShot(sound.metalHit);
		}
		else if (which=="explode") {
			rando = Random.Range(0, 2);
			GetComponent.<AudioSource>().PlayOneShot(sound.explosion[rando]);
		}
		else if (which=="win") {
			GetComponent.<AudioSource>().PlayOneShot(sound.winGate);
		}
		else if (which=="vc"){
			if(shipNum!=10)GetComponent.<AudioSource>().PlayOneShot(sound.VCsound[0]);
			else GetComponent.<AudioSource>().PlayOneShot(sound.VCsound[1]);
		}
	}
}


function speedUpX() {
	for (var i: int=0; i<=maxXspeed; i++) {
		Xspeed=i;
		yield WaitForSeconds(0.01);
	}
}

function speedUpZ() {
	brakeOverride=true;
	while (minZSpeed<minZBrake) {
		minZSpeed=Mathf.Clamp(targetSpeed, 0, minZBrake);
		yield;
	}
	minZSpeed=minZBrake;
	brakeOverride=false;
}

function disableX(which: int) {
	state.xDisabled=which;
//	state.handling=2;
	for (var i: int=1; i<=maxXspeed; i++) {
		//Xspeed=i;
		//xfLim=which/i;
		if (i<12) state.handling=maxXspeed/i;
		if (i==12)	state.xDisabled=0;
		yield WaitForSeconds(0.01);
		if (i==maxXspeed) {
			if (!state.grounded) state.handling=airHandling;
		}
	}
}
