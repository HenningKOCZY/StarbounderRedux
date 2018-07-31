var rens: Material[];
var palette: Color[];
var uSpeeds: float[];
var vSpeeds: float[];

function Start(){
	var gameMaster: GameObject = gameObject.Find("AA_gameMaster");
	var gameMasterScript: GameMaster = gameMaster.GetComponent(GameMaster);
	var world : int = gameMasterScript.worldNum;
	for (var i: int=0; i<rens.length; i++) {
		if(i==0) rens[i].SetColor ("_TintColor", palette[i+(world*10)]);
		if(i==1) rens[i].SetColor ("_TintColor", palette[i+(world*10)]);
		if(i==2) rens[i].SetColor ("_TintColor", palette[i+(world*10)]);
	}
}

function Update () {
	for (var i: int=0; i<rens.length; i++) {
		rens[i].mainTextureOffset = Vector2 (Time.time*-1*uSpeeds[i], Time.time*vSpeeds[i]);
		rens[i].mainTextureOffset.x = rens[i].mainTextureOffset.x % 1;
		rens[i].mainTextureOffset.y = rens[i].mainTextureOffset.y % 1;
	}
}