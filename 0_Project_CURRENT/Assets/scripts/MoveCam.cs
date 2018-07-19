using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MoveCam : MonoBehaviour {
		
	Transform target;
	public float goalHeight = 0;
	public float sensitivity;
	float defaultLerpSpeed;
	private float lerpSpeed;
	public Camera cam;
	public Animation anim;

	public enum Mode {
		Play,
		Stop,
		Win,
		Title}

		;

	public Mode mode = Mode.Play;

	Transform lookTarget;
	public float goalZ = 0f;
	float goalRY = 0f;
	public MoveShip ship;
	Transform titlePF;
	Transform titleObj;
	public Transform[] titleArtifactPFs;
	Transform titleArtifactObj;
	public string[] titleAudioName;
	// why are these here?

	Transform VC_interface;
	Transform interfaceTilt;
	Transform newRecord;
	Transform levelTime;
	Transform buttons;
	public GameObject vcnPF;
	Transform curTime;
	Transform recordTime;
	GameObject vcn;
	GameObject vcn2;
	GameObject vcn3t;

	GameObject Rvcn;
	GameObject Rvcn2;
	GameObject Rvcn3;

	float yPos;
	float zPos;
	float xAngle;
	int yLerp;
	int zLerp;
	int xLerp;

	public float[] VCshipAdj;
	// victory cruise ship adjust height(?) by

	//	public LoadingScreen loadingScript;
	public bool go = false;

	public GameMaster gameMaster;
	//	public GUIScript gui;

	int level;
	float t;
	public bool newRecordCheck = false;
	float camXLerpSpeed;

	public Vector3 lp;
	public Vector3 lv;

	float diff = 0.0f;

	void Start() {
		lerpSpeed = defaultLerpSpeed;
		target = ship.transform;
		//	iPhoneKeyboard.autorotateToPortrait = false; 
		//	iPhoneKeyboard.autorotateToPortraitUpsideDown = false; 
		//	iPhoneKeyboard.autorotateToLandscapeRight = false; 
		//	iPhoneKeyboard.autorotateToLandscapeLeft = false;	
	}


	void LoadMenu() {
//				loadingScript.loadOn=true;

		PlayerPrefs.SetInt("Quit", 1);
//				yield WaitForSeconds(0.2);
		Application.LoadLevel(0);	
	}


	void FixedUpdate() {
		float x = 0;
		float y = 0;
		float z = 0;
		if (goalHeight != transform.position.y) {
			diff = Mathf.Clamp(Mathf.Abs(goalHeight - transform.position.y), 1, 8);
			y = transform.position.y + (((goalHeight - transform.position.y) * 0.1f) * Time.deltaTime * 40 * diff);
		}

		if (mode == Mode.Stop) {
			z = Mathf.Lerp(transform.position.z, goalZ, Time.deltaTime * lerpSpeed);
		} else {
			z = target.position.z;
			x = Mathf.Lerp(transform.position.x, target.position.x, Time.deltaTime * camXLerpSpeed);
		}

		transform.position = new Vector3(x, y, z);
		
		lv = transform.position - lp;
		lp = transform.position;		
	}


	void Update() {
		if (mode != Mode.Stop) {
			cam.fieldOfView = Mathf.Lerp(cam.fieldOfView, 34 + (ship.targetSpeed * 0.08f) + (1.2f * diff), Time.deltaTime * 2f);
		} else {
			cam.fieldOfView = Mathf.Lerp(cam.fieldOfView, 35, Time.deltaTime * 1.2f);
		}

		if (mode == Mode.Win) {
			cam.transform.localPosition = new Vector3(cam.transform.localPosition.x, 4.3f, -7);

			// rotate cam based on tilt
			goalRY = Mathf.Clamp(goalRY - (ship.xf * Time.deltaTime * 3), -1, 1);//Mathf.Lerp(goalRY,Mathf.Clamp(-ship.xf,-1,1),Time.deltaTime*3);	
			transform.localEulerAngles = new Vector3(transform.localEulerAngles.x, 40 * Mathf.Sin(goalRY));

		}

		if (mode == Mode.Play) {
			// drop cams for going in tunnels
			if (ship.state.tunnel) {
				yPos = 4.4f;
				zPos = -13;
				xAngle = 7;
				yLerp = 4;
				zLerp = 3;
				xLerp = zLerp;
			} else if (ship.state.tunnel2) {
					yPos = 3;
					zPos = -13;
					xAngle = 3;
					yLerp = 4;
					zLerp = 3;
					xLerp = zLerp;
				} else {
					yPos = 6; //+(0.1*(cam.fieldOfView-35));
					zPos = -14;
					xAngle = 10;
					yLerp = 1;
					zLerp = 1;
					xLerp = zLerp;
				}

			camXLerpSpeed = Mathf.Lerp(camXLerpSpeed, defaultLerpSpeed * 2, Time.deltaTime); // lerping lerps?

			cam.transform.localPosition = new Vector3(0f, Mathf.Lerp(cam.transform.localPosition.y, yPos, Time.deltaTime * yLerp), Mathf.Lerp(cam.transform.localPosition.z, zPos, Time.deltaTime * zLerp));

			// what is the cam x rot for?
//			cam.transform.localEulerAngles.x=Mathf.Lerp(cam.transform.localEulerAngles.x, xAngle, Time.deltaTime*xLerp); 

		}	
	}


	void LateUpdate() {	
		if (mode == Mode.Title) {
			if (gameMaster.device == GameMaster.DeviceType.iPhone) {	
				foreach (Touch touch in Input.touches) {
					if (touch.phase == TouchPhase.Began) {
						ship.reset(3);
					}
				}
			} else { // computer CTRLs
				if ((Input.GetMouseButtonDown(0)) || (Input.GetButtonDown("Fire1"))) {
					ship.reset(3);
				}
			}
		}

		if (mode == Mode.Win) {
			cam.transform.LookAt(new Vector3(lookTarget.position.x, 3, lookTarget.position.z) + new Vector3(-goalRY, 0.9f, 0));
		}
	}


	public void switchTo(Mode which) {
				
		switch (which) {
			case Mode.Play:
					
				anim.Stop();
				if (titleObj) {
					Destroy(titleObj.gameObject);
					Destroy(titleArtifactObj.gameObject);
				}
				lerpSpeed = defaultLerpSpeed;
				cam.transform.localPosition = new Vector3(0, 8, -13.5f);
				cam.transform.localRotation = Quaternion.Euler(15, 0, 0);
//						float sp = gameMaster.startPos.y + 5f;
				float sp = 5f;
				transform.position = new Vector3(Mathf.Clamp(target.GetComponent<Rigidbody>().position.x, -10, 10), sp, 0);
				goalHeight = sp;
				transform.localEulerAngles = Vector3.zero;
				break;
	
			case Mode.Win:
							
				goalRY = 0.0f;
				cam.transform.localPosition = new Vector3(0, 4.8f, -5);
				cam.transform.localRotation = Quaternion.Euler(20, 0, 0);
				// adjust the alt of the ship to center for victory cruise
//				ship.anim.transform.localPosition.y =VCshipAdj[gameMaster.shipNum];
				lerpSpeed = 2.0f;
				transform.position = new Vector3(target.GetComponent<Rigidbody>().position.x - 12, 10, 0);
				transform.localEulerAngles = new Vector3(transform.localEulerAngles.x, Random.Range(-35, 35), transform.localEulerAngles.z);
				break;

			case Mode.Title:

//				if (ship.sfx) {
//						GetComponent<AudioSource>().clip  = (Resources.Load(titleAudioName[gameMaster.worldNum]));
//						GetComponent<AudioSource>().Play();	
//				}
				anim.Play("cameraTitle");
				transform.localEulerAngles = Vector3.zero;
				cam.transform.localRotation = Quaternion.Euler(15, 0, 0);
				cam.fieldOfView = 35;
				titleObj = Instantiate(titlePF, new Vector3(0, 0, 0), Quaternion.identity) as Transform;
		//			titleArtifactObj= Instantiate(titleArtifactPFs[gameMaster.worldNum], Vector3(0, 0, 0), Quaternion.identity) as Transform;
				titleObj.parent = cam.transform;
				titleObj.localPosition = Vector3.zero;
		//			var titleScript: TitleScript = titleObj.GetComponent(TitleScript);
		//			titleScript.updateTitle(gameMaster.worldNum);
				break;

		}
		mode = which;
	}

}
