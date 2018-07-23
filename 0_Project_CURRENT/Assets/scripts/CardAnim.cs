using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CardAnim : MonoBehaviour {

	public Texture2D[] cardFrame;
	Transform parentTo;
	public bool randomRot = false;
	public bool lookAtCam = false;
	public int FPS = 30;
	int frameCount = 0;
	Transform cam;
	float timer = 0;
	public bool cardGo = false;
	Renderer ren;

	void Start() {
		ren = GetComponent<Renderer>();
		if (lookAtCam)
			cam = GameObject.Find("Main Camera").transform; // do better
		UpdateTex();

	}

	public void CardGo() {
		cardGo = true;
		timer = 0;
		if (randomRot)
			transform.localEulerAngles = new Vector3(0, Random.Range(0, 360), 0);
	}

	public void CardStop() {
		frameCount = 0;
		UpdateTex();
		cardGo = false;
	}

	void FixedUpdate() {
		if (cardGo) {
			timer += Time.deltaTime;
			int newfc = (int)(timer * FPS);
			if (newfc > frameCount) {
				frameCount = newfc;
//				print("framecount: " + frameCount);

				if (frameCount >= cardFrame.Length) {
					CardStop();
					return;
				}
				UpdateTex();
			}
			if (lookAtCam)
				transform.root.LookAt(cam.transform.position);
			if (parentTo)
				transform.root.position = parentTo.position;
		}
	}


	void UpdateTex() {
		ren.material.mainTexture = cardFrame[frameCount];
//		ren.material.mainTexture = cardFrame[3];
	}

}
