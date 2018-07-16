
var whichTut: String;
var tutProgress: int = 0;
var progressable: int =0;
private var whichSide: int =0;

private var lastTime: float =0.0;
private var letterAdvance: int = -1;
var timeInc: float;
var pauseInc: float;

private var doStuff: boolean = false;

var whichText: int;
var texty: String[];

private var dispText: String;
private var words: String[];

private var state: String = "write";
private var skipped: boolean = false;

var gatewayObj: GameObject;
var artifactObj: GameObject;
var gatewayPF: GameObject;
var artifactPF: GameObject;

var ship: MoveShip;
var gui: GUIScript;
var gameMaster: GameMaster;

var speedHL : GameObject;
var jumpHL : GameObject;
var queueHL : int = 0;

var waitTimeStart : float;

function Start() {
	lastTime=Time.time;	
	var shipObj: GameObject = GameObject.Find("Ship");
	ship = shipObj.GetComponent(MoveShip);
	var guiObj: GameObject = GameObject.Find("GUI_1");
	gui = guiObj.GetComponent(GUIScript);
	var gmObj: GameObject = GameObject.Find("AA_gameMaster");
	gameMaster = gmObj.GetComponent(GameMaster);
	
	if (whichTut=="controls") {
		speedHL.GetComponent.<Renderer>().material.mainTextureOffset.y=-0.1;
		jumpHL.GetComponent.<Renderer>().material.mainTextureOffset.y=-0.1;
		
		gatewayObj = Instantiate(gatewayPF, Vector3(0, 0, -20), Quaternion.identity) as GameObject;
		gatewayObj.transform.parent=transform;
		
		artifactObj = Instantiate(artifactPF, Vector3(0, 2, -20), Quaternion.identity);
		artifactObj.transform.localEulerAngles = Vector3(0,180,0);
		artifactObj.name="artifact0";
		artifactObj.transform.parent=transform;
		artifactObj.transform.localPosition=Vector3(0,2,-20);
		gatewayObj.transform.localPosition=Vector3(0,0,-20);
		
		texty[0] = "***************##before exploring*,** you should familiarize \n#yourself with the ship's controls+**.**.**.*********************$";
		texty[1] = "***##this@ is the BRAKE BUTTON*.**** tap it\n#once to start going*.**** hold it down\n#if you need to go slower*.**+";
		texty[2] = "***##good@*.***********$";
		texty[3] = "***##this@ is the JUMP BUTTON*.****\n#tap it once to jump*.****\n#tap it twice to double-jump*.**+";
		texty[4] = "***##good@*.***********$";
		texty[5] = "***##tilt the phone left and right to slide\n#across the platform*.**** get a feel for the\n#steering of your ship.******************************************+";
		texty[6] = "***##pick up six artifacts to move on.+";
		texty[7] = "***##very good*.***********$";
		texty[8] = "***##now*,** to bring up the pause menu,\n#swipe down +the middle of the screen*.\n#*then tap \"X\" to resume play*.**";
		texty[9] = "***##good@*.***********$";
		texty[10] = "***$"; // dynamically set... for game speed
		texty[11] = "***##now** either fly through a gateway\n#to progress to LEVEL 0******, *or swipe again\n#and go to the LEVEL SELECT menu*.*****+";
		texty[12] = "**+**";
		// gameMaster.gameSpeed
	}
	if (whichTut=="artifacts") {
		gatewayObj = Instantiate(gatewayPF, Vector3(0, 0, -20), Quaternion.identity) as GameObject;
		gatewayObj.transform.parent=transform;
		artifactObj = Instantiate(artifactPF, Vector3(0, 2, -20), Quaternion.identity);
		artifactObj.transform.localEulerAngles = Vector3(0,180,0);
		artifactObj.name="artifact0";
		artifactObj.transform.parent=transform;
		texty[0] = "*******************##when you return to a completed level*,**\n#you will find it arrayed with mysterious**\n#ARTIFACTS+*.**.**.********$";
		texty[1] = "***##collect three artifacts in every level\n#to unlock*.*.*.*****well**,**** something mysterious+*!**";
		texty[2] = "**+**";
		texty[3] = "***##very good*.**** that was three*.**** +now hit a\n#gateway* or use the menu to go on*.**";
		texty[4] = "**+**";
	} 
	if (whichTut=="panther") {
		if (gameMaster.checkpoint==1){ tutProgress=1;  nexty(3, 1); }
		//if (gameMaster.checkpoint==2) { tutProgress=2; nexty(5, 1); }
		//if (gameMaster.checkpoint==3) { tutProgress=3; nexty(7, 1); }
		texty[0] = "************##Welcome to the panther training course*.****************************************************$";
		texty[1] = "***##your new ship is far stronger and faster\n#than the others*.**** you'll notice there are\n#some new abilities* as well.************************************************************$";
		texty[2] = "***##practice here for as long as you like*,**\n#then take your new ship out* to explore*!*****+***************************************************$";
		texty[3] = "**";
	}
}

function refreshArtText() {
	if (gui.a1state==1)	dispText="pick up five artifacts to move on.";
	if (gui.a1state==2)	dispText="pick up four artifacts to move on.";
	if (gui.a1state==3)	dispText="pick up three artifacts to move on.";
	if (gui.a1state==4)	dispText="pick up two artifacts to move on.";
	if (gui.a1state==5)	dispText="pick up one artifact to move on.";
}

function refreshSpeedText() {
	var tempText: String = "medium";
	if (PlayerPrefs.GetInt("GameSpeed", 1)==0) tempText="slow";
	if (PlayerPrefs.GetInt("GameSpeed", 1)==2) { tempText="fast"; 	texty[10] = "***##your game speed is currently set to **"+ tempText +"*.****\n#impressive*!*******************************************$"; }
	else 	texty[10] = "***##your game speed is set to **"+ tempText +"*.****\n#you may adjust this in the *OPTIONS*\n#menu*,** if you can handle it*!************************************************$";
}


function Update() {
	if (state=="write") checkAdvance();
	gui.tutText=dispText;
	if (whichTut=="controls") {
		if (queueHL==1) { speedHL.transform.position.x=-240*gui.aspectMult+62; speedHL.GetComponent.<Animation>().Play(); queueHL++; }
		else if (queueHL==3) { speedHL.GetComponent.<Animation>().Stop(); speedHL.GetComponent.<Renderer>().material.mainTextureOffset.y=-0.1; queueHL++; }
		else if (queueHL==5) { jumpHL.transform.position.x=240*gui.aspectMult-58; jumpHL.GetComponent.<Animation>().Play(); queueHL++; }
		else if (queueHL==7) { jumpHL.GetComponent.<Animation>().Stop(); jumpHL.GetComponent.<Renderer>().material.mainTextureOffset.y=-0.1; queueHL++; }
	}
	if (progressable) {
		if (whichTut=="controls") {
			
			if (tutProgress==0 ){
				if (checkInput()) { tutProgress=1; nexty(1, 0.2); }
				if (whichText==1) { tutProgress=1; }
			}
			else if (tutProgress==1 && ship.state.lv.z>50) tutProgress=2;
			else if (tutProgress==2 && ship.state.lv.z<=40) { tutProgress=3; nexty(2, 0.5);}
			else if (tutProgress==3 && ship.state.jumps==2) { tutProgress=4;  nexty(4, 0.5); }
			else if ((tutProgress==4) && (Mathf.Abs(ship.state.lv.x)>16))  { tutProgress=5; nexty(6, 0);}
			//else if ((tutProgress==3) && (ship.transform.position.x>15 || ship.transform.position.x<-15)) {tutProgress=4; whichSide=ship.transform.position.x; }
			//else if ((tutProgress==4) && ((ship.transform.position.x>15 && whichSide<0) || (ship.transform.position.x<-15 && whichSide>0))) {tutProgress=5; nexty(4, 0); }
			else if ((tutProgress==5) && (artifactObj.transform.position.z+10<ship.transform.position.z))  { 
				if (gui.a1state>=6) { tutProgress=6; nexty(7, 0.5); }
				else { 
					if (artifactObj.transform.position.x<0) artifactObj.transform.position=Vector3(Random.Range(6, 22.0), 4, ship.transform.position.z+Random.Range(170, 200)); 
					else artifactObj.transform.position=Vector3(Random.Range(-22.0, -6), 4, ship.transform.position.z+Random.Range(170, 200));
					refreshArtText();
				}
			}
			
			else if (tutProgress==6 && gui.state=="paused") tutProgress=7; 
			else if (tutProgress==7 && gui.state=="tutorial") { tutProgress=8;  refreshSpeedText(); nexty(9, 0.5); }
			else if (tutProgress==8) {
				if (gatewayObj.transform.position.z+10<ship.transform.position.z)  { 
					gameMaster.gateways[0]=gatewayObj.transform;
					gatewayObj.transform.position=Vector3(Random.Range(-16.0, 16.0), 0, ship.transform.position.z+Random.Range(170, 200));
					ship.winDist=gatewayObj.transform.position.z;
				}
				// if (checkInput()) nexty(11, 0.2);
			}
		}
		else if (whichTut=="artifacts") {
			if (tutProgress==0 && (checkInput() || whichText==1)) { tutProgress=1;  nexty(1, 0.2); }
			else if (tutProgress==1 && checkInput()) { tutProgress=2; nexty(2, 0.2); }
			if (tutProgress<3 && tutProgress>=0) {
					if (gui.a3state==1) { tutProgress=3; nexty(3, 0.2); }	
					else if (artifactObj.transform.position.z+10<ship.transform.position.z)  { 
					artifactObj.transform.position=Vector3(Random.Range(-16.0, 16.0), 4, ship.transform.position.z+Random.Range(250, 300));
				}
			}
			else { // artifacts done, now gateways appear
				if (gatewayObj.transform.position.z+10<ship.transform.position.z)  { 
					gameMaster.gateways[0]=gatewayObj.transform;
					gatewayObj.transform.position=Vector3(Random.Range(-16.0, 16.0), 0, ship.transform.position.z+Random.Range(170, 200));
					ship.winDist=gatewayObj.transform.position.z;
				}
				if (checkInput()) nexty(4, 0.2);
			}
		}
		else if (whichTut=="panther") {
			if (tutProgress==0 && ship.state.grounded) { gameMaster.checkpoint=1; tutProgress=1; }
		}
	} 
} 

function checkInput() {
	for (touch in Input.touches) {  
		if (touch.position.y>Screen.height*0.66) {   
			if  (touch.phase == TouchPhase.Began) return true;
		}
	} 
	if (Input.GetMouseButtonDown(0)) {
		if (Input.mousePosition.y>Screen.height*0.66) return true;
	}
	return false;
}


function checkAdvance() {
	if (Time.time-lastTime>timeInc) {
		letterAdvance++;
		lastTime=Time.time;
		if (letterAdvance>=texty[whichText].length) {
			waitTimeStart=Time.time;
			state="wait";
		}
		else if (texty[whichText][letterAdvance]=="*")	lastTime+=pauseInc;
/* 		else if (texty[whichText][letterAdvance]=="<")	{
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
		} */
		else if (texty[whichText][letterAdvance]=="+")	{
			progressable=1;
		}
		else if (texty[whichText][letterAdvance]=="$")	{
			nexty(0, 0);
		}
		else if (texty[whichText][letterAdvance]=="#") {
			gui.lineCount++;
		}
		else if (texty[whichText][letterAdvance]=="@") {
			queueHL++;
		}
		else dispText+=texty[whichText][letterAdvance];
	}
}

function nexty(which: int, p: float) {
	progressable=0;	
	yield WaitForSeconds(p);
	dispText="";
	if (which==0) whichText++;
	else whichText=which;
	if (whichText>=texty.length) {
		// do nothing
	} else {
		gui.lineCount=-1;
		letterAdvance=-1;
		state="write";
	}
}