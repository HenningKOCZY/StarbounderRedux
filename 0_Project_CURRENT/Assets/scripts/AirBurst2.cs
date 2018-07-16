using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AirBurst2 : MonoBehaviour {

	public float yPos;
	public CardAnim airBurstScript;

	void Update () {
		if (airBurstScript.cardGo) {
			transform.position = new Vector3 (transform.position.x , yPos+1, transform.position.z );	
			
		}
	}
	
}
