
var whichTro: String;
private var guiWidth: int = 480;
private var guiHeight: int = 320;

var loadingScreen : Texture2D;
var loading : boolean = false;

var GUItexts: TextMesh[];
var GUIplanes: Transform[];


var aspectMult: float = 1.0;
var yAdj: float = 1.0;

private var cinemaState: int;

private var elapsedTime: float = 0.0;
private var lastTime: float =0.0;
private var letterAdvance: int = -1;
var timeInc: float;
private var dynTimeInc: float;
var pauseInc: float;
private var dynPauseInc: float;
var btnTexture : Texture[];
//var btnFlarePF: GameObject;
//var btnFlareObj: GameObject;
private var doStuff: boolean = false;
var btnUp: boolean = true;
var nextyDown: boolean = false;
var cam: GameObject;
var currAnims: Animation[];
var delObj: GameObject;
private var waitTimeStart: float=0;

var cardPFs: GameObject[];

var whichText: int;
var texty: String[];

private var dispText: String;
private var words: String[];

var state: String = "write";
private var skipped: boolean = false;

var normSkin : GUISkin;
var shadSkin : GUISkin;
private var o: int = 1;

var musicSource: GameObject;
var musicSourceScript: Music;

function GUI1_init() {
	calcAspectMult();
	GUItexts[0].transform.localPosition=Vector3(-225*Mathf.Clamp01(aspectMult), 147, 0);
	GUItexts[0].transform.localScale=Vector3(6.4*Mathf.Clamp01(aspectMult), 6.4*Mathf.Clamp01(aspectMult), 1);
	GUItexts[1].transform.localPosition=Vector3(-224*Mathf.Clamp01(aspectMult), 147-Mathf.Clamp01(aspectMult), 5);
	GUItexts[1].transform.localScale=Vector3(6.4*Mathf.Clamp01(aspectMult), 6.4*Mathf.Clamp01(aspectMult), 1);
	
	if (whichTro=="outro3") {
		GUItexts[0].transform.localPosition.y=0;
		GUItexts[1].transform.localPosition.y=-1*Mathf.Clamp01(aspectMult);
	}
	
	GUItexts[1].GetComponent.<Renderer>().material.color=Vector4(0,0,0,1);
	
	GUIplanes[0].GetComponent.<Renderer>().material.mainTexture=btnTexture[4];
	GUIplanes[1].GetComponent.<Renderer>().material.mainTexture=btnTexture[0];
	GUIplanes[0].transform.localPosition=Vector3(-240*aspectMult+41, -142, -20);
	GUIplanes[0].transform.localScale=Vector3(82, 1, 35);
	GUIplanes[1].transform.localPosition=Vector3(240*aspectMult-41, -142, -20);
	GUIplanes[1].transform.localScale=Vector3(82, 1, 35);
	
	
//		if (GUI.RepeatButton(Rect(0,285,82,35), btnTexture[4])) { end(); }
//		if (GUI.RepeatButton(Rect(398,285,82,35), btn)) { doStuff=true; }
//		else { doStuff=false; }
}

function nextFlare() {
	GUIplanes[2].transform.localPosition=Vector3(240*aspectMult-31, -144, -30);
	GUIplanes[2].transform.localScale=Vector3(10, 5, 5);
	GUIplanes[2].GetComponent.<Animation>().Rewind();
	GUIplanes[2].GetComponent.<Animation>().Play("nextFlare");
	currAnims[2]=GUIplanes[2].GetComponent.<Animation>();
}

function calcAspectMult() {
	var w: float = Screen.width; var h: float = Screen.height;
	aspectMult = (w/h)/(1.5);
	yAdj = h/320.0;
}

function Start() {
	if(!gameObject.Find("MusicSource(Clone)")) Instantiate(Resources.Load("MusicSource"), Vector3(0,0,0),Quaternion.identity);
	musicSource=gameObject.Find("MusicSource(Clone)");
	musicSourceScript=musicSource.GetComponent("Music");
	musicSourceScript.SetTrack();
	
	GUI1_init();
	
	lastTime=Time.time;	
	dynTimeInc = timeInc;
	dynPauseInc = pauseInc;
	if (whichTro=="intro") {
		cinemaState=PlayerPrefs.GetInt("CinemaState",0);
		if(cinemaState==0) PlayerPrefs.SetInt("CinemaState", 1);
		texty[1] = "<00,01***BREEP ***BREEP ***BREEP**.*****\nan electric chirp and the taste of\nmetal are the first things you\nbecome aware of as you wake <01,20from\nhypersleep*. *****the interior of your\npod is bathed in the blue light of\na nearby supergiant star*.***@nf,15";
		texty[2] = ">00,01your oculars <05,14adjust*.***** \nyour attention <03,05darts from console\n<04,06to console <02,05as >01,10they come glowing\nto life around you*.***@nf,15";
		texty[3] = "@cc,00the one>02,03 at>03,03 your>04,03 armrest jots out\nthe vital statistics of your sleep*.\n*****DU<06,04RATION*:** 5*3*1*2* YEARS*.***** you\nlook hastily for another readout*,*\ntrying not to think about how long\nago* and far behind** that leaves\neveryone you ever knew*.***@nf,15";
		texty[4] = "@cc,02the <01,16main,>06,10* front console informs\nyou of the pod's reason for ending>05,10\nhypersleep*.****<07,04* POSSIBLE* OBJECT*\nOF* INTELLIGENT* ORIGIN*\nDETECTED*.<08,10********** the object comes\ndrifting onto the viewscreen*.*.*.*** \nand your breathing lapses*.***@nf,15";
		texty[5] = "there*,** >07,01silhouetted against the\nblue supergiant*,** is a** sort of***\narchitectural platform suspended\nin space*.***** all straight lines and\nrectilinear faces*,** the structure\nbears unmistakable marks of\nintelligent manufacture*.***@nf,15";
		texty[6] = ">01,20you cannot tell from this distance\nwhat it is made of@cc,01*,** but as your\nship slowly descends>08,10*,** the <11,02platform\nlights up<10,02*.*.*.** as if recognizing <09,02you*.***@nf,15";
		texty[7] = "what a fantastic discovery*,** this\narcade in the stars*!**** who made it*?**\nfor what purpose*?** if you were to\nexplore and catalog its every\ndimension in minute detail*,** would\nanyone ever read your report*?***@nf,15";
		texty[8] = "your ship touches down abruptly\nand stirs@cc,03 you from such stray\nspeculations*.***** you are here*.*** now*.*****\nafter 5*3*1*2* years of drifting*,\n**despite astronomical odds against*,\n**you have found something*!***** all that\nremains** is to explore it*.**.**.***@nf,15";
		texty[9] = ">09,01**>10,01**>11,01***********$";
	}
	else if  (whichTro=="outro1") {
//		cinemaState=PlayerPrefs.GetInt("CinemaState",0);
//		if(cinemaState<2) PlayerPrefs.SetInt("CinemaState", 2);
		var artiCount: int = PlayerPrefs.GetInt("ArtCount", 0);
		texty[1]="<00,05*<05,03**<06,01*****your hands slide off the controls\n*and your body untenses* as you fly\nthrough the last of the gateways*.***@nf,15";
		texty[2]="well done*,*** STARBOUNDER<07,01*!*****>07,06\nyour exploratory run over the\nmysterious structures is now\ncomplete*.**** you allow yourself a\nmoment of satisfaction*,** the first\nyou've had since you awoke\nin this place*.***@nf,15";
		texty[3]=">06,04>05,03<02,10but the moment passes>00,24*@06,04 as you\nrealize you are no closer to\nunderstanding why it was built*.**\nand by whom*?******* perhaps the archi-\ntects felt no need to assuage\nyour curiosity and you never\n*WILL* know**.**.**.**@nf,15";
		texty[4]="\n   <03,10.*.*.*or perhaps* these *strange\n   <04,10artifacts strewn about the\n  platforms hold some secret**.**.**.**?*****\n\n\n*****            %* "+artiCount+"*/*180*****@nf,15";
		texty[5]=">03,03*>04,02*>02,02***********$";
		
	} else if  (whichTro=="outro2") {
//		cinemaState=PlayerPrefs.GetInt("CinemaState",0);
//		if(cinemaState<4) PlayerPrefs.SetInt("CinemaState", 4);
		texty[1]="<00,05*<05,03**<06,01*****your ship glides through the gate\nwith the last of the artifacts*.****\na cold wave<03,01 of <09,01electricity passes\nover your body>03,01>09,01<02,10*.**** you have the odd\n>05,06impression>06,10 of floating above your\nship*,** out into space*,*** above the\nstructure**.**.**.**@nf,15";
		texty[2]=">00,20then*,**<04,05 ALL of the structures are\nspread out below**.***** you feel as\nthough you are allowed as much\ntime as you wish*,** an eternity*,**\nto inspect each one*.******* as soon as\nyou feel satisfied*,** your vision\ngoes black*.***>04,01*>02,01***@nf,15";
		texty[3]="<11,08two eyes burn in from the dark*,**\nand then<13,10 a set of<12,10 teeth* and>11,12 claws*.**<10,15*****\nyou find yourself unexpectedly\nface to face with an inanimate\nmetal* beast*.****** it's a ship*!***@nf,15";
		texty[4]="inside*,** the controls feel more\n>13,05comfortable than any you have\nused before*.*.*.>10,10** could it be<02,10 that\nwhoever built this place and\nleft this ship had *YOU* in mind*?***@nf,15";
		texty[5]=">12,24but surely a ship like this is the\nproduct of an advanced tech-\nnology*,** not some personal\nconnection over eons of time*.*.*.*******<08,04\neven so*,** you cannot shake the\nfeeling that they knew you**.****@nf,15";
		texty[6]="<00,05\n<06,02*****   w*e*l*l* d*o*n*e*<05,08**,*** STARBOUNDER<07,01*!********\n you've accomplished your mission*,******\n\n        but there is always\n          more to explore*!*****@nf,15";
		texty[7]=">07,02>02,04**>08,03>00,03*>05,02*>06,02************$";
	} else if  (whichTro=="outro3") {
//		PlayerPrefs.SetInt("CinemaState", 5);
		texty[1]="<05,00<00,01<04,01<02,04**@cc,05*>05,05\nthe mysterious beacons seem to\nhave awakened a lost memory*.*.*.***@nf,15";
		texty[2]="\n*.*.*.*and finally your connection to\nthis place becomes clear*.*.*.***@nf,15";
		texty[3]="\n\n* welcome* home*,*** STARBOUNDER<01,05<03,03<06,04*!<07,01****************************************************************>07,06>00,02>02,01>04,01**@nf,15";
		texty[4]="<05,05*******************************$";
	}
}


function OnGUI () {
	if(!loading){
		//var btn: Texture = btnTexture[0];
		if (state=="write") {
			checkAdvance();		
		}	
		GUItexts[0].text=dispText; GUItexts[1].text=dispText;
	}
	else GUI.DrawTexture(Rect(0,0,Screen.width, Screen.height),loadingScreen);
}

function Update() {

	if (state=="wait") {
		nextyDown=false;
		normalSpeed();
	} else if (nextyDown) {
		//dynTimeInc=timeInc/10;
		//dynPauseInc=pauseInc/10;
		// GUIplanes[1].renderer.material.mainTexture=btnTexture[3];
		Time.timeScale = 10.0;
		for (var a: Animation in currAnims) {
			if (a) {
				for (var state : AnimationState in a) {
					state.speed = 0.1;
				}
			}
		}
		// btnUp=false;
	}

	else {
		normalSpeed();
	}
	
	if (state=="write") {
		if (nextyDown) GUIplanes[1].GetComponent.<Renderer>().material.mainTexture=btnTexture[3];
		else GUIplanes[1].GetComponent.<Renderer>().material.mainTexture=btnTexture[0];
	} else {
		if (Mathf.Round((Time.time-waitTimeStart)*2/Time.timeScale)%2==0) GUIplanes[1].GetComponent.<Renderer>().material.mainTexture=btnTexture[2];
		else	GUIplanes[1].GetComponent.<Renderer>().material.mainTexture=btnTexture[1];
	}

	nextyDown=false;
// inputs
	for (touch in Input.touches) { 
		getButtonHit(touch.position.x, touch.position.y);
		if (touch.phase == TouchPhase.Ended) btnUp=true;
	}
	if (Input.GetMouseButton(0)) {
		getButtonHit(Input.mousePosition.x, Input.mousePosition.y);
	} else if (Input.GetMouseButtonUp(0)) btnUp=true;
}

function getButtonHit(x: int, y: int) {

	if (y<Screen.height*0.2) {
		if (x<(90*yAdj)) {
			if (btnUp) {
				//print("skipButton");
				end();
				btnUp=false;
			}
		}
		else if (x>(Screen.width-(90*yAdj))) {
			//print("ffButton");
			if (btnUp) nextyDown=true;
			if (state=="wait" && btnUp) { 
				nexty();
				btnUp=false;
			}
			//doStuff=true;
		}
	}

}


function normalSpeed() {
	Time.timeScale = 1.0;
	for (var a: Animation in currAnims) {
		if (a) {
			for (var state : AnimationState in a) {
				state.speed = 1.0;
			}
		}
	}
}


function nexty() {
	dispText="";
	whichText++;
	if (whichText>=texty.length) {
		// do nothing
	} else {
		letterAdvance=-1;
		dynTimeInc=timeInc;
		dynPauseInc=pauseInc;
		state="write";
		GUIplanes[1].GetComponent.<Renderer>().material.mainTexture=btnTexture[0];
		if (delObj) Destroy(delObj);
		btnUp=false;
	}
}

function checkAdvance() {
	if (Time.time-lastTime>dynTimeInc) {
		letterAdvance++;
		lastTime=Time.time;
		if (letterAdvance>=texty[whichText].length) {
			waitTimeStart=Time.time;
			state="wait";
			if (nextyDown) btnUp=false;
		}
		else if (texty[whichText][letterAdvance]=="*")	lastTime+=dynPauseInc;
		else if (texty[whichText][letterAdvance]=="<")	{
			// - 48 for the ascii code of zero
			var tens: char = texty[whichText][letterAdvance+1];
			var digits: char = texty[whichText][letterAdvance+2];
			var num: int = (parseInt(tens)-48)*10 + (parseInt(digits)-48);
			tens = texty[whichText][letterAdvance+4];
			digits = texty[whichText][letterAdvance+5];
			var dur: int = (parseInt(tens)-48)*10 + (parseInt(digits)-48);
			inCard(num, dur);
			letterAdvance+=5;
		}
		else if (texty[whichText][letterAdvance]==">")	{
			tens = texty[whichText][letterAdvance+1];
			digits = texty[whichText][letterAdvance+2];
			num = (parseInt(tens)-48)*10 + (parseInt(digits)-48);
			tens = texty[whichText][letterAdvance+4];
			digits = texty[whichText][letterAdvance+5];
			dur = (parseInt(tens)-48)*10 + (parseInt(digits)-48);
			outCard(num, dur);
			letterAdvance+=5;
		}
		else if (texty[whichText][letterAdvance]=="@")	{
			tens = texty[whichText][letterAdvance+4];
			digits = texty[whichText][letterAdvance+5];
			num = (parseInt(tens)-48)*10 + (parseInt(digits)-48);
			anim(num);
			letterAdvance+=5;
		}
		else if (texty[whichText][letterAdvance]=="$")	{
			end();
		}
		else dispText+=texty[whichText][letterAdvance];
	}
}

function end() {
	Time.timeScale = 1.0;
	loading = true;
	yield WaitForSeconds(.2);
	if(PlayerPrefs.GetInt("FromLS",0)==0){
		if (whichTro=="intro") { 		
			print ("goto playscene");
			PlayerPrefs.SetInt("Level", 60);
			PlayerPrefs.SetInt("CinemaState", 1);
			PlayerPrefs.SetInt("TutorialState", 1);
			Application.LoadLevel(1); 
		}
		if (whichTro=="outro1") {
			print ("goto creds");
			Application.LoadLevel(5);
		}
		if (whichTro=="outro2") {
			print ("goto creds");
			Application.LoadLevel(5);
		}
		if (whichTro=="outro3") {
			print ("goto creds");
			Application.LoadLevel(5);
		}				
	}else{
		print ("goto level select menu");
		PlayerPrefs.SetInt("Quit", 2);
		Application.LoadLevel(0); 
	}
}



function inCard(which: int, dur: int) {
	var cardObj: GameObject = Instantiate(cardPFs[which], Vector3.zero, Quaternion.identity) as GameObject;
	cardObj.name="card"+which;
	var cardScript: IntroCardAnim = cardObj.GetComponent(IntroCardAnim);
	cardScript.dur=dur;
	if ((whichTro=="outro1" || whichTro=="outro2") && (which==7 || which==6)) cardScript.dur=0.25;
	if (whichTro=="outro2" && which==3) cardScript.dur=0.25;
	if (which==15) {
		cardScript.dur=0.25;
		delObj=cardObj;
	}
	cardScript.fadeIn();
	// keep track of certain anims so as to slow them down when timescale fast forwards
	// certain other exceptions
	if (whichTro=="intro") {
		if (which==0 || which==6 || which==7)	{
			currAnims[0]=cardObj.GetComponent.<Animation>();
		}
		if (which==8)	{
			currAnims[1]=cardObj.GetComponent.<Animation>();
		}
	}
	if (whichTro=="outro1") {
		if (which==2)	{
			currAnims[0]=cardObj.GetComponent.<Animation>();
			cardObj.transform.localScale.x*=aspectMult;
		}
		if (which==7)	{ // make flares hit right for 4:3
			cardObj.transform.position=GUItexts[0].transform.position;
			cardObj.transform.localScale=Vector3(Mathf.Clamp01(aspectMult), Mathf.Clamp01(aspectMult), 1);
		}
	}
	if (whichTro=="outro2") {
		if (which==2)	{
			currAnims[0]=cardObj.GetComponent.<Animation>();
			cardObj.transform.localScale.x*=Mathf.Clamp(aspectMult, 1, 2); // stretch starfields if over 1.5 aspect
		}
		if (which==4 || which==3 || which==8)	{
			currAnims[1]=cardObj.GetComponent.<Animation>();
		}
		if (which==7)	{
			cardObj.transform.position=GUItexts[0].transform.position;
			cardObj.transform.localScale=Vector3(Mathf.Clamp01(aspectMult), Mathf.Clamp01(aspectMult), 1);
		}
	}
	if (whichTro=="outro3") {
		if (which==7)	{
			cardObj.transform.position=GUItexts[0].transform.position;
			cardObj.transform.localScale=Vector3(Mathf.Clamp01(aspectMult), Mathf.Clamp01(aspectMult), 1);
		}
		if (which==0 || which==1) cardObj.transform.localScale.x*=Mathf.Clamp(aspectMult, 1, 2) ;
	}
//	if (which==15 || which==7)  {
//		currAnims[2]=cardObj.animation;
//		cardObj.transform.parent=cam.transform;
//		cardObj.transform.localPosition=Vector3(0,-1,10);
//		cardObj.transform.localEulerAngles=Vector3(0,0,0);
//	}
}

function outCard(which: int, dur: int) {
	var cardObj: GameObject = GameObject.Find("card"+which);
	if (cardObj) {
		var cardScript: IntroCardAnim = cardObj.GetComponent(IntroCardAnim);
		// wait on fade out and kill til blink anim is in off state
		if (whichTro=="intro") {
			if (which==0 || which==6 || which==7)	{
				yield; 
				while (cardObj.GetComponent.<Animation>()["buttonBlinkAlpha"].normalizedTime%1<0.5) yield;
			}
		}
		cardScript.dur=dur;
		cardScript.fadeOut();
	}
}

function anim(which: int) {
	if (which==0)	cam.GetComponent.<Animation>().Play("camRotDown");
	if (which==1)	cam.GetComponent.<Animation>().Play("camMoveDown");
	if (which==2)	cam.GetComponent.<Animation>().Play("camRotUp");
	if (which==3)	cam.GetComponent.<Animation>().Play("camShake");
	if (which==5)	{ cam.GetComponent.<Animation>().Play("camPushin"); currAnims[0]=cam.GetComponent.<Animation>(); }
	if (which==4) { var obj: GameObject = gameObject.Find("card6/null"); obj.GetComponent.<Animation>().Play("flareOut"); }
	if (which==15) nextFlare();
}