using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FrontColl : MonoBehaviour
{

	MoveShip ship;

	void Start ()
	{
		ship = transform.parent.GetComponent<MoveShip> ();
	}

	void OnTriggerStay (Collider other)
	{
		if (ship.shipNum == 10) {
			if (other.tag != "kill" && other.name != "camDropBox" && other.name != "camDropBox2" && other.name != "endLoop") {
				if (ship.stats.jumpTimer < -0.2f)
					ship.StopDead ();
			}
		} else {
			if (other.name != "camDropBox" && other.name != "camDropBox2" && other.name != "endLoop") {
				if (ship.state == MoveShip.State.Normal) {
					if (ship.targetSpeed > ship.minZBrake)
						ship.Crash (0);
					else { 
						print ("here " + other.name); 
						ship.StopDead (); 
					}
				}
			}
		}
	}

	void OnTriggerExit ()
	{
		ship.stats.stopped = false;	
		if (ship.state == MoveShip.State.Normal)
			StartCoroutine (ship.SpeedUpZ ());
	}
}
