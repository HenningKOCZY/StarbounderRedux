var gameMaster: GameMaster;
var ship: Transform;
var converted: boolean = false;
var frontZ: float;
var backZ: float;
var cubeDiv: int;
private var dist: float = 16.0;

function Update () {
	if (!converted) {
		if (frontZ-ship.position.z<dist) {
			gameMaster.makeColls(transform, cubeDiv);
			converted=true;
		}
	} else {
		if (ship.position.z-backZ > 8){
			Destroy(gameObject);
		}
	}
}