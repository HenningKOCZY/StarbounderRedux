using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PantherFlagScript : MonoBehaviour {

	Material projectorMat;
	Material bubbleLightsMat;
	Transform projectorObj;
	Transform projectorRaysObj;
	Transform shadowObj;
	GameMaster gameMaster;
	MoveShip ship;
	Material hologramMat;

	int on = 0;
	bool turnOn = false;
	bool flyIn = false;
	Vector4 projectorMatColor;
	Vector4 hologramColor;
	Transform hologramGrp;
	GameObject hologramObj;
	GameObject pFlag;
	Transform bubble;
	GameObject basey;
	Transform shipTrans;
	Transform shipSub;
	float stoppedMoment;
	bool reposShip = false;
	Vector3 shipTransPos;
	bool allowRelease = false;
	AudioClip platformDescend;

	void Start() {
		InitFlag();	
	}

	public void InitFlag() {	
		on = PlayerPrefs.GetInt(("Level" + gameMaster.level + "PantherFlag"), 0);
		bubble.gameObject.GetComponent<Renderer>().materials[1].SetTexture("_Shad", Resources.Load<Texture>("ship/world" + gameMaster.worldNum + " Refl"));
		basey.GetComponent<Renderer>().material.SetTexture("_Shad", Resources.Load<Texture>("ship/world" + gameMaster.worldNum + " Refl"));
		projectorMat = projectorObj.GetComponent<Renderer>().material;
		bubbleLightsMat = bubble.gameObject.GetComponent<Renderer>().materials[0];
		hologramGrp.localPosition = new Vector3(hologramGrp.localPosition.x, 1, hologramGrp.localPosition.z);
		shadowObj.localPosition = new Vector3(-0.9f, shadowObj.localPosition.y, shadowObj.localPosition.z);

		if (on == 0) {
			pFlag.transform.position = new Vector3(0, 0, -400);
			bubble.localPosition = new Vector3(0, 0, -3.8f);
		} else {
			pFlag.transform.localPosition = Vector3.zero;	
			bubble.position = new Vector3(0, 0, -400);
		}

		if (gameMaster.shipNum == 10) {
			if (on == 0) {
				projectorMatColor = new Vector4(1, 0.1f, 0.2f, 1);
				projectorMat.SetColor("_TintColor", projectorMatColor);
				bubbleLightsMat.SetColor("_TintColor", projectorMatColor);

				hologramColor = new Vector4(1, 0, 0, 0.7f);
				hologramMat.SetColor("_TintColor", hologramColor);

				//hologramLight.color=Vector4(1,.1,.2,1);

				hologramGrp.localScale = new Vector3(0, 3, 0);

				hologramObj.GetComponent<Animation>().Stop();
				projectorRaysObj.GetComponent<Animation>().Stop();
				projectorObj.GetComponent<Animation>().Stop();
				projectorRaysObj.localScale = Vector3.zero;

				shadowObj.GetComponent<Animation>().Stop();
				shadowObj.localScale = Vector3.zero;

			} else {
				if (ship.sfx)
					basey.GetComponent<AudioSource>().Play();
				projectorMatColor = new Vector4(0.28f, 0.55f, 1, 1);
				projectorMat.SetColor("_TintColor", projectorMatColor);

				hologramColor = new Vector4(0.33f, 0.33f, 0.33f, 0.365f);
				hologramMat.SetColor("_TintColor", hologramColor);

				//hologramLight.color=Vector4(.13,.64,1,1);

				hologramGrp.localScale = new Vector3(1.2f, 1.2f, 1.2f);

				hologramObj.GetComponent<Animation>().Play();
				projectorRaysObj.GetComponent<Animation>().Play();
				projectorObj.GetComponent<Animation>().Play();
				shadowObj.GetComponent<Animation>().Play();
			}
			if (ship.state.cruising || !ship.sfx || ship.state.paused)
				basey.GetComponent<AudioSource>().Stop();
		}
	}

	void OnTriggerEnter() {
		if (on == 0) {
			stoppedMoment = Time.time;
			ship.fakeCC = true;
			ship.checkLanding();
			base.GetComponent<AudioSource>().PlayOneShot(platformDescend);
			pFlag.GetComponent<Animation>().Play();
			ship.state.started = false;
			ship.stopDead();
			ship.state.fullStop = true;
			//ship.state.started= false;
			reposShip = true;
			ship.xf = 0;
			ship.xf2 = 0;
//					yield WaitForSeconds(1.5f);
			hologramObj.GetComponent<Animation>().Play();
			projectorRaysObj.GetComponent<Animation>().Play();
			projectorObj.GetComponent<Animation>().Play();
			shadowObj.GetComponent<Animation>().Play();
			turnOn = true;
			on = 1;
//					yield WaitForSeconds(.6);
			allowRelease = true;
//					yield WaitForSeconds(.7);
			basey.GetComponent<AudioSource>().Play();
		}
	}

	void OnTriggerExit() {
		ship.state.stopDead = false;	
		//ship.state.started=true;
	}

	void Update() {
		if (gameMaster.shipNum == 10) {
			if (on == 1) {
				if (!ship.state.paused && !ship.state.cruising && !basey.GetComponent<AudioSource>().isPlaying && ship.sfx) {
					basey.GetComponent<AudioSource>().Play();
				} else if ((ship.state.paused || ship.state.cruising || !ship.sfx) && basey.GetComponent<AudioSource>().isPlaying)
						basey.GetComponent<AudioSource>().Stop();
			}
		}
	}

	void endRepos() {
//			yield WaitForSeconds(.4);
		shipTrans.position = new Vector3(bubble.position.x, bubble.position.y + 0.65f, bubble.position.z);
		shipSub.localEulerAngles = Vector3.zero;
		reposShip = false;
	}

	void LateUpdate() {
		if (gameMaster.shipNum == 10) {
			if (reposShip) {
				shipTrans.position = Vector3.Lerp(shipTrans.position, new Vector3(bubble.position.x, bubble.position.y + 0.65f, bubble.position.z), Time.deltaTime * 10);
				shipSub.localRotation = Quaternion.Slerp(shipSub.rotation, gameObject.transform.rotation, Time.deltaTime * 10);
				//shipTransPos = shipTrans.position;
				endRepos();
			}
			if (turnOn) {
				Vector3 newp = new Vector3(-1.1f, shadowObj.localPosition.y, shadowObj.localPosition.z);
				shadowObj.localPosition = Vector3.Lerp(shadowObj.localPosition, newp, Time.deltaTime * 4);
				shadowObj.localScale = Vector3.Lerp(shadowObj.localScale, new Vector3(1f, 1.3f, 1.3f), Time.deltaTime * 4);

				newp = new Vector3(hologramGrp.localPosition.x, 1.3f, hologramGrp.localPosition.z);
				hologramGrp.localPosition = Vector3.Lerp(hologramGrp.localPosition, newp, Time.deltaTime * 4);
				hologramGrp.localScale = Vector3.Lerp(hologramGrp.localScale, new Vector3(1.2f, 1.2f, 1.2f), Time.deltaTime * 4);

				projectorMatColor = Vector4.Lerp(projectorMat.GetColor("_TintColor"), new Vector4(0.28f, 0.55f, 1, 1), Time.deltaTime * 4);
				projectorMat.SetColor("_TintColor", projectorMatColor);
				bubbleLightsMat.SetColor("_TintColor", projectorMatColor);

				hologramColor = Vector4.Lerp(hologramMat.GetColor("_TintColor"), new Vector4(0.33f, 0.33f, 0.33f, 0.365f), Time.deltaTime * 4);
				hologramMat.SetColor("_TintColor", hologramColor);

				//hologramLight.color = Vector4.Lerp(hologramLight.color,Vector4(.13,.64,1,1),Time.deltaTime*4);

				if (projectorMatColor == new Vector4(0.28f, 0.55f, 1, 1))
					turnOn = false;


			}
			if (allowRelease) {
				if (Input.GetAxisRaw("Vertical") > 0 || ship.yf == true || Input.touchCount > 0) {
					print("releasing");
					//ship.state.stoppedTime = Time.time-stoppedMoment;
					ship.state.fullStop = false;
					ship.state.stopDead = false;
					ship.state.started = true;
					ship.speedUpZ();	
					allowRelease = false;
				}	
			}
		}
	}
}
