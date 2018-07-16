
var ship: MoveShip;

function OnTriggerStay (other: Collider) {
	if (ship.shipNum==10) {
		if (other.tag!="kill" && other.name!="camDropBox" && other.name!="camDropBox2" && other.name!="endLoop") {
			if (ship.state.jumpTimer<-0.2) ship.stopDead();
		}
	}

	else {
		if (other.name!="camDropBox" && other.name!="camDropBox2" && other.name!="endLoop") {
			if (!ship.state.crashing && ship.state.started) {
				if (ship.targetSpeed>ship.minZBrake && !ship.state.stopDead)ship.crash(0);
				else { print("here "+other.name); ship.stopDead(); }
			}
		}
	}
}

function OnTriggerExit(){
	ship.state.stopDead=false;	
	if (!ship.state.crashing && ship.state.started) ship.speedUpZ();
}