using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MoveCam : MonoBehaviour
{

	public MoveShip ship;
	public GameMaster gm;

	Transform target;
	public float defaultCamXRot = 10;
	public float goalHeight = 0;
	public float Ysensitivity = 4;
	float defaultLerpSpeed = 6;
	float lerpSpeed;
	public Camera cam;
	public Animation anim;

	public enum Mode
	{
		PreStart,
		Play,
		Crash,
		Fall,
		Win,
		Cruise,
		Title}
	;

	public Mode mode = Mode.PreStart;

	public Transform lookTarget;
	public float goalZ = 0;
	float goalRY = 0;
	float goalZoom = 35;
	float zoomLerp = 2;

	public Transform titlePF;
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

	public bool go = false;

	int level;
	float t;
	public bool newRecordCheck = false;
	float camXLerpSpeed;

	public Vector3 lp;
	public Vector3 lv;

	float diff = 0;

	void Start ()
	{
		lerpSpeed = defaultLerpSpeed;
		target = ship.transform;
		//	iPhoneKeyboard.autorotateToPortrait = false; 
		//	iPhoneKeyboard.autorotateToPortraitUpsideDown = false; 
		//	iPhoneKeyboard.autorotateToLandscapeRight = false; 
		//	iPhoneKeyboard.autorotateToLandscapeLeft = false;	
	}


	void FixedUpdate ()
	{
		float x = 0;
		float y = goalHeight;
		float z = 0;

		if (goalHeight != transform.position.y) {
			diff = Mathf.Clamp (Mathf.Abs (goalHeight - transform.position.y), 1, 8);
			y = transform.position.y + (((goalHeight - transform.position.y) * 0.1f) * Time.deltaTime * 40 * diff);
		}

		if (mode == Mode.Crash || mode == Mode.Fall || mode == Mode.Win) {
			z = Mathf.Lerp (transform.position.z, goalZ, Time.deltaTime * lerpSpeed);
			x = transform.position.x;
		} else {
			z = target.position.z;
			x = Mathf.Lerp (transform.position.x, target.position.x, Time.deltaTime * camXLerpSpeed);
		}

		transform.position = new Vector3 (x, y, z);
		
		lv = transform.position - lp;
		lp = transform.position;		
	}



	void LateUpdate ()
	{	

		cam.fieldOfView = Mathf.Lerp (cam.fieldOfView, goalZoom, Time.deltaTime * zoomLerp);

		if (mode == Mode.Title) {
			if (gm.device == GameMaster.DeviceType.iPhone) {	
				foreach (Touch touch in Input.touches) {
					if (touch.phase == TouchPhase.Began) {
						ship.reset (3);
					}
				}
			} else { // computer CTRLs
				if ((Input.GetMouseButtonDown (0)) || (Input.GetButtonDown ("Fire1"))) {
					ship.reset (3);
				}
			}
		} else if (mode == Mode.Cruise) {
			// rotate cam based on tilt
			goalRY = Mathf.Clamp (goalRY - (ship.xf * Time.deltaTime * 3), -1, 1);	
			transform.localEulerAngles = new Vector3 (transform.localEulerAngles.x, 40 * Mathf.Sin (goalRY));
			// and look at ship as it comes in
			cam.transform.LookAt (new Vector3 (lookTarget.position.x, 3, lookTarget.position.z) + new Vector3 (-goalRY, 0.9f, 0));

		} else if (mode == Mode.Play) {
			goalZoom = 34 + (ship.targetSpeed * 0.08f) + (1.2f * diff);
			camXLerpSpeed = Mathf.Lerp (camXLerpSpeed, defaultLerpSpeed * 2, Time.deltaTime); // lerping lerps?
			cam.transform.localPosition = new Vector3 (0f, Mathf.Lerp (cam.transform.localPosition.y, yPos, Time.deltaTime * yLerp), Mathf.Lerp (cam.transform.localPosition.z, zPos, Time.deltaTime * zLerp));

			// what is the cam x rot for?
			//			cam.transform.localEulerAngles.x=Mathf.Lerp(cam.transform.localEulerAngles.x, xAngle, Time.deltaTime*xLerp); 

		} else if (mode == Mode.PreStart) {
			
			cam.transform.localPosition = new Vector3 (0f, Mathf.Lerp (cam.transform.localPosition.y, yPos, Time.deltaTime * lerpSpeed), Mathf.Lerp (cam.transform.localPosition.z, zPos, Time.deltaTime * lerpSpeed));
		}
	}

	public void tunnelSwitch (int which) // switch to loc seeking, easier lerping
	{
		if (which == 1) {
			yPos = 4.4f;
			zPos = -13;
			xAngle = 7;
			yLerp = 4;
			zLerp = 3;
			xLerp = zLerp;
		} else if (which == 2) {
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
	}


	public void switchTo (Mode which)
	{
		switch (which) {
		case Mode.PreStart:
			zoomLerp = 1.2f;
			cam.fieldOfView = 40;
			anim.Stop ();
			if (titleObj) {
				Destroy (titleObj.gameObject);
				Destroy (titleArtifactObj.gameObject);
			}
			goalZoom = 35;
			lerpSpeed = 1;
			cam.transform.localPosition = new Vector3 (0, 7, -24f);
			cam.transform.localRotation = Quaternion.Euler (defaultCamXRot, 0, 0);
			float sy = gm.startPos.y;

			transform.position = new Vector3 (Mathf.Clamp (ship.transform.position.x, -10, 10), sy, 0);
			goalHeight = sy;
			tunnelSwitch (0);
			transform.localEulerAngles = Vector3.zero;
			break;

		case Mode.Play:
			zoomLerp = 2;
			lerpSpeed = defaultLerpSpeed;
			break;
	
		case Mode.Cruise:
							
			goalRY = 0.0f;
			goalZoom = 35;
			cam.transform.localPosition = new Vector3 (0, 4.3f, -7);
			cam.transform.localRotation = Quaternion.Euler (20, 0, 0);
				// adjust the alt of the ship to center for victory cruise. Is this necessary?
			ship.anim.transform.localPosition = new Vector3 (0, VCshipAdj [gm.shipNum], 0);
			lerpSpeed = 2.0f;
			transform.position = new Vector3 (target.GetComponent<Rigidbody> ().position.x - 12, 10, 0);
			transform.localEulerAngles = new Vector3 (transform.localEulerAngles.x, Random.Range (-35, 35), transform.localEulerAngles.z);
			break;

		case Mode.Title: // move title arti creation, sound biz title and all to gameMaster, then gm not necessary?

			if (ship.sfx) {
				GetComponent<AudioSource> ().clip = (Resources.Load<AudioClip> (titleAudioName [gm.worldNum]));
				GetComponent<AudioSource> ().Play ();	
			}
			anim.Play ("cameraTitle");
			transform.localEulerAngles = Vector3.zero;
			cam.transform.localRotation = Quaternion.Euler (defaultCamXRot, 0, 0);
			goalZoom = 35;
			titleObj = Instantiate (titlePF, Vector3.zero, Quaternion.identity) as Transform;
			titleArtifactObj = Instantiate (titleArtifactPFs [gm.worldNum], Vector3.zero, Quaternion.identity) as Transform;
			titleObj.parent = cam.transform;
			titleObj.localPosition = Vector3.zero;
				//	TitleScript titleScript = titleObj.GetComponent<TitleScript<();
//				titleScript.updateTitle(gm.worldNum);
			break;

		case Mode.Crash:
			goalZoom = 35;
			zoomLerp = 1.2f;
			break;
		case Mode.Fall:
			goalZoom = 35;
			zoomLerp = 1.2f;
			break;
		case Mode.Win:
			goalZoom = 35;
			zoomLerp = 1.2f;
			break;

		}

		mode = which;
	}

}
