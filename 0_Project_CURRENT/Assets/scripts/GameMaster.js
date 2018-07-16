enum DeviceType { Computer = 0, iPhone = 1 }
var device: DeviceType;

enum DiagMode { Player = 0, Programmer = 1 }
var diagMode: DiagMode;

var pantherFlag: GameObject;
var pantherFlagScript: pantherFlagScript;
var musicSource : GameObject;
var level: int;
var clearData: boolean;
var setData: boolean;

class SetDataState {
	var GamePhase: int;
	var ShipNum: int;
	var MaxLevel: int;
	var Level: int;
	var gameSpeed: int;
}

var sd : SetDataState = SetDataState();

var worldNum: int;
var gamePhase: int;
var gameSpeed: float;
var startPos: Vector3;
var resetPos: Vector3[];
var rPointCounter: int = 0;
var shipNum: int;
var currLevel: GameObject;
var which: GameObject;
var topMat: Material;
var sideMat: Material;
var sideFadeMat: Material;
var frontFadeMat: Material;
var frontMat: Material;
var topColor: Color[];
var topSpec: Color[];
var sideColor: Color[];
var frontColor: Color[];
var levelLight: Light;
var levelLightColor: Color[];
//private var currLighting: Transform;
//private var currShipLighting: Transform;
var bgScript: BG_plane;
var gui: GUIScript;
var ship: MoveShip;
var cam: MoveCam;
//var lomPF: GameObject;
//private var lomScript: LOMScript;
var pauseMenuPF: GameObject;
private var pauseMenuObj: GameObject;
var newCubePF: Transform[];
var gatewayPF: Transform;
var gatewayMat: Material;
var artifactPF: Transform;
var artMat1: Material;
var artMat2: Material;
var artMat3: Material;
//var artColor: Color[];
var artBurstColorScript: artifactColor[];
var artCount: int;
var checkpoint: int =0;
var i: int;

//var elecBurstMats: Material[];
var burstColor: Color[];

var topPhysMaterial: PhysicMaterial;
var sidesPhysMaterial: PhysicMaterial;

private var shrinkSides: float = 0.3;
private var boosterR: float;
private var boosterG: float;
private var boosterB: float;

//var levelList: GameObject[];
//var shipList: Transform[];
//var shipList: String[];

//var lightingList: Transform[];
//var shipLightingList: Transform[];
var gateways: Transform[];
var music: int = 1;
var worldTrackName : String[];

var oldRecord: float;
var tutScript: TutScript;


function Awake(){
	if(!gameObject.Find("MusicSource(Clone)")) Instantiate(Resources.Load("MusicSource"), Vector3(0,0,0),Quaternion.identity);
	
	if(Application.platform==RuntimePlatform.IPhonePlayer){
//		TouchScreenKeyboard.autorotateToPortrait = false; 
//		TouchScreenKeyboard.autorotateToPortraitUpsideDown = false; 
//		TouchScreenKeyboard.autorotateToLandscapeRight = false; 
//		TouchScreenKeyboard.autorotateToLandscapeLeft = false;

	}
	
//	updateGameSpeed(PlayerPrefs.GetInt("GameSpeed", 1));
//	Time.timeScale=gameSpeed;
}

function Start(){
	
	if (clearData) { // set in gameMaster... for diag purposes
		for (i=0; i<60; i++) {
			PlayerPrefs.SetFloat(("Level"+i+"Time"), 99.99);
			PlayerPrefs.SetInt(("Level"+i+"ArtCount"), 000);
			PlayerPrefs.SetInt(("Level"+i+"PantherFlag"), 0);
		}	
		
		PlayerPrefs.SetInt("SawIntro", 0);
		PlayerPrefs.SetInt("GamePhase", 0);
		PlayerPrefs.SetInt(("MaxLevel"), 0);	
		PlayerPrefs.SetInt(("Level"), 0);	
		PlayerPrefs.SetInt(("ArtCount"), 0);
			
		PlayerPrefs.SetInt("CinemaState", 1);
		PlayerPrefs.SetInt("TutorialState", 1);
		PlayerPrefs.SetInt("FromLS", 0);
	}
	
	if (setData) { 
		PlayerPrefs.SetInt(("Level"), sd.Level);	
		PlayerPrefs.SetInt("GamePhase", sd.GamePhase);
		PlayerPrefs.SetInt(("ShipNum"), sd.ShipNum);
		PlayerPrefs.SetInt("GameSpeed", sd.gameSpeed);
		
		if (sd.GamePhase>0) { 
			sd.MaxLevel=59;
			if (sd.GamePhase==1) { PlayerPrefs.SetInt("TutorialState", 1); PlayerPrefs.SetInt("CinemaState", 3); }
			if (sd.GamePhase==2) { PlayerPrefs.SetInt("TutorialState", 2); PlayerPrefs.SetInt("CinemaState", 4);	}
		} else {
			PlayerPrefs.SetInt("TutorialState", 1); PlayerPrefs.SetInt("CinemaState", 1);
		}
		
		PlayerPrefs.SetInt(("MaxLevel"), sd.MaxLevel);

		
		for (i=0; i<=sd.MaxLevel; i++) {
			PlayerPrefs.SetFloat(("Level"+i+"Time"), 66.66);
		}	
		if (sd.GamePhase>1) {
			for (i=0; i<=sd.MaxLevel; i++) {
				PlayerPrefs.SetInt(("Level"+i+"ArtCount"), 111);
			}
		}
		
		// special conditions

		for (i=0; i<60; i++) {
			//PlayerPrefs.SetFloat(("Level"+i+"Time"), 55.55);
			PlayerPrefs.SetInt(("Level"+i+"ArtCount"), 000);
			//PlayerPrefs.SetInt(("Level"+i+"PantherFlag"), 1);
		}
		PlayerPrefs.SetInt(("Level21PantherFlag"), 0);
		PlayerPrefs.SetInt(("Level8ArtCount"), 010);
		
		PlayerPrefs.SetInt(("Level29ArtCount"), 110);
//		PlayerPrefs.SetInt(("Level12ArtCount"), 110);
		countArtifacts();
	}
	

	shipNum = PlayerPrefs.GetInt("ShipNum", 1);	
	
	level = PlayerPrefs.GetInt(("Level"), 0);	
	worldNum = Mathf.Floor(level/10);
	gamePhase = PlayerPrefs.GetInt("GamePhase", 0);
//	print("gp: "+gamePhase);
	music = PlayerPrefs.GetInt("Music", 1);
	if (shipNum!=10) pantherFlag.transform.position = Vector3(0,0,-100);
}

function updateGameSpeed(num: int) {
	gameSpeed = 0.75+(num*0.125);
	PlayerPrefs.SetInt("GameSpeed", num);
	gui.gameSpeed=num;
	if (level==60 || level==61) { tutScript.timeInc=0.017*gameSpeed; tutScript.pauseInc=0.035*gameSpeed; }
}

function updateWorld() {
	if(gui.tutorialState<1 && level==60) {
		gui.tutorialState=1;
		PlayerPrefs.SetInt("TutorialState",1);
	}
	if(gui.tutorialState<2 && level==61) {
		gui.tutorialState=2;
		PlayerPrefs.SetInt("TutorialState",2);
	}
	/*
	if(gui.tutorialState<3 && level==69) {
		gui.tutorialState=3;
		PlayerPrefs.SetInt("TutorialState",3);
	}
	*/
	worldNum = bgScript.changeBackground(level);
	gatewayMat.mainTexture = Resources.Load("world"+worldNum+"_warpGate");
	colorBursts();
	gui.worldNum=worldNum;
	gui.updateLevel();
	/*
	topMat.SetColor( "_Emission", topColor[worldNum]);
	topMat.SetColor( "_SpecColor", topSpec[worldNum]);
	sideMat.SetColor( "_Emission", sideColor[worldNum]);
	frontMat.SetColor( "_Emission", frontColor[worldNum]);
	frontFadeMat.SetColor( "_Emission", frontColor[worldNum]);
	sideFadeMat.SetColor( "_Emission", sideColor[worldNum]);
	*/
	//levelLight.color = levelLightColor[worldNum];
		
	
}

function colorBursts(){
	artMat1.SetColor("_TintColor",Vector4((1-burstColor[worldNum].r)/4+burstColor[worldNum].r, (1-burstColor[worldNum].g)/4+burstColor[worldNum].g, (1-burstColor[worldNum].b)/4+burstColor[worldNum].b, 1) );
	artMat2.SetColor("_Emission",burstColor[worldNum]);
	artMat3.SetColor("_TintColor",Vector4((1-burstColor[worldNum].r)/8+burstColor[worldNum].r, (1-burstColor[worldNum].g)/8+burstColor[worldNum].g, (1-burstColor[worldNum].b)/4+burstColor[worldNum].b, 1) );

	for(i=0; i<=3; i++){
		if(i<1) artBurstColorScript[i].colorBurst(burstColor[worldNum]/2, "_Emission");
		else artBurstColorScript[i].colorBurst(Vector4((1-burstColor[worldNum].r)/4+burstColor[worldNum].r, (1-burstColor[worldNum].g)/4+burstColor[worldNum].g, (1-burstColor[worldNum].b)/4+burstColor[worldNum].b, 1), "_TintColor" );

	}
}

function artifactInit(){
//***new */
	if (level<60) {
		artCount=PlayerPrefs.GetInt("Level"+level+"ArtCount",000);
		gui.a1state = Mathf.Floor(artCount/100);	
		gui.a2state = Mathf.Floor((artCount%100)/10);
		gui.a3state = artCount%10;
//		print("LEVEL: "+level);
//		print("artifacts: "+artCount);
//		print("recordTime: "+PlayerPrefs.GetFloat("Level"+level+"Time",0));
//		print("worldnum = "+worldNum);
	}
	else {
		gui.a1state = 0;	
		gui.a2state = 0;
		gui.a3state = 0;
	}	
}

function makeLevel() {
	print("makeLevel!");
	updateWorld();

	artifactInit();	
//	print("makeLevel");
	//var which: GameObject = levelList[level];
	if (level<10) which = Resources.Load("level_10"+level);
	else which = Resources.Load("level_1"+level);
	
	currLevel = Instantiate(which, Vector3(0,0,0), Quaternion.identity) as GameObject;
	
	gui.level=level;
	//currLighting = Instantiate(lightingList[worldNum], Vector3(0,0,0), Quaternion.identity) as Transform;
	//currLighting.parent = cam.transform;
	//currLighting.transform.localPosition=Vector3(0,0,0);
	//currLighting.transform.localEulerAngles=Vector3(0,0,0);

	//currShipLighting = Instantiate(shipLightingList[worldNum], Vector3(0,0,0), Quaternion.identity) as Transform;
	//currShipLighting.parent=ship.transform;
	//currShipLighting.transform.localPosition=Vector3(0,0,0);
	//currShipLighting.transform.localEulerAngles=Vector3(0,0,0);
	startPos=Vector3(0,0,0);
	resetPos[0]=Vector3(0,0,0);
	
	replaceCubes(currLevel);
	
	var winCube: Transform = currLevel.transform.Find("gateway");
	if (winCube) {
		//gui.winDist=winCube.position.z;
		ship.winDist=winCube.position.z;
	}
	//var lom: GameObject = Instantiate(lomPF, startPos, Quaternion.identity) as GameObject;
	//lomScript = lom.GetComponent(LOMScript);
	//lom.transform.parent=currLevel.transform;
	//resetEasy();
	if (level==60 || level==61) {
		tutScript=currLevel.GetComponent("TutScript");
	}
	updateGameSpeed(PlayerPrefs.GetInt("GameSpeed", 1));
	Time.timeScale=gameSpeed;
	batchLevelMove();
}

function batchLevelMove() {
	currLevel.transform.position.z=ship.winDist/-2;
	yield;
	currLevel.transform.position.z=0;
}



function killLevel() {
	if (pantherFlag){
		 pantherFlag.transform.position = Vector3(0,0,-100);
		pantherFlagScript.base.GetComponent.<AudioSource>().Stop();
	}
	//print("killLevel");
	Destroy(currLevel);
	//if (currLighting) Destroy(currLighting.gameObject);
	//if (currShipLighting) Destroy(currShipLighting.gameObject);
}


function replaceCubes(currLevel: GameObject) {
	//print("replaceCubes");
	var cubes = new Transform[currLevel.transform.childCount];
	var i: int=0;
	var gs: int=0;
	rPointCounter=0;
	// dupe array prevents endless for in loop when you parent new stuff back under currLevel
	for (var cube: Transform in currLevel.transform) {
		cubes[i]=cube;
		i++;
	}
	var artNum: int = 0;
	var a1: int = Mathf.Floor(artCount/100);	
	var a2: int = Mathf.Floor((artCount%100)/10);
	var a3: int = artCount%10;
	
	for (cube in cubes) {
		var newObj: Transform;
		var destroy: boolean = false;
		
		if (cube.tag=="Finish") {
			newObj = Instantiate(gatewayPF, cube.position, cube.rotation) as Transform;
			gateways[gs]=newObj;
			gs++;
			destroy=true;
		}
		else if (cube.tag=="artifact"){
			if(gamePhase<2){
				artNum++;
				if(artNum==1){
					if(!a1){
						newObj = Instantiate(artifactPF, cube.position, cube.rotation) as Transform;
						newObj.name="artifact"+artNum;
					}
				}else if (artNum==2){
					if(!a2){
						newObj = Instantiate(artifactPF, cube.position, cube.rotation) as Transform;
						newObj.name="artifact"+artNum;
					}	
				}else if (artNum==3){
					if(!a3){
						newObj = Instantiate(artifactPF, cube.position, cube.rotation) as Transform;
						newObj.name="artifact"+artNum;
					}
				}				
			}
			destroy=true;
		}
		else if (cube.name=="pantherFlagPos") {
			if (shipNum==10) {
				pantherFlag.transform.position = cube.transform.position;
			}
			destroy=true;
		}
		else if (cube.name=="LevelNumText") {destroy=true; continue; }
		else if (cube.tag=="StartPos") {startPos=cube.position; destroy=true;}
		else if (cube.tag=="ResetPos") {resetPos[rPointCounter++]=cube.position; destroy=true;}
		else if (cube.tag=="EditorOnly")  destroy=true;
		//else if (cube.name=="camDropBox" || cube.name=="camDropBox2") cube.gameObject.layer=2;
		//else if (ship.shipNum==10 && (cube.name=="camDropBox" || cube.name=="camDropBox2"))	destroy = true;
		if (newObj) newObj.parent=currLevel.transform;
		if (destroy) Destroy(cube.gameObject);
	}
	rPointCounter=0;
	
}

function cubeRep(cube: Transform) {
	var newObj: Transform;
	var cubeDiv : int = Mathf.Abs(cube.localScale.x/4);
	if (cubeDiv <1) cubeDiv=1;
	var mult: float=0.5;
	if (cube.tag=="DiagA1") { cubeDiv+=30; if (cubeDiv>33) cubeDiv=33;}
	else if (cube.tag=="DiagA2") {cubeDiv+=40; if (cubeDiv>42) cubeDiv=42;}
	else if (cube.tag=="DiagB1") {cubeDiv+=50; mult=1.0;}
	else if (cube.tag=="DiagB2") {cubeDiv+=60; mult=1.5;}
	else if (cube.tag=="Kill") {cubeDiv=20;}
	// print(cubeDiv);
	if (cubeDiv<1) cubeDiv=1;
	if (cubeDiv>10 && cubeDiv<20) cubeDiv=10;
	// print(cubeDiv);
	newObj = Instantiate(newCubePF[cubeDiv], cube.position, cube.rotation) as Transform;

	newObj.localScale=cube.localScale;
	if (cube.localScale.x<0) switchLR(newObj);
	
	var newObjScript: CubeConvert = newObj.gameObject.GetComponent(CubeConvert);
	newObjScript.gameMaster=this;
	newObjScript.ship=ship.transform;
	newObjScript.cubeDiv=cubeDiv;
	newObjScript.frontZ=cube.position.z-(cube.localScale.z*mult);
	newObjScript.backZ=cube.position.z+(cube.localScale.z*mult);
	
	if (cube.tag=="StartCube") {
		makeColls(newObj, cubeDiv);
		newObjScript.converted=true;
	}

	return newObj;
}


function switchLR(cube: Transform) {
	var or: Transform = cube.Find("right2");
	var ol: Transform = cube.Find("left2");
	if (or) or.name="left2";
	if (ol) or.name="right2";
	or = cube.Find("right");
	ol = cube.Find("left");
	if (or) or.name="left";
	if (ol) ol.name="right";
}

function makeColls(cube: Transform, cubeDiv: int) {
	// var sub: Transform;

	if (cubeDiv>30) {	
		var meshy: Transform=cube.transform.Find("mesh");
		var mc: MeshCollider=meshy.gameObject.AddComponent.<MeshCollider>();
		mc.material=topPhysMaterial;
	} else 	{ 
		var bc: BoxCollider; 
		bc = cube.gameObject.AddComponent.<BoxCollider>();
		bc.material=topPhysMaterial;
	}
}

function SetLayerRecursively( obj : GameObject, newLayer : int  ) {
	obj.layer = newLayer;
	for( var child : Transform in obj.transform )	{
		SetLayerRecursively( child.gameObject, newLayer );
	}
}

function incrementLevel () {
	level++;
	if (level==60) level=0;
	PlayerPrefs.SetInt("Level", level);
	if (level<60 && level>PlayerPrefs.GetInt("MaxLevel", level))	PlayerPrefs.SetInt("MaxLevel", level);
}


function setLevel (lev: int) {
	level=lev;
	PlayerPrefs.SetInt("Level", level);
}

function saveTime(t: float) {
	oldRecord = PlayerPrefs.GetFloat(("Level"+level+"Time"), 99.99);
	if (t<oldRecord)	{
		PlayerPrefs.SetFloat(("Level"+level+"Time"), t);
		return true;
	}
	else return false;
}

function countPanthers() {
	var flagTotal: int = 0;
	
	for (i=0; i<60; i++) {
		if (PlayerPrefs.GetInt("Level"+i+"PantherFlag", 0)==1) flagTotal++;
	}
	return flagTotal;
}

function countArtifacts() {
	var artTotal: int =0;
	
	for (i=0; i<60; i++) {
		var tempCount=PlayerPrefs.GetInt("Level"+i+"ArtCount", 0);
		var a1: int = Mathf.Floor(tempCount/100);	
		var a2: int = Mathf.Floor((tempCount%100)/10);
		var a3: int = tempCount%10;
		artTotal+=a1+a2+a3;
	}
	
	PlayerPrefs.SetInt("ArtCount", artTotal);
	return artTotal;
}

function countLevels() {
	var levTotal: int = 0;
	
	for (i=0; i<60; i++) {
		if (PlayerPrefs.GetFloat("Level"+i+"Time", 99.99)<90.0) levTotal++;
	}
	
	return levTotal;
}


function resetEasy() {
// ***new
	//lomScript.UpdateNumbers(level);
	if(shipNum==10) pantherFlagScript.InitFlag();	
	else Destroy(pantherFlag);
	if (checkpoint>0) {
		rPointCounter=checkpoint;
		ship.resetRepoShip(); }
	else	ship.repoShip();
	gui.camBlack("up");	
}