using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GUInew : MonoBehaviour
{

	GameMaster gm;
	MoveShip ship;
	MoveCam cam;

	// do normal play updates here on root GUi, separate the rest. VC, LS, Options
	public GUI_progbar progbar;
	public GUI_ArtiBar artibar;
	public Text time;
	public Text lvl;

	public Text vc_lvl;
	public Text vc_attempts;
	public Text vc_time;
	public Text vc_record;

	public GUI_LevelSelect ls;

	public List<GameObject> cgs = new List<GameObject> ();
	public GUIScript guiold;

	public enum State
	{
		Play,
		VictoryCruise,
		Title,
		LevelSelect,
		Options,
		Paused,
		Loading
	}


	public State state = State.Play;

	void Awake ()
	{
		gm = GameMaster.instance;
		ship = gm.ship;
		cam = gm.cam;
		switchGUI (state);
	}


	public void switchGUI (State which)
	{
		StopAllCoroutines ();
		switch (which) {
		case State.Play:
			cgs [0].SetActive (true);
			cgs [1].SetActive (false);
			cgs [2].SetActive (false);
			cgs [3].SetActive (false);
			cgs [4].SetActive (false);
			lvl.text = "lv. " + ship.level;
			break;

		case State.VictoryCruise:
			float curTime = ship.stats.elapsedTime;
			float oldRecord = gm.oldRecord;

			cgs [0].SetActive (false);
			cgs [1].SetActive (true);
			cgs [2].SetActive (false);
			// animate on the stats in a way, artifacts and panther
			//			StartCoroutine (switchArtsVC ());
			//			camBlackAnim.Play ("VC_anim");

			// attempts
			vc_attempts.text = "" + ship.levelAttempts;
			// level readout
			int level = ship.level;
			if (level >= 10)
				vc_lvl.text = "" + level;
			else
				vc_lvl.text = "0" + level;
			
			// time and record time
			vc_time.text = "time: " + curTime.ToString ("00.00");
			if (curTime < oldRecord)
				vc_record.text = "NEW RECORD!!!";
			else
				vc_record.text = "RECORD: " + oldRecord.ToString ("00.00");

			break;

		case State.Paused:
			cgs [0].SetActive (false);
			cgs [1].SetActive (false);
			cgs [2].SetActive (true);
			cgs [3].SetActive (false);
			break;

		case State.LevelSelect:
			cgs [2].SetActive (false);
			cgs [3].SetActive (true);
			ls.UpdateFromPP (ship.level);
			ls.Pop ();
			break;

		case State.Options:
			cgs [2].SetActive (false);
			break;

		case State.Title:
			cgs [0].SetActive (false);
			cgs [3].SetActive (false);
			break;

		case State.Loading:
			cgs [0].SetActive (false);
			cgs [1].SetActive (false);
			cgs [2].SetActive (false);
			cgs [3].SetActive (false);
			cgs [4].SetActive (true);
			break;
		
		}

		state = which;
	}


	public void UpdateProg (float prog)
	{
		progbar.UpdateMe (prog);
	}

	public void UpdateTime (float t)
	{
		string stringTime;
		if (state == State.Play) {
			stringTime = t.ToString ("00.00");
			if (t < 0) {
				stringTime = "**.**";
			}

			time.text = stringTime;
		}
	}

	public void UpdateArti (int artiIndex)
	{
		artibar.UpdateMe (artiIndex);
	}

	public void UpdateSpeed (float speed)
	{

	}


	// "Button Catchers" sending button hits here
	public void BC_Victory (string s)
	{
		switch (s) {
		case "continue":
			StartCoroutine (VCcontinueCO ());
			break;
		}

	}


	public void BC_levelSelect (string s)
	{
		if (s == "cancel") {
			switchGUI (State.Paused);
		} else { // send it on to the LS
			ls.ButtonCatch (s);
		}
	}


	public void BC_PauseMenu (string s)
	{
		switch (s) {
		case "cancel":
			gm.Unpause ();
			break;
		case "main":
//			if (sfx == 1)
//				GetComponent<AudioSource> ().PlayOneShot (blip1);
			//unpause();
			PlayerPrefs.SetInt ("Quit", 1);
			ship.state = MoveShip.State.Crashing; // disallows further movement?							
			guiold.switchGUI ("loading");
			Time.timeScale = 1;
			// camblack>?
			//		yield WaitForSeconds(0.2f);
			//Destroy(musicSource); // why?
			Application.LoadLevel (0);	
			break;
		case "options":
//			if (sfx == 1)
//				GetComponent<AudioSource> ().PlayOneShot (blip1);
			guiold.switchGUI ("options");
			switchGUI (State.Options);
			break;
		case "level":
//			if (sfx == 1)
//				GetComponent<AudioSource> ().PlayOneShot (blip1);
//			if (PlayerPrefs.GetInt ("FromLS", 0) == 0) { // what this??
//				if (tutorialState == 1 && level == 60)
//					worldNum = 0;
//				selectedLevel = 0;	

//				print ("worldnum " + worldNum);
//				print ("selectedLevel " + selectedLevel);
//			}
			guiold.switchGUI ("levelSelect");
			switchGUI (State.LevelSelect);
			break;
		case "restart":
//			if (sfx == 1)
//				GetComponent<AudioSource> ().PlayOneShot (blip1);
			gm.Unpause ();
			ship.state = MoveShip.State.Crashing;
			ship.restarted = true;
			//		CamBlack ("down");
			PlayerPrefs.SetInt ("Level", gm.level);
			ship.reset (3);
			break;
		}

	}


	public void LoadLevel (string type, int lev) // if its a cinema, load a SCENE of a certain number. If its a level or tut, load a level within playscene
	{
		//		if (sfx == 1)
		//			GetComponent<AudioSource> ().PlayOneShot (gameStart);
		ship.state = MoveShip.State.Crashing; // disallow further movemnt and winning...?

		if (type == "level")
			gm.SetLevel (lev);
		else if (type == "tutorial") {
			gm.SetLevel (lev);
			if (lev == 61) // if it's panther tut, switch ship to panther
				PlayerPrefs.SetInt ("ShipNum", 10);
		}

		switchGUI (State.Loading);
		Time.timeScale = 1;
		StartCoroutine (LoadLevelCo (type, lev));
	}


	IEnumerator LoadLevelCo (string type, int lev)
	{
		print (type + "  " + lev);
		yield return new WaitForSeconds (0.2f);
		if (type != "cinema")
			Application.LoadLevel (1);
		else {
			Application.LoadLevel (lev);
		}
	}

	IEnumerator VCcontinueCO ()
	{
//		VCbuttonState = 1;
//		if (sfx == 1)
//			GetComponent<AudioSource> ().PlayOneShot (gameStart);
		yield return new WaitForSeconds (0.4f);
//		CamBlack ("down");
//		yield return new WaitForSeconds (0.8f);

		Application.LoadLevel (1);
	}



}
