using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class IntroGUI : MonoBehaviour
{

	public string whichTro;
	private int guiWidth = 480;
	private int guiHeight = 320;

	public Texture2D loadingScreen;
	public bool loading = false;

	public TextMesh[] GUItexts;
	public Transform[] GUIplanes;


	float aspectMult = 1.0f;
	float yAdj = 1.0f;

	private int cinemaState;

	private float elapsedTime = 0;
	private float lastTime = 0;
	private int letterAdvance = -1;
	public float timeInc = 0.4f;
	private float dynTimeInc;
	float pauseInc = 0.8f;
	private float dynPauseInc;
	public Texture[] btnTexture;
	//var btnFlarePF: GameObject;
	//var btnFlareObj: GameObject;
	private bool doStuff = false;
	public bool btnUp = true;
	bool nextyDown = false;
	public GameObject cam;
	public List<Animation> currAnims = new List<Animation> ();
	GameObject delObj;
	private float waitTimeStart = 0;

	public GameObject[] cardPFs;

	public int whichText;
	public string[] texty = new string[7];

	private string dispText;
	private string[] words;

	public string state = "write";
	private bool skipped = false;

	public GUISkin normSkin;
	public GUISkin shadSkin;
	private int o = 1;

	GameObject musicSource;
	Music musicSourceScript;

	void GUI1_init ()
	{
		calcAspectMult ();
		GUItexts [0].transform.localPosition = new Vector3 (-225 * Mathf.Clamp01 (aspectMult), 147, 0);
		GUItexts [0].transform.localScale = new Vector3 (6.4f * Mathf.Clamp01 (aspectMult), 6.4f * Mathf.Clamp01 (aspectMult), 1);
		GUItexts [1].transform.localPosition = new Vector3 (-224 * Mathf.Clamp01 (aspectMult), 147 - Mathf.Clamp01 (aspectMult), 5);
		GUItexts [1].transform.localScale = new Vector3 (6.4f * Mathf.Clamp01 (aspectMult), 6.4f * Mathf.Clamp01 (aspectMult), 1);

		if (whichTro == "outro3") {
//			GUItexts[0].transform.localPosition.y=0;
//			GUItexts[1].transform.localPosition.y=-1*Mathf.Clamp01(aspectMult);

			GUItexts [0].transform.localPosition = new Vector3 (GUItexts [0].transform.localPosition.x, 0);
			GUItexts [1].transform.localPosition = new Vector3 (GUItexts [1].transform.localPosition.x, -1 * Mathf.Clamp01 (aspectMult));
		}

		GUItexts [1].GetComponent<Renderer> ().material.color = new Vector4 (0, 0, 0, 1);

		GUIplanes [0].GetComponent<Renderer> ().material.mainTexture = btnTexture [4];
		GUIplanes [1].GetComponent<Renderer> ().material.mainTexture = btnTexture [0];
		GUIplanes [0].transform.localPosition = new Vector3 (-240 * aspectMult + 41, -142, -20);
		GUIplanes [0].transform.localScale = new Vector3 (82, 1, 35);
		GUIplanes [1].transform.localPosition = new Vector3 (240 * aspectMult - 41, -142, -20);
		GUIplanes [1].transform.localScale = new Vector3 (82, 1, 35);


		//		if (GUI.RepeatButton(Rect(0,285,82,35), btnTexture[4])) { end(); }
		//		if (GUI.RepeatButton(Rect(398,285,82,35), btn)) { doStuff=true; }
		//		else { doStuff=false; }
	}

	void nextFlare ()
	{
		GUIplanes [2].transform.localPosition = new Vector3 (240 * aspectMult - 31, -144, -30);
		GUIplanes [2].transform.localScale = new Vector3 (10, 5, 5);
		GUIplanes [2].GetComponent<Animation> ().Rewind ();
		GUIplanes [2].GetComponent<Animation> ().Play ("nextFlare");
		currAnims [2] = GUIplanes [2].GetComponent<Animation> ();
	}

	void calcAspectMult ()
	{
		float w = Screen.width; 
		float h = Screen.height;
		aspectMult = (w / h) / (1.5f);
		yAdj = h / 320.0f;
	}

	void Start ()
	{
		if (!GameObject.Find ("MusicSource(Clone)"))
			musicSource = Instantiate (Resources.Load<GameObject> ("MusicSource"), Vector3.zero, Quaternion.identity) as GameObject;

		musicSourceScript = musicSource.GetComponent<Music> ();
		musicSourceScript.SetTrack ();

		GUI1_init ();

		lastTime = Time.time;	
		dynTimeInc = timeInc;
		dynPauseInc = pauseInc;
		if (whichTro == "intro") {
			cinemaState = PlayerPrefs.GetInt ("CinemaState", 0);
			if (cinemaState == 0)
				PlayerPrefs.SetInt ("CinemaState", 1);
			texty [1] = "<00,01***BREEP ***BREEP ***BREEP**.*****\nan electric chirp and the taste of\nmetal are the first things you\nbecome aware of as you wake <01,20from\nhypersleep*. *****the interior of your\npod is bathed in the blue light of\na nearby supergiant star*.***@nf,15";
			texty [2] = ">00,01your oculars <05,14adjust*.***** \nyour attention <03,05darts from console\n<04,06to console <02,05as >01,10they come glowing\nto life around you*.***@nf,15";
			texty [3] = "@cc,00the one>02,03 at>03,03 your>04,03 armrest jots out\nthe vital statistics of your sleep*.\n*****DU<06,04RATION*:** 5*3*1*2* YEARS*.***** you\nlook hastily for another readout*,*\ntrying not to think about how long\nago* and far behind** that leaves\neveryone you ever knew*.***@nf,15";
			texty [4] = "@cc,02the <01,16main,>06,10* front console informs\nyou of the pod's reason for ending>05,10\nhypersleep*.****<07,04* POSSIBLE* OBJECT*\nOF* INTELLIGENT* ORIGIN*\nDETECTED*.<08,10********** the object comes\ndrifting onto the viewscreen*.*.*.*** \nand your breathing lapses*.***@nf,15";
			texty [5] = "there*,** >07,01silhouetted against the\nblue supergiant*,** is a** sort of***\narchitectural platform suspended\nin space*.***** all straight lines and\nrectilinear faces*,** the structure\nbears unmistakable marks of\nintelligent manufacture*.***@nf,15";
			texty [6] = ">01,20you cannot tell from this distance\nwhat it is made of@cc,01*,** but as your\nship slowly descends>08,10*,** the <11,02platform\nlights up<10,02*.*.*.** as if recognizing <09,02you*.***@nf,15";
			texty [7] = "what a fantastic discovery*,** this\narcade in the stars*!**** who made it*?**\nfor what purpose*?** if you were to\nexplore and catalog its every\ndimension in minute detail*,** would\nanyone ever read your report*?***@nf,15";
			texty [8] = "your ship touches down abruptly\nand stirs@cc,03 you from such stray\nspeculations*.***** you are here*.*** now*.*****\nafter 5*3*1*2* years of drifting*,\n**despite astronomical odds against*,\n**you have found something*!***** all that\nremains** is to explore it*.**.**.***@nf,15";
			texty [9] = ">09,01**>10,01**>11,01***********$";
		} else if (whichTro == "outro1") {
			//		cinemaState=PlayerPrefs.GetInt("CinemaState",0);
			//		if(cinemaState<2) PlayerPrefs.SetInt("CinemaState", 2);
			int artiCount = PlayerPrefs.GetInt ("ArtCount", 0);
			texty [1] = "<00,05*<05,03**<06,01*****your hands slide off the controls\n*and your body untenses* as you fly\nthrough the last of the gateways*.***@nf,15";
			texty [2] = "well done*,*** STARBOUNDER<07,01*!*****>07,06\nyour exploratory run over the\nmysterious structures is now\ncomplete*.**** you allow yourself a\nmoment of satisfaction*,** the first\nyou've had since you awoke\nin this place*.***@nf,15";
			texty [3] = ">06,04>05,03<02,10but the moment passes>00,24*@06,04 as you\nrealize you are no closer to\nunderstanding why it was built*.**\nand by whom*?******* perhaps the archi-\ntects felt no need to assuage\nyour curiosity and you never\n*WILL* know**.**.**.**@nf,15";
			texty [4] = "\n   <03,10.*.*.*or perhaps* these *strange\n   <04,10artifacts strewn about the\n  platforms hold some secret**.**.**.**?*****\n\n\n*****            %* " + artiCount + "*/*180*****@nf,15";
			texty [5] = ">03,03*>04,02*>02,02***********$";

		} else if (whichTro == "outro2") {
			//		cinemaState=PlayerPrefs.GetInt("CinemaState",0);
			//		if(cinemaState<4) PlayerPrefs.SetInt("CinemaState", 4);
			texty [1] = "<00,05*<05,03**<06,01*****your ship glides through the gate\nwith the last of the artifacts*.****\na cold wave<03,01 of <09,01electricity passes\nover your body>03,01>09,01<02,10*.**** you have the odd\n>05,06impression>06,10 of floating above your\nship*,** out into space*,*** above the\nstructure**.**.**.**@nf,15";
			texty [2] = ">00,20then*,**<04,05 ALL of the structures are\nspread out below**.***** you feel as\nthough you are allowed as much\ntime as you wish*,** an eternity*,**\nto inspect each one*.******* as soon as\nyou feel satisfied*,** your vision\ngoes black*.***>04,01*>02,01***@nf,15";
			texty [3] = "<11,08two eyes burn in from the dark*,**\nand then<13,10 a set of<12,10 teeth* and>11,12 claws*.**<10,15*****\nyou find yourself unexpectedly\nface to face with an inanimate\nmetal* beast*.****** it's a ship*!***@nf,15";
			texty [4] = "inside*,** the controls feel more\n>13,05comfortable than any you have\nused before*.*.*.>10,10** could it be<02,10 that\nwhoever built this place and\nleft this ship had *YOU* in mind*?***@nf,15";
			texty [5] = ">12,24but surely a ship like this is the\nproduct of an advanced tech-\nnology*,** not some personal\nconnection over eons of time*.*.*.*******<08,04\neven so*,** you cannot shake the\nfeeling that they knew you**.****@nf,15";
			texty [6] = "<00,05\n<06,02*****   w*e*l*l* d*o*n*e*<05,08**,*** STARBOUNDER<07,01*!********\n you've accomplished your mission*,******\n\n        but there is always\n          more to explore*!*****@nf,15";
			texty [7] = ">07,02>02,04**>08,03>00,03*>05,02*>06,02************$";
		} else if (whichTro == "outro3") {
			//		PlayerPrefs.SetInt("CinemaState", 5);
			texty [1] = "<05,00<00,01<04,01<02,04**@cc,05*>05,05\nthe mysterious beacons seem to\nhave awakened a lost memory*.*.*.***@nf,15";
			texty [2] = "\n*.*.*.*and finally your connection to\nthis place becomes clear*.*.*.***@nf,15";
			texty [3] = "\n\n* welcome* home*,*** STARBOUNDER<01,05<03,03<06,04*!<07,01****************************************************************>07,06>00,02>02,01>04,01**@nf,15";
			texty [4] = "<05,05*******************************$";
		}
	}


	void OnGUI ()
	{
		if (!loading) {
			//var btn: Texture = btnTexture[0];
			if (state == "write") {
				checkAdvance ();		
			}	
			GUItexts [0].text = dispText;
			GUItexts [1].text = dispText;
		} else
			GUI.DrawTexture (new Rect (0, 0, Screen.width, Screen.height), loadingScreen);
	}

	void Update ()
	{

		if (state == "wait") {
			nextyDown = false;
			normalSpeed ();
		} else if (nextyDown) {
			//dynTimeInc=timeInc/10;
			//dynPauseInc=pauseInc/10;
			// GUIplanes[1].renderer.material.mainTexture=btnTexture[3];
			Time.timeScale = 10.0f;
			foreach (Animation a in currAnims) {
				if (a) {
					foreach (AnimationState state in a) {
						state.speed = 0.1f;
					}
				}
			}
			// btnUp=false;
		} else {
			normalSpeed ();
		}

		if (state == "write") {
			if (nextyDown)
				GUIplanes [1].GetComponent<Renderer> ().material.mainTexture = btnTexture [3];
			else
				GUIplanes [1].GetComponent<Renderer> ().material.mainTexture = btnTexture [0];
		} else {
			if (Mathf.Round ((Time.time - waitTimeStart) * 2 / Time.timeScale) % 2 == 0)
				GUIplanes [1].GetComponent<Renderer> ().material.mainTexture = btnTexture [2];
			else
				GUIplanes [1].GetComponent<Renderer> ().material.mainTexture = btnTexture [1];
		}

		nextyDown = false;
		// inputs
		foreach (Touch touch in Input.touches) { 
			getButtonHit ((int)touch.position.x, (int)touch.position.y);
			if (touch.phase == TouchPhase.Ended)
				btnUp = true;
		}
		if (Input.GetMouseButton (0)) {
			getButtonHit ((int)Input.mousePosition.x, (int)Input.mousePosition.y);
		} else if (Input.GetMouseButtonUp (0))
			btnUp = true;
	}

	void getButtonHit (int x, int y)
	{

		if (y < Screen.height * 0.2f) {
			if (x < (90 * yAdj)) {
				if (btnUp) {
					//print("skipButton");
					end ();
					btnUp = false;
				}
			} else if (x > (Screen.width - (90 * yAdj))) {
				//print("ffButton");
				if (btnUp)
					nextyDown = true;
				if (state == "wait" && btnUp) { 
					nexty ();
					btnUp = false;
				}
				//doStuff=true;
			}
		}

	}


	void normalSpeed ()
	{
		Time.timeScale = 1.0f;
		foreach (Animation a in currAnims) {
			if (a) {
				foreach (AnimationState state in a) {
					state.speed = 1.0f;
				}
			}
		}
	}


	void nexty ()
	{
		dispText = "";
		whichText++;
		if (whichText >= texty.Length) {
			// do nothing
		} else {
			letterAdvance = -1;
			dynTimeInc = timeInc;
			dynPauseInc = pauseInc;
			state = "write";
			GUIplanes [1].GetComponent<Renderer> ().material.mainTexture = btnTexture [0];
			if (delObj)
				Destroy (delObj);
			btnUp = false;
		}
	}

	int parseChar (char t, char d)
	{ 				// - 48 for the ascii code of zero
		int tens = ((int)t - 48) * 10;
		int digits = (int)d - 48;
		return (tens + digits);
	}

	void checkAdvance ()
	{
		if (Time.time - lastTime > dynTimeInc) {
			letterAdvance++;
			lastTime = Time.time;

			int num = 0;
			int dur = 0;

			if (letterAdvance >= texty [whichText].Length) {
				waitTimeStart = Time.time;
				state = "wait";
				if (nextyDown)
					btnUp = false;
			} else if (texty [whichText] [letterAdvance] == '*') {
				lastTime += dynPauseInc;
			} else if (texty [whichText] [letterAdvance] == '<') {
				num = parseChar (texty [whichText] [letterAdvance + 1], texty [whichText] [letterAdvance + 2]);
				dur = parseChar (texty [whichText] [letterAdvance + 4], texty [whichText] [letterAdvance + 5]);
				inCard (num, dur);
				letterAdvance += 5;
			} else if (texty [whichText] [letterAdvance] == '>') {
				num = parseChar (texty [whichText] [letterAdvance + 1], texty [whichText] [letterAdvance + 2]);
				dur = parseChar (texty [whichText] [letterAdvance + 4], texty [whichText] [letterAdvance + 5]);
				StartCoroutine (outCard (num, dur));
				letterAdvance += 5;
			} else if (texty [whichText] [letterAdvance] == '@') {
				num = parseChar (texty [whichText] [letterAdvance + 4], texty [whichText] [letterAdvance + 5]);
				anim (num);
				letterAdvance += 5;
			} else if (texty [whichText] [letterAdvance] == '$') {
				end ();
			} else
				dispText += texty [whichText] [letterAdvance];
		}
	}

	void end ()
	{
		Time.timeScale = 1.0f;
		loading = true;
//		yield WaitForSeconds(0.2f);
		if (PlayerPrefs.GetInt ("FromLS", 0) == 0) {
			if (whichTro == "intro") { 		
				print ("goto playscene");
				PlayerPrefs.SetInt ("Level", 60);
				PlayerPrefs.SetInt ("CinemaState", 1);
				PlayerPrefs.SetInt ("TutorialState", 1);
				Application.LoadLevel (1); 
			}
			if (whichTro == "outro1") {
				print ("goto creds");
				Application.LoadLevel (5);
			}
			if (whichTro == "outro2") {
				print ("goto creds");
				Application.LoadLevel (5);
			}
			if (whichTro == "outro3") {
				print ("goto creds");
				Application.LoadLevel (5);
			}				
		} else {
			print ("goto level select menu");
			PlayerPrefs.SetInt ("Quit", 2);
			Application.LoadLevel (0); 
		}
	}



	void inCard (int which, int dur)
	{
		GameObject cardObj = Instantiate (cardPFs [which], Vector3.zero, Quaternion.identity) as GameObject;
		cardObj.name = "card" + which;
		IntroCardAnim cardScript = cardObj.GetComponent<IntroCardAnim> ();
		cardScript.dur = dur;
		if ((whichTro == "outro1" || whichTro == "outro2") && (which == 7 || which == 6))
			cardScript.dur = 0.25f;
		if (whichTro == "outro2" && which == 3)
			cardScript.dur = 0.25f;
		if (which == 15) {
			cardScript.dur = 0.25f;
			delObj = cardObj;
		}
		cardScript.fadeIn ();
		// keep track of certain anims so as to slow them down when timescale fast forwards
		// certain other exceptions
		if (whichTro == "intro") {
			if (which == 0 || which == 6 || which == 7) {
				currAnims [0] = cardObj.GetComponent<Animation> ();
			}
			if (which == 8) {
				currAnims [1] = cardObj.GetComponent<Animation> ();
			}
		}
		if (whichTro == "outro1") {
			if (which == 2) {
				currAnims [0] = cardObj.GetComponent<Animation> ();
				cardObj.transform.localScale = new Vector3 (cardObj.transform.localScale.x * aspectMult, cardObj.transform.localScale.y, cardObj.transform.localScale.z);
			}
			if (which == 7) { // make flares hit right for 4:3
				cardObj.transform.position = GUItexts [0].transform.position;
				cardObj.transform.localScale = new Vector3 (Mathf.Clamp01 (aspectMult), Mathf.Clamp01 (aspectMult), 1);
			}
		}
		if (whichTro == "outro2") {
			if (which == 2) {
				currAnims [0] = cardObj.GetComponent<Animation> ();
				cardObj.transform.localScale = new Vector3 (cardObj.transform.localScale.x * Mathf.Clamp (aspectMult, 1, 2), cardObj.transform.localScale.y, cardObj.transform.localScale.z); // stretch starfields if over 1.5 aspect
			}
			if (which == 4 || which == 3 || which == 8) {
				currAnims [1] = cardObj.GetComponent<Animation> ();
			}
			if (which == 7) {
				cardObj.transform.position = GUItexts [0].transform.position;
				cardObj.transform.localScale = new Vector3 (Mathf.Clamp01 (aspectMult), Mathf.Clamp01 (aspectMult), 1);
			}
		}
		if (whichTro == "outro3") {
			if (which == 7) {
				cardObj.transform.position = GUItexts [0].transform.position;
				cardObj.transform.localScale = new Vector3 (Mathf.Clamp01 (aspectMult), Mathf.Clamp01 (aspectMult), 1);
			}
			if (which == 0 || which == 1)
				cardObj.transform.localScale = new Vector3 (cardObj.transform.localScale.x * Mathf.Clamp (aspectMult, 1, 2), cardObj.transform.localScale.y, cardObj.transform.localScale.z); // stretch starfields if over 1.5 aspect
		}
		//	if (which==15 || which==7)  {
		//		currAnims[2]=cardObj.animation;
		//		cardObj.transform.parent=cam.transform;
		//		cardObj.transform.localPosition=Vector3(0,-1,10);
		//		cardObj.transform.localEulerAngles=Vector3(0,0,0);
		//	}
	}

	IEnumerator outCard (int which, int dur)
	{
		GameObject cardObj = GameObject.Find ("card" + which);
		if (cardObj) {
			IntroCardAnim cardScript = cardObj.GetComponent<IntroCardAnim> ();
			// wait on fade out and kill til blink anim is in off state
			if (whichTro == "intro") {
				if (which == 0 || which == 6 || which == 7) {
					yield return null; 
					while (cardObj.GetComponent<Animation> () ["buttonBlinkAlpha"].normalizedTime % 1 < 0.5f)
						yield return null;
				}
			}
			cardScript.dur = dur;
			cardScript.fadeOut ();
		}
	}

	void anim (int which)
	{
		if (which == 0)
			cam.GetComponent<Animation> ().Play ("camRotDown");
		if (which == 1)
			cam.GetComponent<Animation> ().Play ("camMoveDown");
		if (which == 2)
			cam.GetComponent<Animation> ().Play ("camRotUp");
		if (which == 3)
			cam.GetComponent<Animation> ().Play ("camShake");
		if (which == 5) {
			cam.GetComponent<Animation> ().Play ("camPushin");
			currAnims [0] = cam.GetComponent<Animation> ();
		}
		if (which == 4) {
			GameObject obj = GameObject.Find ("card6/null");
			obj.GetComponent<Animation> ().Play ("flareOut");
		}
		if (which == 15)
			nextFlare ();
	}
}
