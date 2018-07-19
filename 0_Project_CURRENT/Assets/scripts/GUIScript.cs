using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GUIScript : MonoBehaviour {

	string touchPhase = "None";
	bool nextGo = true;
	Vector2 deltaPos;
	Vector2 lastPos;
	Vector2 beganPos;
	Vector2 endedPos;
	int checkButton = 0;

	bool swiping = false;

	Texture2D[] pantherIcon;
	public int[] pantherFlag;
	Texture2D section1;
	Texture2D section2;
	Texture2D menuButton;
	Texture2D dash;
	Texture2D nextButton;
	Texture2D arrow;
	Texture2D bottomDivider;
	Texture2D levelReadout;
	float topGrpY = -100;
	float btmGrpY = 100;
	Vector2 btmDividerPos;
	Vector2 section1Pos;
	Vector2 section2Pos;
	Vector2 section3Pos;
	Vector2 section4Pos;
	Vector2 menuButtonPos;
	Vector2 nextButtonPos;
	float dashX;
	float arrowX;
	Texture2D[] VCartIcon;

	int cinemaState;
	string[] cinString;
	int cinLevel = 0;
	public int tutorialState;
	string[] tutString;
	int tutLevel = 0;
	string whichLoad;
	Texture2D bgImage;

	// var speedImage : Texture2D;
	Texture2D destImage;
	Texture2D camBlackImage;
	Texture2D shipIcon;
	//var artifactContainer: GameObject;
	Texture2D[] brakeStates;

	Texture2D transWhite;
	Texture2D whiteFadeDown;

	public Texture2D crashMessage;
	public Texture2D winMessage;
	public Texture2D timeMessage;

	public MoveShip ship;
	public float winDist;
	public string message = "none";
	public int level;
	private int guiWidth = 320;
	private int guiHeight = 20;
	float timeAllowed;
	private string camBlackState = "down";
	Animation camBlackAnim;
	float camBlackWipe = 0;
	private float blackerWidth = 512.0f;

	private float moveInc = Screen.width / 7;
	public float blackerPause = 0.4f;
	float progress;

	private int buttonSpaceDown = 120;
	//Screen.height*.42;

	public int lineCount = -1;
	float textFieldHeight = 0;

	Texture2D levelBack;
	Texture2D levelBack1;
	Texture2D titleBack;
	Texture2D loadingScreen;

	public string state = "play";

	Texture2D cruiseGUI;
	Texture2D cruiseGUItext;

	Texture2D pauseBG;

	Texture2D playDown;

	Texture2D restartButton;
	Texture2D levelSelectButton;
	Texture2D optionsButton;
	Texture2D quitButton;

	Texture2D speedButton;
	Texture2D musicButton;
	Texture2D sfxButton;
	Texture2D blankButton;
	Texture2D[] highlight;

	//var continueState : int = 0;
	//var restartState : int = 0;
	//var levelSelectState : int = 0;
	//var quitState : int = 0;

	AudioClip blip1;
	AudioClip blip2;
	AudioClip blip3;
	AudioClip gameStart;

	public int sfx;
	public int gameSpeed;

	Texture2D worldTitle;
	Texture2D selectL;
	Texture2D selectR;
	Texture2D[] num;
	Texture2D[] artifactIcon;

	Texture2D[] title;
	Texture2D xBut;
	Texture2D vBut;

	int maxLevel;
	public int worldNum;
	int maxWorld;
	public int levelNum;
	float recordTime;

	int VCbuttonState = 0;

	bool LSgo = false;
	int[] lsLevel;
	string[] levelString;
	string levelString2;
	int[] a1;
	int[] a2;
	int[] a3;
	string[] levelTime;

	public int a1state;
	public int a2state;
	public int a3state;
	int a1oldState;
	int a2oldState;
	int a3oldState;
	int artBurstAni = 0;
	Texture2D[] artBurst;
	bool a1go = false;
	bool a2go = false;
	bool a3go = false;
	int fixedCounter = 0;
	int levelLimit;
	string guiState;
	Texture2D[] selection;
	Texture2D[] selection2;
	bool selectionOn = false;
	int selectionX;
	int selectionY;
	int selectedLevel = 99;
	int selectionState = 0;
	bool selectable = false;
	bool selectionFlicker = false;
	GameMaster gameMaster;
	float pauseEndTime;
	float pauseEndTime2;
	bool loadLevelGo;
	int counter = 0;
	Color normColor;

	GUISkin mySkin;
	GUISkin mySkin18;
	GUISkin mySkin2;
	GUISkin mySkin3shad;
	GUISkin mySkin3;
	GUISkin mySkin4;
	GUISkin mySkin4Shad;
	GUISkin[] VCcolor;
	GUISkin mySkin19;
	GUISkin mySkin49;
	GUISkin mySkin36;
	GUISkin mySkin23;
	GUISkin mySkin30;

	Material[] fontMats;
	Transform[] GUIplanes;
	Transform[] GUIbuttons;
	int GUIbuttonCount = 0;
	public TextMesh[] GUItexts;
	private string hitname;
	private RaycastHit hit;
	private Ray ray;
	//ray we create when we touch the screen
	GameObject[] GUIcam;
	GameObject GUIplanePF;
	GameObject GUIplaneOverPF;
	GameObject GUItextPF;
	GameObject GUIbuttonPF;
	AnimationClip[] GUIanimClips;
	public float aspectMult = 1.0f;
	// ratio of aspect ratios
	private float yAdj = 1.0f;
	// scale adjustment

	GUIQuadObj brakeScript;
	GUIQuadObj jumpScript;
	GUIQuadObj a1Script;
	GUIQuadObj a2Script;
	GUIQuadObj a3Script;
	GUIQuadObj progBox1Script;
	GUIQuadObj progBox2Script;
	GUI_progbar progBarScript;
	Transform speedbar;
	Transform jumpbar;

	private int aIconSize = 26;
	int row1offsetX = 45;
	int row2offsetX = 275;
	private int curLevel;

	public string tutText;

	public float curTime;
	string stringTime;

	int i;


	void Start() {
		sfx = PlayerPrefs.GetInt("Sfx", 1);
		updateWorld();
		resetVC();
		calcAspectMult();
		GUI_1Init();
	}

	void calcAspectMult() {
		float w = Screen.width; 
		float h = Screen.height;
		aspectMult = (w / h) / (1.5f);
		yAdj = h / 320.0f;
	}

	void GUI_1Init() {
		GameObject the;
		Transform parent;

		GUIcam[1] = GameObject.Find("GUICameras/GUICameraL1");
		GUIcam[2] = GameObject.Find("GUICameras/GUICameraL2");
		GUIcam[3] = GameObject.Find("GUICameras/GUICameraL3");
		GUIcam[4] = GameObject.Find("GUICameras/GUICameraL4");

		// texts
		parent = transform.Find("GUItexts");
		for (int i = 0; i < 10; i++) {
			the = Instantiate(GUItextPF, Vector3.zero, Quaternion.identity) as GameObject;
			the.transform.parent = parent;
			the.transform.localPosition = new Vector3(0, -1000, 0);
			GUItexts[i] = the.gameObject.GetComponent<TextMesh>();
			the.name = ("text" + i);
		}
		// planes
		parent = transform.Find("GUIplanes");
		for (i = 0; i < 44; i++) {
			if (i < 41)
				the = Instantiate(GUIplanePF, Vector3.zero, Quaternion.identity) as GameObject;
			else
				the = Instantiate(GUIplaneOverPF, Vector3.zero, Quaternion.identity) as GameObject;
			the.transform.parent = parent;
			the.transform.localPosition = new Vector3(0, -1000, 0);
			GUIplanes[i] = the.transform;
			the.transform.localEulerAngles = new Vector3(90, 180, 0);
			if (i < 11 || i >= 41) {
				the.name = ("plane" + i);
			} else {
				the.name = ("aPlane" + i);
			}
		}
		// buttons
		parent = transform.Find("GUIbuttons");

		for (int i = 0; i < 14; i++) {
			the = Instantiate(GUIplanePF, Vector3.zero, Quaternion.identity) as GameObject;
			the.transform.parent = parent;
			the.transform.localPosition = new Vector3(0, -1000, 0);
			GUIbuttons[i] = the.transform;
			the.transform.localEulerAngles = new Vector3(90, 180, 0);
			the.name = ("button" + i);
			BoxCollider bc = the.AddComponent<BoxCollider>();
			if (i == 10 || i == 11)
				bc.size = new Vector3(2, 1, 1.5f);
		}
	}

	public void updateWorld() {
		maxLevel = PlayerPrefs.GetInt("MaxLevel", 0);
		maxWorld = (int)Mathf.Floor(maxLevel / 10);
		tutorialState = PlayerPrefs.GetInt("TutorialState", 0);
		cinemaState = PlayerPrefs.GetInt("CinemaState", 0);
		//	print(maxWorld);
	}

	public void updateVC() {
		for (int i = 0; i <= 6; i++)
			if (worldNum == i && cruiseGUI.name != "GUI_world" + i)
				cruiseGUI = Resources.Load<Texture2D>("GUI_world" + i);		
	}

	public void updateLevel() {
		level = gameMaster.level;
		if (level >= 60)
			switchGUI("tutorial");
		recordTime = PlayerPrefs.GetFloat("Level" + level + "Time", 60.00f);
	}

	public void playAnim(float waitSeconds) {
		resetVC();
//		yield WaitForSeconds(waitSeconds);
		switchArtsVC();
		camBlackAnim.Play("VC_anim");
	}

	void checkRecordPast() { // checks and switches record time to red if time is passed
		//	print("check Record started: cur="+curTime+" record="+recordTime);
		GUItexts[3].GetComponent<Renderer>().material.color = new Vector4(1, 1, 1, 0.5f);
		while (state == "play" && curTime < recordTime) { // kill the coroutine if no longer in play. It will restart again when switched back
//			yield;
		}
		if (state == "play") {
			//		print("check Record met!");
			GUItexts[3].GetComponent<Renderer>().material.color = new Vector4(1, 0.2f, 0, 0.5f);
		}
	}

	void clearGUIs() {
		foreach (Transform x in GUIplanes) {
			x.localPosition = new Vector3(0, -1000, 0);
			x.localScale = new Vector3(1, 1, 1);
			x.gameObject.layer = 16; // if they have changed layers for VC camera tricks, put them back to GUI cam 2
		}
		foreach (Transform why in GUIbuttons) {
			why.localPosition = new Vector3(0, -1000, 0);
			why.localScale = new Vector3(1, 1, 1);
			why.gameObject.layer = 2; // start them in ignore raycast, take them out on use
		}
		foreach (TextMesh zz in GUItexts) {
			zz.transform.localPosition = new Vector3(0, -1000, 0);
			zz.gameObject.layer = 16;
		}
	}

	void GUIplane(int x, int y, int w, int h, Texture texture, int which, int d) {
		GUIplanes[which].localPosition = new Vector3(x, y, -d);
		GUIplanes[which].localScale = new Vector3(w, 1, h);
		GUIplanes[which].GetComponent<Renderer>().material.mainTexture = texture;
	}

	void GUIbutton(int x, int y, int w, int h, Texture texture, int which, int d) {
		GUIbuttons[which].localPosition = new Vector3(x, y, -d);
		GUIbuttons[which].localScale = new Vector3(w, 1, h);
		GUIbuttons[which].GetComponent<Renderer>().material.mainTexture = texture;
		GUIbuttons[which].gameObject.layer = 16; // take them off ignore raycast layer, ready for physics raycast hit
	}

	TextMesh GUItext(int x, int y, float h, string text, int which, int d) {
		GUItexts[which].transform.localPosition = new Vector3(x, y, -d);
		GUItexts[which].transform.localScale = new Vector3(h, h, 1);
		GUItexts[which].text = text;
		return GUItexts[which];
	}

	void lsCalc() {
		if (worldNum == maxWorld)
			levelLimit = (maxLevel % 10);
		else
			levelLimit = 9;
		// if (ship.state.cruising) levelLimit--;

		for (i = 0; i <= levelLimit; i++) {				
			levelString[i] = "" + worldNum + i;

			var artCount = PlayerPrefs.GetInt("Level" + (worldNum * 10 + i) + "ArtCount", 000);
			a1[i] = (int)Mathf.Floor(artCount / 100);	
			a2[i] = (int)Mathf.Floor((artCount % 100) / 10);
			a3[i] = (int)artCount % 10;

			if (selectedLevel == 99 && worldNum != Mathf.Floor(level / 10)) {
				if (artCount < 111) {
					selectedLevel = i;
					selectionOn = true;		
				}
			}
		}	
		if (tutorialState == 1 && level == 60) {
			selectedLevel = 0;
			selectionOn = true;
		}

		if (worldNum == Mathf.Floor(level / 10)) {
			curLevel = (level - (worldNum * 10));
			selectedLevel = curLevel;
			selectionOn = true;
		} else if (selectedLevel == 99) {
				selectedLevel = 0;
				selectionOn = true;
			}
	}

	void drawSelection() {
		if (selectionOn) { 
			if (worldNum != 6)
				GUIplane(((int)(Mathf.Floor(selectedLevel / 5) * 2 - 1) * 115), (83 - ((selectedLevel % 5) * 41)), 254, 68, selection[selectionState], 5, 16);
			else
				GUIplane(((int)(Mathf.Floor(selectedLevel / 5) * 2 - 1) * 115), (83 - ((selectedLevel % 5) * 41)), 254, 68, selection2[selectionState], 5, 16);
			GUIplanes[5].gameObject.layer = 17;
		}
	}

	void drawHilites() {
		// gamespeed
		if (sfx == 1)
			GUIplane(63, 2, 98, 75, highlight[0], 41, 16);
		else
			GUIplane(63, -1000, 64, 64, highlight[0], 41, 16);
		if (PlayerPrefs.GetInt("Music", 1) == 1)
			GUIplane(95, -53, 98, 75, highlight[0], 42, 16);
		else
			GUIplane(94, -1000, 64, 64, highlight[0], 42, 16);
		GUIplane(80, 54, 195, 75, highlight[gameSpeed + 1], 43, 16);
	}

	void switchArtsVC() { // switch this to coroutine
		// switch textures at set times, but always check to make sure still in victoryCruise. waitForSeconds always means the function keeps going on its own.
//		yield WaitForSeconds (1.0f);
		if (state == "victoryCruise")
			GUIplanes[8].GetComponent<Renderer>().material.mainTexture = artifactIcon[a1state];
//		yield WaitForSeconds(0.1);
		if (state == "victoryCruise")
			GUIplanes[9].GetComponent<Renderer>().material.mainTexture = artifactIcon[a2state];
//		yield WaitForSeconds(0.1);
		if (state == "victoryCruise")
			GUIplanes[10].GetComponent<Renderer>().material.mainTexture = artifactIcon[a3state];
//		yield WaitForSeconds(0.1);
		if (state == "victoryCruise")
			GUIbuttons[2].GetComponent<Renderer>().material.mainTexture = pantherIcon[pantherFlag[0]];

	}

	public void switchGUI(string which) {
		state = which;
		calcAspectMult();
		if (which == "clear") {
			selectable = false;
			clearGUIs(); 
		}
		if (which == "play") {
			selectable = false;
			clearGUIs(); 
			GUIcam[1].SetActive(true);
			print("play");
			curTime = 0; // delay the curtime check one cycle for record past check

			brakeScript.Location = new Vector2(-240 * aspectMult + 300, brakeScript.Location.y);
			jumpScript.Location = new Vector2(240 * aspectMult + 180, jumpScript.Location.y);
			a1Script.Location = new Vector2(-240 * aspectMult + 260, a1Script.Location.y);
			a2Script.Location = new Vector2(-240 * aspectMult + 276, a2Script.Location.y);
			a3Script.Location = new Vector2(-240 * aspectMult + 292, a3Script.Location.y);
			progBox1Script.Location = new Vector2(-240 * Mathf.Clamp01(aspectMult) + 320, progBox1Script.Location.y);
			progBox2Script.Location = new Vector2(240 * Mathf.Clamp01(aspectMult) + 160, progBox2Script.Location.y);
			progBarScript.aspectMult = Mathf.Clamp01(aspectMult);
			progBarScript.barLength = progBox2Script.Location.x - progBox1Script.Location.x;
			jumpbar.position = new Vector3(240 * aspectMult - 59.5f, jumpbar.position.y, 0);
			speedbar.position = new Vector3(-240 * aspectMult + 60.5f, speedbar.position.y, 0);


			GUItexts[0].GetComponent<Renderer>().material = fontMats[1];
			GUItexts[4].GetComponent<Renderer>().material = fontMats[1];

			GUItexts[1].anchor = TextAnchor.UpperLeft;
			GUItexts[2].anchor = TextAnchor.UpperCenter;
			GUItexts[3].anchor = TextAnchor.UpperCenter;
			GUItexts[0].anchor = TextAnchor.UpperLeft; // shadow
			GUItexts[4].anchor = TextAnchor.UpperCenter; // shadow
			GUItext((int)(-240 * aspectMult + 13), 155, 3.6f, ("Lv. " + level), 0, 0);
			GUItext((int)(-240 * aspectMult + 12), 156, 3.6f, ("Lv. " + level), 1, 10);
			GUItext((int)(240 * aspectMult - 35), 156, 3.6f, ("00.00"), 2, 10); 
			GUItext((int)(240 * aspectMult - 34), 155, 3.6f, ("00.00"), 4, 0); 
			if (gameMaster.gamePhase > 1) {
				GUItext((int)(240 * aspectMult - 34), 136, 3.6f, recordTime.ToString("00.00"), 3, 0);
				checkRecordPast();
			}
		}
		if (which == "paused") { 
			selectable = true;
			clearGUIs(); 
			GUIcam[1].SetActive(false);

			GUIplane(0, 0, (int)(500 * aspectMult), 330, pauseBG, 0, 0);
			// GUIbutton(0, 100, 256, 50, continueButton, 1, 10);
			GUIbutton((int)(-240 * aspectMult + 64), -132, 128, 55, xBut, 1, 10);
			GUIbutton(0, 100, 256, 50, restartButton, 2, 10);
			GUIbutton(0, 40, 256, 50, levelSelectButton, 3, 10);
			GUIbutton(0, -20, 256, 50, optionsButton, 4, 10);
			GUIbutton(0, -80, 256, 50, quitButton, 5, 10);
		}
		if (which == "options") { 
			selectable = true;
			clearGUIs(); 
			GUIcam[1].SetActive(false);

			GUIplane(0, 0, (int)(500 * aspectMult), 330, pauseBG, 0, 0);
			GUIbutton((int)(-240 * aspectMult + 64), -132, 128, 55, xBut, 1, 10);
			GUIbutton(2, 55, 345, 50, speedButton, 4, 10);
			GUIbutton(20, 55, 60, 50, blankButton, 5, 20);
			GUIbutton(80, 55, 60, 50, blankButton, 6, 20);
			GUIbutton(140, 55, 60, 50, blankButton, 7, 20); // blank buttons for indiv speeds
			GUIbutton(-16, 0, 243, 50, sfxButton, 2, 10);
			GUIbutton(16, -55, 243, 50, musicButton, 3, 10);
			drawHilites();

		}
		if (which == "levelSelect") { 
			selectable = true;
			clearGUIs();
			updateWorld();
			lsCalc();
			GUItexts[0].GetComponent<Renderer>().material = fontMats[0];
			GUItexts[1].GetComponent<Renderer>().material = fontMats[0];
			GUItexts[3].GetComponent<Renderer>().material = fontMats[0];
			GUItexts[4].GetComponent<Renderer>().material = fontMats[0];

			GUIcam[3].GetComponent<Camera>().rect = new Rect(0, 0, 1, 1);
			GUIcam[4].GetComponent<Camera>().rect = new Rect(0, 0, 1, 1);
			GUIcam[3].transform.position = new Vector3(0, GUIcam[3].transform.position.y, GUIcam[3].transform.position.z);
			GUIcam[4].transform.position = new Vector3(0, GUIcam[3].transform.position.y, GUIcam[3].transform.position.z);

			GUIplane(0, 0, (int)(500 * aspectMult), 330, pauseBG, 0, 0);
			GUIplanes[0].gameObject.layer = 18;
			if (worldNum != 6) {
				for (i = 0; i <= levelLimit; i++) {
					GUIbutton((int)((Mathf.Floor(i / 5) * 2 - 1) * 115) + 3, (83 - ((i % 5) * 41)), 210, 36, levelBack, i, 10);
					if (gameMaster.gamePhase < 2) {
						GUItext((int)((Mathf.Floor(i / 5) * 2 - 1) * 115) - 87, (96 - ((i % 5) * 41)), 5.9f, levelString[i], i, 20);
					} else {
						levelTime[i] = (PlayerPrefs.GetFloat("Level" + (worldNum * 10 + i) + "Time", 99.99f)).ToString("00.00");
						pantherFlag[i] = PlayerPrefs.GetInt("Level" + (worldNum * 10 + i) + "PantherFlag", 0);
						GUItext((int)((Mathf.Floor(i / 5) * 2 - 1) * 115) - 87, (96 - ((i % 5) * 41)), 5.9f, levelString[i] + "    " + levelTime[i], i, 20);
					}
					GUItexts[i].gameObject.layer = 17;
					GUIbuttons[i].gameObject.layer = 17;
					GUItexts[i].anchor = TextAnchor.UpperLeft;
				}
			} else {
				for (i = 0; i < tutorialState; i++) {
					GUIbutton(-115 + 3, (83 - ((i % 5) * 41)), 210, 36, levelBack1, i, 10);
					GUItext((-115 - 87), (96 - ((i % 5) * 41)), 5.9f, tutString[i], i, 20);
					GUItexts[i].anchor = TextAnchor.UpperLeft;
					GUItexts[i].gameObject.layer = 17;
					GUIbuttons[i].gameObject.layer = 17;
				}
				for (i = 0; i < cinemaState; i++) {
					GUIbutton(115 + 3, (83 - ((i % 5) * 41)), 210, 36, levelBack1, i + 5, 10);
					GUItext((115 - 87), (96 - ((i % 5) * 41)), 5.9f, cinString[i], i + 5, 20);
					GUItexts[i + 5].anchor = TextAnchor.UpperLeft;
					GUItexts[i + 5].gameObject.layer = 17;
					GUIbuttons[i + 5].gameObject.layer = 17;
				}
			}

			if (worldNum != 6) {		
				if (gameMaster.gamePhase < 2) {
					// gamePhase 0,1 draw artifacts
					for (i = 0; i <= levelLimit; i++) {
						GUIplane(((int)(Mathf.Floor(i / 5) * 2 - 1) * 115) + 3, (83 - ((i % 5) * 41)), aIconSize, aIconSize, artifactIcon[a1[i]], 11 + (i * 3), 20);
						GUIplane(((int)(Mathf.Floor(i / 5) * 2 - 1) * 115) + 34, (83 - ((i % 5) * 41)), aIconSize, aIconSize, artifactIcon[a2[i]], 11 + (i * 3) + 1, 20);
						GUIplane(((int)(Mathf.Floor(i / 5) * 2 - 1) * 115) + 65, (83 - ((i % 5) * 41)), aIconSize, aIconSize, artifactIcon[a3[i]], 11 + (i * 3) + 2, 20);
					}
				} else { 
					// gamephase == 2, draw the panther icon
					for (i = 0; i <= 9; i++) {
						if (pantherFlag[i] == 1)
							GUIplane((int)((Mathf.Floor(i / 5) * 2 - 1) * 115) - 30, (83 - ((i % 5) * 41)), 28, 28, pantherIcon[1], 11 + i, 20);
					}
				}	
			} 
			for (i = 11; i < 41; i++)
				GUIplanes[i].gameObject.layer = 17;


			drawSelection();
			GUIcam[3].GetComponent<Camera>().orthographicSize = 160 * (1 / Mathf.Clamp01(aspectMult)); // resize camera for middle buttons for 4:3

			GUIplane(0, 135, (int)(370 * Mathf.Clamp01(aspectMult)), 40, titleBack, 1, 10);
			GUIplane(0, 135, (int)(330 * Mathf.Clamp01(aspectMult)), 31, title[worldNum], 2, 20);
			GUIbutton((int)(-207 * Mathf.Clamp01(aspectMult)), 135, 48, 40, selectL, 10, 20);
			GUIbutton((int)(207 * Mathf.Clamp01(aspectMult)), 135, 48, 40, selectR, 11, 20);
			GUIbutton((int)(-240 * aspectMult + 64), -132, 128, 55, xBut, 12, 20);
			GUIbutton((int)(240 * aspectMult - 64), -132, 128, 55, vBut, 13, 20);

		}
		if (which == "victoryCruise") { 
			selectable = true;
			clearGUIs();

			GUIcam[3].GetComponent<Camera>().orthographicSize = 160;
			GUIcam[3].transform.position = new Vector3(-120 * aspectMult, GUIcam[3].transform.position.y, GUIcam[3].transform.position.z);
			GUIcam[4].transform.position = new Vector3(-120 * aspectMult, GUIcam[4].transform.position.y, GUIcam[4].transform.position.z);
			GUIcam[3].GetComponent<Camera>().rect = new Rect(-0.5f, 0, 1, 1);
			GUIcam[4].GetComponent<Camera>().rect = new Rect(0.5f, 0, 1, 1);
			GUItexts[0].GetComponent<Renderer>().material = fontMats[0];
			GUItexts[3].GetComponent<Renderer>().material = fontMats[0];
			GUItexts[4].GetComponent<Renderer>().material = fontMats[0];
			//Left Top Sections
			GUIplane(-156, -1000, 224, 39, section1, 0, 0);
			GUItext((int)(-225 * Mathf.Clamp01(aspectMult)), -1000, 4.2f * Mathf.Clamp01(aspectMult), ("ATTEMPTS: " + ship.levelAttempts), 0, 5);
			GUItexts[0].anchor = TextAnchor.UpperLeft;
			GUIplane(-156, -1000, 224, 39, section2, 1, 0);
			// artifacts and panther
			GUIplane(0, -1000, aIconSize, aIconSize, artifactIcon[0], 8, 5);
			GUIplane(0, -1000, aIconSize, aIconSize, artifactIcon[0], 9, 5);
			GUIplane(0, -1000, aIconSize, aIconSize, artifactIcon[0], 10, 5);
			GUIbutton(0, -1000, 36, 36, pantherIcon[0], 2, 5);
			GUIplanes[0].gameObject.layer = 17;
			GUIplanes[1].gameObject.layer = 17;
			GUItexts[0].gameObject.layer = 17;
			GUIplanes[8].gameObject.layer = 17;
			GUIplanes[9].gameObject.layer = 17;
			GUIplanes[10].gameObject.layer = 17;
			GUIbuttons[2].gameObject.layer = 17;

			//Right Top Section
			GUIplane(155, -1000, 224, 39, section2, 2, 10);
			GUItext(221, -1000, 4.2f * Mathf.Clamp01(aspectMult), ("TIME: " + curTime.ToString("00.00")), 1, 20);
			GUItexts[1].anchor = TextAnchor.UpperRight;
			GUIplane(155, -1000, 224, 39, section1, 3, 10);
			if (!ship.newRecord)
				GUItext(221, -1000, 4.2f * Mathf.Clamp01(aspectMult), ("RECORD: " + recordTime.ToString("00.00")), 2, 20);
			else
				GUItext(221, -1000, 4.2f * Mathf.Clamp01(aspectMult), "NEW RECORD!!!", 2, 20);
			GUItexts[2].anchor = TextAnchor.UpperRight;
			GUIplanes[2].gameObject.layer = 18;
			GUIplanes[3].gameObject.layer = 18;
			GUItexts[1].gameObject.layer = 18;
			GUItexts[2].gameObject.layer = 18;

			//Level Number
			GUIplane(0, -1000, 131, 69, levelReadout, 4, 30);
			if (level >= 10)
				GUItext(4, -1000, 10.5f, "" + level, 3, 40);
			else
				GUItext(4, -1000, 10.5f, "0" + level, 3, 40);
			GUItexts[3].anchor = TextAnchor.MiddleCenter;

			// Menu Section
			GUIbutton(-103, -1000, 156, 58, menuButton, 0, 0);
			GUItext(-90, -1000, 4.7f, "MENU", 4, 5);
			GUItexts[4].anchor = TextAnchor.UpperCenter;
			GUIplane(-157, -1000, 45, 58, dash, 5, -5);
			GUIplane(-12, -1000, 67, 58, bottomDivider, 6, 30);
			// GUIbuttons[0].gameObject.layer=17; GUIplanes[5].gameObject.layer=17; GUItexts[4].gameObject.layer=17;

			// Next Section
			GUIbutton(80, -1000, 165, 58, nextButton, 1, 10);
			GUItext(83, -1000, 7.9f, "NEXT", 5, 20);
			GUItexts[5].anchor = TextAnchor.UpperCenter;
			GUIplane(166, -1000, 55, 58, arrow, 7, 5);
			// GUIbuttons[1].gameObject.layer=18; GUIplanes[7].gameObject.layer=18; GUItexts[5].gameObject.layer=18;
		}
		if (which == "tutorial") {
			clearGUIs();
			GUIcam[1].SetActive(true);

			brakeScript.Location = new Vector2(-240 * aspectMult + 300, brakeScript.Location.y);
			jumpScript.Location = new Vector2(240 * aspectMult + 180, jumpScript.Location.y);
			jumpbar.position = new Vector2(240 * aspectMult - 59.5f, jumpbar.position.y);
			speedbar.position = new Vector2(-240 * aspectMult + 60.5f, speedbar.position.y);

			GUItext((int)(-220f * Mathf.Clamp01(aspectMult)), 154, (int)(5.2f * Mathf.Clamp01(aspectMult)), "", 0, 20);
			GUItext((int)(-219f * Mathf.Clamp01(aspectMult)), (int)(154 - Mathf.Clamp01(aspectMult)), (int)(5.2f * Mathf.Clamp01(aspectMult)), "", 1, 15);
			GUItexts[0].GetComponent<Renderer>().material = fontMats[1];
			GUItexts[1].GetComponent<Renderer>().material.color = new Vector4(1, 0.4f, 0.6f, 1);
			GUItexts[0].anchor = TextAnchor.UpperLeft;
			GUItexts[1].anchor = TextAnchor.UpperLeft;
			GUItexts[0].alignment = TextAlignment.Left;
			GUItexts[1].alignment = TextAlignment.Left;

			GUIplane(-1, 1000, (int)(482f * aspectMult), 200, transWhite, 0, 0);
			GUIplane(-1, 1000, (int)(482f * aspectMult), 30, whiteFadeDown, 1, 5);
		}
	}


	void OnGUI() {

		if (state == "play") {
			GUItexts[2].text = stringTime;
			GUItexts[4].text = stringTime;
		}

		if (state == "tutorial") {

			GUItexts[0].text = tutText;
			GUItexts[1].text = tutText;
			textFieldHeight = Mathf.Lerp(textFieldHeight, (lineCount) * 30, Time.deltaTime * 8);
			GUIplanes[1].position = new Vector3(GUIplanes[1].position.x, 145 - ((textFieldHeight - 10) * Mathf.Clamp01(aspectMult)), 0);
			GUIplanes[0].position = new Vector3(GUIplanes[1].position.x, GUIplanes[1].position.y + 100, 0);
		}

		if (state == "victoryCruise") {
			// level
			GUIplanes[4].position = new Vector3(GUIplanes[4].position.x, topGrpY, 0);
			GUItexts[3].transform.position = new Vector3(GUItexts[3].transform.position.x, topGrpY - 5, 0);

			// attempts
			GUIplanes[0].position = new Vector3(section1Pos.x - 1, topGrpY + section1Pos.y + 20, 0);
			GUItexts[0].transform.position = new Vector3((section1Pos.x - 71) * Mathf.Clamp01(aspectMult), topGrpY + section1Pos.y + 29, 0);

			//artifacts and panther
			GUIplanes[1].position = new Vector3(section2Pos.x - 1, topGrpY + section2Pos.y - 20);
			GUIplanes[8].position = new Vector3((GUIplanes[1].position.x - 58) * Mathf.Clamp01(aspectMult), GUIplanes[1].position.y);
			GUIplanes[9].position = new Vector3((GUIplanes[1].position.x - 23) * Mathf.Clamp01(aspectMult), GUIplanes[1].position.y);
			GUIplanes[10].position = new Vector3((GUIplanes[1].position.x + 12) * Mathf.Clamp01(aspectMult), GUIplanes[1].position.y);
			GUIbuttons[2].position = new Vector3((GUIplanes[1].position.x + 57) * Mathf.Clamp01(aspectMult), GUIplanes[1].position.y);
			// time
			GUIplanes[2].position = new Vector3(-section1Pos.x, topGrpY + section1Pos.y + 20);
			GUItexts[1].transform.position = new Vector3((-section1Pos.x + 67) * Mathf.Clamp01(aspectMult), topGrpY + section1Pos.y + 29);
			// record
			GUIplanes[3].position = new Vector3(-section2Pos.x, topGrpY + section2Pos.y - 20);
			GUItexts[2].transform.position = new Vector3((-section2Pos.x + 67) * Mathf.Clamp01(aspectMult), topGrpY + section2Pos.y - 11);

			// bottom div
			GUIplanes[6].position = new Vector3(GUIplanes[6].position.x, btmGrpY);
			//menu
			GUIbuttons[0].position = new Vector3(menuButtonPos.x, btmGrpY + menuButtonPos.y);
			GUItexts[4].transform.position = new Vector3(menuButtonPos.x + 13, btmGrpY + menuButtonPos.y + 4);
			// dash

			GUIplanes[5].position = new Vector3(menuButtonPos.x + dashX - 54, btmGrpY + menuButtonPos.y);
			// next
			GUIbuttons[1].position = new Vector3(nextButtonPos.x, btmGrpY + nextButtonPos.y);

			GUItexts[5].transform.position = new Vector3(nextButtonPos.x + 3, btmGrpY + nextButtonPos.y + 17);
			//arrow
			GUIplanes[7].position = new Vector3(nextButtonPos.x + arrowX + 84, btmGrpY + nextButtonPos.y);

		}

		if (camBlackState != "none") {
			blackerWidth = Mathf.Clamp(Screen.height * 2.56f * aspectMult, Screen.width, Screen.width * 4);
			if (camBlackState == "in") {
				GUI.DrawTexture(new Rect(-blackerWidth + (camBlackWipe * blackerWidth), 0, blackerWidth, Screen.height), camBlackImage, ScaleMode.StretchToFill, true, 0);
				if (camBlackWipe > 0.98f)
					camBlackState = "down";
			} else if (camBlackState == "down") {
					//	GUI.DrawTexture(Rect(-Screen.width/1.7, -20, Screen.width*2.13, Screen.height*1.25), camBlackImage, ScaleMode.ScaleToFit, true, 0);
					GUI.DrawTexture(new Rect(0, 0, blackerWidth, Screen.height), camBlackImage, ScaleMode.StretchToFill, true, 0);
				} else if (camBlackState == "out") {
						GUI.DrawTexture(new Rect(-blackerWidth + (camBlackWipe * blackerWidth), 0, blackerWidth, Screen.height), camBlackImage, ScaleMode.StretchToFill, true, 0);
						if (camBlackWipe < 0.02f)
							camBlackState = "none";
					}
		} else if (state == "loading") {
				GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), loadingScreen);		
			}
	}

	void getButtonHit(int x, int y, int p) {

		int rays;
		if (state == "levelSelect")
			rays = 2;
		else
			rays = 1;

		for (var r = 0; r < rays; r++) {
			if (r == 0)
				ray = GUIcam[1].GetComponent<Camera>().ScreenPointToRay(new Vector3(x, y, 0));
			else
				ray = GUIcam[3].GetComponent<Camera>().ScreenPointToRay(new Vector3(x, y, 0)); // shoot from different camera for levelSelect 4:3
			//Debug.DrawLine(ray.origin, ray.direction);
			if (p > 1)
				checkButton = 1;
			else if (Physics.Raycast(ray.origin, ray.direction, out hit))
					checkButton = 2;
				else
					checkButton = 0;

			if (checkButton != 0) {
				if (checkButton == 2)
					hitname = hit.transform.name;

				if (state == "paused") {	
					if (hitname == "button1" && p == 1) {
						if (sfx == 1)
							GetComponent<AudioSource>().PlayOneShot(blip1);
						if (ship.state.cruising) {
							switchGUI("victoryCruise");
							playAnim(0);
						} else
							unpause();
					} else if (hitname == "button2" && p == 1) {
							if (sfx == 1)
								GetComponent<AudioSource>().PlayOneShot(blip1);
							unpause();
							ship.state.crashing = true;
							ship.restarted = true;
							camBlackWipe = 0;
//						yield WaitForSeconds(0.1);
							//ship.state.crashing=true;
							if (ship.state.cruising)
								gameMaster.level--;
							if (gameMaster.level == -1)
								gameMaster.level = 59;
							PlayerPrefs.SetInt("Level", gameMaster.level);
							ship.reset(3);
						}
					// level Select
					else if (hitname == "button3" && p == 1) {
								if (sfx == 1)
									GetComponent<AudioSource>().PlayOneShot(blip1);
								if (PlayerPrefs.GetInt("FromLS", 0) == 0) {
									if (tutorialState == 1 && level == 60)
										worldNum = 0;
									selectedLevel = 0;	
									//if (tutorialState==2 && level==68) { worldNum=0; selectedLevel=1;}
									print("worldnum " + worldNum);
									print("selectedLevel " + selectedLevel);
								}
								switchGUI("levelSelect");
							}
					// options
					else if (hitname == "button4" && p == 0) {
									if (sfx == 1)
										GetComponent<AudioSource>().PlayOneShot(blip1);
									switchGUI("options");
								}
					// quit (menu)
					else if (hitname == "button5" && p == 0) {
										if (sfx == 1)
											GetComponent<AudioSource>().PlayOneShot(blip1);
										//unpause();
										loadMenu();
									}
				} else if (state == "options") {
						if (hitname == "button1" && p == 1) {
							if (sfx == 1)
								GetComponent<AudioSource>().PlayOneShot(blip1);
							switchGUI("paused");
						}
						if (hitname == "button2" && p == 0) {
							if (PlayerPrefs.GetInt("Sfx", 1) == 1) {
								PlayerPrefs.SetInt("Sfx", 0);
								ship.sfx = false; 
								sfx = 0;
								ship.engineAudio.GetComponent<AudioSource>().Stop();
								ship.engineAudio.SetActive(false);
							} else {
								PlayerPrefs.SetInt("Sfx", 1);
								ship.sfx = true; 
								sfx = 1;
								// ship.engineAudio.Stop();
								ship.engineAudio.SetActive(true); 
								ship.engineAudio.GetComponent<AudioSource>().Stop();
							}
							if (sfx == 1)
								GetComponent<AudioSource>().PlayOneShot(blip1);
							drawHilites();
						}
						if (hitname == "button3" && p == 0) {
							if (PlayerPrefs.GetInt("Music", 1) == 1)
								PlayerPrefs.SetInt("Music", 0);
							else
								PlayerPrefs.SetInt("Music", 1);
							ship.musicSourceScript.SetTrack();
							drawHilites();
						}
						if (hitname == "button5" && p == 0) {
							gameSpeed = 0; 
							gameMaster.updateGameSpeed(gameSpeed);
							drawHilites();
						} else if (hitname == "button6" && p == 0) {
								gameSpeed = 1; 
								gameMaster.updateGameSpeed(gameSpeed);
								drawHilites();
							} else if (hitname == "button7" && p == 0) {
									gameSpeed = 2; 
									gameMaster.updateGameSpeed(gameSpeed);
									drawHilites();
								} else if (hitname == "button4" && p == 0) {
										print("Hit: " + gameSpeed);
										gameSpeed++;
										if (gameSpeed > 2)
											gameSpeed = 0;
										gameMaster.updateGameSpeed(gameSpeed);
										drawHilites();
									}
					} else if (state == "levelSelect") {
							if (r == 1) {
								if (worldNum != 6) {
									for (i = 0; i <= levelLimit; i++) {					
										if (hitname == ("button" + i) && p == 1) {				
											if (selectedLevel == i) {
												loadLevel1("level");
											} else {
												selectionOn = true;
												selectedLevel = i;
												drawSelection();
											}
										}
									}
								} else { //worldNum == 6;
									for (i = 0; i < tutorialState; i++) {
										if (hitname == ("button" + i) && p == 1) {
											if (selectedLevel == i) {
												tutLevel = 60 + i;
												PlayerPrefs.SetInt("FromLS", 1);
												loadLevel1("tutorial");
											} else {
												selectionOn = true;
												selectedLevel = i;
												drawSelection();
											}
										}
									}
									for (i = 5; i < cinemaState + 5; i++) {
										if (hitname == ("button" + i) && p == 1) {					
											if (selectedLevel == i) {
												PlayerPrefs.SetInt("FromLS", 1);
												if (i == 5)
													cinLevel = 2;
												if (i == 6)
													cinLevel = 3;
												if (i == 7)
													cinLevel = 5;
												if (i == 8)
													cinLevel = 4;
												if (i == 9)
													cinLevel = 6;
												loadLevel1("cinema");
											} else {
												selectionOn = true;
												selectedLevel = i;
												drawSelection();
											}
										}
									}
									print(selectedLevel);
								}
							} // end ray 1

					else {

								if (p == 3 || (hitname == "button10" && p == 1)) {
									selectedLevel = 99;
									selectionOn = false;
									if (sfx == 1)
										GetComponent<AudioSource>().PlayOneShot(blip2);
									worldNum--;
									if (worldNum < 0)
										worldNum = 6;
									else if (worldNum > maxWorld && worldNum != 6)
											worldNum = maxWorld;
									switchGUI("levelSelect");

								} else if (p == 2 || (hitname == "button11" && p == 1)) {
										selectedLevel = 99;
										selectionOn = false;
										if (sfx == 1)
											GetComponent<AudioSource>().PlayOneShot(blip2);
										worldNum++;
										if (worldNum > maxWorld && worldNum < 6)
											worldNum = 6;
										if (worldNum > 6)
											worldNum = 0;
										switchGUI("levelSelect");

									} else if (hitname == "button12" && p == 1) {
											selectedLevel = 99;
											selectionOn = false;
											if (sfx == 1)
												GetComponent<AudioSource>().PlayOneShot(blip3);
											switchGUI("paused");

										} else if (hitname == "button13" && p == 1) {
												if (selectionOn) {
													if (worldNum != 6)
														loadLevel1("level");
													else if (worldNum == 6 && selectedLevel < 5) {
															tutLevel = 60 + selectedLevel;
															loadLevel1("tutorial");
														} else if (worldNum == 6 && selectedLevel >= 5) {
																if (selectedLevel == 5)
																	cinLevel = 2;
																if (selectedLevel == 6)
																	cinLevel = 3;
																if (selectedLevel == 7)
																	cinLevel = 5;
																if (selectedLevel == 8)
																	cinLevel = 4;
																if (selectedLevel == 9)
																	cinLevel = 6;
																loadLevel1("cinema");
															} 
												} 
											}
							} // end ray 0
						}
				// end LS
				else if (state == "victoryCruise" && p == 1) {
								if (!gameObject.GetComponent<Animation>().isPlaying) {
									if (hitname == "button0") {
										if (sfx == 1)
											GetComponent<AudioSource>().PlayOneShot(blip1);
										switchGUI("paused");
									} else if (hitname == "button1") {
											VCcontinue();
										} else if (hitname == "button2" && pantherFlag[0] == 1 && gameMaster.shipNum == 10) {
												print("do a panther growl!");
											}		
								}
							}	
			}
		}
	}

	void unpause() {
		if (level >= 60)
			switchGUI("tutorial");
		else
			switchGUI("play");
		ship.state.paused = false;
		if (sfx == 1 && ship.engineAudio.active && ship.state.started)
			ship.engineAudio.GetComponent<AudioSource>().Play();
		Time.timeScale = gameMaster.gameSpeed;
	}


	void loadMenu() {
		PlayerPrefs.SetInt("Quit", 1);
		ship.state.crashing = true;							
		switchGUI("loading");
		Time.timeScale = 1;
//		yield WaitForSeconds(0.2f);
		//Destroy(musicSource);
		Application.LoadLevel(0);	
	}


	void loadLevel1(string which) {
		whichLoad = which;
		if (sfx == 1)
			GetComponent<AudioSource>().PlayOneShot(gameStart);
		ship.state.crashing = true;
		selectable = false;
		loadLevelGo = true;
		pauseEndTime2 = Time.realtimeSinceStartup + 1.5f;
	}


	void loadLevel2(string which) {
		if (which == "level")
			gameMaster.setLevel(worldNum * 10 + selectedLevel);
		else if (which == "tutorial") {
				gameMaster.setLevel(tutLevel);
				if (selectedLevel == 1)
					PlayerPrefs.SetInt("ShipNum", 10);
			}
		print("which = " + which);
		print("selected level = " + worldNum * 10 + selectedLevel);
		switchGUI("loading");
		Time.timeScale = 1;
//		yield WaitForSeconds(0.2);
		if (which != "cinema")
			Application.LoadLevel(1);
		else
			Application.LoadLevel(cinLevel);
	}


	void VCcontinue() {
		VCbuttonState = 1;
		if (sfx == 1)
			GetComponent<AudioSource>().PlayOneShot(gameStart);
//		yield WaitForSeconds(0.4);
		camBlack("down");
//		yield WaitForSeconds(0.8);

		Application.LoadLevel(1);
	}


	void Update() {		
		if (!ship.state.crashing && !ship.state.winning && !ship.state.cruising) {		
			if (state == "play") {
				curTime = ship.state.elapsedTime;
				stringTime =	curTime.ToString("00.00");
				if (curTime > timeAllowed) {
					stringTime = "**.**";
					if (!ship.state.crashing) {
						ship.crash(0); // why is this here? not on moveship
						message = "time";
					}
				}
			}
		}

		if (loadLevelGo) {		
			counter++;
			selectionState = counter % 2;
			if (worldNum != 6)
				GUIplanes[5].GetComponent<Renderer>().material.mainTexture = selection[selectionState];
			else
				GUIplanes[5].GetComponent<Renderer>().material.mainTexture = selection2[selectionState];
			if (Time.realtimeSinceStartup > pauseEndTime2)
				loadLevel2(whichLoad);
		}


		if (selectable) {	
			if (gameMaster.device == GameMaster.DeviceType.iPhone) {
				foreach (Touch touch in Input.touches) { 
					deltaPos = touch.deltaPosition;
					if (touch.phase == TouchPhase.Began) {
						if (!swiping) {
							getButtonHit((int)Input.mousePosition.x, (int)Input.mousePosition.y, 0);
						}
						beganPos = touch.position;
						touchPhase = "Began";
					}
					if (touch.phase == TouchPhase.Ended) {
						if (!swiping) {
							getButtonHit((int)Input.mousePosition.x, (int)Input.mousePosition.y, 1);
						}
						touchPhase = "Ended";
						swiping = false;
						endedPos = touch.position;
						nextGo = true;
					}
					if (touch.phase == TouchPhase.Moved) {
						
						if (Mathf.Abs(deltaPos.x) > 3 * yAdj || Mathf.Abs(lastPos.x - beganPos.x) > 3 * yAdj || Mathf.Abs(deltaPos.y) > 3 * yAdj || Mathf.Abs(lastPos.y - beganPos.y) > 3 * yAdj) {
							swiping = true;
							touchPhase = "Moved";
						}
						if (Mathf.Abs(deltaPos.x) > 10 * yAdj) {
							if (nextGo) {
								if (deltaPos.x > 0)
									SwipeLevel(3);
								else
									SwipeLevel(2);
							}
						}
					} 
					lastPos = touch.position;
				}

			} else {
				deltaPos = lastPos - (Vector2)Input.mousePosition;
				if (Input.GetMouseButtonDown(0)) {
					if (!swiping) {
						getButtonHit((int)Input.mousePosition.x, (int)Input.mousePosition.y, 0);
					}
					beganPos = Input.mousePosition;
					touchPhase = "Began";
				}
				if (Input.GetMouseButtonUp(0)) {
					if (!swiping) {
						getButtonHit((int)Input.mousePosition.x, (int)Input.mousePosition.y, 1);
					}
					endedPos = Input.mousePosition;
					swiping = false;
					touchPhase = "Ended";
					nextGo = true;
				}
				if (Input.GetMouseButton(0)) {
					if (Mathf.Abs(deltaPos.x) > 3 * yAdj || Mathf.Abs(lastPos.x - beganPos.x) > 3 * yAdj || Mathf.Abs(deltaPos.y) > 3 * yAdj || Mathf.Abs(lastPos.y - beganPos.y) > 3 * yAdj) {
						swiping = true;
						touchPhase = "Moved";
					}
					if (Mathf.Abs(deltaPos.x) > 10 * yAdj) { 
						if (nextGo) {
							print("swiping!");
							if (deltaPos.x > 0)
								SwipeLevel(2);
							else
								SwipeLevel(3);
						}
					}
				}
				lastPos = Input.mousePosition;
			}
		}
	}

	void SwipeLevel(int swipe) {
		print("swipe function ran");
		nextGo = false;
		getButtonHit(0, 0, swipe);
	}

	public void resetVC() {
		topGrpY = -1000;
		btmGrpY = -1000;
		pantherFlag[0] = PlayerPrefs.GetInt("Level" + (level) + "PantherFlag", 0);
	}

	public void camBlack(string which) {
		if (which == "down") {
			camBlackAnim.Play("camBlackIn");
			camBlackState = "in";
		} else {
//			yield WaitForSeconds(blackerPause);
			camBlackAnim.Play("camBlackOut");
			camBlackState = "out";
		}
	}
}
