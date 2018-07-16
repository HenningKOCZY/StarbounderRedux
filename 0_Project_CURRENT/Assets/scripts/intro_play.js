var go : boolean = false;
var introAtlas : textureAtlas_Pix;
var introFade : intro_fadeCard;
var frame : int = 0;
var startTime : float;
var fadeOn : boolean = false;
var fadeOff : boolean = false;
var introCam: GameObject;

function Start () {

}

function FixedUpdate(){
	if(go){
		introAtlas.UpdateNumbers(frame);
		frame=(Time.time-startTime)*24;
		if(frame==69) {
			go=false;
			fadeOn=true;	
		}
	}
}

function Update(){
	if (fadeOn){
		if(introFade.color.a<1) introFade.FadeOn();
		else {
			gameObject.transform.position.y=-2;
			fadeOn=false;	
		}
	}
	if (fadeOff){
		if(introFade.color.a>0) introFade.FadeOff();
		else fadeOff=false;
	}
}

function Initiate(){
	introCam.active=true;
	go=true;
	startTime=Time.time;
}

function KillCam(){
	introCam.active=false;
}