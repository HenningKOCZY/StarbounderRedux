var touchPhase: String = "None";
var nextGo: boolean= true;
var deltaPos: Vector2;
var lastPos: Vector2;
var beganPos: Vector2;
var endedPos: Vector2;
var checkButton: int = 0;

var swiping: boolean=false;

var pantherIcon: Texture2D[];
var pantherFlag: int[];
var section1: Texture2D;
var section2: Texture2D;
var menuButton: Texture2D;
var dash: Texture2D;
var nextButton: Texture2D;
var arrow: Texture2D;
var bottomDivider: Texture2D;
var levelReadout: Texture2D;
var topGrpY: float = -100;
var btmGrpY: float = 100;
var btmDividerPos: Vector2;
var section1Pos: Vector2;
var section2Pos: Vector2;
var section3Pos: Vector2;
var section4Pos: Vector2;
var menuButtonPos: Vector2;
var nextButtonPos: Vector2;
var dashX: float;
var arrowX: float;
var VCartIcon: Texture2D[];

var cinemaState: int;
var cinString: String[];
var cinLevel: int = 0;
var tutorialState : int;
var tutString: String[];
var tutLevel: int = 0;
var whichLoad: String;
var bgImage : Texture2D;

// var speedImage : Texture2D; 
var destImage : Texture2D; 
var camBlackImage: Texture2D;
var shipIcon : Texture2D;
//var artifactContainer: GameObject;
var brakeStates: Texture2D[];

var transWhite: Texture2D;
var whiteFadeDown: Texture2D;

var crashMessage : Texture2D; 
var winMessage : Texture2D; 
var timeMessage: Texture2D;

var ship: MoveShip;
var winDist: float;
var message: String="none";
var level: int;
private var guiWidth: int = 320;
private var guiHeight: int =20;
var timeAllowed: float;
private var camBlackState: String="down";
var camBlackAnim: Animation;
var camBlackWipe: float = 0;
private var blackerWidth: float = 512.0;

private var moveInc: float = Screen.width/7;
var blackerPause: float=0.4;
var progress : float;

private var buttonSpaceDown: int = 120;//Screen.height*.42;

var lineCount: int=-1;
var textFieldHeight: float = 0;

var levelBack: Texture2D;
var levelBack1: Texture2D;
var titleBack: Texture2D;

var loadingScreen: Texture2D;

var state : String = "play";

var cruiseGUI: Texture2D;
var cruiseGUItext: Texture2D;

var pauseBG: Texture2D;

var playDown: Texture2D;

var restartButton: Texture2D;
var levelSelectButton: Texture2D;
var optionsButton: Texture2D;
var quitButton: Texture2D;

var speedButton: Texture2D;
var musicButton: Texture2D;
var sfxButton: Texture2D;
var blankButton: Texture2D;
var highlight: Texture2D[];

//var continueState : int = 0;
//var restartState : int = 0;
//var levelSelectState : int = 0;
//var quitState : int = 0;

var blip1: AudioClip;
var blip2: AudioClip;
var blip3: AudioClip;
var gameStart: AudioClip;

var sfx: int;
var gameSpeed: int;

var worldTitle: Texture2D[];
var selectL: Texture2D;
var selectR: Texture2D;
var num: Texture2D[];
var artifactIcon: Texture2D[];

var title: Texture2D[];
var xBut: Texture2D;
var vBut: Texture2D;

var maxLevel: int;
var worldNum: int;
var maxWorld: int;
var levelNum: int;
var recordTime: float;

var VCbuttonState: int = 0;

var LSgo: boolean=false;
var lsLevel: int[];
var levelString: String[];
var levelString2: String;
var a1 : int[];
var a2 : int[];
var a3 : int[];
var levelTime: String[];

var a1state: int;
var a2state: int;
var a3state: int;
var a1oldState: int;
var a2oldState: int;
var a3oldState: int;
var artBurstAni: int = 0;
var artBurst: Texture2D[];
var a1go: boolean = false;
var a2go: boolean = false;
var a3go: boolean = false;
var fixedCounter: int = 0;
var levelLimit : int;
var guiState: String;
var selection: Texture2D[];
var selection2: Texture2D[];
var selectionOn: boolean = false;
var selectionX: int;
var selectionY: int;
var selectedLevel: int = 99;
var selectionState: int=0;
var selectable: boolean = false;
var selectionFlicker: boolean=false;
var gameMaster: GameMaster;
var pauseEndTime : float;
var pauseEndTime2: float;
var loadLevelGo: boolean;
var counter : int = 0;
var normColor: Color;

var mySkin : GUISkin;
var mySkin18 : GUISkin;
var mySkin2 : GUISkin;
var mySkin3shad : GUISkin;
var mySkin3 : GUISkin;
var mySkin4 : GUISkin;
var mySkin4Shad : GUISkin;
var VCcolor : GUISkin[];
var mySkin19: GUISkin;
var mySkin49: GUISkin;
var mySkin36: GUISkin;
var mySkin23: GUISkin;
var mySkin30: GUISkin;

var fontMats: Material[];
var GUIplanes: Transform[];
var GUIbuttons: Transform[];
var GUIbuttonCount: int = 0;
var GUItexts: TextMesh[];
private var hitname: String;
private var hit : RaycastHit;
private var ray : Ray; //ray we create when we touch the screen
var GUIcam: GameObject[];
var GUIplanePF: GameObject;
var GUIplaneOverPF: GameObject;
var GUItextPF: GameObject;
var GUIbuttonPF: GameObject;
var GUIanimClips: AnimationClip[];
var aspectMult: float = 1.0; // ratio of aspect ratios
private var yAdj: float = 1.0; // scale adjustment

var brakeScript: GUIQuadObj;
var jumpScript: GUIQuadObj;
var a1Script: GUIQuadObj;
var a2Script: GUIQuadObj;
var a3Script: GUIQuadObj;
var progBox1Script: GUIQuadObj;
var progBox2Script: GUIQuadObj;
var progBarScript: gui_progbar;
var speedbar: Transform;
var jumpbar: Transform;

private var aIconSize : int = 26;
var row1offsetX : int = 45;
var row2offsetX : int = 275;
private var curLevel : int;

var tutText: String;

var curTime: float;
var stringTime: String;

var i:int;


function Start() {
	sfx = PlayerPrefs.GetInt("Sfx", 1);
	updateWorld();
	resetVC();
	calcAspectMult();
	GUI_1Init();
}

function calcAspectMult() {
	var w: float = Screen.width; var h: float = Screen.height;
	aspectMult = (w/h)/(1.5);
	yAdj = h/320.0;
}

function GUI_1Init() {
	var the: GameObject;
	var parent: Transform;
	
	GUIcam[1]=gameObject.Find("GUICameras/GUICameraL1");
	GUIcam[2]=gameObject.Find("GUICameras/GUICameraL2");
	GUIcam[3]=gameObject.Find("GUICameras/GUICameraL3");
	GUIcam[4]=gameObject.Find("GUICameras/GUICameraL4");
	
	// texts
	parent=transform.Find("GUItexts");
	for (var i: int =0; i<10; i++) {
		the = Instantiate(GUItextPF,Vector3.zero,Quaternion.identity) as GameObject;
		the.transform.parent=parent;
		the.transform.localPosition=Vector3(0,-1000,0);
		GUItexts[i]=the.gameObject.GetComponent("TextMesh");
		the.name=("text"+i);
	}
	// planes
	parent=transform.Find("GUIplanes");
	for (i=0; i<44; i++) {
		if (i<41)	the = Instantiate(GUIplanePF,Vector3.zero,Quaternion.identity) as GameObject;
		else the = Instantiate(GUIplaneOverPF,Vector3.zero,Quaternion.identity) as GameObject;
		the.transform.parent=parent;
		the.transform.localPosition=Vector3(0,-1000,0);
		GUIplanes[i]=the.transform;
		the.transform.localEulerAngles=Vector3(90,180,0);
		if (i<11 || i>=41) {	the.name=("plane"+i); }
		else {	the.name=("aPlane"+i); }
	}
	// buttons
	parent=transform.Find("GUIbuttons");
	for (i=0; i<14; i++) {
		the = Instantiate(GUIplanePF,Vector3.zero,Quaternion.identity) as GameObject;
		the.transform.parent=parent;
		the.transform.localPosition=Vector3(0,-1000,0);
		GUIbuttons[i]=the.transform;
		the.transform.localEulerAngles=Vector3(90,180,0);
		the.name=("button"+i);
		var bc: BoxCollider = the.AddComponent.<BoxCollider>();
		if (i==10 || i==11) bc.size=Vector3(2,1,1.5);
	}
}

function updateWorld() {
	maxLevel=PlayerPrefs.GetInt("MaxLevel", 0);
	maxWorld=Mathf.Floor(maxLevel/10);
	tutorialState=PlayerPrefs.GetInt("TutorialState", 0);
	cinemaState=PlayerPrefs.GetInt("CinemaState", 0);
//	print(maxWorld);
}

function updateVC() {
	for(i=0;i<=6;i++) if (worldNum==i && cruiseGUI!="GUI_world"+i) cruiseGUI=Resources.Load("GUI_world"+i);		
}

function updateLevel() {
	level=gameMaster.level;
	if (level>=60) switchGUI("tutorial");
	recordTime=PlayerPrefs.GetFloat("Level"+level+"Time", 60.00);
}

function playAnim(seconds : int){
	resetVC();
	yield WaitForSeconds(seconds);
	switchArtsVC();
	camBlackAnim.Play("VC_anim");
}

function checkRecordPast() { // checks and switches record time to red if time is passed
//	print("check Record started: cur="+curTime+" record="+recordTime);
	GUItexts[3].GetComponent.<Renderer>().material.color=Vector4(1,1,1, 0.5);
	while (state=="play" && curTime<recordTime) { // kill the coroutine if no longer in play. It will restart again when switched back
		yield;
	}
	if (state=="play") {
//		print("check Record met!");
		GUItexts[3].GetComponent.<Renderer>().material.color=Vector4(1,0.2,0, 0.5);
	}
}

function clearGUIs() {
	for (var x: Transform in GUIplanes) {
		x.localPosition=Vector3(0,-1000,0);
		x.localScale=Vector3(1,1,1);
		x.gameObject.layer=16; // if they have changed layers for VC camera tricks, put them back to GUI cam 2
	}
	for (var why: Transform in GUIbuttons) {
		why.localPosition=Vector3(0,-1000,0);
		why.localScale=Vector3(1,1,1);
		why.gameObject.layer=2; // start them in ignore raycast, take them out on use
	}
	for (var zz: TextMesh in GUItexts) {
		zz.transform.localPosition=Vector3(0,-1000,0);
		zz.gameObject.layer=16;
	}
}

function GUIplane(x:int, y:int, w:int, h:int, texture: Texture, which: int, d:int) {
	GUIplanes[which].localPosition= Vector3(x, y, -d);
	GUIplanes[which].localScale=Vector3(w, 1, h);
	GUIplanes[which].GetComponent.<Renderer>().material.mainTexture=texture;
}

function GUIbutton(x:int, y:int, w: int, h:int, texture: Texture, which: int, d:int) {
	GUIbuttons[which].localPosition= Vector3(x, y, -d);
	GUIbuttons[which].localScale=Vector3(w, 1, h);
	GUIbuttons[which].GetComponent.<Renderer>().material.mainTexture=texture;
	GUIbuttons[which].gameObject.layer=16; // take them off ignore raycast layer, ready for physics raycast hit
}

function GUItext(x:int, y:int, h:float, text: String, which: int, d:int) {
	GUItexts[which].transform.localPosition= Vector3(x, y, -d);
	GUItexts[which].transform.localScale=Vector3(h, h, 1);
	GUItexts[which].text=text;
	return GUItexts[which];
}

function lsCalc() {
	if (worldNum==maxWorld) levelLimit = (maxLevel%10);
	else levelLimit = 9;
	// if (ship.state.cruising) levelLimit--;
	
	for (i=0; i<=levelLimit; i++) {				
		levelString[i] = ""+worldNum+i;

		var artCount = PlayerPrefs.GetInt("Level"+(worldNum*10+i)+"ArtCount",000);
		a1[i] = Mathf.Floor(artCount/100);	
		a2[i] = Mathf.Floor((artCount%100)/10);
		a3[i] = artCount%10;
		
		if (selectedLevel==99 && worldNum!=Mathf.Floor(level/10)){
			if (artCount < 111) {
				selectedLevel = i;
				selectionOn=true;		
			}
		}
	}	
	if (tutorialState==1 && level==60){
		selectedLevel = 0;
		selectionOn=true;
	}

	if (worldNum==Mathf.Floor(level/10)){
		curLevel = (level-(worldNum*10));
		selectedLevel = curLevel;
		selectionOn=true;
	} else if (selectedLevel==99){
		selectedLevel = 0;
		selectionOn=true;
	}
}

function drawSelection() {
	if (selectionOn) { 
		if (worldNum!=6) GUIplane(((Mathf.Floor(selectedLevel/5)*2-1)*115), (83-((selectedLevel%5)*41)), 254, 68, selection[selectionState], 5, 16);
		else GUIplane(((Mathf.Floor(selectedLevel/5)*2-1)*115), (83-((selectedLevel%5)*41)), 254, 68, selection2[selectionState], 5, 16);
		GUIplanes[5].gameObject.layer=17;
	}
}

function drawHilites() {
	// gamespeed
	if (sfx==1) GUIplane(63, 2, 98, 75, highlight[0], 41, 16);
	else GUIplane(63, -1000, 64, 64, highlight[0], 41, 16);
	if (PlayerPrefs.GetInt("Music", 1)==1)  GUIplane(95, -53, 98, 75, highlight[0], 42, 16); 
	else GUIplane(94, -1000, 64, 64, highlight[0], 42, 16);
	GUIplane(80, 54, 195, 75, highlight[gameSpeed+1], 43, 16);
}

function switchArtsVC() {
	// switch textures at set times, but always check to make sure still in victoryCruise. waitForSeconds always means the function keeps going on its own.
	yield WaitForSeconds(1.0);
	if (state=="victoryCruise") GUIplanes[8].GetComponent.<Renderer>().material.mainTexture=artifactIcon[a1state];
	yield WaitForSeconds(0.1);
	if (state=="victoryCruise") GUIplanes[9].GetComponent.<Renderer>().material.mainTexture=artifactIcon[a2state];
	yield WaitForSeconds(0.1);
	if (state=="victoryCruise") GUIplanes[10].GetComponent.<Renderer>().material.mainTexture=artifactIcon[a3state];
	yield WaitForSeconds(0.1);
	if (state=="victoryCruise") GUIbuttons[2].GetComponent.<Renderer>().material.mainTexture=pantherIcon[pantherFlag[0]];

}

function switchGUI(which: String) {
	state=which;
	calcAspectMult();
	if (which=="clear") {
		selectable=false;
		clearGUIs(); 
	}
	if (which=="play") {
		selectable=false;
		clearGUIs(); 
		GUIcam[1].active=true;
		print("play");
		curTime=0; // delay the curtime check one cycle for record past check
		
		brakeScript.Location.x=-240*aspectMult+300;
		jumpScript.Location.x=240*aspectMult+180;
		a1Script.Location.x=-240*aspectMult+260;
		a2Script.Location.x=-240*aspectMult+276;
		a3Script.Location.x=-240*aspectMult+292;
		progBox1Script.Location.x = -240*Mathf.Clamp01(aspectMult)+320;
		progBox2Script.Location.x = 240*Mathf.Clamp01(aspectMult)+160;
		progBarScript.aspectMult = Mathf.Clamp01(aspectMult);
		progBarScript.barLength = progBox2Script.Location.x-progBox1Script.Location.x;
		jumpbar.position.x=240*aspectMult-59.5;
		speedbar.position.x=-240*aspectMult+60.5;
		
		GUItexts[0].GetComponent.<Renderer>().material=fontMats[1];
		GUItexts[4].GetComponent.<Renderer>().material=fontMats[1];
		
		GUItexts[1].anchor = TextAnchor.UpperLeft;
		GUItexts[2].anchor = TextAnchor.UpperCenter;
		GUItexts[3].anchor = TextAnchor.UpperCenter;
		GUItexts[0].anchor = TextAnchor.UpperLeft; // shadow
		GUItexts[4].anchor = TextAnchor.UpperCenter; // shadow
		GUItext(-240*aspectMult+13, 155, 3.6, ("Lv. "+level), 0, 0);
		GUItext(-240*aspectMult+12, 156, 3.6, ("Lv. "+level), 1, 10);
		GUItext(240*aspectMult-35, 156, 3.6, ("00.00"), 2, 10); 
		GUItext(240*aspectMult-34, 155, 3.6, ("00.00"), 4, 0); 
		if (gameMaster.gamePhase>1) {
			GUItext(240*aspectMult-34, 136, 3.6, recordTime.ToString("00.00"), 3, 0);
			checkRecordPast();
		}
	}
	if (which=="paused") { 
		selectable=true;
		clearGUIs(); 
		GUIcam[1].active=false;

		GUIplane(0, 0, 500*aspectMult, 330, pauseBG, 0, 0);
		// GUIbutton(0, 100, 256, 50, continueButton, 1, 10);
		GUIbutton(-240*aspectMult+64, -132, 128, 55, xBut, 1, 10);
		GUIbutton(0, 100, 256, 50, restartButton, 2, 10);
		GUIbutton(0, 40, 256, 50, levelSelectButton, 3, 10);
		GUIbutton(0, -20, 256, 50, optionsButton, 4, 10);
		GUIbutton(0, -80, 256, 50, quitButton, 5, 10);
	}
	if (which=="options") { 
		selectable=true;
		clearGUIs(); 
		GUIcam[1].active=false;

		GUIplane(0, 0, 500*aspectMult, 330, pauseBG, 0, 0);
		GUIbutton(-240*aspectMult+64, -132, 128, 55, xBut, 1, 10);
		GUIbutton(2, 55, 345, 50, speedButton, 4, 10);
		GUIbutton(20, 55, 60, 50, blankButton, 5, 20);
		GUIbutton(80, 55, 60, 50, blankButton, 6, 20);
		GUIbutton(140, 55, 60, 50, blankButton, 7, 20); // blank buttons for indiv speeds
		GUIbutton(-16, 0, 243, 50, sfxButton, 2, 10);
		GUIbutton(16, -55, 243, 50, musicButton, 3, 10);
		drawHilites();

	}
	if (which=="levelSelect") { 
		selectable=true;
		clearGUIs();
		updateWorld();
		lsCalc();
		GUItexts[0].GetComponent.<Renderer>().material=fontMats[0];
		GUItexts[1].GetComponent.<Renderer>().material=fontMats[0];
		GUItexts[3].GetComponent.<Renderer>().material=fontMats[0];
		GUItexts[4].GetComponent.<Renderer>().material=fontMats[0];
		
		GUIcam[3].GetComponent.<Camera>().rect=Rect(0,0,1,1);
		GUIcam[4].GetComponent.<Camera>().rect=Rect(0,0,1,1);
		GUIcam[3].transform.position.x=0;
		GUIcam[4].transform.position.x=0;
		
		GUIplane(0, 0, 500*aspectMult, 330, pauseBG, 0, 0);
		GUIplanes[0].gameObject.layer=18;
		if (worldNum!=6) {
			for (i=0; i<=levelLimit; i++) {
				GUIbutton(((Mathf.Floor(i/5)*2-1)*115)+3, (83-((i%5)*41)), 210, 36, levelBack, i, 10);
				if (gameMaster.gamePhase<2) {
					GUItext(((Mathf.Floor(i/5)*2-1)*115)-87, (96-((i%5)*41)), 5.9, levelString[i], i, 20);	}
				else {
					levelTime[i] = (PlayerPrefs.GetFloat("Level"+(worldNum*10+i)+"Time", 99.99)).ToString("00.00");
					pantherFlag[i]= PlayerPrefs.GetInt("Level"+(worldNum*10+i)+"PantherFlag", 0);
					GUItext(((Mathf.Floor(i/5)*2-1)*115)-87, (96-((i%5)*41)), 5.9, levelString[i]+"    "+levelTime[i], i, 20);
				}
				GUItexts[i].gameObject.layer=17;
				GUIbuttons[i].gameObject.layer=17;
				GUItexts[i].anchor = TextAnchor.UpperLeft;
			}
		}
		else {
			for(i=0; i<tutorialState; i++){
				GUIbutton(-115+3, (83-((i%5)*41)), 210, 36, levelBack1, i, 10);
				GUItext((-115-87), (96-((i%5)*41)), 5.9, tutString[i], i, 20);
				GUItexts[i].anchor = TextAnchor.UpperLeft;
				GUItexts[i].gameObject.layer=17;
				GUIbuttons[i].gameObject.layer=17;
			}
			for(i=0; i<cinemaState; i++){
				GUIbutton(115+3, (83-((i%5)*41)), 210, 36, levelBack1, i+5, 10);
				GUItext((115-87), (96-((i%5)*41)), 5.9, cinString[i], i+5, 20);
				GUItexts[i+5].anchor = TextAnchor.UpperLeft;
				GUItexts[i+5].gameObject.layer=17;
				GUIbuttons[i+5].gameObject.layer=17;
			}
		}
		
		if (worldNum!=6) {		
			if (gameMaster.gamePhase<2) {
		// gamePhase 0,1 draw artifacts
				for (i=0; i<=levelLimit; i++){
					GUIplane(((Mathf.Floor(i/5)*2-1)*115)+3, (83-((i%5)*41)), aIconSize, aIconSize, artifactIcon[a1[i]], 11+(i*3), 20);
					GUIplane(((Mathf.Floor(i/5)*2-1)*115)+34, (83-((i%5)*41)), aIconSize, aIconSize, artifactIcon[a2[i]], 11+(i*3)+1, 20);
					GUIplane(((Mathf.Floor(i/5)*2-1)*115)+65, (83-((i%5)*41)), aIconSize, aIconSize, artifactIcon[a3[i]], 11+(i*3)+2, 20);
				}
			} else { 
		// gamephase == 2, draw the panther icon
				for(i=0; i<=9; i++){
					if (pantherFlag[i]) GUIplane(((Mathf.Floor(i/5)*2-1)*115)-30, (83-((i%5)*41)), 28, 28, pantherIcon[1], 11+i, 20);
				}
			}	
		} 
		for (i=11; i<41; i++) GUIplanes[i].gameObject.layer=17;
		
		
		drawSelection();
		GUIcam[3].GetComponent.<Camera>().orthographicSize=160*(1/Mathf.Clamp01(aspectMult)); // resize camera for middle buttons for 4:3
		
		GUIplane(0, 135, 370*Mathf.Clamp01(aspectMult), 40, titleBack, 1, 10);
		GUIplane(0, 135, 330*Mathf.Clamp01(aspectMult), 31, title[worldNum], 2, 20);
		GUIbutton(-207*Mathf.Clamp01(aspectMult), 135, 48, 40, selectL, 10, 20);
		GUIbutton(207*Mathf.Clamp01(aspectMult), 135, 48, 40, selectR, 11, 20);
		GUIbutton(-240*aspectMult+64, -132, 128, 55, xBut, 12, 20);
		GUIbutton(240*aspectMult-64, -132, 128, 55, vBut, 13, 20);
		
	}
	if (which=="victoryCruise") { 
		selectable=true;
		clearGUIs();
		
		GUIcam[3].GetComponent.<Camera>().orthographicSize=160;
		GUIcam[3].transform.position.x=-120*aspectMult;
		GUIcam[4].transform.position.x=120*aspectMult;
		GUIcam[3].GetComponent.<Camera>().rect=Rect(-0.5,0,1,1);
		GUIcam[4].GetComponent.<Camera>().rect=Rect(0.5,0,1,1);
		GUItexts[0].GetComponent.<Renderer>().material=fontMats[0];
		GUItexts[3].GetComponent.<Renderer>().material=fontMats[0];
		GUItexts[4].GetComponent.<Renderer>().material=fontMats[0];
	//Left Top Sections
		GUIplane(-156, -1000, 224, 39, section1, 0, 0);
		GUItext(-225*Mathf.Clamp01(aspectMult), -1000, 4.2*Mathf.Clamp01(aspectMult), ("ATTEMPTS: "+ship.levelAttempts), 0, 5);
		GUItexts[0].anchor = TextAnchor.UpperLeft;
		GUIplane(-156, -1000, 224, 39, section2, 1, 0);
		// artifacts and panther
		GUIplane(0, -1000, aIconSize, aIconSize, artifactIcon[0], 8, 5);
		GUIplane(0, -1000, aIconSize, aIconSize, artifactIcon[0], 9, 5);
		GUIplane(0, -1000, aIconSize, aIconSize, artifactIcon[0], 10, 5);
		GUIbutton(0, -1000, 36, 36, pantherIcon[0], 2, 5);
		GUIplanes[0].gameObject.layer=17; GUIplanes[1].gameObject.layer=17; GUItexts[0].gameObject.layer=17;
		GUIplanes[8].gameObject.layer=17; GUIplanes[9].gameObject.layer=17; GUIplanes[10].gameObject.layer=17; GUIbuttons[2].gameObject.layer=17;
		
	//Right Top Section
		GUIplane(155, -1000, 224, 39, section2, 2, 10);
		GUItext(221, -1000, 4.2*Mathf.Clamp01(aspectMult), ("TIME: "+curTime.ToString("00.00")), 1, 20);
		GUItexts[1].anchor = TextAnchor.UpperRight;
		GUIplane(155, -1000, 224, 39, section1, 3, 10);
		if(!ship.newRecord) GUItext(221, -1000, 4.2*Mathf.Clamp01(aspectMult), ("RECORD: "+recordTime.ToString("00.00")), 2, 20);
		else GUItext(221, -1000, 4.2*Mathf.Clamp01(aspectMult), "NEW RECORD!!!", 2, 20);
		GUItexts[2].anchor = TextAnchor.UpperRight;
		GUIplanes[2].gameObject.layer=18; GUIplanes[3].gameObject.layer=18; GUItexts[1].gameObject.layer=18; GUItexts[2].gameObject.layer=18;
		
	//Level Number
		GUIplane(0, -1000, 131, 69, levelReadout, 4, 30);
		if (level>=10)	GUItext(4, -1000, 10.5, ""+level, 3, 40);
		else	GUItext(4, -1000, 10.5, "0"+level, 3, 40);
		GUItexts[3].anchor = TextAnchor.MiddleCenter;
		
	// Menu Section
		GUIbutton(-103, -1000, 156, 58, menuButton, 0, 0);
		GUItext(-90, -1000, 4.7, "MENU", 4, 5);
		GUItexts[4].anchor = TextAnchor.UpperCenter;
		GUIplane(-157, -1000, 45, 58, dash, 5, -5);
		GUIplane(-12, -1000, 67, 58, bottomDivider, 6, 30);
		// GUIbuttons[0].gameObject.layer=17; GUIplanes[5].gameObject.layer=17; GUItexts[4].gameObject.layer=17;
		
	// Next Section
		GUIbutton(80, -1000, 165, 58, nextButton, 1, 10);
		GUItext(83, -1000, 7.9, "NEXT", 5, 20);
		GUItexts[5].anchor = TextAnchor.UpperCenter;
		GUIplane(166, -1000, 55, 58, arrow, 7, 5);
		// GUIbuttons[1].gameObject.layer=18; GUIplanes[7].gameObject.layer=18; GUItexts[5].gameObject.layer=18;
	}
	if (which=="tutorial") {
		clearGUIs();
		GUIcam[1].SetActive(true);
		
		brakeScript.Location.x=-240*aspectMult+300;
		jumpScript.Location.x=240*aspectMult+180;
		jumpbar.position.x=240*aspectMult-59.5;
		speedbar.position.x=-240*aspectMult+60.5;
		
		GUItext(-220*Mathf.Clamp01(aspectMult), 154, 5.2*Mathf.Clamp01(aspectMult), "", 0, 20);
		GUItext(-219*Mathf.Clamp01(aspectMult), 154-Mathf.Clamp01(aspectMult), 5.2*Mathf.Clamp01(aspectMult), "", 1, 15);
		GUItexts[0].GetComponent.<Renderer>().material=fontMats[1];
		GUItexts[1].GetComponent.<Renderer>().material.color=Vector4(1, 0.4, 0.6, 1);
		GUItexts[0].anchor = TextAnchor.UpperLeft; GUItexts[1].anchor = TextAnchor.UpperLeft;
		GUItexts[0].alignment = TextAlignment.Left; GUItexts[1].alignment = TextAlignment.Left;
		
		GUIplane(-1, 1000, 482*aspectMult, 200, transWhite, 0, 0);
		GUIplane(-1, 1000, 482*aspectMult, 30, whiteFadeDown, 1, 5);
	}
}


function OnGUI () {
	
	if (state=="play") {
		GUItexts[2].text = stringTime;
		GUItexts[4].text = stringTime;
	}
	
	if (state=="tutorial"){
		
		GUItexts[0].text = tutText; GUItexts[1].text = tutText;
		textFieldHeight = Mathf.Lerp(textFieldHeight,(lineCount)*30,Time.deltaTime*8);
		GUIplanes[1].position.y=145-((textFieldHeight-10)*Mathf.Clamp01(aspectMult));
		GUIplanes[0].position.y=GUIplanes[1].position.y+100;
	}
	
if (state=="victoryCruise") {
		// level
		GUIplanes[4].position.y=topGrpY;
		GUItexts[3].transform.position.y=topGrpY-5;
		// attempts
		GUIplanes[0].position.y=topGrpY+section1Pos.y+20;
		GUIplanes[0].position.x=section1Pos.x-1;
		GUItexts[0].transform.position.y=topGrpY+section1Pos.y+29;
		GUItexts[0].transform.position.x=(section1Pos.x-71)*Mathf.Clamp01(aspectMult);
		//artifacts and panther
		GUIplanes[1].position.y=topGrpY+section2Pos.y-20;
		GUIplanes[1].position.x=section2Pos.x-1;
		GUIplanes[8].position.y=GUIplanes[1].position.y;
		GUIplanes[8].position.x=(GUIplanes[1].position.x-58)*Mathf.Clamp01(aspectMult);
		GUIplanes[9].position.y=GUIplanes[1].position.y;
		GUIplanes[9].position.x=(GUIplanes[1].position.x-23)*Mathf.Clamp01(aspectMult);
		GUIplanes[10].position.y=GUIplanes[1].position.y;
		GUIplanes[10].position.x=(GUIplanes[1].position.x+12)*Mathf.Clamp01(aspectMult);
		GUIbuttons[2].position.y=GUIplanes[1].position.y;
		GUIbuttons[2].position.x=(GUIplanes[1].position.x+57)*Mathf.Clamp01(aspectMult);
		// time
		GUIplanes[2].position.y=topGrpY+section1Pos.y+20;
		GUIplanes[2].position.x=-section1Pos.x;
		GUItexts[1].transform.position.y=topGrpY+section1Pos.y+29;
		GUItexts[1].transform.position.x=(-section1Pos.x+67)*Mathf.Clamp01(aspectMult);
		// record
		GUIplanes[3].position.y=topGrpY+section2Pos.y-20;
		GUIplanes[3].position.x=-section2Pos.x;
		GUItexts[2].transform.position.y=topGrpY+section2Pos.y-11;
		GUItexts[2].transform.position.x=(-section2Pos.x+67)*Mathf.Clamp01(aspectMult);
		
		// bottom div
		GUIplanes[6].position.y=btmGrpY;
		//menu
		GUIbuttons[0].position.y=btmGrpY+menuButtonPos.y;
		GUIbuttons[0].position.x=menuButtonPos.x;
		GUItexts[4].transform.position.y=btmGrpY+menuButtonPos.y+4;
		GUItexts[4].transform.position.x=menuButtonPos.x+13;
		// dash
		GUIplanes[5].position.y=btmGrpY+menuButtonPos.y;
		GUIplanes[5].position.x=menuButtonPos.x+dashX-54;
		// next
		GUIbuttons[1].position.y=btmGrpY+nextButtonPos.y;
		GUIbuttons[1].position.x=nextButtonPos.x;
		GUItexts[5].transform.position.y=btmGrpY+nextButtonPos.y+17;
		GUItexts[5].transform.position.x=nextButtonPos.x+3;
		//arrow
		GUIplanes[7].position.y=btmGrpY+nextButtonPos.y;
		GUIplanes[7].position.x=nextButtonPos.x+arrowX+84;

	}
	
	if (camBlackState!="none") {
		blackerWidth=Mathf.Clamp(Screen.height*2.56*aspectMult, Screen.width, Screen.width*4);
		if (camBlackState=="in") {
			GUI.DrawTexture(Rect(-blackerWidth+(camBlackWipe*blackerWidth), 0, blackerWidth, Screen.height), camBlackImage, ScaleMode.StretchToFill, true, 0);
			if (camBlackWipe>0.98) camBlackState="down";
		}
		else if (camBlackState=="down") {
		//	GUI.DrawTexture(Rect(-Screen.width/1.7, -20, Screen.width*2.13, Screen.height*1.25), camBlackImage, ScaleMode.ScaleToFit, true, 0);
			GUI.DrawTexture(Rect(0, 0, blackerWidth, Screen.height), camBlackImage, ScaleMode.StretchToFill, true, 0);
		}
		else if (camBlackState=="out") {
			GUI.DrawTexture(Rect(-blackerWidth+(camBlackWipe*blackerWidth), 0, blackerWidth, Screen.height), camBlackImage, ScaleMode.StretchToFill, true, 0);
			if (camBlackWipe<0.02) camBlackState="none";
		}
	}

	else if (state=="loading") {
		GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height),loadingScreen);		
	}
}

function getButtonHit(x: int, y: int, p: int) {
	
	var rays: int;
	if (state=="levelSelect") rays=2; 
	else rays=1;
	
	for (var r=0; r<rays; r++) {
	if (r==0)	ray = GUIcam[1].GetComponent.<Camera>().ScreenPointToRay(Vector3(x,y,0));
	else  ray = GUIcam[3].GetComponent.<Camera>().ScreenPointToRay(Vector3(x,y,0)); // shoot from different camera for levelSelect 4:3
	//Debug.DrawLine(ray.origin, ray.direction);
	if (p>1) checkButton=1;	
	else if (Physics.Raycast(ray.origin, ray.direction, hit)) checkButton=2;
	else checkButton=0;

	if(checkButton){
		if(checkButton==2) hitname=hit.transform.name;
	
	if (state=="paused") {	
		if (hitname=="button1" && p==1) {
			if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip1);
			if (ship.state.cruising) {
				switchGUI("victoryCruise");
				playAnim(0);
			} else unpause();
		}
		else if (hitname=="button2" && p==1) {
			if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip1);
			unpause();
			ship.state.crashing=true;
			ship.restarted=true;
			camBlackWipe=0;
			yield WaitForSeconds(0.1);
			//ship.state.crashing=true;
			if (ship.state.cruising) gameMaster.level--;
			if (gameMaster.level == -1) gameMaster.level = 59;
			PlayerPrefs.SetInt("Level",gameMaster.level);
			ship.reset(3);
		}
		// level Select
		else if (hitname=="button3" && p==1) {
			if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip1);
			if (PlayerPrefs.GetInt("FromLS",0)==0) {
				if (tutorialState==1 && level==60) { worldNum=0; selectedLevel=0;}	
				//if (tutorialState==2 && level==68) { worldNum=0; selectedLevel=1;}
				print("worldnum "+worldNum);
				print("selectedLevel "+selectedLevel);
			}
			switchGUI("levelSelect");
		}
		// options
		else if (hitname=="button4" && p==0) {
			if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip1);
			switchGUI("options");
		}
		// quit (menu)
		else if (hitname=="button5" && p==0) {
			if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip1);
			//unpause();
			loadMenu();
		}
	}
	else if (state=="options") {
		if (hitname=="button1" && p==1) {
			if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip1);
			switchGUI("paused");
		}
		if (hitname=="button2" && p==0) {
			if (PlayerPrefs.GetInt("Sfx", 1)==1) {
				PlayerPrefs.SetInt("Sfx", 0);
				ship.sfx=0; sfx=0;
				ship.engineAudio.GetComponent.<AudioSource>().Stop();
				ship.engineAudio.SetActive(false);
			}
			else {
				PlayerPrefs.SetInt("Sfx", 1);
				ship.sfx=1; sfx=1;
				// ship.engineAudio.Stop();
				ship.engineAudio.active=true; ship.engineAudio.GetComponent.<AudioSource>().Stop();
			}
			if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip1);
			drawHilites();
		}
		if (hitname=="button3" && p==0) {
			if (PlayerPrefs.GetInt("Music", 1)==1) { PlayerPrefs.SetInt("Music", 0);  }
			else { PlayerPrefs.SetInt("Music", 1); }
			ship.musicSourceScript.SetTrack();
			drawHilites();
		}
		if (hitname=="button5" && p==0) {
			gameSpeed=0; 
			gameMaster.updateGameSpeed(gameSpeed);
			drawHilites();
		}
		else if (hitname=="button6" && p==0) {
			gameSpeed=1; 
			gameMaster.updateGameSpeed(gameSpeed);
			drawHilites();
		}
		else if (hitname=="button7" && p==0) {
			gameSpeed=2; 
			gameMaster.updateGameSpeed(gameSpeed);
			drawHilites();
		}
		else if (hitname=="button4" && p==0) {
			print("Hit: "+ gameSpeed);
			gameSpeed++; if (gameSpeed>2) gameSpeed=0;
			gameMaster.updateGameSpeed(gameSpeed);
			drawHilites();
		}
	}
	else if (state=="levelSelect") {
		if (r==1) {
		if (worldNum!=6) {
			for(i=0; i<=levelLimit; i++){					
				if (hitname==("button"+i) && p==1) {				
					if (selectedLevel==i) {
						loadLevel1("level");
					}
					else {
						selectionOn=true;
						selectedLevel=i;
						drawSelection();
					}
				}
			}
		} else { //worldNum == 6;
			for (i=0; i<tutorialState; i++) {
				if (hitname==("button"+i) && p==1) {
					if (selectedLevel==i) {
						tutLevel = 60+i;
						PlayerPrefs.SetInt("FromLS",1);
						loadLevel1("tutorial");
					}
					else {
						selectionOn=true;
						selectedLevel=i;
						drawSelection();
					}
				}
			}
			for (i=5; i<cinemaState+5; i++) {
				if (hitname==("button"+i) && p==1) {					
					if (selectedLevel==i) {
						PlayerPrefs.SetInt("FromLS",1);
						if (i==5) cinLevel = 2;
						if (i==6) cinLevel = 3;
						if (i==7) cinLevel = 5;
						if (i==8) cinLevel = 4;
						if (i==9) cinLevel = 6;
						loadLevel1("cinema");
					}
					else{
						selectionOn=true;
						selectedLevel=i;
						drawSelection();
					}
				}
			}
			print(selectedLevel);
		}
		} // end ray 1
	
		else {

		if (p==3 || (hitname=="button10" && p==1)) {
			selectedLevel=99;
			selectionOn=false;
			if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip2);
			worldNum--;
			if (worldNum<0) worldNum = 6;
			if (worldNum>maxWorld && worldNum!=6) worldNum = maxWorld;
			switchGUI("levelSelect");
			
		} else if (p==2 || (hitname=="button11" && p==1)) {
			selectedLevel=99;
			selectionOn=false;
			if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip2);
			worldNum++;
			if (worldNum>maxWorld && worldNum<6) worldNum=6;
			if (worldNum>6) worldNum=0;
			switchGUI("levelSelect");
			
		} else if (hitname=="button12" && p==1) {
			selectedLevel=99;
			selectionOn=false;
			if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip3);
			switchGUI("paused");
			
		} else if (hitname=="button13" && p==1) {
			if(selectionOn){
				if(worldNum!=6) loadLevel1("level");
				if (worldNum==6 && selectedLevel<5) {
					tutLevel = 60+selectedLevel;
					loadLevel1("tutorial");
				}
				if (worldNum==6 && selectedLevel>=5) {
					if (selectedLevel==5) cinLevel = 2;
					if (selectedLevel==6) cinLevel = 3;
					if (selectedLevel==7) cinLevel = 5;
					if (selectedLevel==8) cinLevel = 4;
					if (selectedLevel==9) cinLevel = 6;
					loadLevel1("cinema");
				} 
			} 
		}
		} // end ray 0
	}
// end LS
	else if (state=="victoryCruise" && p==1) {
		if(!gameObject.GetComponent.<Animation>().isPlaying) {
			if (hitname=="button0") {
				if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip1);
				switchGUI("paused");
			}
			if (hitname=="button1") {
				VCcontinue();
			}
			if (hitname=="button2" && pantherFlag[0]==1 && gameMaster.shipNum==10) {
				print("do a panther growl!");
			}		
		}
	}	
	}
	}
}

function unpause(){
	if (level>=60) switchGUI("tutorial");
	else switchGUI("play");
	ship.state.paused=false;
	if (sfx && ship.engineAudio.active && ship.state.started) ship.engineAudio.GetComponent.<AudioSource>().Play();
	Time.timeScale=gameMaster.gameSpeed;
}

function loadMenu(){
	PlayerPrefs.SetInt("Quit", 1);
	ship.state.crashing=true;							
	switchGUI("loading");
	Time.timeScale=1;
	yield WaitForSeconds(0.2);
	//Destroy(musicSource);
	Application.LoadLevel(0);	
}

function loadLevel1(which : String) {
	whichLoad = which;
	if (sfx) GetComponent.<AudioSource>().PlayOneShot(gameStart);
	ship.state.crashing=true;
	selectable=false;
	loadLevelGo=true;
	pauseEndTime2=Time.realtimeSinceStartup+1.5;
}

function loadLevel2(which : String){
	if (which=="level") gameMaster.setLevel(worldNum*10+selectedLevel);
	else if (which=="tutorial") {
		gameMaster.setLevel(tutLevel);
		if(selectedLevel==1) PlayerPrefs.SetInt("ShipNum",10);
	}
	print("which = "+which);
	print("selected level = "+worldNum*10+selectedLevel);
	switchGUI("loading");
	Time.timeScale=1;
	yield WaitForSeconds(0.2);
	if (which!="cinema") Application.LoadLevel(1);
	else Application.LoadLevel(cinLevel);
}

function VCcontinue(){
	VCbuttonState=1;
	if (sfx) GetComponent.<AudioSource>().PlayOneShot(gameStart);
	yield WaitForSeconds(0.4);
	camBlack("down");
	yield WaitForSeconds(0.8);

	Application.LoadLevel(1);
	//ship.reset(1);
}


function Update() {		
	if (!ship.state.crashing && !ship.state.winning && !ship.state.cruising) {		
		if (state=="play") {
			curTime = ship.state.elapsedTime;
			stringTime=	curTime.ToString("00.00");
			if (curTime > timeAllowed) {
				stringTime="**.**";
				if (!ship.state.crashing) {
					ship.crash(0);
					message="time";
				}
			}
		}
	}
	
	if (loadLevelGo) {		
		counter++;
		selectionState=counter%2;
		if (worldNum!=6)	GUIplanes[5].GetComponent.<Renderer>().material.mainTexture=selection[selectionState];	
		else GUIplanes[5].GetComponent.<Renderer>().material.mainTexture=selection2[selectionState];
		if (Time.realtimeSinceStartup > pauseEndTime2) loadLevel2(whichLoad);
	}
	
	
 	if (selectable) {	
//		if (gameMaster.device==DeviceType.iPhone) {
//			for (touch in Input.touches) { 
//				deltaPos = touch.deltaPosition;
//				if (touch.phase==TouchPhase.Began) {
//					if(!swiping){
//						getButtonHit(Input.mousePosition.x, Input.mousePosition.y, 0);
//					}
//					beganPos = touch.position;
//					touchPhase="Began";
//				}
//				if (touch.phase==TouchPhase.Ended) {
//					if(!swiping){
//						getButtonHit(Input.mousePosition.x, Input.mousePosition.y, 1);
//					}
//					touchPhase="Ended";
//					swiping=false;
//					endedPos = touch.position;
//					nextGo=true;
//				}
//				if (touch.phase==TouchPhase.Moved) {
//					
//					if (Mathf.Abs(deltaPos.x)>3*yAdj || Mathf.Abs(lastPos.x-beganPos.x)>3*yAdj  || Mathf.Abs(deltaPos.y)>3*yAdj || Mathf.Abs(lastPos.y-beganPos.y)>3*yAdj ) {
//						swiping=true;
//						touchPhase="Moved";
//					}
//					if( Mathf.Abs(deltaPos.x) > 10*yAdj ) {
//						if(nextGo){
//							if(deltaPos.x>0) SwipeLevel(3);
//							else SwipeLevel(2);
//						}
//					}
//				}lastPos=touch.position;
//			}
			
//		} else {
			deltaPos = lastPos-Input.mousePosition;
			if (Input.GetMouseButtonDown(0)) {
				if(!swiping){
					getButtonHit(Input.mousePosition.x, Input.mousePosition.y, 0);
				}
				beganPos = Input.mousePosition;
				touchPhase="Began";
			}
			if (Input.GetMouseButtonUp(0)) {
				if(!swiping){
					getButtonHit(Input.mousePosition.x, Input.mousePosition.y, 1);
				}
				endedPos=Input.mousePosition;
				swiping=false;
				touchPhase="Ended";
				nextGo=true;
			}
			if (Input.GetMouseButton(0)) {
				if (Mathf.Abs(deltaPos.x)>3*yAdj || Mathf.Abs(lastPos.x-beganPos.x)>3*yAdj  || Mathf.Abs(deltaPos.y)>3*yAdj || Mathf.Abs(lastPos.y-beganPos.y)>3*yAdj )  {
					swiping=true;
					touchPhase="Moved";
				}
				if(Mathf.Abs(deltaPos.x) > 10*yAdj){ 
					if(nextGo){
						print("swiping!");
						if(deltaPos.x>0) SwipeLevel(2);
						else SwipeLevel(3);
					}
				}
			}
			lastPos=Input.mousePosition;
//		}
	}
}

function SwipeLevel(swipe: int){
	print("swipe funcion ran");
	nextGo=false;
	getButtonHit(0, 0, swipe);
}

function resetVC(){
	topGrpY=-1000;
	btmGrpY=-1000;
	pantherFlag[0]=PlayerPrefs.GetInt("Level"+(level)+"PantherFlag",0);
}

function camBlack(which: String) {
	if (which=="down") {
		//camBlackCounter=0;
		camBlackAnim.Play("camBlackIn");
		camBlackState="in";
	}
	else {
//		print("camBlackUp");
		yield WaitForSeconds(blackerPause);
		camBlackAnim.Play("camBlackOut");
		camBlackState="out";
	}
}