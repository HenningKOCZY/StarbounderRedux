enum DevType { Computer = 0, iPhone = 1 }
var device: DevType;

var gamePhase : int;

var t: float=0;
var duration: float;
private var nextShipStartX : float;
var title: GameObject;
var menuState : String = ("cusMenu");
var oldState : String = ("pattern");
//var initializing : boolean = false;
var startSound: AudioClip;
var blip1: AudioClip;
var blip2: AudioClip;
var blip3: AudioClip;
var blip4: AudioClip;

var shipNum : int;
var nextShip: int;
var shipGo: boolean = false;
var shads: Texture2D[];
var shipObj: GameObject[];
var shipTarX: float = 0;
var curAO: int = 3;

var touchTime: float;
var touchTimeStart: float;

var holdable: boolean = false;
var roButton: GameObject;
var roButtonTar: Vector3;
var curSlider: String = null;
//var worldLights: GameObject[];
var introAnimation: intro_play;
var scrolling: boolean=false;
var stuff: Transform;
var tutorialState: int;
var cinemaState: int;
//var BG : GameObject;
//var BGtar: float;
var worldFog: Color[];
var platformMat: Material;
var patternMenuButtonTex : Texture2D[];
var thumbRen : Renderer[];
private var curWorld : int;
var patternMenuButtonMat : Material;

var selectionOn : boolean = false;
var selectionObj: GameObject;
var selectionSubObj: GameObject;
//var selectionSubObj2: GameObject;
var selected: String;
var selectable: boolean = true;

var ship: GameObject;
var shipAO: Texture2D[];
//var curShip : GameObject;
//var newShip : GameObject;
//var ships : GameObject[];

//var shipParent : Transform;

//var ship10Mat: Material[];
//var ship10AOTex: Texture2D[];

var playButton: GameObject;
var playButtonTar: Vector3;

var customizeButton: GameObject;
var customizeButtonTar: Vector3;


var optionsButton: GameObject;
var optionsButtonTar: Vector3;

var optionsX: GameObject;
var optionsXTar: Vector3;
var optionsXscaleTar: Vector3;
var optionsV: GameObject;
var optionsVTar: Vector3;
var optionsVscaleTar: Vector3;


var LSbd : Material;
var LSbdColor: Color[];

var speedButton: GameObject;
var speedButtonTar: Vector3;
var speedHighlight: Texture2D[];
var speedMat: Material;
var gameSpeed: int;
var sfxButton: GameObject;
var sfxButtonTar: Vector3;
var sfx: int;
var sfxHighlight: Renderer;
var musicButton: GameObject;
var musicButtonTar: Vector3;
var music: int;
var musicObj: GameObject;
var musicHighlight: Renderer;
var clearDataButton: GameObject;
var clearDataButtonTar: Vector3;
var areYouSure: GameObject;
var areYouSureTar: Vector3;

var secretButton: GameObject;
var secretButtonTar: Vector3;
var secretState: int = 0;


//texture vars
var texes: Texture2D[];
//var thumbs: Texture2D[];
var curTex : Texture2D;
//var curTexThumb : Texture2D;
var thumbListTrans: Transform;
var thumbPF: Transform;

var moveTime : float;
var moveTime2 : float;

//button vars
//var xBut : GameObject;
//var vBut : GameObject;
var selectL : GameObject;
var selectR : GameObject;
var menuTab : GameObject;
var menuTabColor : Material;
var tarMenuTabColor: Color;
var curMenuTabColor: Color;

var efRando : float;

var base : GameObject;
var boosters: GameObject;
var pattern: GameObject;

//base color vars
var shipMat: Material;
var blackMat: Material;
var baseColor: Color;
//var curBaseColor: Color;

var rBase : GameObject;
var gBase : GameObject;
var bBase : GameObject;

var rBaseSlider : GameObject;
var gBaseSlider : GameObject;
var bBaseSlider : GameObject;

//pattern color vars
var patColor: Color;
var patThumbColor : Material;

//var curPatColor: Color;
//var curPatOffset: Vector2;

var rPat : GameObject;
var gPat : GameObject;
var bPat : GameObject;

var rPatSlider : GameObject;
var gPatSlider : GameObject;
var bPatSlider : GameObject;

var patternSelector : GameObject;
var tarPatternSelector : float;
var patHighLight : GameObject;

var patColorSwitcher : GameObject;
var tarPatColorSwitcher: float;
var patColorSwitcherMain : Material;
var patColorSwitcherPat : Material;
var patColorSwitcherBase : Material;
var offsetBoxMat: Material;
var sliderMat: Material;

var patSubState : String = "color";
var patSubGo : boolean = false;

var patternList : GameObject;
var patListXpos : float = -3;
var lastPatListXpos: float;
var patListDelta : float;

var patListXtar : float = -3;
var lastTouchDeltaX : float = 0;

var beganPos : Vector2;
var endedPos : Vector2;
var deltaPos : Vector2;

var offsetBox: GameObject;
var offsetSlider: GameObject;
var offsetX: float;
var thumbPreview: GameObject;

var tarPatternList : Vector3;
var tarOffsetBox: float;
var tarThumbPreview: float;
var patternInput=true;

//booster color vars
var burstMat: Material;
var boostMat: Material;
var flareMat: Material;
var lightProjMat: Material;
var boosterColor: Color;
var rgbBoost : GameObject;
var boosterR : float;
var boosterG : float;
var boosterB : float;
var sliderValue : float;

var rgbBoostSlider : GameObject;

//var engineFlare1: GameObject;
//var engineFlare2: GameObject;
var engineFlare1: Transform;
var engineFlare2: Transform;



var particles = new Component[2]; 
var lights = new Component[2];


//------------------
var tarCam : Vector3;
var tarCamRo : Quaternion;

var tarBase : Vector3;
var tarBoosters : Vector3;
var tarPattern : Vector3;
var tarBaseScale : Vector3;
var	tarBoostersScale : Vector3;
var	tarPatternScale : Vector3;

var tarMenuTabX : float;
var tarMenuTabY : float;

//base sliders	
var tarRBase : float;
var tarGBase : float;
var tarBBase : float;

//pattern sliders
var tarRPat : float;
var tarGPat : float;
var tarBPat : float;

//boosters slider
var tarRGBboost : float;

var tarX : Vector3;
var tarV : Vector3;
var tarSelectL : Vector3;
var tarSelectR : Vector3;

var go : boolean = false;

var maxSlider: float = -0.48;
var minSlider: float = 0.48;

var shipRo : float;

private var xTouch : float;

private var yAdj: float = 1.0; private var xAdj: float = 1.0; private var tempAdj: float = 1.0; 
var point: Vector3;
private var aspectMult: float = 1.0;

var moveSpeed : int = 6;


//intro/mainMenu vars
var logoMat: Material;
var titleScreenMat: Material;
var introBG: Material;
var introObj: GameObject;
var titleScreen: GameObject;
var titleAni: boolean = true;
var worldListXpos: float;
var worldList: GameObject;
var mainMenuObj: GameObject;

var bgMat: Material[];
var bgObj: GameObject[];
var bg: Texture[];
var bgTar: float;

//var mainMenuBG: Material;
//var mainMenuBGalphaTar: float;
var mainMenuObjTar: Vector3;


var levelSelectObj: GameObject;
var levels: GameObject;
var lsaPF: GameObject;
var lsa: GameObject[];

var lsnPF: GameObject;
var lsn: GameObject[];
var lst: GameObject[];
var lsc: GameObject[];

var bc : BoxCollider;

var LStitle: Material;
var LStitle_texes: Texture2D[];
//var LStitleShad: Material;
//var LStitleShad_texes: Texture2D[];
//var LSbg: Material;
private var LSgo: boolean = false;

//var LStitleArtifactPF : GameObject[];
//var LStitleArtifactContainer: GameObject;
//private var curTitleArtifact : GameObject;

var selectedLevel: int = 99;
private var maxWorld: int = 0;
var worldNum : int;
var oldWorldNum : int = 99;
var levelString: String;
var levelBox : GameObject[];
var levelSelectTar: Vector3;
var worldSelect: GameObject[];
var worldString: String;
var worldListMoved: boolean = false;
private var levelSelectOn: boolean = false;
var blackout: GameObject;
var loadingScript : LoadingScreen;
var introLives: boolean=false;
var funcInterupt: boolean=false;
var lsnFunctionRunning: boolean=false;
var cusArtifactInfo: GameObject;
var cusArtifactInfoTar: Vector3;
var cusAScript : CusAScript;

var minArtLevel: int[];
var level: int;
var oldLevel: int;
var curLevel: int;
var maxLevel: int;
var gameQuit : int = 0;


var hitname: String;
var touchPhase: String = "None";

var i : int;

private var hit : RaycastHit;
private var ray : Ray; //ray we create when we touch the screen
private	var touchCleared: boolean = true;

var curTexNum : int;
var lastPos: Vector2;
private var thumbScript: ThumbScript;
var patListSelectedXpos : float;



function calcAspectMult() {
       var w: float = Screen.width; var h: float = Screen.height;
       aspectMult = (w/h)/(1.5);
       yAdj = h/320.0; xAdj = w/480.0;
}

function Awake(){
	if (Application.platform==RuntimePlatform.IPhonePlayer) {
//		TouchScreenKeyboard.autorotateToPortrait = false; 
//		TouchScreenKeyboard.autorotateToPortraitUpsideDown = false; 
//		TouchScreenKeyboard.autorotateToLandscapeRight = false; 
//		TouchScreenKeyboard.autorotateToLandscapeLeft = false;

	}
	for (i=0; i<texes.length; i++) {
		texes[i]=Resources.Load("patterns/"+i);
	}
}


function PatToggle(){		
	if (!(shipNum==10 && gamePhase<2)) {
		if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip2);
		if (patSubState=="color") patBrowserMenu();
		else patColorMenu();
		selectionObj.transform.localScale=Vector3(2.5,5.5,1);
		selection();
		selectionFlicker();				
	}
}


function InitMenu(){
	moveSpeed=30;
	mainMenu();
	yield WaitForSeconds(.5);
	levelSelect();
	yield WaitForSeconds(.5);
	cusMenu();
}

function Winner(which: int){
	print("Winner " +which);
	if (which==2) {
		if (gamePhase==0) {
			for (i=0; i<60; i++) {
				PlayerPrefs.SetFloat(("Level"+i+"Time"), 66.66);
			} 
		}
	
		for (i=0; i<60; i++) {
			PlayerPrefs.SetInt(("Level"+i+"ArtCount"), 111);
		}
		PlayerPrefs.SetInt("ShipNum", 10);
		PlayerPrefs.SetInt("MaxLevel", 59);
		PlayerPrefs.SetInt("CinemaState", 4);
		PlayerPrefs.SetInt("TutorialState", 2);
		
	} else if (which==1) {
		if (gamePhase==0) { // leave the times alone unless all levels havent been beat yet
			for (i=0; i<60; i++) {
				PlayerPrefs.SetFloat(("Level"+i+"Time"), 66.66);
			}
		}
		
		if (gamePhase>=2) { // leave artifacts alone unless already at phase 2 and wanting to clear them
			for (i=0; i<60; i++) {
				PlayerPrefs.SetInt(("Level"+i+"ArtCount"), 000);
			}
			PlayerPrefs.SetInt("ArtCount", 0);
		}
	
		PlayerPrefs.SetInt("MaxLevel", 59);
		PlayerPrefs.SetInt("CinemaState", 3);
		PlayerPrefs.SetInt("TutorialState", 1);
	}
	PlayerPrefs.SetInt("GamePhase", which);
	reset();
	initAssetsPanther();
	initAssets(1);
	System.GC.Collect();
}

function colorShip(){
	shipMat.SetTexture("_MultTex", shipAO[shipNum] );
	shipMat.SetTexture("_DecalTex",texes[curTexNum]);
	shipMat.SetTextureOffset("_DecalTex", Vector2( (1/(-1*-.96))*(offsetX+.48) , 0) ); 
	
	
	if(gamePhase==2){
		ApplyColors();
	}else{
		if(shipNum!=10){
			shipMat.SetColor("_Color", Vector4(1,1,1,1) );
			shipMat.SetColor("_SpecColor", Vector4(0.7,0.7,0.7,1) );
			ApplyColors();	
		}
	}
}

function ApplyColors(){
	shipMat.SetColor("_BaseColor", baseColor/2 );
	shipMat.SetColor("_PatColor", patColor/2 );
}

function initAssets(which: int){
	for(i=3;i<=10;i++){
		if(which==0){
			if(i==10 && gamePhase<2){
				shipObj[i]=Instantiate(Resources.Load("ship"+i+"_preview"),Vector3(0,0,0),Quaternion.identity);
			}
			else shipObj[i]=Instantiate(Resources.Load("ship"+i),Vector3(0,0,0),Quaternion.identity);
		}
		
		shipObj[i].transform.position = Vector3(0,-4.3,-4.4);
		shipObj[i].transform.localScale = Vector3(1,1,1);
		
		if (i==10) shipObj[i].transform.position.y += 0.3;
		shipObj[i].transform.localEulerAngles = Vector3(0,0,0);
		
		if(i!=shipNum) shipObj[i].transform.position.z = -100;
	}
	shipMat.SetTextureOffset("_Shad", Vector2(0,0));
	shipMat.SetTextureScale("_Shad", Vector2(1,1));	
	setShip();
	setLights();
}

function initAssetsPanther(){
	if(shipNum==10) shipNum=0;
	Destroy (shipObj[10]);
	if(shipNum==0) shipNum=10;
	if(gamePhase<2){
		shipObj[i]=Instantiate(Resources.Load("ship"+i+"_preview"),Vector3(0,0,0),Quaternion.identity);
	}
	else shipObj[i]=Instantiate(Resources.Load("ship"+i),Vector3(0,0,0),Quaternion.identity);
}

function changeShip(which: String){
	if(!shipGo && level!=61){
		if (which=="R"){	
			nextShip = shipNum+1;	
			if(nextShip==11) nextShip = 3;
			shipTarX = -6*aspectMult;
			nextShipStartX = shipTarX*-1;
			if(menuState=="pat" || menuState=="base") shipTarX *= 1.27;
			if(menuState=="pat") {
				shipTarX= -7*aspectMult;
				nextShipStartX = shipTarX*-0.72;
					
			}
			
		}else if (which=="L"){
			nextShip = shipNum-1;
			if (nextShip==2) nextShip=10;
			shipTarX = 6*aspectMult;
			nextShipStartX = shipTarX*-1;
			if(menuState=="pat" || menuState=="base") shipTarX *= 1.27;
			if(menuState=="pat") {
				shipTarX= 5*aspectMult;
				nextShipStartX = shipTarX*-1.4;
			}
		}
		shipObj[nextShip].transform.position = Vector3(20*yAdj,shipObj[nextShip].transform.position.y,-4.4);
		shipObj[nextShip].transform.localEulerAngles = shipObj[shipNum].transform.localEulerAngles;	
		curAO = shipNum;
		
		shipGo=true;
		moveTime = Time.time;
	}
}


function setShip(){
	colorBoosters();
	colorShip();
}

function changeWorld(which: String){
	if(!LSgo){
		if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip2);
			
		if(cinemaState>0){
			if(which=="R"){
				worldNum++;
				
				if(worldNum>maxWorld && worldNum<6) worldNum=6;
				if(worldNum>6) worldNum=0;
				
				bgTar=-98*Mathf.Clamp(aspectMult,1,2);
			}
			if(which=="L"){
				worldNum--;
				
				if(worldNum>maxWorld && worldNum<6) worldNum=maxWorld;
				if(worldNum<0) worldNum=6;
				
				bgTar=98*Mathf.Clamp(aspectMult,1,2);
			}
		}
		bgMat[1].mainTexture = bg[worldNum];
		bgObj[1].transform.localPosition.x = bgTar*-1;
		
		setLights();
		
		updateLS();
		
		LSgo=true;
	}
}

function updateLS(){
	RenderSettings.fogColor=worldFog[worldNum];
	platformMat.color=worldFog[worldNum];
	LStitle.mainTexture=LStitle_texes[worldNum];
	levelSelectNumbers();
	
	if (worldNum==Mathf.Floor(oldLevel/10)) falseSelection(levelBox[oldLevel-(worldNum*10)]);
	else {
		selectedLevel=0;
		falseSelection(levelBox[0]);
	}
}

function setLights(){
	shipMat.SetTexture("_Shad", shads[worldNum]);
}

function Start() {
	//Application.targetFrameRate=30;
	Time.timeScale = 1;
	if (PlayerPrefs.GetInt("FirstTime", 0)!=666) {
		clearData(); // if it's fresh install, run clear data first to init some vars
		PlayerPrefs.SetInt("GameSpeed",1);
	}
	calcAspectMult();
	
	//if (aspectMult<1) Camera.main.aspect=1.5;
	if (aspectMult<1) transform.localScale.x = 0.45 * aspectMult;
	if(!gameObject.Find("MusicSource(Clone)")) Instantiate(Resources.Load("MusicSource"), Vector3(0,0,0),Quaternion.identity);
	musicObj=gameObject.Find("MusicSource(Clone)");
	musicObj.GetComponent.<AudioSource>().enabled=false;
	
	reset();
	initAssets(0);
	// loadData();
	
	
	loadingScript.loadOn = true;
	selectionObj.transform.position=Vector3(0,100,0);
	selectionOn=false;
	InitMenu();
	yield WaitForSeconds(3);
	oldState=null;
	menuState=null;
	moveSpeed=7;
	Time.timeScale=1;
	loadingScript.loadOn = false;
	selectionObj.transform.position=Vector3(0,100,0);
	selectionOn=false;
	
	if (music) musicObj.GetComponent.<AudioSource>().enabled=true;
	else musicObj.GetComponent.<AudioSource>().enabled=false;

	if (sfx) gameObject.GetComponent.<AudioSource>().enabled=true;
	else gameObject.GetComponent.<AudioSource>().enabled=false;
	
	// reset();
	
	
	//Winner();
	//gameQuit=2;
	
	if (!gameQuit) {
		if (music) {
			musicObj.GetComponent.<AudioSource>().clip=Resources.Load("intro");
			musicObj.GetComponent.<AudioSource>().Play();
			musicObj.GetComponent.<AudioSource>().loop=false;
			System.GC.Collect();
		}
	}	
	
	//skip this or that
	if (gameQuit==0) {
		startPos0();
		yield WaitForSeconds(.5);
		intro();		
		PlayerPrefs.SetInt("Quit",0);
	}
	if (gameQuit==1) {
		if (music) {
			musicObj.GetComponent.<AudioSource>().clip=Resources.Load("intro loop");
			musicObj.GetComponent.<AudioSource>().Play();
			musicObj.GetComponent.<AudioSource>().loop=true;
		}

		startPos1();
		mainMenu();
		mainMenuObj.transform.localPosition = Vector3(0,-0.55,6.2);
		Destroy(introObj);	
		PlayerPrefs.SetInt("Quit",0);
	}
	if (gameQuit==2) {
		if (music) {
			musicObj.GetComponent.<AudioSource>().clip=Resources.Load("intro loop");
			musicObj.GetComponent.<AudioSource>().Play();
			musicObj.GetComponent.<AudioSource>().loop=true;
		}
		
		startPos2();
		levelSelect();
		//mainMenuObj.transform.localPosition = Vector3(0,-0.55,6.2);
		Destroy(introObj);	
		PlayerPrefs.SetInt("Quit",0);
	}
	setLights();
	
}

function reset(){
	loadData();
	patThumbColor.mainTextureOffset.x = .4;
	populateTexes();
	patThumbColor.mainTextureOffset.x = ((1/(-1*-.96))*(offsetX+.48)); 
	bgMat[0].mainTexture=bg[worldNum];
	for(i=0; i<2; i++){
		bgObj[i].transform.localScale.x=98*Mathf.Clamp(aspectMult,1,2);
		bgObj[i].transform.localPosition.x=98*i*Mathf.Clamp(aspectMult,1,2);
	}
	introBG.color.a = 1;
	//LSbd.SetColor("_Emission", LSbdColor[worldNum]);
	oldState=menuState;
	setShip();
	changePattern(curTexNum);
	speedMat.mainTexture = speedHighlight[gameSpeed];	
	base.transform.localPosition = tarBase;
	boosters.transform.localPosition = tarBoosters;
	pattern.transform.localPosition = tarPattern;
	menuTab.transform.localPosition.x = tarMenuTabX;
	menuTab.transform.localPosition.y = tarMenuTabY;
	selectL.transform.localPosition = tarSelectL;
	selectR.transform.localPosition = tarSelectR;
	patternSelector.transform.localPosition.x = tarPatternSelector;
	patHighLight.transform.localPosition=Vector3(Mathf.Floor(curTexNum/2)+0.5,-(curTexNum%2)-0.5, 0);
	offsetSlider.transform.localPosition.x = offsetX;
	gamePhase=PlayerPrefs.GetInt("GamePhase", 0);
	customizeButton.transform.localPosition = customizeButtonTar;
	rBase.transform.localPosition.x = tarRBase;
	gBase.transform.localPosition.x = tarGBase;
	bBase.transform.localPosition.x = tarBBase;	
	rPat.transform.localPosition.x = tarRPat;
	gPat.transform.localPosition.x = tarGPat;
	bPat.transform.localPosition.x = tarBPat;
	rgbBoost.transform.localPosition.x = tarRGBboost;
	Camera.main.transform.localPosition = tarCam;
	Camera.main.transform.rotation = tarCamRo;
	//maxLevel = PlayerPrefs.GetInt("maxLevel",0);
	sfxHighlight.material.SetColor("_TintColor",Vector4(.5,.5,.5,sfx));
	musicHighlight.material.SetColor("_TintColor",Vector4(.5,.5,.5,music));
	cusAScript.updateNumbers();
	//bgMat.mainTexture=bg[worldNum];	
	RenderSettings.fogColor=worldFog[worldNum];
	platformMat.color=worldFog[worldNum];
	patternInput=true;
	patColorSwitcherPat.SetColor("_Emission",patColor);
	//offsetBoxMat.color.a=1;
	sliderMat.SetColor("_Emission",Vector4(.5,.5,.5,1));
	//colorPatterns();
	curWorld = worldNum;
	for (i=0; i<10; i++) {
			levelBox[i].transform.localPosition = Vector3(0,0,1000);
			lsn[i].transform.localPosition.z = 1000;
			lsa[i].transform.localPosition.z = 1000;
			if (i<lst.length) lst[i].transform.localPosition.z = 1000;
			if (i<lsc.length) lsc[i].transform.localPosition.z = 1000;
	}
	go=true;
	setLights();
}


function clearData(){
	yield WaitForSeconds(.2);

	for (var i: int=0; i<60; i++){
		PlayerPrefs.SetInt("Level"+i+"ArtCount", 0);
		PlayerPrefs.SetFloat("Level"+i+"Time", 99.99);
		PlayerPrefs.SetInt(("Level"+i+"PantherFlag"),0);	
	}
	
	PlayerPrefs.SetInt("CinemaState", 0);
	PlayerPrefs.SetInt("TutorialState", 0);
	PlayerPrefs.SetInt("FromLS", 0);
	
	PlayerPrefs.SetInt("MaxLevel", 0);
	PlayerPrefs.SetInt("Level", 0);
	PlayerPrefs.SetInt("GamePhase", 0);
	PlayerPrefs.SetInt("ArtCount", 0);

	maxLevel=0;
	worldNum=0;
	maxWorld=0;
	
	PlayerPrefs.SetFloat("BaseColor_R", 0.4);	
	PlayerPrefs.SetFloat("BaseColor_G", 0.4);	
	PlayerPrefs.SetFloat("BaseColor_B", 0.4);
	
	PlayerPrefs.SetFloat("PatColor_R", 1);	
	PlayerPrefs.SetFloat("PatColor_G", 0);	
	PlayerPrefs.SetFloat("PatColor_B", 0.3);
	
	boosterColor = Vector4(0,.3,1,1);
	PlayerPrefs.SetFloat("BoostColor_R", 0);	
	PlayerPrefs.SetFloat("BoostColor_G", .3);	
	PlayerPrefs.SetFloat("BoostColor_B", 1);
	
	PlayerPrefs.SetInt("ShipNum", 3);
	PlayerPrefs.SetInt("texture", 6);
	PlayerPrefs.SetFloat("texScroll", -3.1);
	PlayerPrefs.SetFloat("offset", 0.06);
	PlayerPrefs.SetInt("FirstTime", 666); // dont run clearData on start again
//	loadData();
	reset();
	initAssetsPanther();
	initAssets(1);
	System.GC.Collect();
	//setShip();
	//setLights();
}

function sfxToggle(){
	if (sfx) {
		sfx=0;
		gameObject.GetComponent.<AudioSource>().enabled=false;
	}
	else {
		sfx=1;
		if(gameObject.GetComponent.<AudioSource>().enabled==false) gameObject.GetComponent.<AudioSource>().enabled=true;
		GetComponent.<AudioSource>().PlayOneShot(blip1);

	}
	PlayerPrefs.SetInt("Sfx", sfx);
	sfxHighlight.material.SetColor("_TintColor",Vector4(.5,.5,.5,sfx));
	////selectable=true;	
}

function setSpeed(speed: int){
	gameSpeed=speed;
	PlayerPrefs.SetInt("GameSpeed",gameSpeed);
	speedMat.mainTexture=speedHighlight[gameSpeed];
}

function musicToggle(){
	if (music) {
		music=0;
		musicObj.GetComponent.<AudioSource>().Pause();
	}
	else {
		music=1;
		if(musicObj.GetComponent.<AudioSource>().enabled==false) musicObj.GetComponent.<AudioSource>().enabled=true;
		musicObj.GetComponent.<AudioSource>().Play();
	}
	PlayerPrefs.SetInt("Music",music);
	musicHighlight.material.SetColor("_TintColor",Vector4(.5,.5,.5,music));
	////selectable=true;		
}

function FixedUpdate(){
	if(menuState=="intro"){
		if(titleAni==true){
			if(Time.time-moveTime > 5) {
				introAnimation.fadeOff = true;	
			}
			if(Time.time-moveTime > 6){
				titleScreenMat.color.a = Mathf.Lerp(titleScreenMat.color.a,1,Time.deltaTime*2);
			}
			if(Time.time-moveTime > 7){
				introLives=true;
				////selectable=true;
				//print(selectable);
				//titleScreen.gameObject.AddComponent (BoxCollider);
				//titleAni = false;
			}
			if(Time.time-moveTime > 11){
				//print("go to main menu");
				menuState="introOver";
				introBG.color.a = 0;
				titleAni = false;
				mainMenu();
				 
			}
		}
	}		
}

function loading(){
	loadingScript.loadOn = true;	
	yield WaitForSeconds(.2);
	if (PlayerPrefs.GetInt("CinemaState", 0)==0) Application.LoadLevel(2);	
	else Application.LoadLevel(1);
}

function loadingCin(which : int){
	//menuState="loading";
	loadingScript.loadOn = true;	
	yield WaitForSeconds(.2);
	Application.LoadLevel(which);
}

function selectionFlicker(){
	selectable=false;
	if (selectionSubObj.GetComponent.<Animation>().isPlaying) selectionSubObj.GetComponent.<Animation>().Rewind("selectionFlicker");
	selectionSubObj.GetComponent.<Animation>().Play("selectionFlicker");
	if (sfx && menuState!="options2" && menuState!="base" && menuState!="pat" && menuState!="booster") GetComponent.<AudioSource>().PlayOneShot(blip1);
	selected="null";
	//print("hitname = "+hit.transform.name);
	yield WaitForSeconds(.3);
	if(hitname) deselection();
}

function secretRoutine() {
	print("start");
	secretState=1;
	var timer: float = 0.0;
	while (timer<2.0) {
		timer+=Time.deltaTime;
		if (secretState==1) secretButton.transform.localPosition.x = -0.41;
		else if (secretState==2) secretButton.transform.localPosition.x = 0.404;
		else if (secretState==3) secretButton.transform.localPosition.x = -0.27;
		else if (secretState==4) { secretButton.transform.localPosition.x = 0; timer-=2.0; secretState++; }
		else if (secretState==5) secretButton.transform.localPosition.x = 0;
		else if (secretState==6) secretButton.transform.localPosition.x = -0.41;
		else if (secretState==7) secretButton.transform.localPosition.x = 0.71;
		yield;
	}
	if (secretState==3) { Winner(1); selectionObj.transform.localScale=Vector3(1,1,1); falseSelection(title); selectionFlicker();}
	else if (secretState==8) { Winner(2); selectionObj.transform.localScale=Vector3(1,1,1); falseSelection(title); selectionFlicker();}
	secretState=0;
	secretButton.transform.localPosition.x = 0.71;
	print("end");
}


function Update () {
	
	if(patSubGo==false){
		if (menuState=="pat"){
			if (patSubState=="browser"){
				if (aspectMult>=1) tempAdj=yAdj;
                else tempAdj=xAdj;			
				
				if(touchPhase=="Moved" || touchPhase=="Hold"){
					if(beganPos.y<(Screen.height/5)*2){
						patListDelta=deltaPos.x/(57.5*tempAdj);
						if (Mathf.Abs(deltaPos.x)>1*tempAdj || Mathf.Abs(lastPos.x-beganPos.x)>1*tempAdj) scrolling = true;
					}
				}
				if(touchPhase=="Ended"){
					if(!scrolling && Mathf.Abs(endedPos.y-beganPos.y)<10*tempAdj){
						if(hitname =="texThumb(Clone)"){
							patListSelectedXpos = patternList.transform.localPosition.x;
							thumbScript = hit.transform.GetComponent("ThumbScript");
							curTexNum = thumbScript.texNum;
							changePattern(thumbScript.texNum);	
							patHighLight.transform.position = Vector3(hit.transform.position.x,hit.transform.position.y,hit.transform.position.z);
							
							if(sfx) GetComponent.<AudioSource>().PlayOneShot(blip2);
							selectionObj.transform.localScale=Vector3(1.5,4,1);
							selection();
							selectionFlicker();
						}
					}
					//scrolling=false;					
				}
				
				if(touchPhase=="Stationary"){
					if(Mathf.Abs(deltaPos.x) < 50*Mathf.Clamp(aspectMult,1,2)) patListDelta=0;
					//else patListDelta=Mathf.Lerp(patListDelta,0,Time.deltaTime*deltaPos.x/48);
				}
				if(touchPhase=="None"){
					
					patListDelta=Mathf.Lerp(patListDelta,0,Time.deltaTime*4);
					
				}
			}	
				
			patternList.transform.localPosition.x += patListDelta;
			patternList.transform.localPosition.x = Mathf.Clamp(patternList.transform.localPosition.x,-51,-3.1);
			
		}
	}else patListDelta=0;
	
	if(touchPhase=="Hold"){
		if(selectable){
			if(!scrolling){
				if(hitname=="shipButton"){
					if(menuState!="zoom") {
						if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip2);
						zoomMenu();
					}
				}
			}
		}
	}
	if(touchPhase=="EndedHold" || touchPhase=="EndedMove" || touchPhase=="Ended"){
		if (curSlider =="offsetBox" || hitname=="offsetBox") {
			//if(Mathf.Abs(endedPos.y-beganPos.y)<10*yAdj){
				//if (Mathf.Abs(deltaPos.x)<2*yAdj && Mathf.Abs(lastPos.x-beganPos.x)<2*yAdj){
					PatToggle();
				//}
			//}
		}
		if(menuState=="zoom"){
			if (oldState=="cusMenu") cusMenu();
			if (oldState=="pat") patMenu();
			if (oldState=="booster") boosterMenu();
			if (oldState=="base") baseMenu();
		}
		curSlider=null;
		selectable=true;
	}
	if(touchPhase=="Ended") {
		if(selectable){
			if(!scrolling){
				if(menuState=="levelSelect"){
					
					if(hitname==selected){
					
						if(!lsnFunctionRunning){
							for (i=0; i<10 ; i++){								
								if(hitname=="level"+i) selectedLevel = i;
							}
									
							if (selectedLevel!=99){
								if(worldNum!=6){
									selectionFlicker()	;
									if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip1);
									cusMenu();
									level=selectedLevel+(worldNum*10);
									oldLevel = level;
									
								}else{ //worldnum==6
									if (selectedLevel>=0 && selectedLevel<=1){
										PlayerPrefs.SetInt("FromLS",1);
										selectionFlicker()	;
										if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip1);
										
										cusMenu();
										level=selectedLevel+(worldNum*10);
										if (level==61) {
											shipNum=10;
											initAssets(1);
										}
									oldLevel = level;
										
									}
									if(selectedLevel>=5 && selectedLevel<=9){
										PlayerPrefs.SetInt("FromLS",1);
										selectionSubObj.GetComponent.<Animation>().Play("selectionSlowFlicker");
										//selectionSubObj2.animation.Play("selectShadSlowFlicker");
										if (sfx) GetComponent.<AudioSource>().PlayOneShot(startSound);
												
										if (selectedLevel==5) loadCin(2);
										if (selectedLevel==6) loadCin(3);
										if (selectedLevel==7) loadCin(5);
										if (selectedLevel==8) loadCin(4);
										if (selectedLevel==9) loadCin(6);
									}
								}
								//loadLevel();
							}
						}
					}
					if(!lsnFunctionRunning){
						if (hitname=="level0" || hitname=="level1" || hitname=="level2" || hitname=="level3"  || hitname=="level4" || hitname=="level5" || hitname=="level6"  || hitname=="level7"  || hitname=="level8"  || hitname=="level9"   ) 	{
							selectionObj.transform.localScale=Vector3(2.6,2.3,1);
							selection();
						}
						for(i=0; i<10; i++){
							if(hitname=="level"+i) {selectedLevel = i; level=selectedLevel+(worldNum*10);}
						}
					}
					
				}
				if(hitname=="shipButton"){
					
					if(menuState=="cusMenu") {
						baseMenu();
						if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip1);
						selectionObj.transform.localScale=Vector3(2,2,1);
						falseSelection(customizeButton);
						selectionFlicker();
					}
					else if(menuState=="base" || menuState=="pat" || menuState=="booster") {
						cusMenu();
						if(sfx) GetComponent.<AudioSource>().PlayOneShot(blip2);
					}
					
				}
				
			}
		}
		curSlider=null;
		selectable=true;
	}
	if(touchPhase=="Moved" || "Hold"){
		if(selectable){
			if(menuState=="levelSelect"){
				if(!scrolling){
					if(Mathf.Abs(deltaPos.x)>10){
						scrolling=true;	
						if(deltaPos.x<0) changeWorld("R");
						if(deltaPos.x>0) changeWorld("L");	
					}	
				}
			}
			if(menuState=="cusMenu" || menuState=="base" || menuState=="pat" || menuState=="booster"){
				if(hitname=="shipButton" && !scrolling){
					if(Mathf.Abs(deltaPos.x)>10){
						scrolling=true;					
						if(deltaPos.x<0) changeShip("R");
						if(deltaPos.x>0) changeShip("L");
					}
				}
			} 
			if(curSlider=="offsetBox"){
				if (Mathf.Abs(deltaPos.x)>3*yAdj || Mathf.Abs(lastPos.x-beganPos.x)>3*yAdj){
					curSlider="offsetBox1";
					
				}
			}
		}
	}
	//if(touchPhase=="Moved") print(deltaPos);
	//print("LP : "+lastPos);
	//print("BP : "+beganPos);
	//print(curSlider);
	deltaPos = Vector2(0,0);
	hitname = null;
	touchPhase = "None";
	
	if (!musicObj.GetComponent.<AudioSource>().isPlaying && !loadingScript.loadOn){
		if (music) {
			var loopTrack : AudioClip = Resources.Load("intro loop");
			musicObj.GetComponent.<AudioSource>().clip=loopTrack;
			musicObj.GetComponent.<AudioSource>().Play();
			musicObj.GetComponent.<AudioSource>().loop=true;
			System.GC.Collect();
		}
	}
	if(touchTimeStart!=0) touchTime = Time.time-touchTimeStart;
	
	if(menuState!="loading"){ //&& menuState!="intro"){
			
			if (device==DevType.iPhone) {		 
	
				if(Input.touchCount>0){
					var touch = Input.GetTouch(0);
					ray = Camera.main.ScreenPointToRay(touch.position);
					// Debug.DrawLine(ray.origin, ray.direction * 10);
					if(Physics.Raycast(ray.origin, ray.direction * 10, hit) || curSlider) {
	                       if(!curSlider) {
	                       		hitname=hit.transform.name;                                        
	                       		point=Camera.main.WorldToScreenPoint(hit.transform.position);
	                       }                        
	                       if (hitname=="offsetBox" || curSlider=="offsetBox1")        {
	                               if (aspectMult>=1) {
	                               		xTouch= point.x-(57*yAdj);
	                               		xTouch = Mathf.Clamp( ((((touch.position.x-xTouch) /(yAdj*115))*-0.96)+0.48),-0.48,0.45 );
	                               }
	                               else { xTouch = Mathf.Clamp( ((( (touch.position.x-(24*xAdj)) /(115*xAdj))*-0.96)+0.48),-0.48,0.45 ); }
	                       }
	                       else if (curSlider=="r_pat" || curSlider=="g_pat" || curSlider=="b_pat" || hitname=="r_pat" || hitname=="g_pat" || hitname=="b_pat") {
	                               if (aspectMult>=1) {
	                               		xTouch= point.x-(155*yAdj);
	                               		xTouch = Mathf.Clamp( ((((touch.position.x-xTouch) /(yAdj*310))*-0.96)+0.48),-0.48,0.48 );
	                               }
	                               else { xTouch = Mathf.Clamp( ((( (touch.position.x-(154*xAdj)) /(310*xAdj))*-0.96)+0.48),-0.48,0.48 ); }
	                       }
	                       else if (hitname=="RGB_boost" || curSlider=="RGB_boost" || curSlider=="r_base" || curSlider=="g_base" || curSlider=="b_base" || hitname=="r_base" || hitname=="g_base" || hitname=="b_base"){
	                               if (aspectMult>=1) {
	                               		xTouch= point.x-(155*yAdj);
	                               		xTouch = Mathf.Clamp( ((((touch.position.x-xTouch) /(yAdj*310))*-0.96)+0.48),-0.48,0.48 );
	                               }
	                               else { xTouch = Mathf.Clamp( ((( (touch.position.x-(85*xAdj)) /(310*xAdj))*-0.96)+0.48),-0.48,0.48 ); }
	                       }
	        		}
	        		if(touch.phase==TouchPhase.Moved){
						deltaPos = touch.deltaPosition;
						touchPhase="Moved";
					}
					if(touch.phase==TouchPhase.Stationary){
						touchPhase="Stationary";
					}
	        		if(touchTime>0.5){
						if(aspectMult>=1){
							if((Mathf.Abs(touch.position.x - beganPos.x) < 3*yAdj) || (Mathf.Abs(touch.position.y - beganPos.y) < 3*yAdj)) {
								holdable=true;
							}else holdable=false;
						}else{
							if((Mathf.Abs(touch.position.x - beganPos.x) < 3*xAdj) || (Mathf.Abs(touch.position.y - beganPos.y) < 3*xAdj)) {
								holdable=true;
							}else holdable=false;
						}
						if(holdable && touchPhase!="Hold") touchPhase="Hold";
						else touchPhase="Moved";
					}
					if(touch.phase==TouchPhase.Began){
						touchTimeStart=Time.time;
						touchTime=0;
						beganPos = touch.position;
						touchPhase="Began";
					}
					if(touch.phase==TouchPhase.Ended){
						touchTimeStart = 0;	
						touchTime=0;
						endedPos = touch.position;
						if(touchPhase!="Hold" && touchPhase!="Moved") touchPhase="Ended";
						else if (touchPhase=="Moved") touchPhase="EndedMove";
						else if (touchPhase=="Hold") touchPhase="EndedHold";
					}
					
					if (menuState=="zoom" || hitname=="Ro"){
	                	xTouch = (((touch.position.x/Screen.width)*2)-1)*Mathf.Clamp(aspectMult,1,2);
	            	}
	            	lastPos=touch.position;						
				}
				
			}
			else { // computer CTRLs
				if (Input.GetMouseButton(0) || Input.GetMouseButtonUp(0)) {
					
					ray = Camera.main.ScreenPointToRay (Input.mousePosition);
					if(Physics.Raycast(ray.origin, ray.direction * 10, hit) || curSlider) {
	                       if(!curSlider) {
	                       		hitname=hit.transform.name;                
	                       		point=Camera.main.WorldToScreenPoint(hit.transform.position);                        
	                       }
	                       if (hitname=="offsetBox" || curSlider=="offsetBox1")  {
	                                // print("Edge: "+(point.x-(57*yAdj))+ "    mouse: "+Input.mousePosition.x);
	                               if (aspectMult>=1) {
	                               		xTouch = point.x-(57*yAdj);
	                               		xTouch = Mathf.Clamp( ((((Input.mousePosition.x-xTouch) /(yAdj*115))*-0.96)+0.48),-0.48,0.45 );
	                               }
	                               else { xTouch = Mathf.Clamp( ((( (Input.mousePosition.x-(24*xAdj)) /(115*xAdj))*-0.96)+0.48),-0.48,0.45 ); }
	                       }
	                       else if (curSlider=="r_pat" || curSlider=="g_pat" || curSlider=="b_pat" || hitname=="r_pat" || hitname=="g_pat" || hitname=="b_pat") {
	                               //print("Edge: "+(point.x-155)+ "    mouse: "+Input.mousePosition.x);
	                               if (aspectMult>=1) {
	                               		xTouch = point.x-(155*yAdj);
	                               		xTouch = Mathf.Clamp( ((((Input.mousePosition.x-xTouch) /(yAdj*310))*-0.96)+0.48),-0.48,0.48 );
	                               }
	                               else { xTouch = Mathf.Clamp( ((( (Input.mousePosition.x-(154*xAdj)) /(310*xAdj))*-0.96)+0.48),-0.48,0.48 ); }
	                       }
	                       
	                       else if (hitname=="RGB_boost" || curSlider=="RGB_boost" || curSlider=="r_base" || curSlider=="g_base" || curSlider=="b_base" || hitname=="r_base" || hitname=="g_base" || hitname=="b_base"){
	                               // print("Edge: "+(point.x-(155*yAdj))+ "    mouse: "+Input.mousePosition.x);
	                               if (aspectMult>=1) { 
	                               		xTouch = point.x-(155*yAdj);
	                               		xTouch = Mathf.Clamp( ((((Input.mousePosition.x-xTouch) /(yAdj*310))*-0.96)+0.48),-0.48,0.48 );
	                               }
	                               else { xTouch = Mathf.Clamp( ((( (Input.mousePosition.x-(85*xAdj)) /(310*xAdj))*-0.96)+0.48),-0.48,0.48 ); }
	                       }
	                       
		               }
		               if (menuState=="zoom" || hitname=="Ro"){
	                		xTouch = (((Input.mousePosition.x/Screen.width)*2)-1)*Mathf.Clamp(aspectMult,1,2);
	                	}
	                	
				} //else touchCleared=true;
				
				if(Input.GetMouseButton(0) ){
					deltaPos=Input.mousePosition-lastPos;
					if(deltaPos==Vector2(0,0)) touchPhase="Stationary";
					else touchPhase="Moved";
				}
				if(touchTime>0.5){
					if(aspectMult>=1){
						if((Mathf.Abs(Input.mousePosition.x - beganPos.x) < 3*yAdj) || (Mathf.Abs(Input.mousePosition.y - beganPos.y) < 3*yAdj)) {
							holdable=true;
						}else holdable=false;
					}else{
						if((Mathf.Abs(Input.mousePosition.x - beganPos.x) < 3*xAdj) || (Mathf.Abs(Input.mousePosition.y - beganPos.y) < 3*xAdj)) {
							holdable=true;
						}else holdable=false;
					}
					if(holdable && touchPhase!="Hold") touchPhase="Hold";
					else touchPhase="Moved";
				}
				if(Input.GetMouseButtonDown(0)){
					touchTimeStart=Time.time;
					touchTime=0;
					beganPos = Input.mousePosition;
					touchPhase="Began";
				}
				if(Input.GetMouseButtonUp(0)){	
					touchTimeStart=0;
					touchTime=0;				
					endedPos = Input.mousePosition;
					if(touchPhase!="Hold" && touchPhase!="Moved") touchPhase="Ended";
					else if (touchPhase=="Moved") touchPhase="EndedMove";
					else if (touchPhase=="Hold") touchPhase="EndedHold";
					
				}

				
				lastPos=Input.mousePosition;				
			}
		
			
		if(selectable){


			if (touchPhase=="Began") {
				scrolling=false;
			

			if (hitname) {	
				
				if (introLives){
					if (hitname=="Title") {
						menuState="introOver";
						titleAni = false;
						introBG.color.a = 0;
						mainMenu();
					}
				}
				
				if(hitname=="offsetBox" || hitname=="r_base" || hitname=="g_base" || hitname=="b_base" || hitname=="RGB_boost" || hitname=="r_pat" || hitname=="g_pat" || hitname=="b_pat" ) curSlider = hitname;			

				

				if(hitname=="options" || hitname=="clearData" || hitname=="levelSelect" || hitname=="SFX" || hitname=="music" || hitname=="speed"){
					selectionObj.transform.localScale=Vector3(1,1,1);
					selection();
				}
				if(hitname=="slow" || hitname=="medium" || hitname=="fast"){
					selectionObj.transform.localScale=Vector3(.3,1,1);
					selection();
				}
				else if (hitname=="secret") {
					if (secretState==0) secretRoutine();
					else secretState++;
				}
				else if(hitname=="Yes" || hitname=="No"){
					selectionObj.transform.localScale=Vector3(.5,.85,1);
					selection();	
				}
				else if (hitname=="base" || hitname=="pattern" || hitname=="boosters" || hitname=="patMenuToggle"){
					if (menuState!="cusMenu") {
						selectionObj.transform.localScale=Vector3(3,4,1);
						selection();
						selectionFlicker();
						if (hitname=="patMenuToggle") selectionObj.transform.localPosition.x+=.3;	
					}
				}

				else if (hitname=="colorSwitcher"){
					selectionObj.transform.localScale=Vector3(1.5,6,1);
					selection();
					selectionFlicker();
				}
				else if (hitname=="customize"){
					selectionObj.transform.localScale=Vector3(2,2,1);
					selection();
					selectionFlicker();
				}

				if(hitname =="customize"){
					baseMenu();	
				}
				

				if(selectionOn){
					if(hitname == "options"){
						selectionFlicker()	;
						options();
						selectionOn=false;
					}
					if(hitname == "clearData"){
						selectionFlicker();
						clearDataConfirm();	
					}
					
					if(hitname =="levelSelect"){
						selectionFlicker();
						levelSelect();
							
					}
					if(hitname=="SFX"){
						selectionFlicker();
						sfxToggle();
					}
					if(hitname=="music"){
						selectionFlicker();
						musicToggle();
					}
					if(hitname=="slow"){
						selectionFlicker();
						setSpeed(0);
					}
					if(hitname=="medium"){
						selectionFlicker();
						setSpeed(1);
					}
					if(hitname=="fast"){
						selectionFlicker();
						setSpeed(2);
					}
					if(hitname=="speed"){
						selectionFlicker();
						if (gameSpeed<2) setSpeed(gameSpeed+1);
						else setSpeed(0);
					}
				}
			
				if (hitname=="base" && menuState!="cusMenu"){
					if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip2);
					if(menuState!="base") baseMenu();
					else cusMenu();
				}
				if (hitname=="pattern" && menuState!="cusMenu"){
					if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip2);
					if(menuState!="pat") patMenu();
					else cusMenu();
				}
				if (hitname=="boosters" && menuState!="cusMenu"){
					if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip2);
					if (menuState!="booster") boosterMenu();
					else cusMenu();
				}
				
				if(hitname =="V"){
					if (menuState=="cusMenu"){
						if (gamePhase>=2 || (gamePhase<2 && shipNum!=10)){
							if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip1);
							loadLevel();
						}
						if (gamePhase<2 && shipNum==10){
							if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip4);
						}
					}
					if (menuState=="levelSelect" && selectionOn && selectedLevel!=99) {
						selectionFlicker();
						if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip1);
						cusMenu();		
					} else if (menuState=="levelSelect" && !selectionOn){
						if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip4);
					}

				}
				if (hitname =="X"){
					
					if (menuState=="options" || menuState=="levelSelect") {
						if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip3);
						deselection();
						mainMenu();
					}
					
					if(menuState=="cusMenu"){
						//saveData();
						if (gamePhase<2 && shipNum==10){
							if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip3);
							changeShip("R");
							levelSelect();
						}
						if ((gamePhase<2 && shipNum!=10) || gamePhase>=2){
							if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip3);
							levelSelect();	
						}
					}
					if (menuState=="base" || menuState=="pat" || menuState=="booster"){
						if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip3);
						cusMenu();
					}
					
				}
				if (menuState=="options2"){
					if (hitname=="Yes"){						
						selectionFlicker();
						clearData();
						options();
						if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip1);
					} else if(hitname=="No"){
						selectionFlicker();
						options();
						if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip4);
					}
				}
				if(hitname=="Ro"){
					if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip2);						
					zoomMenu();
				}		
				if(menuState!="levelSelect"){
					if(hitname =="select_L"){
						if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip2);
						selectable=false;
						changeShip("L");
					}
					if(hitname =="select_R"){
						if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip2);
						selectable=false;
						changeShip("R");
					}
				}
				if (menuState=="levelSelect"){
					if(menuState=="levelSelect"){
						if (hitname=="select_L"){
							selectable=false;
							changeWorld("L");
						}
						if (hitname=="select_R"){
							selectable=false;
							changeWorld("R");
						}
					}
				}
				//funcInterupt=false;
				if (patternInput) {
					if (hitname =="patMenuToggle") {
						if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip2);
						if (patSubState=="color") patBrowserMenu();
						else patColorMenu();
					}  
					if(hitname=="colorSwitcher"){
						if (sfx) GetComponent.<AudioSource>().PlayOneShot(blip2);
						var baseColorHolder : Color = baseColor;
						baseColor = patColor;
						patColor = baseColorHolder;
						patColorSwitcherPat.SetColor("_Emission",Vector4(patColor.r/2,patColor.g/2,patColor.b/2));
						patColorSwitcherMain.SetColor("_Emission",Vector4(baseColor.r/2,baseColor.g/2,baseColor.b/2));
						curMenuTabColor = Vector4(patColor.r,patColor.g,patColor.b,.5);
						rPatSlider.transform.localPosition.x = ((-patColor.r)*0.96)+0.48;
						gPatSlider.transform.localPosition.x = ((-patColor.g)*0.96)+0.48;
						bPatSlider.transform.localPosition.x = ((-patColor.b)*0.96)+0.48;
						
						ApplyColors();
					}
				}
			}
		}
	}

	//print("scrolling = "+scrolling);
	//print("curSlider = "+curSlider);
	//print("hitname = "+hitname);
	
	
	if(curSlider){
		if (curSlider=="offsetBox1"){
			//if (Mathf.Abs(deltaPos.x)>1 || Mathf.Abs(lastPos.x-beganPos.x)>1){
				//scrolling = true;
				offsetSlider.transform.localPosition.x =  xTouch;
				offsetX = offsetSlider.transform.localPosition.x;
				shipMat.SetTextureOffset("_DecalTex", Vector2((1/(-1*-.96))*(offsetX+.48),0) ); 
				patThumbColor.mainTextureOffset.x = ((1/(-1*-.96))*(offsetX+.48));  
			//} 
		}
		if (curSlider =="r_base") {
				rBaseSlider.transform.localPosition.x =  xTouch;
				baseColor.r = 1-((1/(-1*(maxSlider-minSlider)))*(rBaseSlider.transform.localPosition.x+minSlider)); 
				//ship10Mat[0].color.r=baseColor.r;
				curMenuTabColor.r = baseColor.r;
				ApplyColors();       
		}
		if (curSlider =="g_base") {
				gBaseSlider.transform.localPosition.x =  xTouch;
				baseColor.g = 1-((1/(-1*(maxSlider-minSlider)))*(gBaseSlider.transform.localPosition.x+minSlider)); 
				//ship10Mat[0].color.g=baseColor.g; 
				curMenuTabColor.g = baseColor.g;
				ApplyColors();
			}
		}
		if (curSlider =="b_base") {
				bBaseSlider.transform.localPosition.x =  xTouch;
				baseColor.b = 1-((1/(-1*(maxSlider-minSlider)))*(bBaseSlider.transform.localPosition.x+minSlider));
				//ship10Mat[0].color.b=baseColor.b;
				curMenuTabColor.b = baseColor.b;
				ApplyColors();    
		}
		//booster color
		if (curSlider=="RGB_boost"){
				rgbBoostSlider.transform.localPosition.x =  xTouch;
				sliderValue = 1-((1/(-1*(maxSlider-minSlider)))*(rgbBoostSlider.transform.localPosition.x+minSlider));
				
				if (sliderValue >= 0.166 && sliderValue <= 0.5) boosterB=1;
				else if (sliderValue < 0.166) boosterB=sliderValue*6;
				else if (sliderValue > 0.5 && sliderValue < 0.666) boosterB=(0.167-(sliderValue-0.5))*6;
				else boosterB = 0;
				
				if (sliderValue >= 0.5 && sliderValue <= 0.833) boosterG=1;
				else if (sliderValue > 0.333 && sliderValue < 0.5) boosterG=(sliderValue-0.333)*6;
				else if (sliderValue > 0.833 && sliderValue <= 1) boosterG=(0.167-(sliderValue-0.833))*6;
				else boosterG = 0;	
				
				if (sliderValue >= 0 && sliderValue <= 0.166) boosterR=1;
				else if (sliderValue >= 0.833 && sliderValue <= 1) boosterR=1;
				else if (sliderValue > 0.666 && sliderValue <= 0.833) boosterR=(sliderValue-0.666)*6;
				else if (sliderValue > 0.166 && sliderValue < 0.333) boosterR=(0.167-(sliderValue-0.166))*6;
				else boosterR = 0;		
				
				colorBoosters();
				curMenuTabColor = Vector4(boosterColor.r,boosterColor.g,boosterColor.b,.5);
		}			
		//pattern color
		if(patternInput){
			if (curSlider =="r_pat") {
					rPatSlider.transform.localPosition.x =  xTouch;
					//if(shipNum!=10) 
					patColor.r = 1-((1/(-1*(maxSlider-minSlider)))*(rPatSlider.transform.localPosition.x+minSlider));
					curMenuTabColor.r = patColor.r;
					patColorSwitcherPat.SetColor("_Emission",patColor/2);    
					ApplyColors();  
			}
			if (curSlider =="g_pat") {
					gPatSlider.transform.localPosition.x =  xTouch;
					//if(shipNum!=10) 
					patColor.g = 1-((1/(-1*(maxSlider-minSlider)))*(gPatSlider.transform.localPosition.x+minSlider));
					curMenuTabColor.g = patColor.g;  
					patColorSwitcherPat.SetColor("_Emission",patColor/2); 
					ApplyColors();
			}
			if (curSlider =="b_pat") {
					bPatSlider.transform.localPosition.x =  xTouch;
					// if(shipNum!=10) 
					patColor.b = 1-((1/(-1*(maxSlider-minSlider)))*(bPatSlider.transform.localPosition.x+minSlider)); 
					curMenuTabColor.b = patColor.b;  
					patColorSwitcherPat.SetColor("_Emission",patColor/2);
					ApplyColors();
		}
	}
	}


	if (LSgo){
		//selectable = false;
		
		if(Mathf.Abs(bgObj[1].transform.localPosition.x) > 0.1){
			bgObj[0].transform.localPosition.x = Mathf.Lerp(bgObj[0].transform.localPosition.x, bgTar , Time.deltaTime*moveSpeed*2);
			bgObj[1].transform.localPosition.x = Mathf.Lerp(bgObj[1].transform.localPosition.x, 0 , Time.deltaTime*moveSpeed*2);
		}else{
			bgObj[0].transform.localPosition.x = 0;
			bgObj[1].transform.localPosition.x = bgTar;
			bgMat[0].mainTexture = bg[worldNum];
			LSgo = false;
			//selectable=true;
		}
	}
	if (shipGo){	
		if(t < 1 ){
			shipObj[shipNum].transform.position.x = Mathf.Lerp( 0 , shipTarX, t);
			t += Time.deltaTime/duration;
		}
		else if (Mathf.Abs(shipObj[nextShip].transform.position.x ) > 0.05 ) {
			if(curAO!=nextShip) {
				shipMat.SetTexture("_MultTex", shipAO[nextShip]);
				curAO=nextShip;
				shipObj[nextShip].transform.position.x = nextShipStartX;
				shipObj[shipNum].transform.position.z = -100;
				cusArtInfo();
				colorBoosters();
			}
			shipObj[nextShip].transform.position.x = Mathf.Lerp( shipObj[nextShip].transform.position.x, 0, Time.deltaTime*moveSpeed*2);
		}
		else {
			t=0;
			shipObj[nextShip].transform.position.x = 0;
			shipGo=false;
			shipNum=nextShip;
		}
	}
	if (go) {
		if(oldState=="introOver")titleScreenMat.color.a = Mathf.Lerp(titleScreenMat.color.a,0,Time.deltaTime*8);
		selectable=false;
		mainMenuObj.transform.localPosition = Vector3.Lerp(mainMenuObj.transform.localPosition,mainMenuObjTar,Time.deltaTime*moveSpeed);
		levelSelectObj.transform.localPosition = Vector3.Lerp(levelSelectObj.transform.localPosition,levelSelectTar,Time.deltaTime*moveSpeed*1.2);
		
	    if(oldState!="levelSelect" && oldState!="mainMenu" && oldState!="options" ){
			if(menuState=="cusMenu"){
		    	base.transform.localPosition = Vector3.Lerp(base.transform.localPosition,tarBase,Time.deltaTime*moveSpeed*((Time.time-moveTime)*6));
				boosters.transform.localPosition = Vector3.Lerp(boosters.transform.localPosition,tarBoosters,Time.deltaTime*moveSpeed*((Time.time-moveTime)*6));
				pattern.transform.localPosition = Vector3.Lerp(pattern.transform.localPosition,tarPattern,Time.deltaTime*moveSpeed*((Time.time-moveTime)*6));
				base.transform.localScale = Vector3.Lerp(base.transform.localScale,tarBaseScale,Time.deltaTime*moveSpeed*((Time.time-moveTime)*6));
				boosters.transform.localScale = Vector3.Lerp(boosters.transform.localScale,tarBoostersScale,Time.deltaTime*moveSpeed*((Time.time-moveTime)*6));
				pattern.transform.localScale = Vector3.Lerp(pattern.transform.localScale,tarPatternScale,Time.deltaTime*moveSpeed*((Time.time-moveTime)*6));
			}else{
				base.transform.localPosition = Vector3.Lerp(base.transform.localPosition,tarBase,Time.deltaTime*moveSpeed);
				boosters.transform.localPosition = Vector3.Lerp(boosters.transform.localPosition,tarBoosters,Time.deltaTime*moveSpeed);
				pattern.transform.localPosition = Vector3.Lerp(pattern.transform.localPosition,tarPattern,Time.deltaTime*moveSpeed);
				base.transform.localScale = Vector3.Lerp(base.transform.localScale,tarBaseScale,Time.deltaTime*moveSpeed);
				boosters.transform.localScale = Vector3.Lerp(boosters.transform.localScale,tarBoostersScale,Time.deltaTime*moveSpeed);
				pattern.transform.localScale = Vector3.Lerp(pattern.transform.localScale,tarPatternScale,Time.deltaTime*moveSpeed);
		    }
	    }	
		customizeButton.transform.localPosition = Vector3.Lerp(customizeButton.transform.localPosition,customizeButtonTar,Time.deltaTime*moveSpeed);
		
		if (shipNum==10 && oldState!="levelSelect" && gamePhase<2 && (menuState=="cusMenu" || menuState=="base" || menuState=="pat" || menuState=="booster")) cusArtifactInfo.transform.localPosition = Vector3.Lerp(cusArtifactInfo.transform.localPosition,cusArtifactInfoTar,Time.deltaTime*moveSpeed);
		
		if((oldState=="mainMenu" && menuState=="options") || oldState=="options" || oldState=="options2"){
			
			customizeButton.transform.localPosition = Vector3.Lerp(customizeButton.transform.localPosition,customizeButtonTar,Time.deltaTime*moveSpeed);
			
			speedButton.transform.localPosition.x = Mathf.Lerp(speedButton.transform.localPosition.x,speedButtonTar.x,Time.deltaTime*moveSpeed);
			sfxButton.transform.localPosition.x = Mathf.Lerp(sfxButton.transform.localPosition.x,sfxButtonTar.x,Time.deltaTime*moveSpeed);
			musicButton.transform.localPosition.x = Mathf.Lerp(musicButton.transform.localPosition.x,musicButtonTar.x,Time.deltaTime*moveSpeed);
			clearDataButton.transform.localPosition.x = Mathf.Lerp(clearDataButton.transform.localPosition.x,clearDataButtonTar.x,Time.deltaTime*moveSpeed);
			areYouSure.transform.localPosition = Vector3.Lerp(areYouSure.transform.localPosition,areYouSureTar,Time.deltaTime*moveSpeed);
			secretButton.transform.localPosition = Vector3.Lerp(secretButton.transform.localPosition,secretButtonTar,Time.deltaTime*moveSpeed);
			
			
		}
		playButton.transform.localPosition = Vector3.Lerp(playButton.transform.localPosition,playButtonTar,Time.deltaTime*moveSpeed);
		optionsButton.transform.localPosition = Vector3.Lerp(optionsButton.transform.localPosition,optionsButtonTar,Time.deltaTime*moveSpeed);
		
		if(menuState=="cusMenu") roButton.transform.localPosition = Vector3.Lerp(roButton.transform.localPosition, roButtonTar, Time.deltaTime*moveSpeed);
		else roButton.transform.localPosition.y = Mathf.Lerp(roButton.transform.localPosition.y, roButtonTar.y, Time.deltaTime*moveSpeed);
		optionsX.transform.localPosition = Vector3.Lerp(optionsX.transform.localPosition,optionsXTar,Time.deltaTime*moveSpeed);
		optionsV.transform.localPosition = Vector3.Lerp(optionsV.transform.localPosition,optionsVTar,Time.deltaTime*moveSpeed);
		//optionsX.transform.localScale = Vector3.Lerp(optionsX.transform.localScale,optionsXscaleTar, Time.deltaTime*moveSpeed);
		//optionsV.transform.localScale = Vector3.Lerp(optionsV.transform.localScale,optionsVscaleTar, Time.deltaTime*moveSpeed);

		curMenuTabColor.a = Mathf.Lerp(curMenuTabColor.a, .5, Time.deltaTime*moveSpeed);
		if(oldState== "cusMenu"){
			menuTab.transform.localPosition.x = base.transform.localPosition.x;
			menuTab.transform.localPosition.y = base.transform.localPosition.y;		
		}
			
		//if(menuState=="zoom") ship.transform.rotation=Quaternion.Slerp(ship.transform.rotation,Quaternion.Euler(0,shipRo,0),Time.deltaTime*moveSpeed);
		
		
		
		patternSelector.transform.localPosition.x = Mathf.Lerp(patternSelector.transform.localPosition.x,tarPatternSelector,Time.deltaTime*moveSpeed);
		patColorSwitcher.transform.localPosition.x = Mathf.Lerp(patColorSwitcher.transform.localPosition.x,tarPatColorSwitcher,Time.deltaTime*moveSpeed);
		
		//xBut.transform.localPosition = Vector3.Lerp(xBut.transform.localPosition,tarX,Time.deltaTime*moveSpeed);
		//vBut.transform.localPosition = Vector3.Lerp(vBut.transform.localPosition,tarV,Time.deltaTime*moveSpeed);
		selectL.transform.localPosition = Vector3.Lerp(selectL.transform.localPosition,tarSelectL,Time.deltaTime*moveSpeed);
		selectR.transform.localPosition = Vector3.Lerp(selectR.transform.localPosition,tarSelectR,Time.deltaTime*moveSpeed);
		
		rBase.transform.localPosition.x = Mathf.Lerp(rBase.transform.localPosition.x,tarRBase,Time.deltaTime*moveSpeed);
		gBase.transform.localPosition.x = Mathf.Lerp(gBase.transform.localPosition.x,tarGBase,Time.deltaTime*moveSpeed);
		bBase.transform.localPosition.x = Mathf.Lerp(bBase.transform.localPosition.x,tarBBase,Time.deltaTime*moveSpeed);
		
		rPat.transform.localPosition.x = Mathf.Lerp(rPat.transform.localPosition.x,tarRPat,Time.deltaTime*moveSpeed);
		gPat.transform.localPosition.x = Mathf.Lerp(gPat.transform.localPosition.x,tarGPat,Time.deltaTime*moveSpeed);
		bPat.transform.localPosition.x = Mathf.Lerp(bPat.transform.localPosition.x,tarBPat,Time.deltaTime*moveSpeed);
		
		rgbBoost.transform.localPosition.x = Mathf.Lerp(rgbBoost.transform.localPosition.x,tarRGBboost,Time.deltaTime*moveSpeed);
		
		Camera.main.transform.localPosition = Vector3.Lerp(Camera.main.transform.localPosition,tarCam,Time.deltaTime*moveSpeed);
		Camera.main.transform.rotation = Quaternion.Slerp(Camera.main.transform.rotation,tarCamRo,Time.deltaTime*moveSpeed);

		if (Time.time-moveTime > .05) { 
			if(menuState=="mainMenu"){
				levelSelectObj.transform.localPosition = Vector3(160,0,40);
				levelSelectTar = Vector3(160,0,40);
			}
		}
		if (Time.time-moveTime > .4) {
			selectable=true;
			
			
		}

		if(((Time.time-moveTime > .4) && (menuState=="cusMenu")) || ((menuState=="cusMenu" && oldState=="zoom") || (menuState=="zoom" && oldState=="cusMenu"))){
				base.transform.localPosition = Vector3(-2.7,4,15);
				boosters.transform.localPosition = Vector3(2.7,4,15);
				pattern.transform.localPosition = Vector3(0,4,15);
				tarBase = Vector3(-2.7,4,15);
				tarBoosters = Vector3(2.7,4,15);
				tarPattern = Vector3(0,4,15);
		}
		
		if (Time.time-moveTime > 1) {
			
		
			levelSelectObj.transform.localPosition = levelSelectTar;
			if(introLives && menuState=="mainMenu") {
				Destroy(introObj);
				introLives=false;
			}
    		
    		if(menuState=="levelSelect") {
    			levelSelectOn=true;
    			if (oldState=="mainMenu" || oldState=="cusMenu") levelSelectNumbers();
				
				
				if (worldNum==Mathf.Floor(oldLevel/10)) {
					selectedLevel=oldLevel-(worldNum*10);
					falseSelection(levelBox[selectedLevel]);
				}
				else {
					selectedLevel=0;
					falseSelection(levelBox[selectedLevel]);					
				}	
    		}
    		
    		base.transform.localPosition = tarBase;
			boosters.transform.localPosition = tarBoosters;
			pattern.transform.localPosition = tarPattern;
			
			mainMenuObj.transform.localPosition = mainMenuObjTar;
			//mainMenuBG.color.a = mainMenuBGalphaTar;
			
			

			
			patternSelector.transform.localPosition.x = tarPatternSelector;
			patColorSwitcher.transform.localPosition.x = tarPatColorSwitcher;

			//xBut.transform.localPosition = tarX;
			//vBut.transform.localPosition = tarV;
			
			selectL.transform.localPosition = tarSelectL;
			selectR.transform.localPosition = tarSelectR;
		
			rBase.transform.localPosition.x = tarRBase;
			gBase.transform.localPosition.x = tarGBase;
			bBase.transform.localPosition.x = tarBBase;
			rPat.transform.localPosition.x = tarRPat;
			gPat.transform.localPosition.x = tarGPat;
			bPat.transform.localPosition.x = tarBPat;
			rgbBoost.transform.localPosition.x = tarRGBboost;
			Camera.main.transform.localPosition = tarCam;
			Camera.main.transform.rotation = tarCamRo;
			//if(menuState=="mainMenu" || menuState=="levelSelect") saveData();
			
			go=false;
    		selectable=true;
    	}	
    }

    if (patSubGo) {
		patColorSwitcher.transform.localPosition.x = Mathf.Lerp(patColorSwitcher.transform.localPosition.x,tarPatColorSwitcher,Time.deltaTime*moveSpeed);
		
		patternList.transform.localPosition = Vector3.Lerp(patternList.transform.localPosition,tarPatternList,Time.deltaTime*moveSpeed);
		
		rPat.transform.localPosition.x = Mathf.Lerp(rPat.transform.localPosition.x,tarRPat,Time.deltaTime*moveSpeed);
		gPat.transform.localPosition.x = Mathf.Lerp(gPat.transform.localPosition.x,tarGPat,Time.deltaTime*moveSpeed);
		bPat.transform.localPosition.x = Mathf.Lerp(bPat.transform.localPosition.x,tarBPat,Time.deltaTime*moveSpeed);

		//optionsX.transform.localPosition = Vector3.Lerp(optionsX.transform.localPosition,optionsXTar,Time.deltaTime*moveSpeed);

		if(Time.time-moveTime2 > 1){
			patSubGo=false;
			
			patColorSwitcher.transform.localPosition.x = tarPatColorSwitcher;
			patternList.transform.localPosition = tarPatternList;
			rPat.transform.localPosition.x = tarRPat;
			gPat.transform.localPosition.x = tarGPat;
			bPat.transform.localPosition.x = tarBPat;
		}
	}

	if(menuState!="booster" && menuState!="zoom" && menuState!="intro" && menuState!="loading") shipObj[shipNum].transform.Rotate(Vector3.up * Time.deltaTime*30, Space.World);
	else if (menuState=="loading") {
		shipObj[shipNum].transform.rotation=Quaternion.Slerp(shipObj[shipNum].transform.rotation,Quaternion.Euler(0,173,0),Time.deltaTime*15);
	}
	else if (menuState=="booster") shipObj[shipNum].transform.rotation=Quaternion.Slerp(shipObj[shipNum].transform.rotation,Quaternion.Euler(0,337,0),Time.deltaTime);

	if (menuState=="zoom") {
		if(touchPhase=="Moved" || touchPhase=="Hold"){
			roButton.transform.localPosition.x = xTouch;
			if (aspectMult>=1) shipRo = shipObj[shipNum].transform.localEulerAngles.y - deltaPos.x*(1.5/yAdj);
            else shipRo = shipObj[shipNum].transform.localEulerAngles.y - deltaPos.x*(1.2/xAdj);
            shipObj[shipNum].transform.rotation=Quaternion.Euler(0,shipRo,0);
		}
	}
	
	menuTabColor.SetColor("_TintColor",Vector4(curMenuTabColor.r/2,curMenuTabColor.g/2,curMenuTabColor.b/2,curMenuTabColor.a));
	
}


function loadLevel(){
	//positions from "zoom"
	oldState=menuState;

	//menuTab.transform.localPosition.y = 3.5;
	//tarMenuTabColor = Vector4(0,0,0,1);
	
	//tarRGBboost = 9;
	
	//tarRBase = -17;
	//tarGBase = -13;
	//tarBBase = -9;
	
	//tarRPat = 17;
	//tarGPat = 13;
	//tarBPat = 9;

	//tarPatternList = Vector3(patternList.transform.localPosition.x, -3, 13);
	//tarPatColorSwitcher = -8;
	customizeButtonTar = Vector3(0,1,3);
	moveTime = Time.time;
	moveTime2 = Time.time;
	//tarBase = Vector3(-2.7,4,14);
	//tarBoosters = Vector3(2.7,4,14);
	//tarPattern = Vector3(0,4,14);
	//tarX = Vector3(-1.26,-4,14);
	//tarV = Vector3(1.26,-4,14);
	tarSelectL = Vector3(-6.2,0.18,14);
	tarSelectR = Vector3(6.2,0.18,14);
	tarCam = Vector3(0,-12.9,0.3); //new cam position
	tarCamRo = Quaternion.Euler(16,0,0);
	
	//tarPatternSelector = -10*Mathf.Clamp(aspectMult,1,2);
	
	optionsXTar = Vector3(-0.78, -1, 3);
	optionsVTar = Vector3(0.78, -1, 3);
	roButtonTar = Vector3(0,-1,3);
	
	go = true;
	patSubGo = true;
	//
	
	menuState="loading";
	
	
	if (sfx) GetComponent.<AudioSource>().PlayOneShot(startSound);
	selectable=false;
	yield WaitForSeconds(1);
	//if (worldNum==6 && selectedLevel>=0 && selectedLevel<=1) selectedLevel+=7;;
	PlayerPrefs.SetInt("Level", worldNum*10+selectedLevel);
	saveData();
	System.GC.Collect();
	yield WaitForSeconds(.5);
	loading();
}

function loadCin(which : int){
	selectable=false;
	yield WaitForSeconds(1);
	PlayerPrefs.SetInt("Level", worldNum*10+selectedLevel);
	saveData();
	System.GC.Collect();
	yield WaitForSeconds(.3);
	loadingCin(which);
}


function selection(){
	if(selectable){
		selectionSubObj.GetComponent.<Renderer>().material.SetColor("_TintColor",Vector4(0,.35,.55,.5));
		//selectionSubObj2.renderer.material.color.a=1;
		//print("hitpos = "+hit.transform.position);
		selectionObj.transform.position=hit.transform.position;
		selectionOn=true;
		selected=hitname;
	}
}

function falseSelection(which : GameObject){
	
	selectionSubObj.GetComponent.<Renderer>().material.SetColor("_TintColor",Vector4(0,.35,.55,.5));
	//selectionSubObj2.renderer.material.color.a=1;
	selectionObj.transform.position=which.transform.position;
	selectionOn=true;
	selected=which.transform.name;
	selectionObj.transform.localScale=Vector3(2.6,2.3,1);
}

function deselection(){
	if(menuState=="levelSelect" ){
		if(hitname!="V"){
			selectionSubObj.GetComponent.<Renderer>().material.SetColor("_TintColor",Vector4(0,0,0,0));
			selectionObj.transform.position=Vector3(0,100,0);
			selectionOn=false;
		}
	}
}


function levelSelectNumbers(){
//	yield WaitForSeconds(.2);
	lsnFunctionRunning=true;
	selectable=false;
	//if(menuState!="levelSelect") return;
	
	if(worldNum!=6){
		if(worldNum==maxWorld) var levelLimit : int = (maxLevel%10)+1;
		else levelLimit = 10;
	}
	
	//print("Level select: World "+worldNum);
	
	for (i=0; i<10; i++) {
			levelBox[i].transform.localPosition = Vector3(0,0,1000);
			lsn[i].transform.localPosition.z = 1000;
			lsa[i].transform.localPosition.z = 1000;
	}
	for (i=0; i<lst.length; i++){
		lst[i].transform.localPosition.z = 1000;
	}
	for (i=0; i<lsc.length; i++){
		lsc[i].transform.localPosition.z = 1000;
	}
	
	if(worldNum!=6){
		if (gamePhase<2) RunArtUpdate();	
		else RunNumberUpdate();
	}else{ //worldNum==6
		RunTutorialUpdate();
	}
	
	yield WaitForSeconds(0.3);
	lsnFunctionRunning=false;
	////selectable=true;
}


	
function RunTutorialUpdate(){

	for (i=0; i<tutorialState; i++){
		levelBox[i].transform.localPosition = Vector3(0.028,0,i*-0.56);
		lst[i].transform.localPosition.z = (i%5)*-0.56;
	}
	for (i=0; i<cinemaState; i++){
		levelBox[i+5].transform.localPosition = Vector3(-2.972,0,i*-0.56);
		lsc[i].transform.localPosition.z = (i%5)*-0.56;
	}
}

function RunNumberUpdate(){
	for (i=0; i<10; i++) {
		var lsnScript: LSNScript1 = lsn[i].GetComponent(LSNScript1);
		var levelTime = PlayerPrefs.GetFloat("Level"+(worldNum*10+i)+"Time",0);
		
		lsnScript.pantherHead.localPosition.z = Mathf.Abs(PlayerPrefs.GetInt("Level"+(worldNum*10+i)+"PantherFlag",0)-1)*1000;
		
		if (levelTime!=99.99 || (worldNum*10+i) == maxLevel){
			levelBox[i].transform.localPosition = Vector3((i/5)*-3,0,(i%5)*-0.56);
			lsn[i].transform.localPosition.z = (i%5)*-0.56;
			lsnScript.printOutput=true;
		} else lsnScript.printOutput=false;		
		lsnScript.UpdateNumbers(worldNum*10+i, levelTime);	
	}
}

function RunArtUpdate(){
	for (i=0; i<10; i++) {
		var lsaScript: LSAScript1 = lsa[i].GetComponent(LSAScript1);
		var levelTime = PlayerPrefs.GetFloat("Level"+(worldNum*10+i)+"Time",0);
		var artCount = PlayerPrefs.GetInt("Level"+(worldNum*10+i)+"ArtCount",000);

		if (minArtLevel[worldNum]==99 && artCount<111) minArtLevel[worldNum]=i;
		//print("mal "+minArtLevel[worldNum]);
		//print("aC "+artCount);
		
		if (levelTime!=99.99 || (worldNum*10+i) == maxLevel){
			levelBox[i].transform.localPosition = Vector3((i/5)*-3,0,(i%5)*-0.56);
			lsa[i].transform.localPosition.z = (i%5)*-0.56;
			lsaScript.printOutput=true;
		} else lsaScript.printOutput=false;		
		lsaScript.UpdateNumbers(worldNum*10+i, artCount);
		
		
	}
}


function intro(){
	moveTime = Time.time;
	moveTime2 = Time.time;
	
	levelSelectOn=false;
	
	logoMat.color.a =0;
	titleScreenMat.color.a = 0;
	
	//blackout.transform.localPosition = Vector3(0,0,-1);

	
	oldState=menuState;
	menuState = "intro";
	
	mainMenuObj.transform.localPosition = Vector3(0,-0.55,-1);
	mainMenuObjTar = Vector3(0,-0.55,-1);
	//mainMenuBGalphaTar = 0;
	//mainMenuBG.color.a = 0;


	patColorMenu();
	patSubGo=true;	
	
	roButton.transform.localPosition = Vector3(0,-1,3);
	roButtonTar = Vector3(0,-1,3);

	tarPatternSelector = -10*Mathf.Clamp(aspectMult,1,2);
	tarPatColorSwitcher = -8*Mathf.Clamp(aspectMult,1,2);

	tarBase = Vector3(-2.7,4,14);
	tarBoosters = Vector3(2.7,4,14);
	tarPattern = Vector3(0,4,14);
	
	//tarMenuTabX = 6.5;
	tarMenuTabY = 4;
	tarMenuTabColor = Vector4(0,0,0,1);
	
	tarRGBboost = 9;
	
	tarRBase = -17*Mathf.Clamp(aspectMult,1,2);
	tarGBase = -13*Mathf.Clamp(aspectMult,1,2);
	tarBBase = -9*Mathf.Clamp(aspectMult,1,2);
	
	tarRPat = 17*Mathf.Clamp(aspectMult,1,2);
	tarGPat = 13*Mathf.Clamp(aspectMult,1,2);
	tarBPat = 9*Mathf.Clamp(aspectMult,1,2);
	
	//tarX = Vector3(-1.26,-4,14);
	//tarV = Vector3(1.26,-4,14);
	
	tarSelectL = Vector3(-6.2*Mathf.Clamp(aspectMult,1,2),0.18,14);
	tarSelectR = Vector3(6.2*Mathf.Clamp(aspectMult,1,2),0.18,14);
	
	tarCam = Vector3(0,-6.3,-245.5);
	tarCamRo = Quaternion.Euler(27,0,0);
	
	levelSelectObj.transform.localPosition = Vector3(160,0,40);
	levelSelectTar= Vector3(160,0,40);
	
	introAnimation.Initiate();
}


function introTrans(){
	//blackout.transform.localPosition = Vector3(0,0,-1);

	moveTime = Time.time;
	moveTime2 = Time.time;
	
	oldState=menuState;
	menuState = "introTrans";
}


function options(){
	selectable=false;
	yield WaitForSeconds(.3);

	moveTime = Time.time;
	moveTime2 = Time.time;

	//blackout.transform.localPosition = Vector3(0,0,-1);
	
	oldState=menuState;
	menuState = "options";
	
	playButtonTar = Vector3(-2.5*Mathf.Clamp(aspectMult,1,2), 3.2, 0.52);
	optionsButtonTar = Vector3(-1.5*Mathf.Clamp(aspectMult,1,2), 3.2, 0.286);
	
	speedButtonTar = Vector3(-0.019,3.2,0.64);
	sfxButtonTar = Vector3(-.085,3.2,.46);
	musicButtonTar = Vector3(.02,3.2,0.28);
	clearDataButtonTar = Vector3(.22,3.2,0.1);
	
	areYouSureTar = Vector3(4.4, 3.2, 0.4);
	secretButtonTar = Vector3(0.71, 3.2, 0.9);
	
	optionsVTar = Vector3(0.957*Mathf.Clamp(aspectMult,1,2)-0.25, -1, 3);
	//optionsXTar = Vector3(-0.707*Mathf.Clamp(aspectMult,1,2),-0.527,3);
	optionsXTar = Vector3(-0.957*Mathf.Clamp(aspectMult,1,2)+0.25, -0.527, 3);

	go=true;
}

function clearDataConfirm(){
	selectable=false;
	yield WaitForSeconds(.3);

	moveTime = Time.time;
	moveTime2 = Time.time;

	//blackout.transform.localPosition = Vector3(0,0,-1);
	
	oldState=menuState;
	menuState = "options2";
	
	playButtonTar = Vector3(-1.7*Mathf.Clamp(aspectMult,1,2), 3.2, 0.52);
	//customizeButtonTar = Vector3(-1.7,3.2,0.35);
	optionsButtonTar = Vector3(-1.7*Mathf.Clamp(aspectMult,1,2),3.2,00.286);
	
	areYouSureTar = Vector3(0, 3.2, 0.4);
	
	speedButtonTar = Vector3(-4*Mathf.Clamp(aspectMult,1,2),3.2,0.64);
	sfxButtonTar = Vector3(-3*Mathf.Clamp(aspectMult,1,2),3.2,.574);
	musicButtonTar = Vector3(-2.5*Mathf.Clamp(aspectMult,1,2),3.2,0.356);
	clearDataButtonTar = Vector3(-1.7*Mathf.Clamp(aspectMult,1,2), 3.2, 0.138);
	
	secretButtonTar = Vector3(0.62,3.2,1);
	
	optionsVTar = Vector3(0.957*Mathf.Clamp(aspectMult,1,2)-0.25,-1,3);
	optionsXTar = Vector3(-0.957*Mathf.Clamp(aspectMult,1,2)+0.25,-1,3);
	//optionsXscaleTar = Vector3(-0.5,.22,.22);
	//optionsVscaleTar = Vector3(0.5,.22,.22);
	
	go=true;
}


function mainMenu(){
	
	
	selectionOn=false;
	
	cusArtifactInfo.transform.localPosition=Vector3(-1.8,100,14);
	
	levelSelectOn=false;


	moveTime = Time.time;
	moveTime2 = Time.time;
	
	oldState=menuState;
	menuState = "mainMenu";
	
	customizeButtonTar = Vector3(0,1,3);	
	
	playButtonTar = Vector3(0, 3.2, .52);
	optionsButtonTar = Vector3(0, 3.2, 0.286);
	

	if (oldState=="options"){
		speedButtonTar = Vector3(3.2*Mathf.Clamp(aspectMult,1,2),3.2,0.64);
		sfxButtonTar = Vector3(2.7*Mathf.Clamp(aspectMult,1,2),3.2,.574);
		musicButtonTar = Vector3(2.2*Mathf.Clamp(aspectMult,1,2),3.2,0.356);
		clearDataButtonTar = Vector3(1.7*Mathf.Clamp(aspectMult,1,2),3.2,0.138);
		secretButtonTar=Vector3(1.7*Mathf.Clamp(aspectMult,1,2),3.2,1);
	} 
	else {
		playButton.transform.localPosition = Vector3(0,3.2,0.52);
		optionsButton.transform.localPosition = Vector3(0,3.2,00.286);
		speedButton.transform.localPosition.x = 1.7*Mathf.Clamp(aspectMult,1,2);
		sfxButton.transform.localPosition.x = 1.7*Mathf.Clamp(aspectMult,1,2);
		musicButton.transform.localPosition.x = 1.7*Mathf.Clamp(aspectMult,1,2);
		clearDataButton.transform.localPosition.x = 1.7*Mathf.Clamp(aspectMult,1,2);
		
		//optionsX.transform.localPosition = Vector3(-0.707,-1,3);
	}
	
	roButton.transform.localPosition = Vector3(0,-1,3);
	roButtonTar = Vector3(0,-1,3);
	optionsXTar = Vector3(-0.957*Mathf.Clamp(aspectMult,1,2)+0.25, -1, 3);
	optionsVTar = Vector3(0.957*Mathf.Clamp(aspectMult,1,2)-0.25, -1, 3);
	//optionsXscaleTar = Vector3(-0.5,.22,.22);
	//optionsVscaleTar = Vector3(0.5,.22,.22);
	
	
	//mainMenuBGalphaTar = 1;
	mainMenuObjTar = Vector3(0,-0.55,6.2);

	patColorMenu();
	patSubGo=true;	

	tarPatternSelector = -10*Mathf.Clamp(aspectMult,1,2);
	tarPatColorSwitcher = -8*Mathf.Clamp(aspectMult,1,2);

	tarBase = Vector3(-2.7*Mathf.Clamp(aspectMult,1,2),4,14);
	tarBoosters = Vector3(2.7*Mathf.Clamp(aspectMult,1,2),4,14);
	tarPattern = Vector3(0,4,14);
	
	//tarMenuTabX = 6.5;
	tarMenuTabY = 4;
	tarMenuTabColor = Vector4(0,0,0,1);
	
	tarRGBboost = 9*Mathf.Clamp(aspectMult,1,2);
	
	tarRBase = -17*Mathf.Clamp(aspectMult,1,2);
	tarGBase = -13*Mathf.Clamp(aspectMult,1,2);
	tarBBase = -9*Mathf.Clamp(aspectMult,1,2);
	
	tarRPat = 17*Mathf.Clamp(aspectMult,1,2);
	tarGPat = 13*Mathf.Clamp(aspectMult,1,2);
	tarBPat = 9*Mathf.Clamp(aspectMult,1,2);
	
	tarX = Vector3(-1.26*Mathf.Clamp(aspectMult,1,2),-4,14);
	tarV = Vector3(1.26*Mathf.Clamp(aspectMult,1,2),-4,14);
	
	tarSelectL = Vector3(-6.2*Mathf.Clamp(aspectMult,1,2),0.18,14);
	tarSelectR = Vector3(6.2*Mathf.Clamp(aspectMult,1,2),0.18,14);
	
	tarCam = Vector3(0,-6.3,-245.5);
	tarCamRo = Quaternion.Euler(27,0,0);

	
	if(oldState=="levelSelect"){
		levelSelectTar= Vector3(0,0,40);	
	}else {
		//print(oldState);
		levelSelectTar= Vector3(160,0,40);
	}

	go=true;
	
	//blackout.transform.localPosition = Vector3(0,0,-1);		
}

function startPos0(){
	mainMenuObjTar = Vector3(0,-0.55,-1);
//	patColorMenu();
//	patSubGo=true;	
	titleScreenMat.color.a = 0;
	tarPatternSelector = -10*Mathf.Clamp(aspectMult,1,2);
	tarPatColorSwitcher = -8*Mathf.Clamp(aspectMult,1,2);
	tarBase = Vector3(-2.7*Mathf.Clamp(aspectMult,1,2),4,14);
	tarBoosters = Vector3(2.7*Mathf.Clamp(aspectMult,1,2),4,14);
	tarPattern = Vector3(0,4,14);
	tarMenuTabY = 4;
	tarMenuTabColor = Vector4(0,0,0,1);
	tarRGBboost = 9*Mathf.Clamp(aspectMult,1,2);
	tarRBase = -17*Mathf.Clamp(aspectMult,1,2);
	tarGBase = -13*Mathf.Clamp(aspectMult,1,2);
	tarBBase = -9*Mathf.Clamp(aspectMult,1,2);
	tarRPat = 17*Mathf.Clamp(aspectMult,1,2);
	tarGPat = 13*Mathf.Clamp(aspectMult,1,2);
	tarBPat = 9*Mathf.Clamp(aspectMult,1,2);	
	tarSelectL = Vector3(-6.2*Mathf.Clamp(aspectMult,1,2),0.18,14);
	tarSelectR = Vector3(6.2*Mathf.Clamp(aspectMult,1,2),0.18,14);
	tarCam = Vector3(0,-6.3,-245.5);
	tarCamRo = Quaternion.Euler(27,0,0);	
	levelSelectTar= Vector3(160,0,40);
	roButton.transform.localPosition = Vector3(0,-1,3);
	roButtonTar = Vector3(0,-1,3);
	
	cusArtifactInfo.transform.localPosition=Vector3(-1.8*Mathf.Clamp(aspectMult,1,2),100,14);
	
	levelSelectOn=false;
	
	optionsX.transform.localPosition = Vector3(-0.957*Mathf.Clamp(aspectMult,1,2)+0.25, -1, 3);
	optionsV.transform.localPosition = Vector3(0.957*Mathf.Clamp(aspectMult,1,2)-0.25, -1, 3);
	
	mainMenuObj.transform.localPosition = Vector3(0,-0.55,-1);
	
	patternSelector.transform.localPosition.x = -5*Mathf.Clamp(aspectMult,1,2);
	patColorSwitcher.transform.localPosition.x = -8*Mathf.Clamp(aspectMult,1,2);
	customizeButton.transform.localPosition = Vector3(0,1,3);
	base.transform.localPosition = Vector3(-2.7*Mathf.Clamp(aspectMult,1,2),4,14);
	boosters.transform.localPosition = Vector3(2.7*Mathf.Clamp(aspectMult,1,2),4,14);
	pattern.transform.localPosition = Vector3(-0.5*Mathf.Clamp(aspectMult,1,2),4,14);
	
	//tarMenuTabX = 6.5;
	menuTab.transform.localPosition.y = 4;
	
	playButton.transform.localPosition = Vector3(0,3.2,.52);
	optionsButton.transform.localPosition = Vector3(0,3.2,0.286);
	clearDataButton.transform.localPosition.x = -1.7*Mathf.Clamp(aspectMult,1,2);
	customizeButtonTar = Vector3(0,1,3);	
		
	rgbBoost.transform.localPosition.x = 9*Mathf.Clamp(aspectMult,1,2);
	
	rBase.transform.localPosition.x = -17*Mathf.Clamp(aspectMult,1,2);
	gBase.transform.localPosition.x = -13*Mathf.Clamp(aspectMult,1,2);
	bBase.transform.localPosition.x = -9*Mathf.Clamp(aspectMult,1,2);
	
	rPat.transform.localPosition.x = 17*Mathf.Clamp(aspectMult,1,2);
	gPat.transform.localPosition.x = 13*Mathf.Clamp(aspectMult,1,2);
	bPat.transform.localPosition.x = 9*Mathf.Clamp(aspectMult,1,2);
		
	//tarX = Vector3(-1.26,-4,14);
	//tarV = Vector3(1.26,-4,14);
	
	selectL.transform.localPosition = Vector3(-6.2*Mathf.Clamp(aspectMult,1,2),0.18,14);
	selectR.transform.localPosition = Vector3(6.2*Mathf.Clamp(aspectMult,1,2),0.18,14);
	
	levelSelectObj.transform.localPosition = Vector3(160,0,40);
	
	Camera.main.transform.localPosition = Vector3(0,-6.3,-245.5);
	tarCam = Vector3(0,-6.3,-245.5);
	Camera.main.transform.rotation = Quaternion.Euler(27,0,0);
	tarCamRo = Quaternion.Euler(27,0,0);
	//cam.transform.localPosition = Quaternion.Euler(27,0,0);
	ApplyColors();
	
}

function startPos1(){
	introAnimation.KillCam();
	cusArtifactInfo.transform.localPosition=Vector3(-1.8*Mathf.Clamp(aspectMult,1,2),100,14);
	
	levelSelectOn=false;
	
	optionsX.transform.localPosition = Vector3(-0.957*Mathf.Clamp(aspectMult,1,2)+0.25,-1,3);
	optionsV.transform.localPosition = Vector3(0.957*Mathf.Clamp(aspectMult,1,2)-0.25,-1,3);
	
	mainMenuObj.transform.localPosition = Vector3(0,-0.55,6.2);
	
	patternSelector.transform.localPosition.x = -5*Mathf.Clamp(aspectMult,1,2);
	patColorSwitcher.transform.localPosition.x = -8*Mathf.Clamp(aspectMult,1,2);
	customizeButton.transform.localPosition = Vector3(0,1,3);
	base.transform.localPosition = Vector3(-2.7*Mathf.Clamp(aspectMult,1,2),4,14);
	boosters.transform.localPosition = Vector3(2.7*Mathf.Clamp(aspectMult,1,2),4,14);
	pattern.transform.localPosition = Vector3(-0.5*Mathf.Clamp(aspectMult,1,2),4,14);
	roButton.transform.localPosition = Vector3(0,-1,3);
	roButtonTar = Vector3(0,-1,3);
	//tarMenuTabX = 6.5;
	menuTab.transform.localPosition.y = 4;
	
	playButton.transform.localPosition = Vector3(0,3.2,.52);
	optionsButton.transform.localPosition = Vector3(0,3.2,0.286);
	clearDataButton.transform.localPosition.x = -1.7*Mathf.Clamp(aspectMult,1,2);
	customizeButtonTar = Vector3(0,1,3);	
		
	rgbBoost.transform.localPosition.x = 9*Mathf.Clamp(aspectMult,1,2);
	
	rBase.transform.localPosition.x = -17*Mathf.Clamp(aspectMult,1,2);
	gBase.transform.localPosition.x = -13*Mathf.Clamp(aspectMult,1,2);
	bBase.transform.localPosition.x = -9*Mathf.Clamp(aspectMult,1,2);
	
	rPat.transform.localPosition.x = 17*Mathf.Clamp(aspectMult,1,2);
	gPat.transform.localPosition.x = 13*Mathf.Clamp(aspectMult,1,2);
	bPat.transform.localPosition.x = 9*Mathf.Clamp(aspectMult,1,2);
	
	//tarX = Vector3(-1.26,-4,14);
	//tarV = Vector3(1.26,-4,14);
	
	selectL.transform.localPosition = Vector3(-6.2*Mathf.Clamp(aspectMult,1,2),0.18,14);
	selectR.transform.localPosition = Vector3(6.2*Mathf.Clamp(aspectMult,1,2),0.18,14);
	
	Camera.main.transform.localPosition = Vector3(0,-6.3,-245.5);
	//cam.transform.localPosition = Quaternion.Euler(27,0,0);
	ApplyColors();
	
}

function startPos2(){
	introAnimation.KillCam();
	
	selectedLevel = PlayerPrefs.GetInt("Level",0)-(worldNum*10);
	customizeButtonTar = Vector3(0,1,3);
	mainMenuObjTar = Vector3(0,-0.55,-1);
	playButtonTar = Vector3(0,0,0.52);
	optionsButtonTar = Vector3(0,0,0.286);
	levelSelectObj.transform.position.x = 0;
	levelSelectTar = Vector3(0,0,8);
	tarCam = Vector3(0,-6.3,-245.5);
	tarCamRo = Quaternion.Euler(27,0,0);
	LStitle.mainTexture=LStitle_texes[worldNum];
	tarSelectL = Vector3(-6.2*Mathf.Clamp(aspectMult,1,2),0.18,14);
	tarSelectR = Vector3(6.2*Mathf.Clamp(aspectMult,1,2),0.18,14);
	patColorMenu();
	patSubGo=false;	
	tarPatternSelector = -10*Mathf.Clamp(aspectMult,1,2);
	tarPatColorSwitcher = -8*Mathf.Clamp(aspectMult,1,2);
	tarBase = Vector3(-2.7*Mathf.Clamp(aspectMult,1,2),4,14);
	tarBoosters = Vector3(2.7*Mathf.Clamp(aspectMult,1,2),4,14);
	tarPattern = Vector3(0,4,14);
	tarMenuTabY = 4;
	tarMenuTabColor = Vector4(0,0,0,1);
	tarRGBboost = 9*Mathf.Clamp(aspectMult,1,2);
	tarRBase = -17*Mathf.Clamp(aspectMult,1,2);
	tarGBase = -13*Mathf.Clamp(aspectMult,1,2);
	tarBBase = -9*Mathf.Clamp(aspectMult,1,2);
	tarRPat = 17*Mathf.Clamp(aspectMult,1,2);
	tarGPat = 13*Mathf.Clamp(aspectMult,1,2);
	tarBPat = 9*Mathf.Clamp(aspectMult,1,2);
	optionsXTar = Vector3(-0.957*Mathf.Clamp(aspectMult,1,2)+0.25,-0.527,3);
	optionsVTar = Vector3(0.957*Mathf.Clamp(aspectMult,1,2)-0.25,-0.527,3);
	//optionsXscaleTar = Vector3(-0.5,.22,.22);
	//optionsVscaleTar = Vector3(0.5,.22,.22);
	
	cusArtifactInfo.transform.localPosition=Vector3(-1.8*Mathf.Clamp(aspectMult,1,2),100,14);
	
	levelSelectOn=false;
	roButton.transform.localPosition = Vector3(0,-1,3);
	roButtonTar = Vector3(0,-1,3);
	
	optionsX.transform.localPosition = Vector3(-0.957*Mathf.Clamp(aspectMult,1,2)+0.25,-0.527,3);
	optionsX.transform.localScale= Vector3(-0.5,.22,.22);
	optionsV.transform.localPosition = Vector3(0.957*Mathf.Clamp(aspectMult,1,2)-0.25,-0.527,3);
	optionsV.transform.localScale= Vector3(0.5,.22,.22);
	
	mainMenuObj.transform.localPosition = Vector3(0,-0.55,-1);
	
	patternSelector.transform.localPosition.x = -5*Mathf.Clamp(aspectMult,1,2);
	patColorSwitcher.transform.localPosition.x = -8*Mathf.Clamp(aspectMult,1,2);
	customizeButton.transform.localPosition = Vector3(0,1,3);
	base.transform.localPosition = Vector3(-2.7*Mathf.Clamp(aspectMult,1,2),4,14);
	boosters.transform.localPosition = Vector3(2.7*Mathf.Clamp(aspectMult,1,2),4,14);
	pattern.transform.localPosition = Vector3(-0.5,4,14);
	
	//tarMenuTabX = 6.5;
	menuTab.transform.localPosition.y = 4;
	
	playButton.transform.localPosition = Vector3(0,3.2,.52);
	optionsButton.transform.localPosition = Vector3(0,3.2,0.286);
	clearDataButton.transform.localPosition.x = -1.7*Mathf.Clamp(aspectMult,1,2);
	customizeButtonTar = Vector3(0,1,3);	
		
	rgbBoost.transform.localPosition.x = 9*Mathf.Clamp(aspectMult,1,2);
	
	rBase.transform.localPosition.x = -17*Mathf.Clamp(aspectMult,1,2);
	gBase.transform.localPosition.x = -13*Mathf.Clamp(aspectMult,1,2);
	bBase.transform.localPosition.x = -9*Mathf.Clamp(aspectMult,1,2);
	
	rPat.transform.localPosition.x = 17*Mathf.Clamp(aspectMult,1,2);
	gPat.transform.localPosition.x = 13*Mathf.Clamp(aspectMult,1,2);
	bPat.transform.localPosition.x = 9*Mathf.Clamp(aspectMult,1,2);
	
	//tarX = Vector3(-1.26,-4,14);
	//tarV = Vector3(1.26,-4,14);
	
	levelSelectObj.transform.localPosition = Vector3(0,0,8);
	
	selectL.transform.localPosition = Vector3(-6.2*Mathf.Clamp(aspectMult,1,2),0.18,14);
	selectR.transform.localPosition = Vector3(6.2*Mathf.Clamp(aspectMult,1,2),0.18,14);
	
	Camera.main.transform.localPosition = Vector3(0,-6.3,-245.5);
	//cam.transform.localPosition = Quaternion.Euler(27,0,0);
	ApplyColors();
}


function levelSelect(){
	yield WaitForSeconds(.3);
	moveTime = Time.time;
	moveTime2 = Time.time;
	levelSelectObj.transform.position.x = 0;
	
	if (worldNum!=6){
		if (gamePhase>=2) RunNumberUpdate();
		else RunArtUpdate();
	} else RunTutorialUpdate();
	
	selectable=false;
	
	//print(oldState);
	//if (oldState!="cusMenu") selectedLevel=99;
	
	selectionOn=false;
	

	cusArtifactInfo.transform.localPosition=Vector3(-1.8*Mathf.Clamp(aspectMult,1,2),100,14);
	
	//blackout.transform.localPosition = Vector3(0,0,-1);
	
	oldState=menuState;
	menuState = "levelSelect";
	
	customizeButtonTar = Vector3(0,1,3);

	//worldNum = 0;

	mainMenuObjTar = Vector3(0,-0.55,-1);
	
	playButtonTar = Vector3(0,0,0.52);
	optionsButtonTar = Vector3(0,0,0.286);
	
	levelSelectTar = Vector3(0,0,8);
	
	tarCam = Vector3(0,-6.3,-245.5);
	tarCamRo = Quaternion.Euler(27,0,0);
	
	//LSbg.mainTexture=bg[worldNum];
	LStitle.mainTexture=LStitle_texes[worldNum];
	//lstitleshad.mainTexture=LStitleShad_texes[worldNum];
	
	tarSelectL = Vector3(-6.2*Mathf.Clamp(aspectMult,1,2),0.18,14);
	tarSelectR = Vector3(6.2*Mathf.Clamp(aspectMult,1,2),0.18,14);
	
	patColorMenu();
	patSubGo=false;	

	tarPatternSelector = -10*Mathf.Clamp(aspectMult,1,2);
	tarPatColorSwitcher = -8*Mathf.Clamp(aspectMult,1,2);

	tarBase = Vector3(-2.7,4,14);
	tarBoosters = Vector3(2.7,4,14);
	tarPattern = Vector3(0,4,14);
	
	//tarMenuTabX = 6.5;
	tarMenuTabY = 4;
	tarMenuTabColor = Vector4(0,0,0,1);
	
	tarRGBboost = 9*Mathf.Clamp(aspectMult,1,2);
	
	tarRBase = -17*Mathf.Clamp(aspectMult,1,2);
	tarGBase = -13*Mathf.Clamp(aspectMult,1,2);
	tarBBase = -9*Mathf.Clamp(aspectMult,1,2);
	
	tarRPat = 17*Mathf.Clamp(aspectMult,1,2);
	tarGPat = 13*Mathf.Clamp(aspectMult,1,2);
	tarBPat = 9*Mathf.Clamp(aspectMult,1,2);


	roButton.transform.localPosition = Vector3(0,-1,3);
	roButtonTar = Vector3(0,-1,3);
	optionsXTar = Vector3(-0.957*Mathf.Clamp(aspectMult,1,2)+0.25, -0.527, 3);
	optionsVTar = Vector3(0.957*Mathf.Clamp(aspectMult,1,2)-0.25, -0.527, 3);
	//optionsXscaleTar = Vector3(-0.5,.22,.22);
	//optionsVscaleTar = Vector3(0.5,.22,.22);
	
	
	
	go=true;
	
	updateLS();
	//BG.transform.localPosition = Vector4(0,0,100);
//	LSgo=true;
	
}


function cusMenu(){
	//saveData();
	
	selectable=false;
	
	if (oldState!="zoom") yield WaitForSeconds(0.3);
	moveTime = Time.time;
	moveTime2 = Time.time;

	//blackout.transform.localPosition = Vector3(0,0,-1);
	
	customizeButtonTar = Vector3(0,.523,3);

	sliderMat.SetColor("_Emission",Vector4(.5,.5,.5,1));	
	oldState=menuState;
	menuState = "cusMenu";
	if (gamePhase<2) {
		cusArtifactInfoTar= Vector3(-1.8*Mathf.Clamp(aspectMult,1,2),.19,14);
		if (shipNum!=10) cusArtifactInfo.transform.localPosition=Vector3(-1.8*Mathf.Clamp(aspectMult,1,2),100,14);
	}
	levelSelectTar = Vector3(0,0,-10);
		
	mainMenuObjTar = Vector3(0,-0.55,-1);
	
	patColorMenu();
	patSubGo=true;	

	tarPatternSelector = -10*Mathf.Clamp(aspectMult,1,2);
	tarPatColorSwitcher = -8*Mathf.Clamp(aspectMult,1,2);
	
	if (oldState!="levelSelect" && oldState!="zoom"){
		tarBase = Vector3(-0.3,3.5,15);
		tarBaseScale = Vector3(3, 1, 4);
		tarBoosters = Vector3(.3,3.5,15);
		tarBoostersScale = Vector3(3, 1, 4);
		tarPattern = Vector3(0.045,3.5,14);
		tarPatternScale = Vector3(3.39, 1, 3.39);
		
	} else {
		base.transform.localPosition = Vector3(-2.7,4,15);
		boosters.transform.localPosition = Vector3(2.7,4,15);
		pattern.transform.localPosition = Vector3(0,4,15);
		tarBase= Vector3(-2.7,4,15);
		tarBoosters= Vector3(2.7,4,15);
		tarPattern= Vector3(0,4,15);
	}

	menuTab.transform.localPosition.y = 3.5;
	tarMenuTabColor = Vector4(0,0,0,1);
	
	tarRGBboost = 9*Mathf.Clamp(aspectMult,1,2);
	
	tarRBase = -17*Mathf.Clamp(aspectMult,1,2);
	tarGBase = -13*Mathf.Clamp(aspectMult,1,2);
	tarBBase = -9*Mathf.Clamp(aspectMult,1,2);
	
	tarRPat = 17*Mathf.Clamp(aspectMult,1,2);
	tarGPat = 13*Mathf.Clamp(aspectMult,1,2);
	tarBPat = 9*Mathf.Clamp(aspectMult,1,2);
	
	tarX = Vector3(-1.26,-1.8,14);
	tarV = Vector3(1.26,-1.8,14);
	
	tarSelectL = Vector3(-3.6,0.18,14);
	tarSelectR = Vector3(3.6,0.18,14);
	
	tarCam = Vector3(0,-8.8,-6.6);
	tarCamRo = Quaternion.Euler(28,0,0);
	
	optionsXTar = Vector3(-0.957*Mathf.Clamp(aspectMult,1,2)+0.25, -0.527, 3);
	optionsVTar = Vector3(0.957*Mathf.Clamp(aspectMult,1,2)-0.25,-0.527,3);	
	roButtonTar = Vector3(0,-0.527,3);
	//optionsXscaleTar = Vector3(-0.5,.22,.22);
	//optionsVscaleTar = Vector3(0.5,.22,.22);
	if(oldState=="base" || oldState=="pat" || oldState=="booster") roButton.transform.localPosition.x=0;
	
	go = true;
	patSubGo = true;
	//BG.transform.localPosition = Vector4(0,0,100);
}

function zoomMenu(){
	oldState=menuState;
	menuState="zoom";

	//if(oldState!="cusMenu"){	
		menuTab.transform.localPosition.y = 3.5;
		tarMenuTabColor = Vector4(0,0,0,1);
		
		tarRGBboost = 9*Mathf.Clamp(aspectMult,1,2);
		
		tarRBase = -17*Mathf.Clamp(aspectMult,1,2);
		tarGBase = -13*Mathf.Clamp(aspectMult,1,2);
		tarBBase = -9*Mathf.Clamp(aspectMult,1,2);
		
		tarRPat = 17*Mathf.Clamp(aspectMult,1,2);
		tarGPat = 13*Mathf.Clamp(aspectMult,1,2);
		tarBPat = 9*Mathf.Clamp(aspectMult,1,2);
	
		tarPatternList = Vector3(patternList.transform.localPosition.x, -3, 13);
		tarPatColorSwitcher = -8*Mathf.Clamp(aspectMult,1,2);
		customizeButtonTar = Vector3(0,1,3);
		moveTime = Time.time;
		moveTime2 = Time.time;
		tarBase = Vector3(-2.7,4,14);
		tarBoosters = Vector3(2.7,4,14);
		tarPattern = Vector3(0,4,14);
		//tarX = Vector3(-1.26,-4,14);
		//tarV = Vector3(1.26,-4,14);
		tarSelectL = Vector3(-6.2*Mathf.Clamp(aspectMult, 1, 2),0.18,14);
		tarSelectR = Vector3(6.2*Mathf.Clamp(aspectMult, 1, 2),0.18,14);
		tarCam = Vector3(0,-11.3,-3.73);
		tarCamRo = Quaternion.Euler(25,0,0);
		
		tarPatternSelector = -10*Mathf.Clamp(aspectMult,1,2);
		
		roButtonTar = Vector3(0,-0.527,3);
		optionsXTar = Vector3(-0.9575*Mathf.Clamp(aspectMult,1,2)+0.1775, -1, 3);
		optionsVTar = Vector3(0.9575*Mathf.Clamp(aspectMult,1,2)-0.1775, -1, 3);
	//}		
		go = true;
		patSubGo = true;

}

function baseMenu() {
	moveTime = Time.time;
	moveTime2 = Time.time;
	
	sliderMat.SetColor("_Emission",Vector4(0.5,0.5,0.5,1));	
	
	oldState=menuState;	
	menuState = "base";
	
	patColorMenu();
	patSubGo=true;	
	
	tarPatternSelector = -10*Mathf.Clamp(aspectMult,1,2);
	tarPatColorSwitcher = -8*Mathf.Clamp(aspectMult,1,2);
	
	rBaseSlider.transform.localPosition.x = ((-baseColor.r)*0.96)+0.48;
	gBaseSlider.transform.localPosition.x = ((-baseColor.g)*0.96)+0.48;
	bBaseSlider.transform.localPosition.x = ((-baseColor.b)*0.96)+0.48;

	customizeButtonTar = Vector3(0,1,3);
	
	if (oldState=="cusMenu"){
		base.transform.localPosition = Vector3(-0.23, 2.59, 14);
		base.transform.localScale = Vector3(3.8, 1, 3.39);
		boosters.transform.localPosition = Vector3(0.39, 2.59, 14);
		boosters.transform.localScale = Vector3(3.8, 1, 3.39);
		pattern.transform.localPosition = Vector3(0.045, 2.59, 14);
		pattern.transform.localScale = Vector3(5.23, 1, 3.39);
	}
		
	tarBase = Vector3(-2.7, 2.7, 14);
	tarBoosters = Vector3(2.7, 2.7, 14);
	tarPattern = Vector3(0, 2.7, 14);
	tarBaseScale = Vector3(2.47, 1, 2.47);
	tarBoostersScale = Vector3(2.47, 1, 2.47);
	tarPatternScale = Vector3(2.47, 1, 2.47);
	
	if(oldState!= "cusMenu"){
		menuTab.transform.localPosition.x = tarBase.x;
		menuTab.transform.localPosition.y = tarBase.y;		
	}else{
		tarMenuTabX = tarBase.x;
		tarMenuTabY = tarBase.y;	
	}
	
	curMenuTabColor = baseColor;
	curMenuTabColor.a=0;
	
	tarRGBboost = 9*Mathf.Clamp(aspectMult,1,2);
	
	tarRBase = 0;
	tarGBase = 0;
	tarBBase = 0;
	
	tarRPat = 17*Mathf.Clamp(aspectMult,1,2);
	tarGPat = 13*Mathf.Clamp(aspectMult,1,2);
	tarBPat = 9*Mathf.Clamp(aspectMult,1,2);
		
	tarX = Vector3(-1.26,-4,14);
	tarV = Vector3(1.26,-4,14);
	
	tarSelectL = Vector3(-3.6,.8,14);
	tarSelectR = Vector3(3.6,.8,14);
	
	tarCam = Vector3(-0,-10.2,-15);
	tarCamRo = Quaternion.Euler(28.7,0,0);
	
	cusArtifactInfoTar= Vector3(-1.8*Mathf.Clamp(aspectMult,1,2),0.8,14);
	
	roButtonTar.y = -1;
	optionsXTar = Vector3(-0.957*Mathf.Clamp(aspectMult,1,2)+0.25, -1, 3);
	optionsVTar = Vector3(0.957*Mathf.Clamp(aspectMult,1,2)-0.25,-1,3);	
	//optionsXscaleTar = Vector3(-0.5,.22,.22);
	//optionsVscaleTar = Vector3(0.5,.22,.22);

	go = true;
	patSubGo = true;
}

function patMenu() {
	//print("patMenu");
	moveTime = Time.time;
	moveTime2 = Time.time;

	oldState=menuState;	
	menuState = "pat";
	
	//colorPatterns();
	
	customizeButtonTar = Vector3(0,1,3);

	patColorSwitcherPat.SetColor("_Emission",Vector4(patColor.r/2,patColor.g/2,patColor.b/2));
	patColorSwitcherMain.SetColor("_Emission",Vector4(baseColor.r/2,baseColor.g/2,baseColor.b/2));
	//curPatOffset = shipMat.GetTextureOffset("_DecalTex");
	optionsXTar = Vector3(-0.9575*Mathf.Clamp(aspectMult,1,2)+0.1775, -0.558, 3);
	optionsVTar = Vector3(0.9575*Mathf.Clamp(aspectMult,1,2)-0.1775, -0.558, 3);
	if (patSubState=="color") {
		patternMenuButtonMat.mainTexture = patternMenuButtonTex[0];
		rPatSlider.transform.localPosition.x = ((-patColor.r)*0.96)+0.48;
		gPatSlider.transform.localPosition.x = ((-patColor.g)*0.96)+0.48;
		bPatSlider.transform.localPosition.x = ((-patColor.b)*0.96)+0.48;
		tarPatternSelector = -1.9*Mathf.Clamp(aspectMult,1,2);
		tarPatColorSwitcher = -1.66*Mathf.Clamp(aspectMult,1,2)-0.99;
		//tarPatColorSwitcher = -2.65;
		tarRPat = 1.21;
		tarGPat = 1.21;
		tarBPat = 1.21;
		//tarPatternList = Vector3(patternList.transform.localPosition.x, -.35, 13);
		
	} else {
		patColorSwitcherPat.SetColor("_Emission",Vector4(patColor.r/2,patColor.g/2,patColor.b/2));
		patColorSwitcherMain.SetColor("_Emission",Vector4(baseColor.r/2,baseColor.g/2,baseColor.b/2));
		patternMenuButtonMat.mainTexture = patternMenuButtonTex[1];
		tarPatColorSwitcher = -8*Mathf.Clamp(aspectMult,1,2);
		tarPatternSelector = -1.9*Mathf.Clamp(aspectMult,1,2);
		tarRPat = 9*Mathf.Clamp(aspectMult,1,2);
		tarGPat = 9*Mathf.Clamp(aspectMult,1,2);
		tarBPat = 9*Mathf.Clamp(aspectMult,1,2);
		//patternList.transform.localPosition.x = patListSelectedXpos;
		tarPatternList = Vector3(patternList.transform.localPosition.x, -.35, 13);
	}
	
	tarBase = Vector3(-2.7,2.7,14);
	tarBoosters = Vector3(2.7,2.7,14);
	tarPattern = Vector3(0,2.7,14);
	
	menuTab.transform.localPosition.x = tarPattern.x;
	menuTab.transform.localPosition.y = tarPattern.y;
	
	curMenuTabColor = patColor;
	curMenuTabColor.a = 0;
	
	tarRGBboost = 9*Mathf.Clamp(aspectMult,1,2);
	
	tarRBase = -17*Mathf.Clamp(aspectMult,1,2);
	tarGBase = -13*Mathf.Clamp(aspectMult,1,2);
	tarBBase = -9*Mathf.Clamp(aspectMult,1,2);
	
	roButtonTar.y = -1;
	optionsXTar = Vector3(-0.957*Mathf.Clamp(aspectMult,1,2)+0.25, -1, 3);
	optionsVTar = Vector3(0.957*Mathf.Clamp(aspectMult,1,2)-0.25,-1,3);	
	//optionsXscaleTar = Vector3(-0.5,.22,.22);
	//optionsVscaleTar = Vector3(0.5,.22,.22);

	
	tarSelectL = Vector3(-1.3,.8,14);
	tarSelectR = Vector3(3.6,.8,14);
	
	tarCam = Vector3(-2.8,-10.2,-15);
	tarCamRo = Quaternion.Euler(28.7,0,0);	
	
	cusArtifactInfoTar= Vector3(-0.68*Mathf.Clamp(aspectMult,1,2),.8,14);
	offsetSlider.transform.localPosition.x = offsetX;  
	
	go = true;
	patSubGo = true;
}

function patBrowserMenu() {
	moveTime = Time.time;
	moveTime2 = Time.time;
	
	patternList.transform.localPosition.x = patListSelectedXpos;
	tarPatternList = Vector3(patListSelectedXpos, -.35, 13);
	
	patSubState = "browser";
	
	patternMenuButtonMat.mainTexture = patternMenuButtonTex[1];
	
	tarPatColorSwitcher = -8*Mathf.Clamp(aspectMult,1,2);
	
	tarRPat = 9*Mathf.Clamp(aspectMult,1,2);
	tarGPat = 9*Mathf.Clamp(aspectMult,1,2);
	tarBPat = 9*Mathf.Clamp(aspectMult,1,2);

	patSubGo = true;
}

function patColorMenu() {
	moveTime = Time.time;
	moveTime2 = Time.time;
	tarPatternList = Vector3(patternList.transform.localPosition.x, -3, 13);
	
	patSubState = "color";
	
	patternMenuButtonMat.mainTexture = patternMenuButtonTex[0];
	
	
	tarPatColorSwitcher = -1.66*Mathf.Clamp(aspectMult,1,2)-0.99;
	tarRPat = 1.21;
	tarGPat = 1.21;
	tarBPat = 1.21;
	
	patSubGo = true;	
}


function boosterMenu(){
	moveTime = Time.time;
	moveTime2 = Time.time;
	
	oldState=menuState;	
	menuState="booster";
	
	sliderMat.SetColor("_Emission",Vector4(.5,.5,.5,1));	

	customizeButtonTar = Vector3(0,1,3);
	patColorMenu();
	patSubGo=true;
	
	tarPatternSelector = -10*Mathf.Clamp(aspectMult,1,2);
	tarPatColorSwitcher = -8*Mathf.Clamp(aspectMult,1,2);
	
	tarBase = Vector3(-2.7,2.7,14);
	tarBoosters = Vector3(2.7,2.7,14);
	tarPattern = Vector3(0,2.7,14);
	
	setHueSlider();
	
	menuTab.transform.localPosition.x = tarBoosters.x;
	menuTab.transform.localPosition.y = tarBoosters.y;
	
	curMenuTabColor = boosterColor;
	curMenuTabColor.a = 0;
	
	tarRGBboost = 0;
	
	tarRBase = -17*Mathf.Clamp(aspectMult,1,2);
	tarGBase = -13*Mathf.Clamp(aspectMult,1,2);
	tarBBase = -9*Mathf.Clamp(aspectMult,1,2);
	
	tarRPat = 17*Mathf.Clamp(aspectMult,1,2);
	tarGPat = 13*Mathf.Clamp(aspectMult,1,2);
	tarBPat = 9*Mathf.Clamp(aspectMult,1,2);
		
	//tarX = Vector3(-1.26,-4,14);
	//tarV = Vector3(1.26,-4,14);
	
	tarSelectL = Vector3(-3.6,.8,14);
	tarSelectR = Vector3(3.6,.8,14);
	
	roButtonTar.y = -1;
	tarCam = Vector3(0,-12.4,-4.3);
	tarCamRo = Quaternion.Euler(21.5,0,0);
	
	cusArtifactInfoTar= Vector3(-1.8*Mathf.Clamp(aspectMult,1,2),0.8,14);
	
	optionsXTar = Vector3(-0.957*Mathf.Clamp(aspectMult,1,2)+0.25, -1, 3);
	optionsVTar = Vector3(0.957*Mathf.Clamp(aspectMult,1,2)-0.25,-1,3);	
	//optionsXscaleTar = Vector3(-0.5,.22,.22);
	//optionsVscaleTar = Vector3(0.5,.22,.22);
	
	go = true;
	
	patSubGo = true;
}


function cusArtInfo() {		
	if (nextShip==10 && gamePhase<2) {
		if(menuState=="cusMenu") cusArtifactInfo.transform.localPosition=Vector3(-1.8,.19,14);
		else if(menuState=="base") cusArtifactInfo.transform.localPosition=Vector3(-1.8,.8,14);
		else if(menuState=="pat") cusArtifactInfo.transform.localPosition=Vector3(-.68,.8,14);
		else if(menuState=="booster") cusArtifactInfo.transform.localPosition=Vector3(-1.8,.8,14);
	}
	else cusArtifactInfo.transform.localPosition.y=100;	
}


function populateTexes() {
	var i: int;
	for (i=0; i<texes.length; i++) {
		var thumb: Transform = Instantiate(thumbPF, Vector3.zero, Quaternion.identity) as Transform;
		thumb.parent= thumbListTrans;
		thumb.localPosition=Vector3(Mathf.Floor(i/2)+0.5,-(i%2)-0.5, 0);
		thumb.localEulerAngles=Vector3(90, 180, 0);
		thumb.localScale=Vector3(0.9,0.9,0.9);
		thumbRen[i] = thumb.GetComponent(Renderer);
		thumbRen[i].materials[0].mainTexture=texes[i];
		var thumbScript: ThumbScript= thumb.GetComponent("ThumbScript");
		thumbScript.texNum=i;
	}
}

function colorPatterns(){
	if (curWorld != worldNum){
		for (i=0; i<thumbRen.length; i++) {		
			if (worldNum==2 || worldNum==5) {
				thumbRen[i].materials[0].SetColor("_Emission", Vector4(0,0,0,1));
			}else {
				thumbRen[i].materials[0].SetColor("_Emission", Vector4(1,1,1,1));
			}
			thumbRen[i].materials[0].color = Vector4(0,0,0,1);
		}
		curWorld = worldNum;
	}
}


function changePattern(texNum: int) {
	shipMat.SetTexture("_DecalTex",texes[texNum]);
	patThumbColor.mainTexture=texes[texNum];
	//patThumbColor.color = Vector4(0,0,0,1);
	patColorSwitcherPat.mainTexture=texes[texNum];
}

function colorBoosters(){
	if (nextShip!=10 || gamePhase>=2) {
		boosterColor = Vector4(boosterR,boosterG,boosterB,1);
		
		boostMat.SetColor("_Tint",boosterColor);
		
		burstMat.SetColor("_Emission",Vector4(((1-boosterColor.r)/2.5+boosterColor.r),((1-boosterColor.g)/2.5+boosterColor.g),((1-boosterColor.b)/2.5+boosterColor.b),1));
			
		flareMat.SetColor("_TintColor",Vector4(boosterColor.r/2,boosterColor.g/2,boosterColor.b/2,0.5));

	}else{			
		boosterColor = Vector4(boosterR,boosterG,boosterB,1);

		boostMat.SetColor("_Tint",Vector4(0,0,0,1));
	
		burstMat.SetColor("_Emission",Vector4(0,0,0,1));
			
		flareMat.SetColor("_TintColor",Vector4(0,0,0,0));	
	}
}

function saveData(){	
	PlayerPrefs.SetFloat("BaseColor_R", baseColor.r);	
	PlayerPrefs.SetFloat("BaseColor_G", baseColor.g);	
	PlayerPrefs.SetFloat("BaseColor_B", baseColor.b);
	
	PlayerPrefs.SetFloat("PatColor_R", patColor.r);	
	PlayerPrefs.SetFloat("PatColor_G", patColor.g);	
	PlayerPrefs.SetFloat("PatColor_B", patColor.b);
	
	boosterColor = Vector4(boosterR,boosterG,boosterB,1);
	PlayerPrefs.SetFloat("BoostColor_R", boosterColor.r);	
	PlayerPrefs.SetFloat("BoostColor_G", boosterColor.g);	
	PlayerPrefs.SetFloat("BoostColor_B", boosterColor.b);
	
	PlayerPrefs.SetInt("ShipNum", shipNum);
	PlayerPrefs.SetInt("texture", curTexNum);
	PlayerPrefs.SetFloat("texScroll", patListSelectedXpos);
	PlayerPrefs.SetFloat("offset", offsetX);
}

function loadData(){
	gameSpeed=PlayerPrefs.GetInt("GameSpeed",1);
	sfx= PlayerPrefs.GetInt("Sfx", 1);
	music= PlayerPrefs.GetInt("Music", 1);
	
	maxLevel=PlayerPrefs.GetInt("MaxLevel", 0);
	worldNum=Mathf.Floor((PlayerPrefs.GetInt("Level", 0))/10);
	maxWorld=Mathf.Floor(maxLevel/10);	
	
	tutorialState=PlayerPrefs.GetInt("TutorialState",0);
	cinemaState=PlayerPrefs.GetInt("CinemaState",0);
	PlayerPrefs.SetInt("FromLS",0);
	
	gameQuit = PlayerPrefs.GetInt("Quit",0);
	shipNum = PlayerPrefs.GetInt("ShipNum", 3);
	curTexNum = PlayerPrefs.GetInt("texture",6);
	offsetX = PlayerPrefs.GetFloat("offset",-0.065);
	patListSelectedXpos = PlayerPrefs.GetFloat("texScroll",-3.1);
	baseColor = Vector4(PlayerPrefs.GetFloat("BaseColor_R",0.4), PlayerPrefs.GetFloat("BaseColor_G",0.4), PlayerPrefs.GetFloat("BaseColor_B",0.4), 1);
	patColor = Vector4(PlayerPrefs.GetFloat("PatColor_R",1), PlayerPrefs.GetFloat("PatColor_G",0), PlayerPrefs.GetFloat("PatColor_B",0.3), 1);
	ApplyColors();
	gamePhase = PlayerPrefs.GetInt("GamePhase", 0);

	changePattern(curTexNum);	
	boosterR = PlayerPrefs.GetFloat("BoostColor_R",0);
	boosterG = PlayerPrefs.GetFloat("BoostColor_G",0.3);
	boosterB = PlayerPrefs.GetFloat("BoostColor_B",1);
	level = PlayerPrefs.GetInt("Level", 0);
	oldLevel = level;
	
}

function setHueSlider(){
	if (boosterColor.r==1 && boosterColor.g==0 && boosterColor.b==0){
		sliderValue=0;	
	}else if (boosterColor.r > 0 && boosterColor.b > 0){
		sliderValue=(boosterColor.b*0.333)/(boosterColor.r+boosterColor.b);	
	}else if (boosterColor.r > 0 && boosterColor.g > 0){
		sliderValue=((boosterColor.r)+(boosterColor.g*0.666))/(boosterColor.r+boosterColor.g);	
	}else{
		sliderValue=((boosterColor.b*0.333)+(boosterColor.g*0.666))/(boosterColor.b+boosterColor.g);
	}
	rgbBoostSlider.transform.localPosition.x = ((-sliderValue)*0.96)+0.48;
}