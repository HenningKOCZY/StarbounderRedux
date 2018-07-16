var helpScreen: Texture2D[];
var num: int = 0;
var displayTap: boolean = false;
var tapToContinue: Texture2D;
private var alpha : float = 0;
private var alphaCnt : float = 0.2;
var loadingScreen: Texture2D;
var loading : boolean = false;

function OnGUI(){
	if (!loading){
		GUI.color.a = 1;
		GUI.DrawTexture(Rect(0,0,Screen.width, Screen.height),helpScreen[num]);
		if (displayTap){
			alpha += alphaCnt*Time.deltaTime;
			GUI.color.a = alpha;
			GUI.DrawTexture(Rect((Screen.width/2)-128,280,256, 23),tapToContinue);
			if (alpha<=0 || alpha>=1) alphaCnt = alphaCnt*-1;
		}
	}else GUI.DrawTexture(Rect(0,0,Screen.width, Screen.height),loadingScreen);
}

function Start(){
	TapDelay();	
}

function Update () {
	if (displayTap) GetInput();	
}

function GetInput(){
	for (var i = 0; i < Input.touchCount; ++i){
		if(Input.GetTouch(i).phase==TouchPhase.Began){
			Continue();
		}
	}
	if(Input.GetMouseButtonDown(0)){
		Continue();
	}
}

function Continue(){
	alpha=0;
	alphaCnt=0.2;
	displayTap=false;
	if (num<2) {
		num++;
		TapDelay();
	}
	else {
		loading = true;
		yield WaitForSeconds(.2);
		Application.LoadLevel(1);
	}	
		
}

function TapDelay(){
	yield WaitForSeconds(2.5);
	displayTap = true;	
}

function Loading(){
		
}