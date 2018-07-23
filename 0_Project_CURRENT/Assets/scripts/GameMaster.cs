using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameMaster : MonoBehaviour {
	public enum DeviceType {
		Computer,
		iPhone
		}

	public DeviceType device;

	public enum DiagMode {
		Player,
		Programmer
		}

	public DiagMode diagMode;

	public BG_plane bgScript;
	public GUIScript gui;
	public MoveShip ship;
	public MoveCam cam;
	public GameObject pantherFlag;
	public PantherFlagScript pantherFlagScript;
	GameObject musicSource;

	public int level;
	bool clearData;
	bool setData;

	public class SetDataState {
		public int GamePhase;
		public int ShipNum;
		public int MaxLevel;
		public int Level;
		public int gameSpeed;
	}

	public SetDataState sd = new SetDataState();

	public int worldNum;
	public int gamePhase;
	public float gameSpeed;
	public Vector3 startPos;
	public Vector3[] resetPos;
	public int rPointCounter = 0;
	public int shipNum;
	public GameObject currLevel;
	GameObject which;
	public Material topMat;
	public Material sideMat;
	public Material sideFadeMat;
	public Material frontFadeMat;
	public Material frontMat;
	public Color[] topColor;
	public Color[] topSpec;
	public Color[] sideColor;
	public Color[] frontColor;
	Light levelLight;
	public Color[] levelLightColor;

	GameObject pauseMenuPF;
	private GameObject pauseMenuObj;
	public Transform[] newCubePF;
	public Transform gatewayPF;
	public Material gatewayMat;
	public Transform artifactPF;
	public Material artMat1;
	public Material artMat2;
	public Material artMat3;
	//var artColor: Color[];
	public ArtifactColor[] artBurstColorScript;
	int artCount;
	public int checkpoint = 0;

	//var elecBurstMats: Material[];
	public Color[] burstColor;

	public PhysicMaterial topPhysMaterial;
	public PhysicMaterial sidesPhysMaterial;

	private float shrinkSides = 0.3f;
	private float boosterR;
	private float boosterG;
	private float boosterB;

	public Transform[] gateways;
	int music = 1;
	public string[] worldTrackName;

	float oldRecord;
	TutScript tutScript;




	void Awake() {
		if (GameObject.Find("MusicSource") == null) {
			musicSource = Instantiate(Resources.Load<GameObject>("MusicSource"), Vector3.zero, Quaternion.identity) as GameObject;
		}
	
		if (Application.platform == RuntimePlatform.IPhonePlayer) {
//		TouchScreenKeyboard.autorotateToPortrait = false; 
//		TouchScreenKeyboard.autorotateToPortraitUpsideDown = false; 
//		TouchScreenKeyboard.autorotateToLandscapeRight = false; 
//		TouchScreenKeyboard.autorotateToLandscapeLeft = false;

		}
	
//	updateGameSpeed(PlayerPrefs.GetInt("GameSpeed", 1));
//	Time.timeScale=gameSpeed;
	}

	void Start() {
	
		if (clearData) { // set in gameMaster... for diag purposes
			for (int i = 0; i < 60; i++) {
				PlayerPrefs.SetFloat(("Level" + i + "Time"), 99.99f);
				PlayerPrefs.SetInt(("Level" + i + "ArtCount"), 000);
				PlayerPrefs.SetInt(("Level" + i + "PantherFlag"), 0);
			}	
		
			PlayerPrefs.SetInt("SawIntro", 0);
			PlayerPrefs.SetInt("GamePhase", 0);
			PlayerPrefs.SetInt(("MaxLevel"), 0);	
			PlayerPrefs.SetInt(("Level"), 0);	
			PlayerPrefs.SetInt(("ArtCount"), 0);
			
			PlayerPrefs.SetInt("CinemaState", 1);
			PlayerPrefs.SetInt("TutorialState", 1);
			PlayerPrefs.SetInt("FromLS", 0);
		}
	
		if (setData) { 
			PlayerPrefs.SetInt(("Level"), sd.Level);	
			PlayerPrefs.SetInt("GamePhase", sd.GamePhase);
			PlayerPrefs.SetInt(("ShipNum"), sd.ShipNum);
			PlayerPrefs.SetInt("GameSpeed", sd.gameSpeed);
		
			if (sd.GamePhase > 0) { 
				sd.MaxLevel = 59;
				if (sd.GamePhase == 1) {
					PlayerPrefs.SetInt("TutorialState", 1);
					PlayerPrefs.SetInt("CinemaState", 3);
				}
				if (sd.GamePhase == 2) {
					PlayerPrefs.SetInt("TutorialState", 2);
					PlayerPrefs.SetInt("CinemaState", 4);
				}
			} else {
				PlayerPrefs.SetInt("TutorialState", 1);
				PlayerPrefs.SetInt("CinemaState", 1);
			}
		
			PlayerPrefs.SetInt(("MaxLevel"), sd.MaxLevel);

		
			for (int i = 0; i <= sd.MaxLevel; i++) {
				PlayerPrefs.SetFloat(("Level" + i + "Time"), 66.66f);
			}	
			if (sd.GamePhase > 1) {
				for (int i = 0; i <= sd.MaxLevel; i++) {
					PlayerPrefs.SetInt(("Level" + i + "ArtCount"), 111);
				}
			}
		
			// special conditions

			for (int i = 0; i < 60; i++) {
				//PlayerPrefs.SetFloat(("Level"+i+"Time"), 55.55);
				PlayerPrefs.SetInt(("Level" + i + "ArtCount"), 000);
				//PlayerPrefs.SetInt(("Level"+i+"PantherFlag"), 1);
			}
			PlayerPrefs.SetInt(("Level21PantherFlag"), 0);
			PlayerPrefs.SetInt(("Level8ArtCount"), 010);
		
			PlayerPrefs.SetInt(("Level29ArtCount"), 110);
//		PlayerPrefs.SetInt(("Level12ArtCount"), 110);
			countArtifacts();
		}
	

		shipNum = PlayerPrefs.GetInt("ShipNum", 1);	

		level = PlayerPrefs.GetInt(("Level"), 0);	
		worldNum = (int)Mathf.Floor(level / 10);
		gamePhase = PlayerPrefs.GetInt("GamePhase", 0);
//	print("gp: "+gamePhase);
		music = PlayerPrefs.GetInt("Music", 1);
		if (shipNum != 10)
			pantherFlag.transform.position = new Vector3(0, 0, -100);
	}

	public void updateGameSpeed(int num) {
		gameSpeed = 0.75f + (num * 0.125f);
		PlayerPrefs.SetInt("GameSpeed", num);
		gui.gameSpeed = num;
		if (level == 60 || level == 61) { 
			tutScript.timeInc = 0.017f * gameSpeed; 
			tutScript.pauseInc = 0.035f * gameSpeed; 
		}
	}

	public void updateWorld() {
		if (gui.tutorialState < 1 && level == 60) {
			gui.tutorialState = 1;
			PlayerPrefs.SetInt("TutorialState", 1);
		}
		if (gui.tutorialState < 2 && level == 61) {
			gui.tutorialState = 2;
			PlayerPrefs.SetInt("TutorialState", 2);
		}
		/*
	if(gui.tutorialState<3 && level==69) {
		gui.tutorialState=3;
		PlayerPrefs.SetInt("TutorialState",3);
	}
	*/
		worldNum = bgScript.changeBackground(level);
		gatewayMat.mainTexture = Resources.Load<Texture>("world" + worldNum + "_warpGate");
		colorBursts();
		gui.worldNum = worldNum;
		gui.updateLevel();
		/*
	topMat.SetColor( "_Emission", topColor[worldNum]);
	topMat.SetColor( "_SpecColor", topSpec[worldNum]);
	sideMat.SetColor( "_Emission", sideColor[worldNum]);
	frontMat.SetColor( "_Emission", frontColor[worldNum]);
	frontFadeMat.SetColor( "_Emission", frontColor[worldNum]);
	sideFadeMat.SetColor( "_Emission", sideColor[worldNum]);
	*/
		//levelLight.color = levelLightColor[worldNum];
		
	
	}

	void colorBursts() {
		artMat1.SetColor("_TintColor", new Vector4((1 - burstColor[worldNum].r) / 4 + burstColor[worldNum].r, (1 - burstColor[worldNum].g) / 4 + burstColor[worldNum].g, (1 - burstColor[worldNum].b) / 4 + burstColor[worldNum].b, 1));
		artMat2.SetColor("_Emission", burstColor[worldNum]);
		artMat3.SetColor("_TintColor", new Vector4((1 - burstColor[worldNum].r) / 8 + burstColor[worldNum].r, (1 - burstColor[worldNum].g) / 8 + burstColor[worldNum].g, (1 - burstColor[worldNum].b) / 4 + burstColor[worldNum].b, 1));

		for (int i = 0; i <= 3; i++) {
			if (i < 1)
				artBurstColorScript[i].colorBurst(burstColor[worldNum] / 2, "_Emission");
			else
				artBurstColorScript[i].colorBurst(new Vector4((1 - burstColor[worldNum].r) / 4 + burstColor[worldNum].r, (1 - burstColor[worldNum].g) / 4 + burstColor[worldNum].g, (1 - burstColor[worldNum].b) / 4 + burstColor[worldNum].b, 1), "_TintColor");

		}
	}

	void artifactInit() {
//***new */
		if (level < 60) {
			artCount = PlayerPrefs.GetInt("Level" + level + "ArtCount", 000);
			gui.a1state = (int)Mathf.Floor(artCount / 100);	
			gui.a2state = (int)Mathf.Floor((artCount % 100) / 10);
			gui.a3state = (int)artCount % 10;
//		print("LEVEL: "+level);
//		print("artifacts: "+artCount);
//		print("recordTime: "+PlayerPrefs.GetFloat("Level"+level+"Time",0));
//		print("worldnum = "+worldNum);
		} else {
			gui.a1state = 0;	
			gui.a2state = 0;
			gui.a3state = 0;
		}	
	}

	public void makeLevel() {
		print("makeLevel!");
		updateWorld();

		artifactInit();	
//	print("makeLevel");
		//var which: GameObject = levelList[level];
		if (level < 10)
			which = Resources.Load<GameObject>("level_10" + level);
		else
			which = Resources.Load<GameObject>("level_1" + level);
	
		currLevel = Instantiate(which, Vector3.zero, Quaternion.identity) as GameObject;
	
		gui.level = level;
		//currLighting = Instantiate(lightingList[worldNum], Vector3(0,0,0), Quaternion.identity) as Transform;
		//currLighting.parent = cam.transform;
		//currLighting.transform.localPosition=Vector3(0,0,0);
		//currLighting.transform.localEulerAngles=Vector3(0,0,0);

		//currShipLighting = Instantiate(shipLightingList[worldNum], Vector3(0,0,0), Quaternion.identity) as Transform;
		//currShipLighting.parent=ship.transform;
		//currShipLighting.transform.localPosition=Vector3(0,0,0);
		//currShipLighting.transform.localEulerAngles=Vector3(0,0,0);
		startPos = Vector3.zero;
		resetPos[0] = Vector3.zero;
	
		replaceCubes(currLevel);
	
		Transform winCube = currLevel.transform.Find("gateway");
		if (winCube) {
			//gui.winDist=winCube.position.z;
			ship.winDist = winCube.position.z;
		}
		//var lom: GameObject = Instantiate(lomPF, startPos, Quaternion.identity) as GameObject;
		//lomScript = lom.GetComponent(LOMScript);
		//lom.transform.parent=currLevel.transform;
		//resetEasy();
		if (level == 60 || level == 61) {
			tutScript = currLevel.GetComponent<TutScript>();
		}
		updateGameSpeed(PlayerPrefs.GetInt("GameSpeed", 1));
		Time.timeScale = gameSpeed;
		batchLevelMove();
	}

	void batchLevelMove() {
		currLevel.transform.position = new Vector3(0, 0, ship.winDist / -2);
//	yield;
		currLevel.transform.position = Vector3.zero;
	}



	public void killLevel() {
		if (pantherFlag) {
			pantherFlag.transform.position = new Vector3(0, 0, -100);
			pantherFlagScript.pantherAudio.Stop();
		}
		//print("killLevel");
		Destroy(currLevel);
		//if (currLighting) Destroy(currLighting.gameObject);
		//if (currShipLighting) Destroy(currShipLighting.gameObject);
	}


	void replaceCubes(GameObject currLevel) {
		//print("replaceCubes");
		List<Transform> cubes = new List<Transform>();

		int gs = 0;
		rPointCounter = 0;
		// dupe array prevents endless for in loop when you parent new stuff back or Destroy under currLevel
		foreach (Transform cube in currLevel.transform) {
			cubes.Add(cube);
		}
		int artNum = 0;
		int a1 = (int)Mathf.Floor(artCount / 100);	
		int a2 = (int)Mathf.Floor((artCount % 100) / 10);
		int a3 = (int)artCount % 10;
	
		foreach (Transform cube in cubes) {
			Transform newObj = null;
			bool destroy = false;
		
			if (cube.tag == "Finish") {
				newObj = Instantiate(gatewayPF, cube.position, cube.rotation) as Transform;
				gateways[gs] = newObj;
				gs++;
				destroy = true;
			} else if (cube.tag == "artifact") {
					if (gamePhase < 2) {
						artNum++;
						if ((artNum == 1 && a1 == 0) || (artNum == 2 && a2 == 0) || (artNum == 3 && a3 == 0)) {
							newObj = Instantiate(artifactPF, cube.position, cube.rotation) as Transform;
							newObj.name = "artifact" + artNum;
						}
					}
					destroy = true;
				} else if (cube.name == "pantherFlagPos") {
						if (shipNum == 10) {
							pantherFlag.transform.position = cube.transform.position;
						}
						destroy = true;
					} else if (cube.name == "LevelNumText") {
							destroy = true;
							continue;
						} else if (cube.tag == "StartPos") {
								startPos = cube.position;
								destroy = true;
							} else if (cube.tag == "ResetPos") {
									resetPos[rPointCounter++] = cube.position;
									destroy = true;
								} else if (cube.tag == "EditorOnly")
										destroy = true;
			//else if (cube.name=="camDropBox" || cube.name=="camDropBox2") cube.gameObject.layer=2;
			//else if (ship.shipNum==10 && (cube.name=="camDropBox" || cube.name=="camDropBox2"))	destroy = true;
			if (newObj != null)
				newObj.parent = currLevel.transform;
			if (destroy)
				Destroy(cube.gameObject);
		}
		rPointCounter = 0;
	
	}

	Transform cubeRep(Transform cube) {
		Transform newObj;
		int cubeDiv = (int)Mathf.Abs(cube.localScale.x / 4);

		if (cubeDiv < 1)
			cubeDiv = 1;
		float mult = 0.5f;
		if (cube.tag == "DiagA1") {
			cubeDiv += 30;
			if (cubeDiv > 33)
				cubeDiv = 33;
		} else if (cube.tag == "DiagA2") {
				cubeDiv += 40;
				if (cubeDiv > 42)
					cubeDiv = 42;
			} else if (cube.tag == "DiagB1") {
					cubeDiv += 50;
					mult = 1.0f;
				} else if (cube.tag == "DiagB2") {
						cubeDiv += 60;
						mult = 1.5f;
					} else if (cube.tag == "Kill") {
							cubeDiv = 20;
						}
		// print(cubeDiv);
		if (cubeDiv < 1)
			cubeDiv = 1;
		if (cubeDiv > 10 && cubeDiv < 20)
			cubeDiv = 10;
		// print(cubeDiv);
		newObj = Instantiate(newCubePF[cubeDiv], cube.position, cube.rotation) as Transform;

		newObj.localScale = cube.localScale;
		if (cube.localScale.x < 0)
			switchLR(newObj);
	
		CubeConvert newObjScript = newObj.gameObject.GetComponent<CubeConvert>();
		newObjScript.gameMaster = this;
		newObjScript.ship = ship.transform;
		newObjScript.cubeDiv = cubeDiv;
		newObjScript.frontZ = cube.position.z - (cube.localScale.z * mult);
		newObjScript.backZ = cube.position.z + (cube.localScale.z * mult);

		if (cube.tag == "StartCube") {
			makeColls(newObj, cubeDiv);
			newObjScript.converted = true;
		}

		return newObj;
	}


	void switchLR(Transform cube) {
		Transform or = cube.Find("right2");
		Transform ol = cube.Find("left2");
		if (or)
			or.name = "left2";
		if (ol)
			or.name = "right2";
		or = cube.Find("right");
		ol = cube.Find("left");
		if (or)
			or.name = "left";
		if (ol)
			ol.name = "right";
	}

	public void makeColls(Transform cube, int cubeDiv) {
		// var sub: Transform;

		if (cubeDiv > 30) {	
			Transform meshy = cube.transform.Find("mesh");
			MeshCollider mc = meshy.gameObject.AddComponent<MeshCollider>();
			mc.material = topPhysMaterial;
		} else { 
			BoxCollider bc = cube.gameObject.AddComponent<BoxCollider>();
			bc.material = topPhysMaterial;
		}
	}

	void SetLayerRecursively(GameObject obj, int newLayer) {
		obj.layer = newLayer;
		foreach (Transform child in obj.transform) {
			SetLayerRecursively(child.gameObject, newLayer);
		}
	}

	public void incrementLevel() {
		level++;
		if (level == 60)
			level = 0;
		PlayerPrefs.SetInt("Level", level);
		if (level < 60 && level > PlayerPrefs.GetInt("MaxLevel", level))
			PlayerPrefs.SetInt("MaxLevel", level);
	}


	public void setLevel(int lev) {
		level = lev;
		PlayerPrefs.SetInt("Level", lev);
	}

	public bool saveTime(float t) {
		oldRecord = PlayerPrefs.GetFloat(("Level" + level + "Time"), 99.99f);
		if (t < oldRecord) {
			PlayerPrefs.SetFloat(("Level" + level + "Time"), t);
			return true;
		} else
			return false;
	}

	public int countPanthers() {
		int flagTotal = 0;
	
		for (int i = 0; i < 60; i++) {
			if (PlayerPrefs.GetInt("Level" + i + "PantherFlag", 0) == 1)
				flagTotal++;
		}
		return flagTotal;
	}

	public int countArtifacts() {
		int artTotal = 0;
	
		for (int i = 0; i < 60; i++) {
			int tempCount = PlayerPrefs.GetInt("Level" + i + "ArtCount", 0);
			int a1 = (int)Mathf.Floor(tempCount / 100);	
			int a2 = (int)Mathf.Floor((tempCount % 100) / 10);
			int a3 = (int)tempCount % 10;
			artTotal += a1 + a2 + a3;
		}
	
		PlayerPrefs.SetInt("ArtCount", artTotal);
		return artTotal;
	}

	public int countLevels() {
		int levTotal = 0;
	
		for (int i = 0; i < 60; i++) {
			if (PlayerPrefs.GetFloat("Level" + i + "Time", 99.99f) < 90.0f)
				levTotal++;
		}
	
		return levTotal;
	}


	public void resetEasy() {
		// ***new
		//lomScript.UpdateNumbers(level);
		if (shipNum == 10)
			pantherFlagScript.InitFlag();
		else
			Destroy(pantherFlag);
		if (checkpoint > 0) {
			rPointCounter = checkpoint;
			ship.resetRepoShip(); 
		} else {
			ship.repoShip();
		}
				
		gui.camBlack("up");	
	}
}
