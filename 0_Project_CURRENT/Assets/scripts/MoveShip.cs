using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MoveShip : MonoBehaviour {

	GameObject shipObj;
	Transform sub;
	Transform animSub;
	public Animation anim;
	public Animation anim2;
	public Projector shad;
	Rigidbody rb;

	public GameObject engineAudio;
	float[] shipMatOffset;
	float[] shipMatScale;

	public Texture2D[] shipWarpRefl;
	int f = 1;

	GameObject topSurface;
	GameObject sideSurface;
	GameObject frontSurface;

	float brakeValue;
	public Material speedbarMat;
	float jumpValue = 0;
	float jumpValueTar;
	public Material jumpBarMat;
	GameObject progBar;
	Camera guiCam;

	float ultraMaxZSpeed;
	float defPantherMaxZ = 90;

	int i;

	public GUIQuadObj a1;
	public GUIQuadObj a2;
	public GUIQuadObj a3;
	Material engineFlareMat;
	GameObject splode;
	Component splodeParticles;
	public CardAnim splodeScript;
	Material shipBoosterMat;
	Material shipMat;

	// side sparks
	GameObject splodeInst;
	GameObject sparkDownPF;
	Material engineSparkMat;
	public MoveCam cam;
	Transform camTrans;
	public GUIScript gui;
	public GameMaster gameMaster;
	public float Zspeed;
	float Xspeed = 0;
	float maxXspeed = 28;
	float maxZSpeed = 70;
	float minZSpeed = 40;
	public float minZBrake = 40;
	bool brakeOverride = false;
	public float grav;
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

	GameObject airBurst;
	public CardAnim airBurstScript;
	public AirBurst2 airBurstScript2;
	Material airBurstMat;
	GameObject[] elecBurst;
	GameObject warpPath;
	GameObject warpPathAniObj;
	public CardAnim[] elecBurstScript;
	int artCount;
	private int artCountSaved;
	public GameObject artBurst;
	public CardAnim artBurstScript;
	Transform warpTubePF;
	//var warpPathPF: GameObject;
	GameObject pTracksPF;
	Transform cruiseLightsPF;
	GameObject camFlare;
	int level;
	public int levelAttempts = 1;
	Transform warpTubeObj;

	private float blackerPause;

	private float zForce;
	public int shipNum;
	bool brakes = true;
	private float gateDist = 5.5f;
	Material explosionMaterial;
	Material explosionParticleMat;
	GameObject explosionMark;
	Color boosterColor;
	public float winDist;
	bool paused = false;
	private float xfLim = 0;
	private float xfRaw = 0;
	private float zBoost = 0;
	private float zBoostGoal = 0;

	float collLeft = 0.0f;
	float collRight = 0.0f;
	float sideJumpTolerance;

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
	public bool newRecord = false;
	public bool sfx = false;

	int rc;
	int rcb;
	float deltaY;
	string rcs;

	GameObject musicSource;
	public Music musicSourceScript;
	int cc = 0;
	public bool fakeCC = false;
	GUIQuadObj[] guiObjs;

	public bool restarted = false;

	public class CharacterState {
		public bool started = false;
		//var startedTime: float;
		public float elapsedTime = 0;
		public bool crashing = false;
		public bool cruising = false;
		public bool winning = false;
		public bool stopDead = false;
		public bool fullStop = false;
		//var stoppedTime: float = 0;
		public bool stunned = false;
		public float handling;
		public Vector3 lv;
		public bool title = false;
		public float progress;
		public int jumps = 0;
		public bool jbClear = true;
		public bool tunnel = false;
		public bool tunnel2 = false;
		public bool tunnel3 = false;
		public bool jumpStore = false;
		// for storing a jump button press while close enough to a platform, but not technically on
		public bool paused = false;
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

	public class SoundClips {
		public AudioClip metalHit;
		public AudioClip[] jump;
		public AudioClip[] explosion;
		public AudioClip winGate;
		public AudioClip[] VCsound;
		public AudioClip artSound;
		public AudioClip[] engineSound;
	}

	public CharacterState state = new CharacterState();
	public SoundClips sound = new SoundClips();


	void Start() {
		System.GC.Collect();
		int ppsfx = PlayerPrefs.GetInt("Sfx", 1);
		if (ppsfx == 1)
			sfx = true;
		else
			sfx = false;
		rb = GetComponent<Rigidbody>();

		guiCam = GameObject.Find("GUICameraL1").GetComponent<Camera>();
		musicSource = GameObject.Find("MusicSource(Clone)");
		musicSourceScript = musicSource.GetComponent<Music>();
		if (!sfx)
			engineAudio.SetActive(false);
		defGrav = grav;
		initShip();
		reset(2);
		blackerPause = gui.blackerPause;
	}


	void Awake() {
		GameObject guiQuadMgr = GameObject.Find("GUIQuadMgr");
		guiObjs = guiQuadMgr.GetComponentsInChildren<GUIQuadObj>();
		
		boosterColor = new Vector4(PlayerPrefs.GetFloat("BoostColor_R", 0f), PlayerPrefs.GetFloat("BoostColor_G", 0.5f), PlayerPrefs.GetFloat("BoostColor_B", 1f), 1);	
		explosionMaterial.SetColor("_Emission", new Vector4(boosterColor.r / 2, boosterColor.g / 2, boosterColor.b / 2, 1));
		explosionParticleMat.SetColor("_TintColor", new Vector4(((1 - boosterColor.r) / 4 + boosterColor.r), ((1 - boosterColor.g) / 4 + boosterColor.g), ((1 - boosterColor.b) / 4 + boosterColor.b), 1));
		airBurst.GetComponent<Renderer>().material.SetColor("_Emission", new Vector4(boosterColor.r / 2, boosterColor.g / 2, boosterColor.b / 2, 1));
	}


	void initShip() {	
		Transform parentToObj = transform.GetChild(0).GetChild(0);
		
		shipNum = gameMaster.shipNum;
		
		if (sfx && engineAudio.activeSelf) {
//			if (shipNum!=10) 
//				engineAudio.GetComponent<AudioSource>().clip = sound.engineSound[0];
//			else 
//				engineAudio.GetComponent<AudioSource>().clip = sound.engineSound[1];
		}

		shipObj = Instantiate(Resources.Load<GameObject>("ship" + shipNum), Vector3.zero, Quaternion.identity) as GameObject;
		shipObj.transform.parent = parentToObj;
		shipObj.transform.localPosition = Vector3.zero;
		
		camTrans = cam.transform;
		if (shipNum != 10) { 
			ultraMaxZSpeed = maxZSpeed;
			Transform ccs = transform.Find("collCheckL");
			ccs.gameObject.SetActive(false);
			ccs = transform.Find("collCheckR");
			ccs.gameObject.SetActive(false);
		} else { // special panther stuff	
			shipObj.transform.localPosition = new Vector3(0, -0.5f, -0.1f);
			maxZSpeed = defPantherMaxZ;

			ultraMaxZSpeed = maxZSpeed;
			anim = shipObj.GetComponent<Animation>();
			anim["jump"].layer = 1;
			anim["lJump"].layer = 1;
			anim["rJump"].layer = 1;
			anim["fJump"].layer = 1;
			anim["boost"].layer = 1;
			anim["doubleJump"].layer = 1;

		}

		Color baseColor = new Vector4(PlayerPrefs.GetFloat("BaseColor_R", 0.5f), PlayerPrefs.GetFloat("BaseColor_G", 0.5f), PlayerPrefs.GetFloat("BaseColor_B", 0.5f), 1);
		Color patColor = new Vector4(PlayerPrefs.GetFloat("PatColor_R", 0.5f), PlayerPrefs.GetFloat("PatColor_G", 0), PlayerPrefs.GetFloat("PatColor_B", 0), 1);

		shipMat.SetColor("_BaseColor", baseColor * 0.5f);
		shipMat.SetColor("_PatColor", patColor * 0.6f);
		shipMat.SetTexture("_MultTex", Resources.Load<Texture>("ship/ship" + shipNum));
		shipMat.SetTexture("_DecalTex", Resources.Load<Texture>("patterns/" + PlayerPrefs.GetInt("texture", 6)));
		shipMat.SetTextureOffset("_DecalTex", new Vector2((1 / (-1 * -0.96f)) * (PlayerPrefs.GetFloat("offset", 0) + 0.48f), 0));
		shipMat.SetTexture("_Shad", Resources.Load<Texture>("ship/world" + gameMaster.worldNum + " Refl"));
		
		shipMat.SetTextureOffset("_Shad", new Vector2(0, shipMatOffset[shipNum]));
		shipMat.SetTextureScale("_Shad", new Vector2(1, shipMatScale[shipNum]));	

		shipBoosterMat.SetColor("_Emission", new Vector4(((1 - boosterColor.r) / 2 + boosterColor.r), ((1 - boosterColor.g) / 2 + boosterColor.g), ((1 - boosterColor.b) / 2 + boosterColor.b), 1));
		engineFlareMat.SetColor("_TintColor", new Vector4(boosterColor.r / 2, boosterColor.g / 2, boosterColor.b / 2, 0.5f));

		artCount = artCountSaved;
	}


	void UpdateArtIcons() {
		if (gameMaster.gamePhase < 2) {
			artCount = artCountSaved;
			a1.UV = new Vector2(((Mathf.Floor(artCount / 100)) * 16) + 464, a1.UV.y);	
			a2.UV = new Vector2(((Mathf.Floor((artCount % 100) / 10)) * 16) + 464, a2.UV.y);
			a3.UV = new Vector2(((artCount % 10) * 16) + 464, a3.UV.y);
		} else {
			a1.UV = new Vector2(448, a1.UV.y);
			a2.UV = new Vector2(448, a2.UV.y);
			a3.UV = new Vector2(448, a3.UV.y);
		}	
	}


	void adjustyv2() {
		float timer = 0.8f;
		float startY = state.lv.y;
		state.landing = true;
		while (timer > 0 && state.landing) {
			timer -= Time.deltaTime * 10;
			yv2 = startY * timer;
//			yield;
		}
		state.landing = false;
		sub.localPosition = new Vector3(sub.localPosition.x, sub.localPosition.y, 0);
	}



	void FixedUpdate() {

		float rbx = rb.velocity.x;
		float rby = rb.velocity.y;
		float rbz = rb.velocity.z;

		// inputs	
		if (!state.crashing && !state.winning) {

			if (gameMaster.device == GameMaster.DeviceType.iPhone) {
				if (state.started) {
					//xf = -(Input.acceleration.y*3*((Mathf.Abs(Input.acceleration.y)+0.6)*.75));
					xf = -(Input.acceleration.y * 2);
					brakes = false;
					yf = false;
				}
				if (!state.paused) {
					for (int i = 0; i < Input.touchCount; ++i) {
						if (Input.GetTouch(i).position.x > Screen.width - (Screen.width / 4)) {
							if (Input.GetTouch(i).phase == TouchPhase.Began || Input.GetTouch(i).phase != TouchPhase.Ended) {
								yf = true;
							} else
								yf = false;
							//if (jumpTouches == 0) yf = false;       			
						} else if (Input.GetTouch(i).position.x < Screen.width / 4) {
								if (Input.GetTouch(i).phase != TouchPhase.Ended) {
									brakes = true;
								} else
									brakes = false;
							}
					}
				}
			} else { // computer ctrls
				yf = Input.GetButton("Fire1");
				if (state.started) {
					xf = Input.GetAxis("Horizontal");
					xfRaw = Input.GetAxisRaw("Horizontal");
				}
				if (!state.cruising) {
					qf = Input.GetButton("jumpAhead");
					if (Input.GetAxisRaw("Vertical") > 0)
						brakes = false;
					else
						brakes = true;
				}
			}
			if (brakeOverride)
				brakes = false;
		}

		if (!yf) {
			state.jbClear = true;
		}
		if (!qf) {
			qbClear = true;
		}
		if (qf && qbClear && !state.cruising)
			resetRepoShip();


		state.jumpTimer -= Time.deltaTime;
		//if (rigidbody.position.y>highestY) highestY=rigidbody.position.y;

		if (shipNum != 10) {	
			// gravity and hop limiting. rb now (what the fuck was that?>
			if (!state.cruising && !state.crashing)
				rby -= (grav * Time.deltaTime);
			actualY = rby;
			if (state.jumpTimer < 0 && rby > jumpforce)
				rby = jumpforce;
			if (state.jumpTimer < -0.5f && rby > 1)
				rby = 1;
			// fall off the bottom
			if (rb.position.y < -25.5f && !state.crashing)
				crash(0);

			// jumps
			if (yf && state.jbClear && !state.paused) {
				if (state.jumps == 1) { // double jump
					if (rc == 0) {
						jump(2);
						state.jumps = 2;
					} else {
						jump(2);
						state.jumps = 1;
					}
				} else if (state.jumps == 0 && !state.cruising) { // jump
						jump(1);
						state.jumps = 1;
						state.handling = airHandling;
					}

			}

			// store some vars from this update cycle for use in the next
			// raycheckDown(2);
			state.lv = rb.velocity;
			deltaY = Mathf.Abs(state.lastY - rb.position.y);
			if (state.grounded && deltaY > 0.01f && deltaY < 0.3f) {
				rby = Mathf.Clamp(rby, -20.0f, 0.0f);
			}
			state.lastY = rb.position.y;
			if (state.landed) {
				state.jumps = 0;
				state.landed = false;
				jumpValueTar = 0;
			}
		} else {//panther code
			if (state.fullStop != true) {
				if (state.xDisabled == 1)
					xf = Mathf.Clamp(xf, 0.6f, 4.0f);
				else if (state.xDisabled == -1)
						xf = Mathf.Clamp(xf, -4.0f, -0.6f);
				collLeft = Mathf.Clamp(collLeft - Time.deltaTime, 0, sideJumpTolerance);
				collRight = Mathf.Clamp(collRight - Time.deltaTime, 0, sideJumpTolerance);

				if (!state.stopDead) {

					// forward speed, slow down after crash, and progress
					if (!state.cruising && !state.stunned) { // && state.started) {
						if (!brakes)
							targetSpeed += ((maxZSpeed - targetSpeed + 20) / 2) * Time.deltaTime * 4.5f;
						else
							targetSpeed -= ((targetSpeed + 50) / 4) * (Time.deltaTime * 4.5f);

						// boost speed, slow down when in air, but clamp it
						//					if (state.boosting) {
						//						maxZSpeed=Mathf.Clamp(maxZSpeed-35.0*Time.deltaTime, 65, ultraMaxZSpeed);
						//						targetSpeed=maxZSpeed;
						//						if (maxZSpeed<=defPantherMaxZ) {
						//							state.boosting=false;
						//							maxZSpeed=defPantherMaxZ;
						//						}
						//					}
						if (!state.grounded) {
							maxZSpeed = Mathf.Clamp(maxZSpeed - (pantherSlowInAirSpeed * Time.deltaTime), pantherSlowInAirLimit, ultraMaxZSpeed);
						}
						targetSpeed = Mathf.Clamp(targetSpeed, minZSpeed, maxZSpeed);
					}


				}//end stopdead if

				state.progress = transform.position.z;

				// gravity and hop limiting
				if (!state.cruising && !state.crashing)
					rby -= grav * Time.deltaTime;
				actualY = rby;
				if (state.jumpTimer < 0 && rby > jumpforce * jumpMult)
					rby = jumpforce * jumpMult;
				if (state.jumpTimer < -0.5f && rby > 1)
					rby = 1;
				// fall off the bottom
				if (rb.position.y < -25.5f && !state.crashing)
					crash(0);

				// jumps
				if ((yf && state.jbClear) && !state.paused && !state.cruising && !state.stunned) {
					if (!state.grounded) {
						int rcb = raycheckDown(2);
						if (rcb > 0) {
							//takeoffZ = rigidbody.position.z;	
							jump(1);
						} else {
							int rcf = raycheckFront();
							if (rcf > 0) {
								jump(6);
							} else if (collLeft > 0.001f) {
									jump(3);
								} else if (collRight > 0.001f) {
										jump(4);
									} else if (state.jumps == 1)
											jump(2);
						}
					} else {	
						// ** new
						//takeoffZ = rigidbody.position.z;	
						jump(1);
					}
				}


				// store some vars from this update cycle for use in the next
				state.lv = rb.velocity;
				state.lastY = rb.position.y;
				if (state.landed) {
					state.jumps = 0;
					state.landed = false;
				}
				if (!state.crashing && !state.stunned && !state.winning) {
					rbz = targetSpeed;
				} else
					rbz = Mathf.Lerp(rb.velocity.z, 0.0f, Time.deltaTime * 6);
				//if (state.boostTimer>0) { var xf2Adj: float = 1-(state.boostTimer/boostTime); }
				// else xf2Adj=1.0;
				xf2 = Mathf.Lerp(xf2, Mathf.Clamp((xf * -20) - rbx, -50, 50), Time.deltaTime * 8);
			}
		}

		//raycheckSide(0);
		//raycheckSide(1);
		//raycheckFront();
		//raycheckDown(1);
		rb.velocity = new Vector3(rbx, rby, rbz);

		if (state.crashing && !restarted) {
			if (splode.transform.position.y < cam.transform.position.y)
				cam.goalHeight = splode.transform.position.y;	
		} else if (state.winning) {
				cam.goalHeight = warpPath.transform.position.y;	
			} else if (!state.cruising) {
					// cam goals
					if (cam.goalHeight < transform.position.y - cam.sensitivity)
						cam.goalHeight += 1.0f;
						//else if (cam.goalHeight>transform.position.y) cam.goalHeight=Mathf.Clamp(transform.position.y, -24, 1000);
						else if (cam.goalHeight > transform.position.y)
							cam.goalHeight = transform.position.y;	
				}

	

	}



	void Update() {	
		guiUpdate();

		float rbx = rb.velocity.x;
		float rby = rb.velocity.y;
		float rbz = rb.velocity.z;

		if (gameMaster.worldNum == 1 && !state.cruising)
			if (!topSurface)
				level10Init();

		if (shipNum != 10) {
			// forward speed, slow down after crash, and progress
			if (!state.stopDead) {
				if (!state.cruising) {// && state.started) {
					if (!brakes)
						targetSpeed += ((maxZSpeed - targetSpeed + 20) / 2) * Time.deltaTime * 2;
					else
						targetSpeed -= ((targetSpeed + 50) / 4) * Time.deltaTime * 4;
					targetSpeed = Mathf.Clamp(targetSpeed, minZSpeed, maxZSpeed);
				}
				zForce = rbz / maxZSpeed;
			}
			state.progress = transform.position.z;

			if (!state.crashing && !state.winning) {
				rbz = targetSpeed;

			} else
				rbz = Mathf.Lerp(rb.velocity.z, 0.0f, Time.deltaTime * 6);
			xf2 = Mathf.Lerp(xf2, (xf * -20) - rbx, Time.deltaTime * 10);

			// start the motion of the ship and the clock when brakes released
			if (!state.started) {
				state.elapsedTime = 0;
				if (!brakes) {
					xf = 0;
					state.started = true;
					//state.startedTime=Time.time;
					speedUpX();
					speedUpZ();
					if (sfx && engineAudio.activeSelf)
						engineAudio.GetComponent<AudioSource>().Play();
				}
			} else if (!state.crashing) {
					state.elapsedTime += Time.deltaTime / gameMaster.gameSpeed;
					//state.elapsedTime=((Time.time-state.startedTime)/gameMaster.gameSpeed)+state.progressedTime;
				}

			if (!state.crashing && !state.cruising) {

				// check gateways
				if (transform.position.z > winDist && winDist > 0)
					checkGates();

			}



			// spacecraft tilt and pitch 
			float yPos = Mathf.Abs(rbx * 0.01f) + 0.8f;
			float yRot = -xf2 * 0.5f;
			float zRot = xf2;


			// pitch up down and when to free fall/ take away a jump 
			if (state.jumps > 0) {
				xRot = Mathf.Lerp(xRot, -1.5f * rby, Time.deltaTime * xRotSpeed);

			} else if (rby < -10) {
					if (gameMaster.worldNum == 1)
						level10off();
					xRot = 0;
					xRotSpeed = 4;
					state.jumps = 1;
					state.grounded = false;
				}
			zForce = rbz / maxZSpeed;
			sub.eulerAngles = new Vector3(xRot, yRot, zRot);
			sub.localPosition = new Vector3(0, yPos, 0);

			if (!state.cruising)
				rbx = Mathf.Lerp(rb.velocity.x, xf * Xspeed, Time.deltaTime * state.handling);

			if (sfx && state.started) {
				engineAudio.GetComponent<AudioSource>().pitch = (targetSpeed / ultraMaxZSpeed + 0.2f) * 1.4f;
				engineAudio.GetComponent<AudioSource>().volume = 1 - (Mathf.Abs(((targetSpeed / ultraMaxZSpeed) * 2) - 1.1f));
			}
		}
				
		// else panther code below vv
		else {
			if (!state.fullStop) {
				anim["run"].speed = Mathf.Clamp(0.1f + targetSpeed / 60f, 0.75f, 10);
				anim["lStep"].speed = Mathf.Clamp(0.1f + Mathf.Abs(xf2) / 30f, 0.8f, 10);
				anim["rStep"].speed = Mathf.Clamp(0.1f + Mathf.Abs(xf2) / 30f, 0.8f, 10);
				if (targetSpeed < 8)
					if (xf2 < -2)
						anim.CrossFade("rStep", 0.2f);
					else if (xf2 > 2)
							anim.CrossFade("lStep", 0.2f);
						else
							anim.CrossFade("idle", 0.2f);
				else
					anim.CrossFade("run");

				// start the motion of the ship and the clock when brakes released
				if (!state.started) {
					//state.elapsedTime=0;
					if (!brakes) {
						xf = 0;
						state.started = true;
						//state.startedTime=Time.time;
						speedUpX();
						speedUpZ();
					}
				} else if (!state.crashing) {
						state.elapsedTime += Time.deltaTime / gameMaster.gameSpeed;
					}
					
				if (!state.crashing && !state.cruising && !state.winning) {
					// check gateways
					if (transform.position.z > winDist && winDist > 0)
						checkGates();
				}
					
				// spacecraft tilt and pitch 
				float yRot = (Mathf.Atan2(-xf2, targetSpeed + 1) * Mathf.Rad2Deg) * Mathf.Clamp(((targetSpeed * 1.2f) / defPantherMaxZ), 0, 1);
				float zRot = xf2 * 0.5f;

				float yPos = Mathf.Abs(rbx * 0.01f) + 0.8f;
				float zPos = 0;


				// pitch up down and when to free fall/ take away a jump
				if (state.jumps > 0 || state.landing) {
					// xRot = Mathf.Lerp(xRot, -1.7*rigidbody.velocity.y, Time.deltaTime*xRotSpeed); 
					if (!state.landing)
						yv2 = rby;
					//else print(yv2);
					xRot = Mathf.Lerp(xRot, -1.7f * yv2, Time.deltaTime * xRotSpeed); 
					if (state.fJumping) {
						xRot = Mathf.Clamp(xRot, 0, 90);
						zPos = Mathf.Clamp(xRot * -0.02f, -2, 0);
					} else {
						xRot = Mathf.Clamp(xRot, -70, 90);
						zPos = Mathf.Clamp(xRot * -0.02f, -2, 0);
					}
				} else if (rby < -10) {
						xRotSpeed = 6;
						xRot = 0;
						state.jumps = 1;
						state.grounded = false;
						state.landing = false;
						anim.Rewind("jump");
						anim.CrossFade("jump");
						if (gameMaster.worldNum == 1)
							level10off();
					}

				sub.localPosition = new Vector3(0, yPos, zPos);
				sub.eulerAngles = new Vector3(xRot, yRot, zRot);

				if (!state.cruising)
					rb.velocity = Vector3.Lerp(rb.velocity, new Vector3(xf * Xspeed, rby, rbz), Time.deltaTime * state.handling);

			} else {
				anim.CrossFade("idle", 0.2f);
				xf = 0;
				rb.velocity = new Vector3(0, rby, rbz);
			}
			if (engineAudio.activeSelf) {
				if (sfx && state.grounded && engineAudio.activeSelf && !state.paused && state.started && !state.stopDead && !state.fullStop) {
					if (!engineAudio.GetComponent<AudioSource>().isPlaying)
						engineAudio.GetComponent<AudioSource>().Play();

					if ((targetSpeed / ultraMaxZSpeed) > 0.7f)
						engineAudio.GetComponent<AudioSource>().clip = sound.engineSound[2];
					else
						engineAudio.GetComponent<AudioSource>().clip = sound.engineSound[1];
					//engineAudio.audio.pitch = (targetSpeed/ultraMaxZSpeed)*1.2;
					//engineAudio.audio.volume = .6;
					//engineAudio.audio.volume = Mathf.Clamp(2-((targetSpeed/ultraMaxZSpeed)*2),.09,1);
				} else {
					if (engineAudio.GetComponent<AudioSource>().isPlaying)
						engineAudio.GetComponent<AudioSource>().Stop();
				}
			}
		}

		rb.velocity = new Vector3(rbx, rby, rbz);

		if (!state.paused) {
			if (gameMaster.device == GameMaster.DeviceType.iPhone) {	
				foreach (Touch touch in Input.touches) {  
					if (touch.position.x > Screen.width / 4 && touch.position.x < Screen.width - (Screen.width / 4)) {   
						if (Mathf.Abs(touch.deltaPosition.y) > 10) {
							//Application.LoadLevel(0);	
						            	
							if (!state.paused && !state.cruising && !state.crashing) { 
								Time.timeScale = 0; 
								state.paused = true; 
								gui.switchGUI("paused"); 
								if (sfx && engineAudio.activeSelf)
									engineAudio.GetComponent<AudioSource>().Stop(); 
								//gui.inputWait(.5); 
							}
							//	else { Time.timeScale=1.0; state.paused=false; paused=false; 
							//}
						}
					}
				}
			} else {
				if (Input.GetButton("pause")) {
					if (!state.paused && !state.cruising && !state.crashing) { 
						Time.timeScale = 0.0f; 
						state.paused = true; 
						gui.switchGUI("paused"); 
						if (sfx && engineAudio.activeSelf)
							engineAudio.GetComponent<AudioSource>().Stop();
					}
				}
			}
		}
	}




	void vcfly() {
		float timer = 1.0f;
		float oldZ = 0;
		float goalZtemp = 0;

		while (state.cruising) {
			if (shipNum == 10)
				anim.Play("fly");
			timer -= Time.deltaTime;
			if (timer < 0) {
				oldZ = goalZtemp;
				do {
					goalZtemp = oldZ + Random.Range(-8.0f, 8.0f);
				} while (goalZtemp < -12 || goalZtemp > 12);
				timer = Random.Range(1.0f, 3.5f) * (Mathf.Abs(oldZ - goalZtemp) / 8);
				//print("diff: "+Mathf.Abs(oldZ-goalZtemp)+" +time: "+timer);
			}
			rb.rotation = Quaternion.Slerp(rb.rotation, Quaternion.Euler(0, 0, goalZtemp), Time.deltaTime * 2);
			rb.position = new Vector3(rb.position.x, Random.Range(2.995f, 3.005f), rb.position.z);
			//anim2.transform.position.y=Random.Range(2.99, 3.01);

//			yield;		
		}
	}

	void guiUpdate() {

		if (!state.stopDead)
			brakeValue = -0.5f * (state.lv.z / ultraMaxZSpeed);
		else
			brakeValue = 0;

		speedbarMat.mainTextureOffset = new Vector2(speedbarMat.mainTextureOffset.x, Mathf.Lerp(speedbarMat.mainTextureOffset.y, brakeValue, Time.deltaTime * 15));

		jumpValueTar = state.jumps * 0.25f;


		if (jumpValue != jumpValueTar) {
			if (jumpValue < jumpValueTar) {
				jumpValue += Time.deltaTime * 1.1f;	
			} else { 
				jumpValue -= Time.deltaTime * 2;
			}
			if (jumpValueTar == 0)
				jumpValue = Mathf.Clamp(jumpValue, 0, 0.2f);
			else if (jumpValueTar == 0.25f)
					jumpValue = Mathf.Clamp(jumpValue, 0, 0.25f);
				else if (jumpValueTar == 0.5f)
						jumpValue = Mathf.Clamp(jumpValue, 0.3f, 0.5f);
		}
		//print(jumpValue);
		jumpBarMat.mainTextureOffset = new Vector2(jumpBarMat.mainTextureOffset.x, jumpValue);	
		//progBar.transform.localScale.x = Mathf.Clamp(state.progress/winDist,0,1);
	}

	void level10off() {
		topSurface.GetComponent<Animation>().Play("10_off");	
		sideSurface.GetComponent<Animation>().Play("10_off");	
		frontSurface.GetComponent<Animation>().Play("10_off");
		//shipLight10s.animation.Play("10_light_off");
	}


	void jump(int which) { // 1: single  2: doubleJump  3: left wall jump  4: right wall jump  5: panther boost 6: front wall jump
		//print("which = "+which);
		state.jbClear = false;
		state.grounded = false;
		state.landing = false;
		state.handling = airHandling;

		float rby = 0;
		float rbx = rb.velocity.x;

		rb.position += new Vector3(0f, 0.4f, 0f);
		xRot = 0;
		xRotSpeed = 25;
		if (which == 1) {
			playSound("jump");
			if (gameMaster.worldNum == 1)
				level10off();		
		} else if (shipNum != 10)
				playSound("jump2");
			else if (shipNum == 10) {
					if (which == 2)
						playSound("jump2");
					else
						playSound("jump");
				}
		if (shipNum == 10) {
			if (which == 1) { 
				// for inclines
				if (actualY > 0) {
					jumpMult = pantherSJumpMult + (actualY * 0.05f);
					print("incline Jump! +" + (actualY * 0.05f));
				} else
					jumpMult = pantherSJumpMult; 
				rby = jumpforce * jumpMult; 
				maxZSpeed -= pantherSJumpPenalty;
				anim.Stop("jump");
				anim.Play("jump"); 	
				state.jumps = 1; 
			} else if (which == 2) { 
					anim.Stop("doubleJump"); 
					anim.Play("doubleJump"); 
					jumpMult = pantherDJumpMult; 
					maxZSpeed -= pantherDJumpPenalty; 
					rby = jumpforce * pantherDJumpMult; 
					state.jumps = 2;
				} else if (which == 4) {
						maxZSpeed = defPantherMaxZ;
						jumpMult = 1.3f;
						rby = jumpforce * jumpMult;
						anim.Play("rJump");
						collRight = 0;
						disableX(-1);
						rb.position += Vector3.left;
						rbx = -25 + (8 * xfRaw);
						//print(-25+(8*xfRaw));
						xf2 = 40;
						//xf=0;
						state.jumps = 1;
					} else if (which == 3) {

							maxZSpeed = defPantherMaxZ;
							jumpMult = 1.3f;
							rby = jumpforce * jumpMult;
							anim.Play("lJump");
							collLeft = 0;
							disableX(1);
							rb.position += Vector3.left;
							rbx = 25 + (8 * xfRaw);
							//print(25+(8*xfRaw));
							xf2 = -40;
							//xf=0;
							state.jumps = 1;
						} 
			/*
		else if (which==5) {
			jumpMult=1.0;
			//anim.Play("boost"); 
			anim.CrossFade("boost", 0.1); 
			//speedUpX();
			rigidbody.velocity.y=jumpforce*0.25;
			maxZSpeed=defPantherMaxZ+boostZ;
			state.jumps=2;
		}*/
			else if (which == 6) {
								state.fJumping = true;
								jumpMult = 2.0f;
								anim.Stop("fJump"); 
								anim.Play("fJump");
								rby = jumpforce * jumpMult; 
								state.jumps = 1;
								//rigidbody.position.z-=1.0;
								//rigidbody.velocity.z=-30;
								bounceBack();
							}
		} else { // for normaL ships
			// for inclines
			if (actualY > 0 && state.grounded) {
				jumpMult = 1.04f + (actualY * 0.07f);
				print("incline Jump! +" + (actualY * 0.07f));
			} else
				jumpMult = 1.04f; 
			rby = jumpforce * jumpMult;
		}


		if (which > 0 && which <= 2) {
			jumpCards(which, Time.time);
		}
		state.jumpTimer = 0.06f;
		rb.velocity = new Vector3(rbx, rby, rb.velocity.z);
	}

	void jumpCards(int which, float startTime) { // which 2 means mirror the card in x
		if (which == 2)
			airBurstScript.transform.localScale = new Vector3(airBurstScript.transform.localScale.x * -1, airBurstScript.transform.localScale.y, airBurstScript.transform.localScale.z);
		airBurstScript.cardGo = true;
		airBurstScript.startTime = startTime;
		//print("ship y = "+shipObj.transform.position.y);
		airBurstScript2.yPos = shipObj.transform.position.y;
	}

	void winCards(Vector3 pos) { // makes cam flare and path after win gate

		elecBurst[0].transform.position = pos;	
		elecBurst[1].transform.position = rb.position;

		warpPath.transform.position = rb.position - new Vector3(0, 0, 5);
		warpPathAniObj.GetComponent<Animation>().Play("warpPath");

		for (int i = 0; i < 2; i++) {
			elecBurstScript[i].cardGo = true;
			elecBurstScript[i].startTime = Time.time;
		}

	}



	void ArtiBurst(Vector3 pos) { // makes cam flare when artifact is collected
		if (sfx)
			GetComponent<AudioSource>().PlayOneShot(sound.artSound);
		artBurst.transform.position = pos;
		artBurst.transform.parent = camTrans;
		artBurstScript.startTime = Time.time;
		artBurstScript.cardGo = true;
//		yield WaitForSeconds(1);
		artBurst.transform.parent = null;
		artBurst.transform.position = new Vector3(0, 0, -100);

	}


	void OnCollisionEnter(Collision collision) {
		if (collision.gameObject.tag == "Kill" && !state.crashing)
			crash(0);
		if (!state.grounded) {
			//print("checkLanding: "+state.lv.y);
			if (state.lv.y < -1)
				checkLanding();
		}
	}

	void OnCollisionStay() {
		if (!state.grounded) {
			if (state.lv.y < -1)
				checkLanding(); 
		}
	}


	string checkSides() {
		int cc = raycheckSide(0);	
		if (cc > 0) {
			state.jumps = 0;
			//state.contactTimerL=10;
			return "left";
		}
		cc = raycheckSide(1);
		if (cc > 0) {
			state.jumps = 0;
			return "right";
			//state.contactTimerR=10;
		}
		return "none";
	}


	public void checkLanding() {
		//print("landingCheck");
		cc = raycheckDown(1);	
		if (cc > 0 || fakeCC == true) {
			state.fJumping = false;
			state.jumps = 0;
			state.landed = true;
			state.grounded = true;
			airBurstScript.CardStop();
			state.handling = defaultHandling;
			playSound("land");
			if (shipNum != 10) {
				anim.Play("hop2");
				anim.PlayQueued("idle");
				sub.localEulerAngles = new Vector3(0, sub.localEulerAngles.y, sub.localEulerAngles.z);
			} else {
				if (maxZSpeed < defPantherMaxZ)
					maxZSpeed = defPantherMaxZ;
				jumpMult = 1.0f;
				// print("start landing");
				adjustyv2();
				anim.Stop();
				anim.Rewind("run");
				anim.Play("land");
				anim.PlayQueued("run");
			}

			rb.velocity = new Vector3(rb.velocity.x, 0, rb.velocity.z);
			if (!state.cruising)
				cam.goalHeight = state.lastY;
		}
		if (gameMaster.worldNum == 1)
			if (state.grounded == true)
				level10on();
		cc = 0;
		fakeCC = false;
	}

	void level10on() {
		topSurface.GetComponent<Animation>().Play("10_on");	
		sideSurface.GetComponent<Animation>().Play("10_on");	
		frontSurface.GetComponent<Animation>().Play("10_on");
		//shipLight10s.animation.Play("10_light_on");
//		yield WaitForSeconds(.3);
		if (!topSurface.GetComponent<Animation>().isPlaying)
			topSurface.GetComponent<Animation>().Play("10_idle");	
		if (!sideSurface.GetComponent<Animation>().isPlaying)
			sideSurface.GetComponent<Animation>().Play("10_idle");	
		if (!frontSurface.GetComponent<Animation>().isPlaying)
			frontSurface.GetComponent<Animation>().Play("10_idle");
		//if(!shipLight10s.animation.isPlaying)shipLight10s.animation.Play("10_light_idle");
	}


	void OnTriggerEnter(Collider collision) {
		if (collision.gameObject.name == "camDropBox")
			state.tunnel = true;
		if (collision.gameObject.name == "camDropBox2")
			state.tunnel2 = true;
		if (collision.gameObject.tag == "artifact" && collision.transform.position.z > 0) { // >0 necessary to stop double collisions and therefore playing the second at -100, for some reason
			ArtiBurst(collision.transform.position);
			collision.transform.position = new Vector3(collision.transform.position.x, collision.transform.position.y, -100);
			if (collision.gameObject.name == "artifact1") {
				if (gui.a1state == 0)
					artCount += 100;
				gui.a1state = 1;
				a1.UV = new Vector2(480, 0);
			}
			if (collision.gameObject.name == "artifact2") {
				if (gui.a2state == 0)
					artCount += 10;
				gui.a2state = 1;
				a2.UV = new Vector2(480, 0);
			}
			if (collision.gameObject.name == "artifact3") {
				if (gui.a3state == 0)
					artCount += 1;
				gui.a3state = 1;
				a3.UV = new Vector2(480, 0);
			} else if (collision.gameObject.name == "artifact0") { // special for tutorial
					gui.a1state++;
				}
		}
	}

	void OnTriggerExit(Collider collision) {
		if (!state.crashing) {
			if (collision.gameObject.name == "camDropBox")
				state.tunnel = false;
			if (collision.gameObject.name == "camDropBox2")
				state.tunnel2 = false;
		}
	}

	int raycheckDown(int which) {
		RaycastHit hit;
		float xRad = 0.9f;
		float zRad = 0.8f;
		float yRad = 0.9f;
		float rayDist = 0.73f;
		if (which == 2)
			rayDist = 1.2f;
		Vector3 pos = transform.position;
		int count = 0;
		Debug.DrawRay(new Vector3(pos.x + xRad, pos.y + yRad, pos.z + zRad), -Vector3.up * (rayDist), Color.green);
		Debug.DrawRay(new Vector3(pos.x - xRad, pos.y + yRad, pos.z + zRad), -Vector3.up * (rayDist), Color.green);
		Debug.DrawRay(new Vector3(pos.x + xRad, pos.y + yRad, pos.z - zRad), -Vector3.up * (rayDist), Color.green);
		Debug.DrawRay(new Vector3(pos.x - xRad, pos.y + yRad, pos.z - zRad), -Vector3.up * (rayDist), Color.green);
		//cast 4 down
		if (Physics.Raycast(new Vector3(pos.x + xRad, pos.y + yRad, pos.z + zRad), -Vector3.up, out hit, rayDist))
			if (hit.collider.tag != "Kill")
				count++;
		if (Physics.Raycast(new Vector3(pos.x - xRad, pos.y + yRad, pos.z + zRad), -Vector3.up, out hit, rayDist))
			if (hit.collider.tag != "Kill")
				count++;
		if (Physics.Raycast(new Vector3(pos.x + xRad, pos.y + yRad, pos.z - zRad), -Vector3.up, out hit, rayDist))
			if (hit.collider.tag != "Kill")
				count++;
		if (Physics.Raycast(new Vector3(pos.x - xRad, pos.y + yRad, pos.z - zRad), -Vector3.up, out hit, rayDist))
			if (hit.collider.tag != "Kill")
				count++;

		if (gameMaster.worldNum == 1)
			if (count > 0)
				level10on();

		return count;
	}

	int raycheckSide(int which) { // 0 = left check.  1 = right check
		RaycastHit hit;
		float zRad = 1.0f;
		float yH = 0.5f;
		float rayDist = 1.5f;
		Vector3 pos = transform.position;
		int count = 0;
		if (which == 0) { // left
			Debug.DrawRay(new Vector3(pos.x, pos.y + yH, pos.z + zRad), -Vector3.right * (rayDist), Color.green);
			Debug.DrawRay(new Vector3(pos.x, pos.y + yH, pos.z - zRad), -Vector3.right * (rayDist), Color.green);
			if (Physics.Raycast(new Vector3(pos.x, pos.y + yH, pos.z + zRad), -Vector3.right, out hit, rayDist))
				count++;
			if (Physics.Raycast(new Vector3(pos.x, pos.y + yH, pos.z - zRad), -Vector3.right, out hit, rayDist))
				count++;
		} else if (which == 1) { // right
				Debug.DrawRay(new Vector3(pos.x, pos.y + yH, pos.z + zRad), Vector3.right * (rayDist), Color.green);
				Debug.DrawRay(new Vector3(pos.x, pos.y + yH, pos.z - zRad), Vector3.right * (rayDist), Color.green);
				if (Physics.Raycast(new Vector3(pos.x, pos.y + yH, pos.z + zRad), Vector3.right, out hit, rayDist))
					count++;
				if (Physics.Raycast(new Vector3(pos.x, pos.y + yH, pos.z - zRad), Vector3.right, out hit, rayDist))
					count++;
			}

		return count;
	}


	int raycheckFront() {
		RaycastHit hit;
		float xRad = 0.9f;
		float zRad = 0.5f;
		float yRad = 1.6f;
		float rayDist = 4.0f;
		Vector3 pos = transform.position;
		int count = 0;
		Debug.DrawRay(new Vector3(pos.x + xRad, pos.y + 0.5f, pos.z + zRad), Vector3.forward * (rayDist), Color.green);
		Debug.DrawRay(new Vector3(pos.x - xRad, pos.y + 0.5f, pos.z + zRad), Vector3.forward * (rayDist), Color.green);
		Debug.DrawRay(new Vector3(pos.x + xRad, pos.y + yRad, pos.z + zRad), Vector3.forward * (rayDist), Color.green);
		Debug.DrawRay(new Vector3(pos.x - xRad, pos.y + yRad, pos.z + zRad), Vector3.forward * (rayDist), Color.green);
		//cast 4 down
		if (Physics.Raycast(new Vector3(pos.x + xRad, pos.y + 0.5f, pos.z + zRad), Vector3.forward, out hit, rayDist))
			count++;
		if (Physics.Raycast(new Vector3(pos.x - xRad, pos.y + 0.5f, pos.z + zRad), Vector3.forward, out hit, rayDist))
			count++;
		if (Physics.Raycast(new Vector3(pos.x + xRad, pos.y + yRad, pos.z + zRad), Vector3.forward, out hit, rayDist))
			count++;
		if (Physics.Raycast(new Vector3(pos.x - xRad, pos.y + yRad, pos.z + zRad), Vector3.forward, out hit, rayDist))
			count++;
		if (Physics.Raycast(new Vector3(pos.x, pos.y + 1, pos.z + zRad), Vector3.forward, out hit, rayDist))
			count++;
		return count;
	}

	public void crash(int type) { //type: 0=wall hit, 1=falling death (no sound or splode or wait)
		float secs = 0.0f;
		shad.enabled = false;
		state.crashing = true;	
		shad.enabled = false;
		cam.goalZ = rb.position.z + 2;
		//print(rigidbody.position);
		cam.mode = MoveCam.Mode.Stop;
		minZSpeed = 0;
		targetSpeed = 0;
		xf = 0;	
		brakes = true;

		if (type == 0) {	
			playSound("explode");
			splode.transform.position = rb.position;
			//		splodeParticles.GetComponent.<ParticleEmitter>().emit = true;
			splodeScript.lookAtCam = true;
			splodeScript.cardGo = true;
			//splodeScript.FPS=30*(1/gameMaster.gameSpeed);
			splodeScript.startTime = Time.time;
			secs = 1.55f;
		}
		levelAttempts++;
		Vector3 posStore = rb.position;
		rb.position = new Vector3(0, 0, 1000);
		// rigidbody.position.z-=10;
		rb.velocity = Vector3.zero;
//		yield WaitForSeconds(0.2);
		explosionMark.transform.position = posStore; 
		Transform exploSub = explosionMark.transform.Find("shadowProjectorExplosion");
		exploSub.localEulerAngles = new Vector3(0, 0, Random.Range(0, 360));
//		yield WaitForSeconds(secs);
		reset(0);
	}

	void win() {
		//artCount=(gui.a1state*100)+(gui.a2state*10)+gui.a3state;
		bool ultimateWin = false;
		PlayerPrefs.SetInt("Level" + level + "ArtCount", artCount);

		if (shipNum == 10) {
			if (gameMaster.pantherFlagScript.on == 1) {
				PlayerPrefs.SetInt(("Level" + level + "PantherFlag"), 1);
				print("panther woooooo");	
			}
		}
		//curTime = state.elapsedTime;
		//	print("current time: "+curTime);
		//	print("record time: "+PlayerPrefs.GetFloat("Level"+level+"Time", 60.00));
		//	print("artifact: "+artCount);
		if (gameMaster.saveTime(gui.curTime))
			newRecord = true; // savetime here. Like panthers and artifacts, must set player prefs before deciding whether to victory cruise or outro
		else
			newRecord = false;
		// print ("Level: "+level+"   Time: "+gui.curTime);
		playSound("win");
		cam.mode = MoveCam.Mode.Stop;
		state.winning = true;
		if (sfx && engineAudio.activeSelf)
			engineAudio.GetComponent<AudioSource>().Stop();
		minZSpeed = 0;
		targetSpeed = 0;
		xf = 0;
		cam.goalZ = warpPath.transform.position.z + 7;

		rb.position = new Vector3(0, 0, 1000);
//		yield WaitForSeconds(2.5);
		gui.camBlack("down");
//		yield WaitForSeconds(blackerPause);

		// ultimate win conditions
		if (gameMaster.gamePhase < 2) { // <2 means Safe for the unlikely eventuality that someone beats the last level and gets the last artifact on the same run!
			// nested ifs so it doesn't run count___ for everything, every time
			if (gameMaster.countArtifacts() == 180) {
				ultimateWin = true;
				PlayerPrefs.SetInt("GamePhase", 2);
				gameMaster.gamePhase = 2;
				PlayerPrefs.SetInt("ShipNum", 10);
				PlayerPrefs.SetInt("Level", 61);
				PlayerPrefs.SetInt("TutorialState", 2);
				PlayerPrefs.SetInt("CinemaState", 4);
				PlayerPrefs.SetInt("Quit", 1);
				// print("goto Outro 2");	
				Application.LoadLevel(4);
			} 
			if (gameMaster.gamePhase == 0) {
				//print("Levels beaten: "+gameMaster.countLevels());
				if (gameMaster.countLevels() == 60) {
					ultimateWin = true;
					PlayerPrefs.SetInt("GamePhase", 1);
					PlayerPrefs.SetInt("MaxLevel", 59);
					gameMaster.gamePhase = 1;
					PlayerPrefs.SetInt("CinemaState", 3);
					PlayerPrefs.SetInt("Quit", 1);
					//print("goto Outro 1");
					Application.LoadLevel(3);
				}
			}
		} else if (gameMaster.gamePhase == 2) { 
				if (gameMaster.countPanthers() == 60) {
					ultimateWin = true;
					PlayerPrefs.SetInt("GamePhase", 3);
					PlayerPrefs.SetInt("CinemaState", 5);
					gameMaster.gamePhase = 3; // no longer counting panthers
					PlayerPrefs.SetInt("Quit", 1);
					Application.LoadLevel(6);
				}
			}
		// else {
		if (!ultimateWin) {
			if (level < 60)
				victoryCruise();

			if (level >= 60 && level <= 61) {	
				if (PlayerPrefs.GetInt("FromLS", 0) == 1) {
					PlayerPrefs.SetInt("Quit", 2);
					Application.LoadLevel(0);
				} else {
					if (level == 60) {
						//gameMaster.level=0;
						PlayerPrefs.SetInt("Level", 0);
						Application.LoadLevel(1);	
					}
					if (level == 61) {
						PlayerPrefs.SetInt("Quit", 2);
						Application.LoadLevel(0);
					}
				}
			}	
		}
	}


	void victoryCruise() {
		Time.timeScale = 1;
		disableGUI();
		System.GC.Collect();
		gui.updateVC();
		gui.switchGUI("victoryCruise");
		RenderSettings.fogStartDistance = 10;
		RenderSettings.fogEndDistance = 300;
		//rigidbody.isKinematic=true;
		playSound("vc");
		anim.Stop();
		state.winning = false;
		state.cruising = true;
		state.crashing = false;
		state.jumps = 2;
		vcfly();
		cam.goalHeight = 0;
		if (newRecord)
			cam.newRecordCheck = true;

		gameMaster.incrementLevel();
//		Destroy(gameMaster.bgScript.currBG.gameObject);
		gameMaster.bgScript.killBackground();
		gameMaster.killLevel();
		anim2.Play("winCruise1");	
		repoShip();	

//		rb.position.x = 0;
		cam.switchTo(MoveCam.Mode.Win);
		gui.message = "none";
		explosionMark.transform.position = new Vector3(0, 0, -50);
		//	gui.updateVC();
		//	gui.switchGUI("victoryCruise");

		targetSpeed = 0;
		//make star streaks
		warpTubeObj = Instantiate(warpTubePF, Vector3.zero, Quaternion.identity) as Transform;
		// make star lights
		for (int i = 1; i <= 20; i++) {
			shipWarpRefl[i] = Resources.Load<Texture2D>("ship/world" + gameMaster.worldNum + "_warpRefl/world" + gameMaster.worldNum + "_warpRefl_" + i);
		}
		InvokeRepeating("ReflectWarpTube", 0, 0.04f);
		//var lsScript: LightShooter = cruiseLightsObj.GetComponent(LightShooter);
		//lsScript.worldNum=gameMaster.worldNum;
		// cruiseLightsObj.parent = cam.transform;
		//cruiseLightsObj.localPosition = Vector3(0, 1, -10);	
		gui.resetVC();

		gui.camBlack("up");
		gui.playAnim(1.9f);
	}


	void ReflectWarpTube() {
		shipMat.SetTexture("_Shad", shipWarpRefl[f]);
		f++;
		if (f > 20)
			f = 1;
	}


	void enableGUI() {
		if (gui.state == "play" && level < 60) {
			for (int i = 0; i < guiObjs.Length; i++) {
				guiObjs[i].Enabled = true;
				guiObjs[i].Visible = true;
			}
		} else {
			for (int i = 0; i < guiObjs.Length; i++) {
				if (guiObjs[i].name == "Brake" || guiObjs[i].name == "Jump") {
					guiObjs[i].Enabled = true;
					guiObjs[i].Visible = true;
				} else {
					guiObjs[i].Enabled = false;
					guiObjs[i].Visible = false;
				}
			}
		}
		guiCam.enabled = true;
		//speedbarMat.color.a = 100;
		//jumpBarMat.color.a = 100;
	}

	void disableGUI() {
		for (int i = 0; i < guiObjs.Length; i++) {
			guiObjs[i].Enabled = false;
			guiObjs[i].Visible = false;
		}
		guiCam.enabled = false;
		//speedbarMat.color.a = 0;
		//jumpBarMat.color.a = 0;
	}

	void titleScreen() {
		disableGUI();
		musicSourceScript.StopTrack();
		if (gameMaster.worldNum != 1) {
			RenderSettings.fogStartDistance = 110;
			RenderSettings.fogEndDistance = 190;
		} else {
			RenderSettings.fogStartDistance = 150;
			RenderSettings.fogEndDistance = 300;	
		}
		state.cruising = true;
		state.crashing = false;
		state.jumps = 2;
		cam.goalHeight = -1;
		targetSpeed = 0;
		cam.switchTo(MoveCam.Mode.Title);
		anim2.Play("titleCruise");	
		repoShip();	
		if (sfx && engineAudio.activeSelf)
			engineAudio.GetComponent<AudioSource>().Stop();
		rb.position = new Vector3(0, 1000, 0);
		gui.camBlack("up");	
	}

	public void repoShip() {
		//print("repoShip");
		xf = 0;
		grav = 0;
		targetSpeed = 0;
		rb.velocity = Vector3.zero;
		rb.position = gameMaster.startPos + new Vector3(0, 5, 0);	
		state.lastY = rb.position.y;
		rb.rotation = Quaternion.identity;
		anim2.transform.localPosition = Vector3.zero;

//		yield WaitForSeconds(blackerPause);
		grav = defGrav;
		state.grounded = false;
		state.jumpTimer = 0.25f;
	}


	public void resetRepoShip() {
		//print("repoShip");
		qbClear = false;
		xf = 0;
		grav = 0;
		targetSpeed = 0;
		rb.velocity = Vector3.zero;
		rb.position = gameMaster.resetPos[gameMaster.rPointCounter] + new Vector3(0, 5, 0);	
		state.lastY = rb.position.y;
		rb.rotation = Quaternion.identity;
		anim2.transform.localPosition = Vector3.zero;
//		yield WaitForSeconds(blackerPause);
		grav = defGrav;
		state.grounded = false;
		state.jumpTimer = 0.25f;
		gameMaster.rPointCounter++;
	}


	void level10null() {
		topSurface = null;
		sideSurface = null;
		frontSurface = null;
		//shipLight10s = null;	
	}

	void level10Init() {
		topSurface = GameObject.Find("topSurfaces");
		sideSurface = GameObject.Find("sideSurfaces");
		frontSurface = GameObject.Find("frontSurfaces");
		//var shipLightTemp : GameObject = gameObject.Find("/Ship/ShipLighting1(Clone)/bottomLight");
		//shipLight10s = shipLightTemp.GetComponent(Light);
	}

	public void reset(int type) { // 0: regular 1: after victory cruise 2: vary beginning 3: skip title check
		System.GC.Collect();
		if (gameMaster.worldNum == 1)
			level10null();
		if (type != 2) {
			gui.camBlack("down");
//			yield WaitForSeconds(blackerPause);
		}

		if (warpTubeObj) {
			levelAttempts = 1;
			Destroy(warpTubeObj.gameObject);
			//Destroy(cruiseLightsObj.gameObject);
			//boosterLightSwitch(true);	
		}
		if (restarted) {
			levelAttempts++;
			restarted = false;
		}
		if (gui.state == "tutorial")
			gui.lineCount = -1;

		level = gameMaster.level;
		artCountSaved = PlayerPrefs.GetInt(("Level" + level + "ArtCount"), 000);	
		Xspeed = 0;	
		state.started = false;
		state.elapsedTime = 0;
		state.stopDead = false;
		state.fullStop = false;
		gameMaster.killLevel();
		state.jumpStore = false;
		minZSpeed = 0;
		brakeOverride = false;
		targetSpeed = 0.0f;
		gameMaster.updateWorld();
		if (sfx && engineAudio.activeSelf)
			engineAudio.GetComponent<AudioSource>().Stop();

		CancelInvoke("ReflectWarpTube");
		for (i = 1; i <= 20; i++) {
			shipWarpRefl[i] = null;
		}
		shipMat.SetTexture("_Shad", Resources.Load<Texture2D>("ship/world" + gameMaster.worldNum + " Refl"));
		// gui.VCbuttonState=0;

		state.tunnel = false;
		state.tunnel2 = false;
		jumpMult = 1.0f;

		resetCards();
		explosionMark.transform.position = new Vector3(0, 0, -50);

		if (gameMaster.level % 10 == 0 && levelAttempts == 1 && type != 3 && gameMaster.worldNum != 6) {
			titleScreen();
			gui.switchGUI("clear");
		} else {
			if (gameMaster.worldNum == 6)
				gui.switchGUI("tutorial");
			else
				gui.switchGUI("play");
			disableGUI();
			enableGUI();
			state.title = false;

			if (gameMaster.worldNum == 5 || gameMaster.worldNum == 1)
				RenderSettings.fogStartDistance = 100;
			else
				RenderSettings.fogStartDistance = 10;
			RenderSettings.fogEndDistance = 300;
			//engineAudio.audio.Play();
			shad.enabled = true;
			state.crashing = false;
			state.cruising = false;
			state.jumps = 2;
			state.landed = false;
			gui.message = "none";
			gameMaster.makeLevel();
			xf = 0;
			sub.rotation = Quaternion.Euler(0, 0, 0);
			cam.switchTo(MoveCam.Mode.Play);
			//gameMaster.bgScript.switchTo("play");
			anim2.Stop();
			if (shipNum == 10) {
				anim.Stop("jump");
				anim.Play("jump");
			} // start panther out mid-jump rather than standing
			else
				anim.Play("idle");
			yf = false;
			state.jbClear = true;
			//repoShip();
			brakes = true;
			musicSourceScript.SetTrack();
		}
		artCount = artCountSaved;
		UpdateArtIcons();
		System.GC.Collect();


		gameMaster.resetEasy();
		if (gameMaster.worldNum == 1)
			level10Init();
	}

	void checkGates() {
		foreach (Transform gate in gameMaster.gateways) {
			if (gate != null && !state.winning) {
				float dist = Vector3.Distance(gate.position + new Vector3(0, 3, 0), transform.position);
				if (dist < gateDist) {
					winCards(gate.position); 
					win();
				}
			}
		}
	}

	public void stopDead() {
		if (!state.stopDead) {
			print("Stoppin'....Dead");
			playSound("land");

			state.stopDead = true;
			rb.velocity = new Vector3(rb.velocity.x, rb.velocity.y, 0);
			minZSpeed = 0;
			targetSpeed = 0;
		}
	}

	void bounceBack() {

		rb.position += Vector3.back;
		rb.velocity = new Vector3(rb.velocity.x, rb.velocity.y, -30);
		//rigidbody.velocity.x=0;
		targetSpeed = 0;
		state.stunned = true;
//		yield WaitForSeconds(0.2);
		state.stunned = false;
	}

	void resetCards() {
		//reset explosion
		//if (splodeInst) Destroy(splodeInst);
		//splodeInst = Instantiate(splode, Vector3(0,0,-100), Quaternion.identity) as GameObject;
		splode.transform.localEulerAngles = new Vector3(336, 180, 180);
		splode.transform.position = new Vector3(0, 0, -100);
		splodeScript = splode.GetComponentInChildren<CardAnim>();
		splodeParticles = splode.GetComponentInChildren<ParticleEmitter>();
		//	splodeParticles.GetComponent.<ParticleEmitter>().emit = false;
		//reset win cards
		for (int i = 0; i < 2; i++) {
			elecBurst[i].transform.parent = null;
			elecBurst[i].transform.position = new Vector3(0, 0, -100);
		}
		warpPath.transform.position = new Vector3(0, 0, -100);
		warpPathAniObj.GetComponent<Animation>().Rewind("warpPath");
	}

	void playSound(string which) { // jump, land, win, explode
		int rando = 0;
		if (sfx) {
			if (which == "jump") {
				if (shipNum != 10) {
					rando = (int)Random.Range(0, 2);
					GetComponent<AudioSource>().PlayOneShot(sound.jump[rando]);
				} else {
					GetComponent<AudioSource>().PlayOneShot(sound.jump[4]);
				}
			} else if (which == "jump2") {
					if (shipNum != 10)
						GetComponent<AudioSource>().PlayOneShot(sound.jump[2]);
					else
						GetComponent<AudioSource>().PlayOneShot(sound.jump[5]);
				} else if (which == "land") {
						GetComponent<AudioSource>().PlayOneShot(sound.metalHit);
					} else if (which == "explode") {
							rando = Random.Range(0, 2);
							GetComponent<AudioSource>().PlayOneShot(sound.explosion[rando]);
						} else if (which == "win") {
								GetComponent<AudioSource>().PlayOneShot(sound.winGate);
							} else if (which == "vc") {
									if (shipNum != 10)
										GetComponent<AudioSource>().PlayOneShot(sound.VCsound[0]);
									else
										GetComponent<AudioSource>().PlayOneShot(sound.VCsound[1]);
								}
		}
	}


	void speedUpX() {
		for (int i = 0; i <= maxXspeed; i++) {
			Xspeed = i;
//			yield WaitForSeconds(0.01);
		}
	}

	public void speedUpZ() {
		brakeOverride = true;
		while (minZSpeed < minZBrake) {
			minZSpeed = Mathf.Clamp(targetSpeed, 0, minZBrake);
//			yield;
		}
		minZSpeed = minZBrake;
		brakeOverride = false;
	}

	void disableX(int which) {
		state.xDisabled = which;
		//	state.handling=2;
		for (int i = 1; i <= maxXspeed; i++) {
			if (i < 12)
				state.handling = maxXspeed / i;
			if (i == 12)
				state.xDisabled = 0;
//			yield WaitForSeconds(0.01);
			if (i == maxXspeed) {
				if (!state.grounded)
					state.handling = airHandling;
			}
		}
	}

}
