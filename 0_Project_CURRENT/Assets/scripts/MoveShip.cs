﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MoveShip : MonoBehaviour
{
	public float accelerometerSensitivity = 2.0f;

	Transform sub;
	Transform animSub;
	Animation anim;
	Animation anim2;
	public Projector shad;
	Rigidbody rb;
	float rbx;
	float rby;
	float rbz;

	MoveCam cam;
	Transform camTrans;
	//	GUIScript gui;
	GUInew guinew;
	GameMaster gm;

	public GameObject engineAudio;
	public float[] shipMatOffset;
	public float[] shipMatScale;

	public Texture2D[] shipWarpRefl;
	int f = 1;

	GameObject topSurface;
	GameObject sideSurface;
	GameObject frontSurface;

	float brakeValue = 0;
	public Material speedbarMat;
	float jumpValue = 0;
	float jumpValueTar = 0;
	public Material jumpBarMat;
	GameObject progBar;
	Camera guiCam;

	float ultraMaxZSpeed;
	float defPantherMaxZ = 90;

	public Material shipBoosterMat;
	public Material shipMat;

	// side sparks ??
	GameObject splodeInst;
	public GameObject sparkDownPF;
	public Material engineSparkMat;

	public float Zspeed;
	float Xspeed = 0;
	float maxXspeed = 28;
	float maxZSpeed = 70;
	float minZSpeed = 40;
	public float minZBrake = 40;
	bool brakeOverride = false;
	public float grav = 75;
	float defGrav;

	public float jumpforce = 19;
	float jumpMult = 1.0f;
	private float pantherSlowInAirSpeed = 35;
	private float pantherSlowInAirLimit = 62;
	private float pantherSJumpPenalty = 6;
	private float pantherDJumpPenalty = -8;
	private float pantherSJumpMult = 1.08f;
	private float pantherDJumpMult = 1.18f;

	bool dynJumpForce;
	float defaultHandling = 10;
	float airHandling = 6;
	float accelTouchMax = 220;
	float accelTouchMin = 80;
	public float targetSpeed;
	public GameObject airSparksPF;
	public Material airSparksMat;

	//	public GameObject airBurst;
	public Explosion splode;
	public JumpBurst jumpBurst;
	public ArtBurst artBurst;
	//	public Material airBurstMat;
	public GameObject[] elecBurst;
	public GameObject warpPath;
	public GameObject warpPathAniObj;
	public CardAnim[] elecBurstScript;
	int artCount;
	int artCountSaved;

	public Transform warpTubePF;
	//var warpPathPF: GameObject;
	public GameObject pTracksPF;
	public Transform cruiseLightsPF;
	public GameObject camFlare;
	public int level;
	public int levelAttempts = 1;
	Transform warpTubeObj;

	float blackerPause;

	public int shipNum;
	bool brakes = true;
	private float gateDist = 5.5f;
	public Material explosionMaterial;
	public Material explosionParticleMat;

	public Color boosterColor;
	public float winDist = 10;
	bool paused = false;
	private float xfLim = 0;
	private float xfRaw = 0;
	private float zBoost = 0;
	private float zBoostGoal = 0;

	float collLeft = 0.0f;
	float collRight = 0.0f;
	float sideJumpTolerance = 0.25f;

	//var highestY: float = 0.0;
	float actualY = 0.0f;

	public float xf;
	bool qf;
	bool qbClear = true;
	public float xf2;
	public bool yf;
	private int yfPhase = 0;
	Quaternion goalQ;
	float xRot;
	float xRotSpeed = 10;
	float yv2 = 0;

	int pTen = -1;
	int pDigit = -1;

	float curTime = 0;
	public bool sfx = false;

	int rc;
	int rcb;
	float deltaY;
	string rcs;

	GameObject musicSource;
	public Music musicSourceScript;
	int cc = 0;
	public bool fakeCC = false;


	public bool restarted = false;

	public enum State
	{
		PreStart,
		Normal,
		Crashing,
		Cruising,
		Winning,
		Title,
		Stunned,
		FullStop,
		Paused,
		Prev
	}

	public State state = State.PreStart;
	State prevState = State.PreStart;

	public class ShipStats
	{
		//		public bool started = false;
		//var startedTime: float;
		public float elapsedTime = 0;
		//		public bool crashing = false;
		//		public bool cruising = false;
		//		public bool winning = false;
		public bool stopped = false;
		//		public bool fullStop = false;
		//var stoppedTime: float = 0;
		//		public bool stunned = false;
		public float handling = 10;
		public Vector3 lv;
		//		public bool title = false;
		public float progress;
		public int jumps = 0;
		public bool jbClear = true;
		public bool jumpStore = false;
		// for storing a jump button press while close enough to a platform, but not technically on
		//		public bool paused = false;
		public float lastY = -50f;
		public float jumpTimer = 0.0f;
		public int xDisabled = 0;
		public bool fJumping = false;
		//var boostTimer: float = -1.0;
		public bool landing = false;
		// for adjusting panther ship xRot immediately after landing
		public bool landed = false;
		// keeps multiple landings beings detected on consecutive collisionStays when jumps gets reset to 0 cos youre still falling
		public bool grounded = false;
		// ultimate "are you on solid ground?" state check
		
	}

	public ShipStats stats = new ShipStats ();

	public class SoundClips
	{
		public AudioClip metalHit;
		public AudioClip[] jump;
		public AudioClip[] explosion;
		public AudioClip winGate;
		public AudioClip[] VCsound;
		public AudioClip artSound;
		public AudioClip[] engineSound;
	}

	public SoundClips sound = new SoundClips ();



	void Awake ()
	{
		gm = GameMaster.instance;
		if (gm == null)
			Debug.Log ("You need a GameMaster.");
		rb = GetComponent<Rigidbody> ();
		guinew = gm.guinew;
//		gui = gm.gui;
		cam = gm.cam;
	}

	void Start ()
	{
		System.GC.Collect ();

		int ppsfx = PlayerPrefs.GetInt ("Sfx", 1);
		if (ppsfx == 1)
			sfx = true;
		else
			sfx = false;


		sub = transform.GetChild (0);
		animSub = sub.GetChild (0);
		anim2 = sub.GetComponent<Animation> ();
		anim = animSub.GetComponent<Animation> ();

//		guiCam = GameObject.Find ("GUICameraL1").GetComponent<Camera> ();
		musicSource = GameObject.Find ("MusicSource(Clone)");
		musicSourceScript = musicSource.GetComponent<Music> ();
		if (!sfx)
			engineAudio.SetActive (false);
		defGrav = grav;
		InitShip ();
		blackerPause = guinew.blackerPause;
		Reset (2);

		camTrans = cam.transform;

	}

	public void SwitchState (State to)
	{
		if (to == State.Prev && prevState != State.Prev) {
			SwitchState (prevState);
			return;
		}

		prevState = state;

		switch (to) {
		case State.Paused:
			if (sfx && engineAudio.activeSelf)
				engineAudio.GetComponent<AudioSource> ().Stop ();
			break;

		case State.Normal:
			if (sfx && engineAudio.active)
				engineAudio.GetComponent<AudioSource> ().Play ();
			break;

		case State.Stunned:
			rb.position += Vector3.back;
			rb.velocity = new Vector3 (rb.velocity.x, rb.velocity.y, -30);
			targetSpeed = 0;
			StartCoroutine (Stun ());
			break;

		}

		state = to;
	}


	void InitShip ()
	{	
		Transform parentToObj = transform.GetChild (0).GetChild (0);
		
		shipNum = gm.shipNum;
		
		if (sfx && engineAudio.activeSelf) {
//			if (shipNum!=10) 
//				engineAudio.GetComponent<AudioSource>().clip = sound.engineSound[0];
//			else 
//				engineAudio.GetComponent<AudioSource>().clip = sound.engineSound[1];
		}

		GameObject shipObj = Instantiate (Resources.Load<GameObject> ("ship" + shipNum), Vector3.zero, Quaternion.identity) as GameObject;
		shipObj.transform.parent = parentToObj;
		shipObj.transform.localPosition = Vector3.zero;

		if (shipNum != 10) { 
			ultraMaxZSpeed = maxZSpeed;
			Transform ccs = transform.Find ("collCheckL");
			ccs.gameObject.SetActive (false);
			ccs = transform.Find ("collCheckR");
			ccs.gameObject.SetActive (false);
		} else { // special panther stuff	
			shipObj.transform.localPosition = new Vector3 (0, -0.5f, -0.1f);
			maxZSpeed = defPantherMaxZ;

			ultraMaxZSpeed = maxZSpeed;
			anim = shipObj.GetComponent<Animation> ();
			anim ["jump"].layer = 1;
			anim ["lJump"].layer = 1;
			anim ["rJump"].layer = 1;
			anim ["fJump"].layer = 1;
			anim ["boost"].layer = 1;
			anim ["doubleJump"].layer = 1;

		}

		Color baseColor = new Vector4 (PlayerPrefs.GetFloat ("BaseColor_R", 0.5f), PlayerPrefs.GetFloat ("BaseColor_G", 0.5f), PlayerPrefs.GetFloat ("BaseColor_B", 0.5f), 1);
		Color patColor = new Vector4 (PlayerPrefs.GetFloat ("PatColor_R", 0.5f), PlayerPrefs.GetFloat ("PatColor_G", 0), PlayerPrefs.GetFloat ("PatColor_B", 0), 1);
		boosterColor = new Vector4 (PlayerPrefs.GetFloat ("BoostColor_R", 0f), PlayerPrefs.GetFloat ("BoostColor_G", 0.5f), PlayerPrefs.GetFloat ("BoostColor_B", 1f), 1);

		shipMat.SetColor ("_BaseColor", baseColor * 0.5f);
		shipMat.SetColor ("_PatColor", patColor * 0.6f);
		shipMat.SetTexture ("_MultTex", Resources.Load<Texture> ("ship/ship" + shipNum));
		shipMat.SetTexture ("_DecalTex", Resources.Load<Texture> ("patterns/" + PlayerPrefs.GetInt ("texture", 6)));
		shipMat.SetTextureOffset ("_DecalTex", new Vector2 ((1 / (-1 * -0.96f)) * (PlayerPrefs.GetFloat ("offset", 0) + 0.48f), 0));
		shipMat.SetTexture ("_Shad", Resources.Load<Texture> ("ship/world" + gm.worldNum + " Refl"));
		
		shipMat.SetTextureOffset ("_Shad", new Vector2 (0, shipMatOffset [shipNum]));
		shipMat.SetTextureScale ("_Shad", new Vector2 (1, shipMatScale [shipNum]));	

		// set boosters
		shipBoosterMat.SetColor ("_Tint", boosterColor);

		// set engine lights
		Light[] ls = shipObj.GetComponentsInChildren<Light> ();
		foreach (Light l in ls) {
			l.color = boosterColor;
		}
	
		// set splode and airburst colors based on booster Color
		splode.InitColor (boosterColor);
		jumpBurst.InitColor (boosterColor);
		//	explosionParticleMat.SetColor ("_TintColor", new Vector4 (((1 - boosterColor.r) / 4 + boosterColor.r), ((1 - boosterColor.g) / 4 + boosterColor.g), ((1 - boosterColor.b) / 4 + boosterColor.b), 1));

	}


	IEnumerator adjustYV2 () // this is for panther
	{ 
		float timer = 0.08f;
		float startY = stats.lv.y;
		stats.landing = true;
		while (timer > 0 && stats.landing) {
			timer -= Time.deltaTime;
			yv2 = startY * timer * 10;
			yield return null;
		}
		stats.landing = false;
		sub.localPosition = new Vector3 (sub.localPosition.x, sub.localPosition.y, 0);
	}




	void FixedUpdate ()
	{

		CtrlGUIUpdate ();
		rbx = rb.velocity.x;
		rby = rb.velocity.y;
		rbz = rb.velocity.z;

		if (state != State.Crashing && state != State.Winning) {
			if (gm.device == GameMaster.DeviceType.iPhone) {
				// inputs (merged from OldFixedUpdate)
				if (state != State.PreStart) {
					//acceleration.x now used for side tilts in both landscape or portrait.
					//used to be -accerlation.y for side tilting when in landscape, and x when in portrait
					xf = Input.acceleration.x * accelerometerSensitivity; 
					brakes = false;
					yf = false;
				} else if (state != State.Paused) {
					for (int i = 0; i < Input.touchCount; ++i) {
						if (Input.GetTouch (i).position.x > Screen.width - (Screen.width / 4)) {
							if (Input.GetTouch (i).phase == TouchPhase.Began || Input.GetTouch (i).phase != TouchPhase.Ended) {
								yf = true;
								if (state == State.Title) { 
									guinew.Reset (3);
								} else if (state == State.Cruising) {
									guinew.ResetHardVC ();
								}
							} else
								yf = false;
							//if (jumpTouches == 0) yf = false;
						} else if (Input.GetTouch (i).position.x < Screen.width / 4) {
							if (Input.GetTouch (i).phase != TouchPhase.Ended) {
								brakes = true;
							} else
								brakes = false;
						}

					}
				}

			} else { // computer ctrls
				//inputs (new)
				yf = Input.GetButton ("Fire1");
				if (state != State.PreStart) {
					xf = Input.GetAxis ("Horizontal");
					xfRaw = Input.GetAxisRaw ("Horizontal");
				}
				if (state != State.Cruising) {
					qf = Input.GetButton ("jumpAhead");
					if (Input.GetAxisRaw ("Vertical") > 0 || brakeOverride)
						brakes = false;
					else
						brakes = true;
				} 
				if (state == State.Title) {
					if (yf || (Input.GetMouseButtonDown (0))) {
						guinew.Reset (3);
					}
				} else if (state == State.Cruising) {
					if (yf)
						guinew.ResetHardVC ();
				}
			}
			if (brakeOverride)
				brakes = false;
		}

		//inputs (new)
		if (!yf) {
			stats.jbClear = true;
		}
		if (!qf) {
			qbClear = true;
		}
		if (qf && qbClear && state != State.Cruising)
			ResetRepoShip ();


		// velocity z
		if (state == State.Normal) {
			if (!brakes)
				targetSpeed += ((maxZSpeed - targetSpeed + 20) / 2) * Time.deltaTime * 2;
			else
				targetSpeed -= ((targetSpeed + 50) / 4) * Time.deltaTime * 4;
			targetSpeed = Mathf.Clamp (targetSpeed, minZSpeed, maxZSpeed);

			stats.progress = transform.position.z;
			stats.jumpTimer -= Time.deltaTime;

			rbz = targetSpeed;
		} else { // for stopping
			rbz = Mathf.Lerp (rb.velocity.z, 0.0f, Time.deltaTime * 6);
		} 


		// start the motion of the ship and the clock when brakes released
		if (state == State.PreStart && stats.grounded) {
			
			if (!brakes) {
				xf = 0;
				state = State.Normal;
				cam.switchTo (MoveCam.Mode.Play);
				StartCoroutine (SpeedUpX ());
				StartCoroutine (SpeedUpZ ());
				if (sfx && engineAudio.activeSelf)
					engineAudio.GetComponent<AudioSource> ().Play ();
			}
		}

		if (state == State.Normal) { // update stats and GUI, check win
			stats.elapsedTime += Time.deltaTime / gm.gameSpeed;

			guinew.UpdatePlayGUI (stats.elapsedTime, rbz, Mathf.Clamp01 (stats.progress / winDist));

			if ((transform.position.z > winDist - 0.5f) && (winDist > 0))
				checkGates ();
		} else if (state == State.Crashing) {
			guinew.UpdatePlayGUI (stats.elapsedTime, rbz, Mathf.Clamp01 (stats.progress / winDist));
		}

		// gravity 
		if (state == State.Normal || state == State.PreStart)
			rby -= (grav * Time.deltaTime);

		// hop limiting? What is this?
		//		actualY = rby;
		//		if (state.jumpTimer < 0 && rby > jumpforce)
		//			rby = jumpforce;
		//		if (state.jumpTimer < -0.5f && rby > 1)
		//			rby = 1;


		// set side to side vel
		if (state == State.Normal)
			rbx = Mathf.Lerp (rbx, xf * Xspeed, Time.deltaTime * stats.handling);

		// for tilting
		xf2 = Mathf.Lerp (xf2, (xf * -20) - rbx, Time.deltaTime * 10);


		// spacecraft tilt
		float yPos = Mathf.Abs (rbx * 0.01f) + 0.4f;
		float yRot = -xf2 * 0.5f;
		float zRot = xf2;


		// spacecraft pitch up down on jumps and fall 
		if (stats.jumps > 0) {
			xRot = Mathf.Lerp (xRot, -5 + (-1.8f * rby), Time.deltaTime * xRotSpeed);
		} else {
			if (rby < -10) { // free fall over the edge / take away a jump 

				xRot = 0;
				xRotSpeed = 4;
				stats.jumps = 1;
				stats.grounded = false;
			}
		}


		// engine sound
		if (sfx && state == State.Normal) {
			engineAudio.GetComponent<AudioSource> ().pitch = (targetSpeed / ultraMaxZSpeed + 0.2f) * 1.4f;
			engineAudio.GetComponent<AudioSource> ().volume = 1 - (Mathf.Abs (((targetSpeed / ultraMaxZSpeed) * 2) - 1.1f));
		}


		// jumps
		if (yf && stats.jbClear && (state == State.Normal || state == State.PreStart)) {
			if (stats.jumps == 1) { // double jump
				if (rc == 0) {
					Jump (2);
					stats.jumps = 2;
				} else {
					Jump (2);
					stats.jumps = 1;
				}
			} else if (stats.jumps == 0) { // jump
				Jump (1);
				stats.jumps = 1;
			}
		}

		// store some vars from this update cycle for use in the next
		if (stats.grounded && deltaY > 0.01f && deltaY < 0.3f) {
			rby = Mathf.Clamp (rby, -20.0f, 0.0f);
		}

		if (stats.landed) {
			stats.jumps = 0;
			stats.landed = false;
			jumpValueTar = 0;
		}

		// assign forces and store
		rb.velocity = new Vector3 (rbx, rby, rbz);
		stats.lv = rb.velocity;
		deltaY = Mathf.Abs (stats.lastY - rb.position.y);
		stats.lastY = rb.position.y;

		// rotate and place the sub
		sub.eulerAngles = new Vector3 (xRot, yRot, zRot);
		sub.localPosition = new Vector3 (0, yPos, 0);


		// fall off the bottom death
		if (rb.position.y < -20f && state != State.Crashing)
			Crash (1);
		

		// cam goal height adjustment
		if (state == State.Crashing && !restarted) {
			if (splode.transform.position.y < cam.transform.position.y)
				cam.goalHeight = splode.transform.position.y;	
		} else if (state == State.Winning) {
			cam.goalHeight = warpPath.transform.position.y;	
		} else if (state == State.Normal) {
			// cam goals
			if (cam.goalHeight < transform.position.y - cam.Ysensitivity)
				cam.goalHeight += 1.0f;
			else if (cam.goalHeight > transform.position.y)
				cam.goalHeight = transform.position.y;	
		}

		// pausing
		if (state != State.Paused) {
			if (gm.device == GameMaster.DeviceType.iPhone) {	
				foreach (Touch touch in Input.touches) {  
					if (touch.position.x > Screen.width / 4 && touch.position.x < Screen.width - (Screen.width / 4)) {   
						if (Mathf.Abs (touch.deltaPosition.y) > 10) {
							if (state == State.Normal) { 
								gm.Pause ();
							}
						}
					}
				}
			} else {
				if (Input.GetButton ("pause"))
					gm.Pause ();
			}
		}
	}





	IEnumerator VCfly ()
	{
		float timer = 1.0f;
		float oldZ = 0;
		float goalZtemp = 0;

		while (state == State.Cruising) {
			if (shipNum == 10)
				anim.Play ("fly");
			timer -= Time.deltaTime;
			if (timer < 0) {
				oldZ = goalZtemp;
				do {
					goalZtemp = oldZ + Random.Range (-8.0f, 8.0f);
				} while (goalZtemp < -12 || goalZtemp > 12);
				timer = Random.Range (1.0f, 3.5f) * (Mathf.Abs (oldZ - goalZtemp) / 8);
				//print("diff: "+Mathf.Abs(oldZ-goalZtemp)+" +time: "+timer);
			}
			rb.rotation = Quaternion.Slerp (rb.rotation, Quaternion.Euler (0, 0, goalZtemp), Time.deltaTime * 2);
			rb.position = new Vector3 (rb.position.x, Random.Range (2.995f, 3.005f), rb.position.z);

			yield return null;		
		}
	}


	void CtrlGUIUpdate ()
	{

		if (!stats.stopped)
			brakeValue = -0.5f * (stats.lv.z / ultraMaxZSpeed);
		else
			brakeValue = 0;

		speedbarMat.mainTextureOffset = new Vector2 (speedbarMat.mainTextureOffset.x, Mathf.Lerp (speedbarMat.mainTextureOffset.y, brakeValue, Time.deltaTime * 15));
		jumpValueTar = stats.jumps * 0.25f;


		if (jumpValue != jumpValueTar) {
			if (jumpValue < jumpValueTar) {
				jumpValue += Time.deltaTime * 1.1f;	
			} else { 
				jumpValue -= Time.deltaTime * 2;
			}
			if (jumpValueTar == 0)
				jumpValue = Mathf.Clamp (jumpValue, 0, 0.2f);
			else if (jumpValueTar == 0.25f)
				jumpValue = Mathf.Clamp (jumpValue, 0, 0.25f);
			else if (jumpValueTar == 0.5f)
				jumpValue = Mathf.Clamp (jumpValue, 0.3f, 0.5f);
		}
		//print(jumpValue);
		jumpBarMat.mainTextureOffset = new Vector2 (jumpBarMat.mainTextureOffset.x, jumpValue);	

	}


	void Jump (int which)
	{
		stats.jbClear = false;
		stats.grounded = false;
		stats.landing = false;
		stats.handling = airHandling;

		rb.position += new Vector3 (0f, 0.25f, 0f);

		jumpMult = 1.1f;
		rby = jumpforce * jumpMult;

		guinew.UpdateJump (which);
		jumpBurst.MakeJump (transform.position, stats.lv);

		stats.jumpTimer = 0.06f;
	}



	//
	//	void jumpOld(int which) { // 1: single  2: doubleJump  3: left wall jump  4: right wall jump  5: panther boost 6: front wall jump
	//
	//		state.jbClear = false;
	//		state.grounded = false;
	//		state.landing = false;
	//		state.handling = airHandling;
	//
	////		float rby = 0;
	////		float rbx = rb.velocity.x;
	//
	//		rb.position += new Vector3(0f, 0.4f, 0f);
	//		xRot = 0;
	//		xRotSpeed = 25;
	//		if (which == 1) {
	//			playSound("jump");
	//			if (gm.worldNum == 1)
	//				level10off();		
	//		} else {
	//			playSound("jump2");
	//		}
	//
	//		if (shipNum == 10) {
	//			if (which == 1) { 
	//				// for inclines
	//				if (actualY > 0) {
	//					jumpMult = pantherSJumpMult + (actualY * 0.05f);
	//					print("incline Jump! +" + (actualY * 0.05f));
	//				} else {
	//					jumpMult = pantherSJumpMult; 
	//				}
	//				rby = jumpforce * jumpMult; 
	//				maxZSpeed -= pantherSJumpPenalty;
	//				anim.Stop("jump");
	//				anim.Play("jump"); 	
	//				state.jumps = 1; 
	//			} else if (which == 2) {
	//					anim.Stop("doubleJump"); 
	//					anim.Play("doubleJump"); 
	//					jumpMult = pantherDJumpMult; 
	//					maxZSpeed -= pantherDJumpPenalty; 
	//					rby = jumpforce * pantherDJumpMult; 
	//					state.jumps = 2;
	//				} else if (which == 4) {
	//						maxZSpeed = defPantherMaxZ;
	//						jumpMult = 1.3f;
	//						rby = jumpforce * jumpMult;
	//						anim.Play("rJump");
	//						collRight = 0;
	//						disableX(-1);
	//						rb.position += Vector3.left;
	//						rbx = -25 + (8 * xfRaw);
	//						//print(-25+(8*xfRaw));
	//						xf2 = 40;
	//						//xf=0;
	//						state.jumps = 1;
	//					} else if (which == 3) {
	//
	//							maxZSpeed = defPantherMaxZ;
	//							jumpMult = 1.3f;
	//							rby = jumpforce * jumpMult;
	//							anim.Play("lJump");
	//							collLeft = 0;
	//							disableX(1);
	//							rb.position += Vector3.left;
	//							rbx = 25 + (8 * xfRaw);
	//							//print(25+(8*xfRaw));
	//							xf2 = -40;
	//							//xf=0;
	//							state.jumps = 1;
	//						} 
	//			/*
	//		else if (which==5) {
	//			jumpMult=1.0;
	//			//anim.Play("boost"); 
	//			anim.CrossFade("boost", 0.1); 
	//			//speedUpX();
	//			rigidbody.velocity.y=jumpforce*0.25;
	//			maxZSpeed=defPantherMaxZ+boostZ;
	//			state.jumps=2;
	//		}*/
	//			else if (which == 6) {
	//								state.fJumping = true;
	//								jumpMult = 2.0f;
	//								anim.Stop("fJump"); 
	//								anim.Play("fJump");
	//								rby = jumpforce * jumpMult; 
	//								state.jumps = 1;
	//								//rigidbody.position.z-=1.0;
	//								//rigidbody.velocity.z=-30;
	//								// bounceBack();
	//                              SwitchState(State.Stunned);
	//							}
	//		} else { // for normaL ships
	//			// for inclines
	//			if (actualY > 0 && state.grounded) {
	//				jumpMult = 1.04f + (actualY * 0.07f);
	//				print("incline Jump! +" + (actualY * 0.07f));
	//			} else
	//				jumpMult = 1.04f; 
	//			rby = jumpforce * jumpMult;
	//		}
	//
	////		rb.velocity = new Vector3(rbx, rby, rb.velocity.z);
	//
	//		if (which > 0 && which <= 2) {
	//			jumpCards(which, Time.time);
	//		}
	//		state.jumpTimer = 0.06f;
	//
	//	}

	//	void jumpCards ()
	//	{ // which 2 means mirror the card in x
	////		if (which == 2)
	////			airBurstScript.transform.localScale = new Vector3 (airBurstScript.transform.localScale.x * -1, airBurstScript.transform.localScale.y, airBurstScript.transform.localScale.z);
	////
	////		airBurstScript.CardGo ();
	////		airBurstScript2.yPos = transform.position.y - 0.5f;
	//		jumpBurst.MakeJump (transform.position);
	//	}


	void winCards (Vector3 pos)
	{ // makes cam flare and path after win gate

		elecBurst [0].transform.position = pos;	
		elecBurst [1].transform.position = rb.position;

		warpPath.transform.position = rb.position - new Vector3 (0, 0, 5);
		warpPathAniObj.GetComponent<Animation> ().Play ("warpPath");

		for (int i = 0; i < 2; i++) {
			elecBurstScript [i].CardGo ();
		}

	}


	void OnCollisionEnter (Collision collision)
	{
		if (collision.gameObject.tag == "Kill" && state != State.Crashing) {
			Crash (0);
			return;
		}
		if (!stats.grounded) {
			if (stats.lv.y < -1) { // used to be state.lv.y
//				print(collision.gameObject.name);
//				print("vel y: " + state.lv.y + "    enter..");
				CheckLanding ();
			}
		}
	}

	void OnCollisionStay ()
	{
		if (!stats.grounded) {
			if (rb.velocity.y < -1)
				CheckLanding (); 
		}
	}


	string CheckSides ()
	{
		int cc = raycheckSide (0);	
		if (cc > 0) {
			stats.jumps = 0;
			//state.contactTimerL=10;
			return "left";
		}
		cc = raycheckSide (1);
		if (cc > 0) {
			stats.jumps = 0;
			return "right";
			//state.contactTimerR=10;
		}
		return "none";
	}


	public void CheckLanding ()
	{

		cc = RaycheckDown (1);	
		if (cc > 0 || fakeCC == true) {
			stats.fJumping = false;
			stats.jumps = 0;
			stats.landed = true;
			stats.grounded = true;

			guinew.UpdateJump (0);
			stats.handling = defaultHandling;
			//playSound("land");

			if (shipNum != 10) {
				anim.Play ("hop2");
				anim.PlayQueued ("idle");
				xRot = 0;
//				sub.localEulerAngles = new Vector3(0, sub.localEulerAngles.y, sub.localEulerAngles.z);
			} else {
				if (maxZSpeed < defPantherMaxZ)
					maxZSpeed = defPantherMaxZ;
				jumpMult = 1.0f;
				// print("start landing");
				StartCoroutine (adjustYV2 ());
				anim.Stop ();
				anim.Rewind ("run");
				anim.Play ("land");
				anim.PlayQueued ("run");
			}
				
			rby = 0;
			if (state == State.Normal)
				cam.goalHeight = stats.lastY;
		}
	
		cc = 0;
		fakeCC = false;
	}


	void OnTriggerEnter (Collider collision)
	{
		Transform ct = collision.transform;

		if (ct.name == "camDropBox") {
			cam.tunnelSwitch (1);
		} else if (ct.name == "camDropBox2") {
			cam.tunnelSwitch (2);
		} else if (ct.tag == "artifact" && ct.position.z > 0) { // >0 necessary to stop double collisions and therefore playing the second at -100, for some reason
			// set off burst
			artBurst.MakeArtBurst (ct.position);
			ct.position = new Vector3 (ct.position.x, ct.position.y, -100); // "disappear" the artifact out of the way
			if (sfx)
				GetComponent<AudioSource> ().PlayOneShot (sound.artSound);
			
			// update guis
			if (ct.name == "artifact1") {
				artCount += 100;
			} else if (ct.name == "artifact2") {
				artCount += 10;
			} else if (ct.name == "artifact3") {
				artCount += 1;
			} else if (ct.name == "artifact0") { // special for tutorial
//				gui.a1state++;
			}

			guinew.UpdateArti (artCount);
		}
	}

	void OnTriggerExit (Collider collision)
	{
		Transform ct = collision.transform;
		if (state == State.Normal) {
			if (ct.name == "camDropBox" || ct.name == "camDropBox2")
				cam.tunnelSwitch (0);
		}
	}


	int RaycheckDown (int which)
	{
		RaycastHit hit;
		float xRad = 0.9f;
		float zRad = 0.8f;
		float yRad = 0.9f;
		float rayDist = 0.73f;
		if (which == 2)
			rayDist = 1.2f;
		Vector3 pos = transform.position;
		int count = 0;
		Debug.DrawRay (new Vector3 (pos.x + xRad, pos.y + yRad, pos.z + zRad), -Vector3.up * (rayDist), Color.green);
		Debug.DrawRay (new Vector3 (pos.x - xRad, pos.y + yRad, pos.z + zRad), -Vector3.up * (rayDist), Color.green);
		Debug.DrawRay (new Vector3 (pos.x + xRad, pos.y + yRad, pos.z - zRad), -Vector3.up * (rayDist), Color.green);
		Debug.DrawRay (new Vector3 (pos.x - xRad, pos.y + yRad, pos.z - zRad), -Vector3.up * (rayDist), Color.green);
		//cast 4 down
		if (Physics.Raycast (new Vector3 (pos.x + xRad, pos.y + yRad, pos.z + zRad), -Vector3.up, out hit, rayDist))
		if (hit.collider.tag != "Kill")
			count++;
		if (Physics.Raycast (new Vector3 (pos.x - xRad, pos.y + yRad, pos.z + zRad), -Vector3.up, out hit, rayDist))
		if (hit.collider.tag != "Kill")
			count++;
		if (Physics.Raycast (new Vector3 (pos.x + xRad, pos.y + yRad, pos.z - zRad), -Vector3.up, out hit, rayDist))
		if (hit.collider.tag != "Kill")
			count++;
		if (Physics.Raycast (new Vector3 (pos.x - xRad, pos.y + yRad, pos.z - zRad), -Vector3.up, out hit, rayDist))
		if (hit.collider.tag != "Kill")
			count++;

		return count;
	}


	int raycheckSide (int which)
	{ // 0 = left check.  1 = right check
		RaycastHit hit;
		float zRad = 1.0f;
		float yH = 0.5f;
		float rayDist = 1.5f;
		Vector3 pos = transform.position;
		int count = 0;
		if (which == 0) { // left
			Debug.DrawRay (new Vector3 (pos.x, pos.y + yH, pos.z + zRad), -Vector3.right * (rayDist), Color.green);
			Debug.DrawRay (new Vector3 (pos.x, pos.y + yH, pos.z - zRad), -Vector3.right * (rayDist), Color.green);
			if (Physics.Raycast (new Vector3 (pos.x, pos.y + yH, pos.z + zRad), -Vector3.right, out hit, rayDist))
				count++;
			if (Physics.Raycast (new Vector3 (pos.x, pos.y + yH, pos.z - zRad), -Vector3.right, out hit, rayDist))
				count++;
		} else if (which == 1) { // right
			Debug.DrawRay (new Vector3 (pos.x, pos.y + yH, pos.z + zRad), Vector3.right * (rayDist), Color.green);
			Debug.DrawRay (new Vector3 (pos.x, pos.y + yH, pos.z - zRad), Vector3.right * (rayDist), Color.green);
			if (Physics.Raycast (new Vector3 (pos.x, pos.y + yH, pos.z + zRad), Vector3.right, out hit, rayDist))
				count++;
			if (Physics.Raycast (new Vector3 (pos.x, pos.y + yH, pos.z - zRad), Vector3.right, out hit, rayDist))
				count++;
		}

		return count;
	}


	public void Crash (int type)
	{ //type: 0=wall hit, 1=falling death (no sound or splode or wait)
		shad.enabled = false;
		state = State.Crashing;
		cam.goalZ = rb.position.z + 3;
		if (type == 1)
			cam.switchTo (MoveCam.Mode.Fall);
		else
			cam.switchTo (MoveCam.Mode.Crash);
		minZSpeed = 0;
		targetSpeed = 0;
//		xf = 0;	
		brakes = true;

		levelAttempts++;
		StartCoroutine (CrashCO (type));
	}


	IEnumerator CrashCO (int type)
	{
		if (type == 0) {	
			splode.MakeSplode (rb.position);
			DisappearShip ();
			yield return new WaitForSeconds (0.25f);
			if (type == 0) {
				splode.MakeSplodeMark ();
			}
			yield return new WaitForSeconds (1.3f);
		} else if (type == 1) {
			yield return new WaitForSeconds (1.1f);
		}

		guinew.Reset (0);
//		guinew.camBlack.Go ("in");
//		yield return new WaitForSeconds (blackerPause);
//
//		Reset (0);
	}


	void DisappearShip ()
	{
		rb.position = new Vector3 (0, 0, -1000);
		rb.velocity = Vector3.zero;
	}

	IEnumerator Win ()
	{

		//playSound("win");
		cam.switchTo (MoveCam.Mode.Win);
		state = State.Winning;
		if (sfx && engineAudio.activeSelf)
			engineAudio.GetComponent<AudioSource> ().Stop ();
		minZSpeed = 0;
		targetSpeed = 0;
		xf = 0;
		cam.goalZ = warpPath.transform.position.z + 7;

		DisappearShip ();

		// save everything here. Must set player prefs before deciding whether to victory cruise or outro... and before player has a chance to pause out of it...
		// maybe give breathing space so not all happening on same cycle
		gm.SetArtifacts (level, artCount);
		yield return null;
		gm.SaveTime (stats.elapsedTime); 
		yield return null;
		gm.IncrementLevel ();
		yield return null;

		if (shipNum == 10) {
			if (gm.pantherFlagScript.on == 1) {
				PlayerPrefs.SetInt (("Level" + level + "PantherFlag"), 1);
				print ("panther woooooo");	
			}
		}


		yield return new WaitForSeconds (2.5f);
		guinew.camBlack.Go ("in");
		yield return new WaitForSeconds (blackerPause);
		CheckWinCons ();

	}

	void CheckWinCons ()
	{
		bool ultimateWin = false;
		// ultimate win conditions
		if (gm.gamePhase < 2) { // <2 means Safe for the unlikely eventuality that someone beats the last level and gets the last artifact on the same run!
			// nested ifs so it doesn't run count___ for everything, every time
			if (gm.CountArtifacts () == 180) {
				ultimateWin = true;
				PlayerPrefs.SetInt ("GamePhase", 2);
				gm.gamePhase = 2;
				PlayerPrefs.SetInt ("ShipNum", 10);
				PlayerPrefs.SetInt ("Level", 61);
				PlayerPrefs.SetInt ("TutorialState", 2);
				PlayerPrefs.SetInt ("CinemaState", 4);
				PlayerPrefs.SetInt ("Quit", 1);
				// print("goto Outro 2");	
				Application.LoadLevel (4);
			} 
			if (gm.gamePhase == 0) {
				//print("Levels beaten: "+gm.countLevels());
				if (gm.CountLevels () == 60) {
					ultimateWin = true;
					PlayerPrefs.SetInt ("GamePhase", 1);
					PlayerPrefs.SetInt ("MaxLevel", 59);
					gm.gamePhase = 1;
					PlayerPrefs.SetInt ("CinemaState", 3);
					PlayerPrefs.SetInt ("Quit", 1);
					//print("goto Outro 1");
					Application.LoadLevel (3);
				}
			}
		} else if (gm.gamePhase == 2) { 
			if (gm.CountPanthers () == 60) {
				ultimateWin = true;
				PlayerPrefs.SetInt ("GamePhase", 3);
				PlayerPrefs.SetInt ("CinemaState", 5);
				gm.gamePhase = 3; // no longer counting panthers
				PlayerPrefs.SetInt ("Quit", 1);
				Application.LoadLevel (6);
			}
		}
		// else {
		if (!ultimateWin) {
			if (level < 60)
				VictoryCruise ();

			if (level == 60 || level == 61) {	
				if (PlayerPrefs.GetInt ("FromLS", 0) == 1) {
					PlayerPrefs.SetInt ("Quit", 2);
					Application.LoadLevel (0);
				} else {
					if (level == 60) {
						//gm.level=0;
						PlayerPrefs.SetInt ("Level", 0);
						Application.LoadLevel (1);
					} else if (level == 61) {
						PlayerPrefs.SetInt ("Quit", 2);
						Application.LoadLevel (0);
					}
				}
			}	
		}
	}

	void VictoryCruise ()
	{
		// send moveship to GM for this?
		Time.timeScale = 1;
//		disableGUI ();
		System.GC.Collect ();
//		gui.updateVC ();
//		gui.switchGUI ("victoryCruise");
		guinew.switchGUI (GUInew.State.VictoryCruise); 
		RenderSettings.fogStartDistance = 10;
		RenderSettings.fogEndDistance = 300;
		//playSound("vc");
		anim.Stop ();
		state = State.Cruising;
		stats.jumps = 2;
		StartCoroutine (VCfly ());
		cam.goalHeight = 0;

//		gm.IncrementLevel ();
		gm.bgScript.killBackground ();
		gm.killLevel ();
		anim2.Play ("winCruise1");	
		RepoShip ();	

		cam.switchTo (MoveCam.Mode.Cruise);
		VCshipAdj ();
//		gui.message = "none";

		targetSpeed = 0;
		//make star streaks
		warpTubeObj = Instantiate (warpTubePF, Vector3.zero, Quaternion.identity) as Transform;
		guinew.camBlack.Go ("out");
	}

	void VCshipAdj () // adjust ship's height to fit it more pleasingly on the VC screen
	{
		float[] adj = new float[]{ 0, 0, 0, 0, -0.2f, 0, -0.4f, 0, 0, 0, -0.67f };
		anim.transform.localPosition = new Vector3 (0, adj [gm.shipNum], 0);
	}

	void ReflectWarpTube ()
	{
		shipMat.SetTexture ("_Shad", shipWarpRefl [f]);
		f++;
		if (f > 20)
			f = 1;
	}


	void TitleScreen ()
	{
//		disableGUI ();
		musicSourceScript.StopTrack ();
//		if (gm.worldNum != 1) {
//			RenderSettings.fogStartDistance = 110;
//			RenderSettings.fogEndDistance = 190;
//		} else {
//			RenderSettings.fogStartDistance = 150;
//			RenderSettings.fogEndDistance = 300;	
//		}
		state = State.Title; // ??
		stats.jumps = 2;
		cam.goalHeight = -1;
		targetSpeed = 0;

		cam.switchTo (MoveCam.Mode.Title);
		anim2.Play ("titleCruise");	
		RepoShip ();	
		if (sfx && engineAudio.activeSelf)
			engineAudio.GetComponent<AudioSource> ().Stop ();
		DisappearShip ();
		guinew.camBlack.Go ("out");	
	}


	public void RepoShip ()
	{
		print ("repoShip");
		xf = 0;
		grav = 0;
		targetSpeed = 0;
		xRot = 0;
		rb.velocity = Vector3.zero;
		rb.position = gm.startPos + new Vector3 (0, 5, 0);	
		stats.lastY = rb.position.y;
		rb.rotation = Quaternion.identity;
		anim2.transform.localPosition = Vector3.zero;

		StartCoroutine (AfterReset ());
	}


	public void ResetRepoShip () // this is for skipping through a level to custom "resetPos[]" for testing. 
	{
		qbClear = false;
		xf = 0;
		grav = 0;
		targetSpeed = 0;
		xRot = 0;
		rb.velocity = Vector3.zero;
		rb.position = gm.resetPos [gm.rPointCounter] + new Vector3 (0, 5, 0);	
		stats.lastY = rb.position.y;
		rb.rotation = Quaternion.identity;
		anim2.transform.localPosition = Vector3.zero;
		gm.rPointCounter++;

		StopAllCoroutines ();
		Xspeed = maxXspeed;
		StartCoroutine (AfterReset ());
	}

	IEnumerator AfterReset ()
	{
		yield return new WaitForSeconds (blackerPause / 2);
		grav = defGrav;
		stats.grounded = false;
		stats.jumpTimer = 0.25f;
	}



	public void Reset (int type)  // 0: regular 1: after victory cruise 2: vary beginning 3: skip title check
	{
		System.GC.Collect ();

//		if (type != 2) { // what is this??
//			gui.CamBlack ("down");
////			yield WaitForSeconds(blackerPause);
//		}

		if (warpTubeObj) {
			levelAttempts = 1;
			Destroy (warpTubeObj.gameObject);
		}
		if (restarted) {
			levelAttempts++;
			restarted = false;
		}
//		if (gui.state == "tutorial")
//			gui.lineCount = -1;

		level = gm.level;

		artCountSaved = PlayerPrefs.GetInt (("Level" + level + "ArtCount"), 000);	
		Xspeed = 0;	

		state = State.PreStart;
		stats.elapsedTime = 0;
		guinew.UpdatePlayGUI (0, 0, 0);
		guinew.UpdateArti (artCountSaved);
		guinew.UpdateJump (2);
		artCount = artCountSaved;

		gm.killLevel ();
		stats.jumpStore = false;
		minZSpeed = 0;
		brakeOverride = false;
		targetSpeed = 0.0f;
		gm.updateWorld ();
		if (sfx && engineAudio.activeSelf)
			engineAudio.GetComponent<AudioSource> ().Stop ();

		CancelInvoke ("ReflectWarpTube");
		for (int i = 1; i <= 20; i++) {
			shipWarpRefl [i] = null;
		}
		shipMat.SetTexture ("_Shad", Resources.Load<Texture2D> ("ship/world" + gm.worldNum + " Refl"));

		cam.tunnelSwitch (0);
		jumpMult = 1.0f;

		ResetCards ();

		if (gm.level % 10 == 0 && levelAttempts == 1 && type != 3 && gm.worldNum != 6) {
			TitleScreen ();
			guinew.switchGUI (GUInew.State.Title); 
		} else {
			if (gm.worldNum == 6)
				guinew.switchGUI (GUInew.State.Title);
			else {
				guinew.switchGUI (GUInew.State.Play); 
			}

			if (gm.worldNum == 5 || gm.worldNum == 1)
				RenderSettings.fogStartDistance = 100;
			else
				RenderSettings.fogStartDistance = 10;
			RenderSettings.fogEndDistance = 300;
			shad.enabled = true;
			stats.jumps = 2;
			stats.landed = false;
			stats.progress = 0;
			gm.makeLevel ();
			xf = 0;
			sub.rotation = Quaternion.Euler (0, 0, 0);
			cam.switchTo (MoveCam.Mode.PreStart);
			anim2.Stop ();
			if (shipNum == 10) {
				anim.Stop ("jump");
				anim.Play ("jump");
			} // start panther out mid-jump rather than standing
			else
				anim.Play ("idle");
			yf = false;
			stats.jbClear = true;
			brakes = true;
			musicSourceScript.SetTrack ();
		}

		System.GC.Collect ();

		guinew.camBlack.Go ("out");
		gm.resetEasy ();
		CtrlGUIUpdate ();

	}


	void checkGates ()
	{
		foreach (Transform gate in gm.gateways) {
			if (gate != null) {
				float dist = Vector3.Distance (gate.position + new Vector3 (0, 3, 0), transform.position);
				if (dist < gateDist) {
					winCards (gate.position); 
					StartCoroutine (Win ());
				}
			}
		}
	}


	public void StopDead ()
	{
		if (!stats.stopped) {
			print ("Stoppin'....Dead");
			//playSound("land");

			stats.stopped = true;
			rb.velocity = new Vector3 (rb.velocity.x, rb.velocity.y, 0);
			minZSpeed = 0;
			targetSpeed = 0;
		}
	}


	IEnumerator Stun ()
	{
		yield return new WaitForSeconds (0.25f);
		SwitchState (State.Normal);
	}

	void ResetCards ()
	{
		//reset explosion
		splode.reset ();

		//reset win cards
		for (int i = 0; i < 2; i++) {
			elecBurst [i].transform.parent = null;
			elecBurst [i].transform.position = new Vector3 (0, 0, -100);
		}
		warpPath.transform.position = new Vector3 (0, 0, -100);
		warpPathAniObj.GetComponent<Animation> ().Rewind ("warpPath");
	}


	void playSound (string which)
	{ // jump, land, win, explode
		int rando = 0;
		if (sfx) {
			if (which == "jump") {
				if (shipNum != 10) {
					rando = (int)Random.Range (0, 2);
					GetComponent<AudioSource> ().PlayOneShot (sound.jump [rando]);
				} else {
					GetComponent<AudioSource> ().PlayOneShot (sound.jump [4]);
				}
			} else if (which == "jump2") {
				if (shipNum != 10)
					GetComponent<AudioSource> ().PlayOneShot (sound.jump [2]);
				else
					GetComponent<AudioSource> ().PlayOneShot (sound.jump [5]);
			} else if (which == "land") {
				GetComponent<AudioSource> ().PlayOneShot (sound.metalHit);
			} else if (which == "explode") {
				rando = Random.Range (0, 2);
				//GetComponent<AudioSource>().PlayOneShot(sound.explosion[rando]);
			} else if (which == "win") {
				GetComponent<AudioSource> ().PlayOneShot (sound.winGate);
			} else if (which == "vc") {
				if (shipNum != 10)
					GetComponent<AudioSource> ().PlayOneShot (sound.VCsound [0]);
				else
					GetComponent<AudioSource> ().PlayOneShot (sound.VCsound [1]);
			}
		}
	}


	public IEnumerator SpeedUpX ()
	{
		for (int i = 0; i <= maxXspeed; i++) {
			Xspeed = i;
			yield return new WaitForSeconds (0.01f);
		}
		Xspeed = maxXspeed;
	}


	public IEnumerator SpeedUpZ ()
	{
		brakeOverride = true;
		while (minZSpeed < minZBrake) {
			minZSpeed = targetSpeed;
			yield return null;
		}
		minZSpeed = minZBrake;
		brakeOverride = false;
	}


	void disableX (int which) // this is for panther only. What is this?
	{
		stats.xDisabled = which;

		for (int i = 1; i <= maxXspeed; i++) {
			if (i < 12)
				stats.handling = maxXspeed / i;
			if (i == 12)
				stats.xDisabled = 0;
//			yield WaitForSeconds(0.01);
			if (i == maxXspeed) {
				if (!stats.grounded)
					stats.handling = airHandling;
			}
		}
	}

}