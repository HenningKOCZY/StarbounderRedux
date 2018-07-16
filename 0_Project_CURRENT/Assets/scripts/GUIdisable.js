var guiQuadObjScript : GUIQuadObj;
var shipObj : GameObject;
var ship : MoveShip;
var guiObj : GameObject;
var gui : GUIScript;

function Awake() { 
	guiQuadObjScript = this.GetComponent("GUIQuadObj");
	shipObj = GameObject.Find("Ship");
	ship = shipObj.GetComponent("MoveShip");
	guiObj = GameObject.Find("GUI_1");
	gui = guiObj.GetComponent("GUIScript");
}


function Update () {
	if(gui.state=="play" && !ship.state.cruising){
		guiQuadObjScript.Enabled=true;
		guiQuadObjScript.Visible=true;	
	}else{
		guiQuadObjScript.Enabled=false;
		guiQuadObjScript.Visible=false;	
	}	
}