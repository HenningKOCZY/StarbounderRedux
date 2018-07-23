using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FrontColl : MonoBehaviour {

	MoveShip ship;

	void Start() {
		ship = transform.parent.GetComponent<MoveShip>();
	}

	void OnTriggerStay(Collider other) {
		if (ship.shipNum == 10) {
			if (other.tag != "kill" && other.name != "camDropBox" && other.name != "camDropBox2" && other.name != "endLoop") {
				if (ship.state.jumpTimer < -0.2f)
					ship.stopDead();
			}
		} else {
			if (other.name != "camDropBox" && other.name != "camDropBox2" && other.name != "endLoop") {
				if (!ship.state.crashing && ship.state.started) {
					if (ship.targetSpeed > ship.minZBrake && !ship.state.stopDead)
						ship.crash(0);
					else { 
						print("here " + other.name); 
						ship.stopDead(); 
					}
				}
			}
		}
	}

	void OnTriggerExit() {
		ship.state.stopDead = false;	
		if (!ship.state.crashing && ship.state.started)
			ship.speedUpZ();
	}
}
