using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ArtBurstSlowdown : MonoBehaviour {

	public MoveShip ship;
	public MoveCam cam;

	public float slowdown = 0.5f;

	void FixedUpdate() {
		if (transform.position.z > 0) {
			//transform.localPosition.x-=ship.state.lv.x*2*slowdown*Time.deltaTime;
			//transform.localPosition.z-=ship.state.lv.z*slowdown*Time.deltaTime;
			transform.localPosition -= new Vector3(cam.lv.x * Mathf.Clamp01(1.5f * slowdown), cam.lv.y * Mathf.Clamp01(1.5f * slowdown), cam.lv.z * slowdown);
		}
	}
}
