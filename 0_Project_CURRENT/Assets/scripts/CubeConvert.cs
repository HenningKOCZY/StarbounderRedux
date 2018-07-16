using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CubeConvert : MonoBehaviour {

	public GameMaster gameMaster;
	public Transform ship;
	public bool converted = false;
	public float frontZ;
	public float backZ;
	public int cubeDiv;
	private float dist = 16.0f;

	void Update() {
		if (!converted) {
			if (frontZ - ship.position.z < dist) {
				gameMaster.makeColls(transform, cubeDiv);
				converted = true;
			}
		} else {
			if (ship.position.z - backZ > 8) {
				Destroy(gameObject);
			}
		}
	}
}
