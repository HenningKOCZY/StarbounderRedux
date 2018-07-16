
private var guiWidth: int = 480;
private var guiHeight: int =320;
private var elapsedTime: float = 0.0;
private var lastTime: float =0.0;
private var letterAdvance: int = -1;
var timeInc: float;
private var dynTimeInc: float;
var btnTexture : Texture[];
var pauseInc: float;
private var dynPauseInc: float;

var loadingScreen : Texture2D;
var fader: GameObject;

var GUItexts: TextMesh[];
var GUIplanes: Transform[];

var aspectMult: float = 1.0;
var yAdj: float = 1.0;

var cardPFs: GameObject[];
var currPFs: GameObject[];

private var waitTimeStart: float=0;

var whichText: int;
var texty: String[];

var yf: boolean = false;
var yfClear: boolean = true;

private var dispText: String;
private var words: String[];

private var state: String = "write";

var normSkin: GUISkin;
var shadSkin: GUISkin;
private var o: int = 1;

function Start() {
	if(!gameObject.Find("MusicSource(Clone)")) Instantiate(Resources.Load("MusicSource"), Vector3(0,0,0),Quaternion.identity);
	var musicSource: GameObject = gameObject.Find("MusicSource(Clone)");
	var musicSourceScript: Music= musicSource.GetComponent("Music");
	musicSourceScript.SetTrack();
	fader = gameObject.Find("fader");

	if(PlayerPrefs.GetInt("CinemaState",0)<3) PlayerPrefs.SetInt("CinemaState", 3);
	lastTime=Time.time;	
	dynTimeInc = timeInc;
	dynPauseInc = pauseInc;
	GUI1_init();

	texty[0] = "***\n\n          STARBOUNDER***\n\n\n**        by STUDIO RADKO*************************$";
	texty[1] = "**\nlead programming* and* level design*:\n****    <00#13HENNING KOCZY>00*************************$";
	texty[2] = "**\n\n\n\n  lead gameplay*, visual\n        and interface design*:\n****             <01#15CRAIG KOHLMEYER>01*************************$";
	texty[3] = "**\n  additional designs* and* website*:\n****     <02#14ISAAC TRUJILLO>02*******";
	texty[3] += "\n\n\n            music and sound*:\n****              <03#12NATE EDWARDS>03*************************$";
	texty[4] = "***\n      thanks to DOUG LITOS\n       and TODD HECKERT";
	texty[4] +="\n\n**********         special thanks to**\n    BLUEMOON INTERACTIVE\n     for the game* SKYROADS*************************$";
	texty[5] = "***<04*****@00*\n\n\n\n\n               &2012***********************************************************$";
}

function GUI1_init() {
	calcAspectMult();
	GUItexts[0].transform.localPosition=Vector3(-225*Mathf.Clamp01(aspectMult), 147, 0);
	GUItexts[0].transform.localScale=Vector3(6.4*Mathf.Clamp01(aspectMult), 6.4*Mathf.Clamp01(aspectMult), 1);
	GUItexts[1].transform.localPosition=Vector3(-224*Mathf.Clamp01(aspectMult), 147-Mathf.Clamp01(aspectMult), 5);
	GUItexts[1].transform.localScale=Vector3(6.4*Mathf.Clamp01(aspectMult), 6.4*Mathf.Clamp01(aspectMult), 1);
	
	GUItexts[1].GetComponent.<Renderer>().material.color=Vector4(0,0,0,1);
	
	GUIplanes[0].GetComponent.<Renderer>().material.mainTexture=btnTexture[0];
	GUIplanes[0].transform.localPosition=Vector3(-240*aspectMult+41, -142, -20);
	GUIplanes[0].transform.localScale=Vector3(82, 1, 35);
	
	GUIplanes[1].GetComponent.<Renderer>().material.mainTexture=btnTexture[1];
	GUIplanes[1].transform.localPosition=Vector3(240*aspectMult-41, -142, -20);
	GUIplanes[1].transform.localScale=Vector3(82, 1, 35);
	
	fader.transform.localScale.x*=aspectMult;
}

function calcAspectMult() {
	var w: float = Screen.width; var h: float = Screen.height;
	aspectMult = (w/h)/(1.5);
	yAdj = h/320.0;
}

function OnGUI () {

	if (state!="end") {

		if (state=="write") {
			checkAdvance();		
		}	
		GUItexts[0].text=dispText; GUItexts[1].text=dispText;
	}
	else GUI.DrawTexture(Rect(0,0,Screen.width, Screen.height),loadingScreen);
	
}

function Update() {
	yf = Input.GetButton("Fire1");
	
	for (touch in Input.touches) { 
		if (touch.phase == TouchPhase.Began) { getButtonHit(touch.position.x, touch.position.y); yf = true; }
	}
	if (Input.GetMouseButtonDown(0)) {
		getButtonHit(Input.mousePosition.x, Input.mousePosition.y); yf = true;
	} 
	
	if (!yf) yfClear=true;

}

function getButtonHit(x: int, y: int) {
	if (y<Screen.height*0.2) {
		if (x<(90*yAdj)) {
			if (yfClear) {
				end();
			}
		}
		if (x>Screen.width-(90*yAdj)) {
			if (yfClear) {
				yfClear=false;
				nexty();
			}
		}
	}
}


function nexty() {
	dispText="";
	whichText++;
	if (currPFs[0]) Destroy(currPFs[0]);
	if (currPFs[1]) Destroy(currPFs[1]);
	if (whichText>=texty.length) {
		end();
	} else {
		letterAdvance=-1;
		dynTimeInc=timeInc;
		dynPauseInc=pauseInc;
		state="write";
	}
}

function end() {
	// end of scene
	state="end";
	yield WaitForSeconds(0.2);
	if (PlayerPrefs.GetInt("FromLS",0)==1) PlayerPrefs.SetInt("Quit", 2);
	Application.LoadLevel(0);
}

function checkAdvance() {
	if (Time.time-lastTime>dynTimeInc) {
		letterAdvance++;
		lastTime=Time.time;

		if (texty[whichText][letterAdvance]=="*")	lastTime+=dynPauseInc;
		else if (texty[whichText][letterAdvance]=="#")	{
			var tens: int = texty[whichText][letterAdvance+1];
			var digits: int = texty[whichText][letterAdvance+2];
			var num: int = (parseInt(tens)-48)*10 + (parseInt(digits)-48);
			for (var i: int =0; i<num; i++) {
				dispText+=texty[whichText][letterAdvance+i+3];
			} 
			letterAdvance+=num+2;
		}
		else if (texty[whichText][letterAdvance]=="@")	{
			tens = texty[whichText][letterAdvance+1];
			digits = texty[whichText][letterAdvance+2];
			num = (parseInt(tens)-48)*10 + (parseInt(digits)-48);
			anim(num);
			letterAdvance+=2;
		}
		else if (texty[whichText][letterAdvance]==">")	{
			tens = texty[whichText][letterAdvance+1];
			digits = texty[whichText][letterAdvance+2];
			num = (parseInt(tens)-48)*10 + (parseInt(digits)-48);
			outCard(num);
			letterAdvance+=2;
		}
		else if (texty[whichText][letterAdvance]=="<")	{
			tens = texty[whichText][letterAdvance+1];
			digits = texty[whichText][letterAdvance+2];
			num = (parseInt(tens)-48)*10 + (parseInt(digits)-48);
			inCard(num);
			letterAdvance+=2;
		}
		else if (texty[whichText][letterAdvance]=="$")	{
			nexty();
		}
		else dispText+=texty[whichText][letterAdvance];
	}
}

function inCard(which: int) {
	var cardObj: GameObject = Instantiate(cardPFs[which], Vector3.zero, Quaternion.identity) as GameObject;
	cardObj.name="card"+which;
	if (which==3) currPFs[1]=cardObj;
	else currPFs[0]=cardObj;
	
	if (which<4) { // flares
		cardObj.transform.position=GUItexts[0].transform.position;
		cardObj.transform.localScale=Vector3(Mathf.Clamp01(aspectMult), Mathf.Clamp01(aspectMult), 1);
	}
	var cardScript: IntroCardAnim = cardObj.GetComponent(IntroCardAnim);
	cardScript.dur=0.25;
	cardScript.fadeIn();
}

function outCard(which: int) {
	var cardObj: GameObject = GameObject.Find("card"+which);
	if (cardObj) {
		var cardScript: IntroCardAnim = cardObj.GetComponent(IntroCardAnim);
		cardScript.dur=5;
		cardScript.fadeOut();
	}
}

function anim(which: int) {
	if (which==0) { fader.GetComponent.<Animation>().Play("faderOut"); }
}