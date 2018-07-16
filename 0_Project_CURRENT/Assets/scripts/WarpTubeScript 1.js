var rens: Renderer[];
var palette: Color[];
var uSpeeds: float[];
var vSpeeds: float[];

function Start(){
	var gameMaster: GameObject = gameObject.Find("AA_gameMaster");
	var gameMasterScript: GameMaster = gameMaster.GetComponent(GameMaster);
	var world : int = gameMasterScript.worldNum;
	for (var i: int=0; i<rens.length; i++) {
		if(i==0 || i==1) rens[i].material.SetColor ("_TintColor", palette[i+(world*10)]);
		if(i>=2 && i<=4) rens[i].material.SetColor ("_TintColor", palette[2+(world*10)]);
		if(i>=5 && i<=8) rens[i].material.SetColor ("_TintColor", palette[3+(world*10)]);
	}
}

function Update () {
	for (var i: int=0; i<rens.length; i++) {
		rens[i].material.mainTextureOffset = Vector2 (Time.time*-1*uSpeeds[i], Time.time*vSpeeds[i]);
	}
}