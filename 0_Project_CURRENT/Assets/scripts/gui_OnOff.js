var progScript : GUIQuadObj;
var shipObj : GameObject;
var ship : MoveShip;
var barLength : int;

var prog : float;

function Awake() { 
	progScript = this.GetComponent("GUIQuadObj");
	shipObj = GameObject.Find("Ship");
	ship = shipObj.GetComponent("MoveShip");
}


function Update () {
		
	
}