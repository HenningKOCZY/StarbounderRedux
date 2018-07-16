var progScript : GUIQuadObj;
var shipObj : GameObject;
var ship : MoveShip;
var barLength : int;
var prog : float;
var gui : GUIScript;
var aspectMult: float = 1.0;

function Awake() { 
	progScript = this.GetComponent("GUIQuadObj");
	shipObj = GameObject.Find("Ship");
	ship = shipObj.GetComponent("MoveShip");
}


function Update () {
   if(gui.state=="play" && !ship.state.cruising){
           progScript.Enabled=true;
           progScript.Visible=true;        
           prog = Mathf.Clamp01(ship.state.progress/ship.winDist);        
           
           progScript.Scale.x = prog*barLength*0.99;
           
           progScript.Location.x = (-240*aspectMult+321)+((progScript.Scale.x)/2);
           
   }else{
           progScript.Enabled=false;
           progScript.Visible=false;        
   }        
}