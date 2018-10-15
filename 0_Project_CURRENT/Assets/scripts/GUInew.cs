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
	public GUI_ProgBar progbar;
	public GUI_ArtiBar artibar;
	public Text time;
	public Text lvl;
	public GUI_SpeedBar speedbar;
	public GUI_JumpBar jumpbar;
	public GUI_Blacker camBlack;
	[HideInInspector]
	public float blackerPause = 0.4f;

	public GUI_VC vc;

	public GUI_LevelSelect ls;
	public GUI_TitleScreen ts;
	public Sprite[] worldTitles;

	public List<GameObject> cgs = new List<GameObject> ();


	public enum State
	{
		Play,
		VictoryCruise,
		Title,
		LevelSelect,
		Options,
		Paused,
		Loading,
		Tutorial
	}


	public State state = State.Play;

	void Awake ()
	{
		gm = GameMaster.instance;
		ship = gm.ship;
		cam = gm.cam;

		cgs [7].SetActive (true); // turn blacker on if not on
		switchGUI (state);
	}

	public static bool[] ArtiCount (int level, string which = "art")
	{
		bool[] retbool = new bool[4];
		if (which == "art") {
			int artCount = PlayerPrefs.GetInt ("Level" + level + "ArtCount", 000);

			retbool [0] = ((int)Mathf.Floor (artCount / 100) == 1) ? true : false;
			retbool [1] = ((int)Mathf.Floor ((artCount % 100) / 10) == 1);
			retbool [2] = ((int)artCount % 10 == 1);
		} else {
			// for panther now
			// do them separate, dont always want to check all the PPs

//			int artCount = PlayerPrefs.GetInt ("Level" + level + "ArtCount", 000);
//			retbool [3] = ((int)artCount % 10 == 1);
		}

		return retbool;
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
			cgs [5].SetActive (false);
			cgs [6].SetActive (false);
			lvl.text = "lv. " + ship.level;
			break;

		case State.VictoryCruise:

			cgs [0].SetActive (false);
			cgs [1].SetActive (true);
			cgs [2].SetActive (false);

			vc.UpdateMe (ship.level, ship.levelAttempts, ship.stats.elapsedTime, gm.oldRecord);

			break;

		case State.Paused:
			cgs [0].SetActive (false);
			cgs [1].SetActive (false);
			cgs [2].SetActive (true);
			cgs [3].SetActive (false);
			cgs [4].SetActive (false);
			break;

		case State.LevelSelect:
			cgs [2].SetActive (false);
			cgs [3].SetActive (true);
			ls.UpdateFromPP (ship.level);
			ls.Pop ();
			break;

		case State.Options:
			cgs [2].SetActive (false);
			cgs [4].SetActive (true);
			// update from PP
			break;

		case State.Title:
			cgs [0].SetActive (false);
			cgs [1].SetActive (false);
			cgs [2].SetActive (false);
			cgs [3].SetActive (false);

			cgs [6].SetActive (true);
			CanvasGroup tcg = cgs [6].GetComponent<CanvasGroup> ();
			StartCoroutine (Fade ("on", tcg, 2f, 0.5f));
			int w = gm.worldNum;
			ts.ChangeTitle (worldTitles [w * 2], worldTitles [w * 2 + 1]);
			break;

		case State.Loading:
			cgs [0].SetActive (false);
			cgs [1].SetActive (false);
			cgs [2].SetActive (false);
			cgs [3].SetActive (false);
			cgs [4].SetActive (false);
			cgs [5].SetActive (true);
			cgs [6].SetActive (false);
			break;
		
		}

		state = which;
	}

	IEnumerator Fade (string which, CanvasGroup cg, float dur = 1f, float waitFirst = 0f)
	{
		float startAlpha = 0;
		float endAlpha = 1f;

		if (which == "off") {
			startAlpha = 1;
			endAlpha = 0;
		}
		cg.alpha = startAlpha;

		yield return new WaitForSeconds (waitFirst);

		for (float f = 0; f < dur; f += Time.deltaTime) {
			cg.alpha = Mathf.Lerp (startAlpha, endAlpha, f / dur);
			yield return null;
		}
		cg.alpha = endAlpha;
	}


	public void UpdateArti (int artiIndex)
	{
		artibar.UpdateMe (artiIndex);
	}

	public void UpdateJump (int which)
	{
		jumpbar.UpdateMe (which);
	}

	public void UpdatePlayGUI (float t, float speed, float prog)
	{
		//time
		string stringTime;
		if (state == State.Play) {
			stringTime = t.ToString ("00.00");
			if (t < 0) {
				stringTime = "**.**";
			}

			time.text = stringTime;
		}
		// speed
		speedbar.UpdateMe (speed);
		// prog
		progbar.UpdateMe (prog);
	}


	// "Button Catchers" sending button hits here
	public void BC_Victory (string s)
	{
		switch (s) {
		case "continue":
			ResetHardVC ();
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
			PlayerPrefs.SetInt ("Quit", 1);
			ship.state = MoveShip.State.Crashing; // disallows further movement?							
			StartCoroutine (MainMenu ());
			break;
		case "options":
//			if (sfx == 1)
//				GetComponent<AudioSource> ().PlayOneShot (blip1);
			switchGUI (State.Options);
			break;
		case "level":
//			if (sfx == 1)
//				GetComponent<AudioSource> ().PlayOneShot (blip1);
			switchGUI (State.LevelSelect);
			break;
		case "restart":
//			if (sfx == 1)
//				GetComponent<AudioSource> ().PlayOneShot (blip1);
			gm.Unpause ();
			ship.state = MoveShip.State.Crashing;
			ship.restarted = true;
			PlayerPrefs.SetInt ("Level", gm.level);
			Reset (3);
			break;
		}

	}

	IEnumerator MainMenu ()
	{
		Time.timeScale = 1;
		camBlack.Go ("in");
		yield return new WaitForSeconds (0.25f);
		switchGUI (State.Loading);
		//Destroy(musicSource); // why?
		Application.LoadLevel (0);	
	}

	public void Reset (int which)
	{
		StopAllCoroutines ();
		StartCoroutine (ResetCo (which));
	}

	IEnumerator ResetCo (int which)
	{
		camBlack.Go ("in");
		yield return new WaitForSeconds (blackerPause);
		ship.Reset (which);
	}

	public void ResetHardVC ()
	{
		StartCoroutine (VCcontinueCO ());
	}

	IEnumerator VCcontinueCO ()
	{
		//		VCbuttonState = 1;
		//		if (sfx == 1)
		//			GetComponent<AudioSource> ().PlayOneShot (gameStart);
		yield return new WaitForSeconds (0.2f);
		camBlack.Go ("in");
		yield return new WaitForSeconds (blackerPause);

		Application.LoadLevel (1);
	}



	public void BC_OptionsMenu (string s)
	{
		switch (s) {
		case "cancel":
			switchGUI (State.Paused);
			break;
		case "speed":
			break;
		case "music":
			break;
		case "sfx":
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



	/// Some left over from oldGUI that I thought would be useful for later

	// select the current level
	//	void drawSelection ()
	//	{
	//		if (selectionOn) {
	//			if (worldNum != 6)
	//				GUIplane (((int)(Mathf.Floor (selectedLevel / 5) * 2 - 1) * 115), (83 - ((selectedLevel % 5) * 41)), 254, 68, selection [selectionState], 5, 16);
	//			else
	//				GUIplane (((int)(Mathf.Floor (selectedLevel / 5) * 2 - 1) * 115), (83 - ((selectedLevel % 5) * 41)), 254, 68, selection2 [selectionState], 5, 16);
	//			GUIplanes [5].gameObject.layer = 17;
	//		}
	//	}
	//


	// make the arts and panther icons come on over time in VC
	//	IEnumerator switchArtsVC ()
	//	{ // switch this to coroutine
	//		// switch textures at set times, but always check to make sure still in victoryCruise. waitForSeconds always means the function keeps going on its own.
	//		yield return new WaitForSeconds (1.0f);
	//		if (state == "victoryCruise")
	//			GUIplanes [8].GetComponent<Renderer> ().material.mainTexture = artifactIcon [a1state];
	//		yield return new WaitForSeconds (0.1f);
	//		if (state == "victoryCruise")
	//			GUIplanes [9].GetComponent<Renderer> ().material.mainTexture = artifactIcon [a2state];
	//		yield return new WaitForSeconds (0.1f);
	//		if (state == "victoryCruise")
	//			GUIplanes [10].GetComponent<Renderer> ().material.mainTexture = artifactIcon [a3state];
	//		yield return new WaitForSeconds (0.1f);
	//		if (state == "victoryCruise")
	//			GUIbuttons [2].GetComponent<Renderer> ().material.mainTexture = pantherIcon [pantherFlag [0]];
	//
	//	}

	//	void SwipeLevel (int swipe)
	//	{
	//		print ("swipe function ran");
	//		nextGo = false;
	//		getButtonHit (0, 0, swipe);
	//	}
	//
	//
	//

}
