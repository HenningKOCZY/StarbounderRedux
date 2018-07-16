var loadingScreen: Texture2D;
var loadOn : boolean = false;


function OnGUI () {
	if(loadOn){
		GUI.DrawTexture(Rect(0,0,Screen.width, Screen.height),loadingScreen);	
	}// else GUI.DrawTexture(Rect(0,0,0,0),loadingScreen);	
}


	
