using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GUInew : MonoBehaviour
{

	public GameMaster gm;
	public MoveShip ship;
	public MoveCam cam;

	public GUI_progbar progbar;
	public Text time;
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
		switchGUI (state);
	}


	public void switchGUI (State which)
	{

		switch (which) {
		case State.Play:
			cgs [0].SetActive (true);
			cgs [1].SetActive (false);
			cgs [2].SetActive (false);
			break;
		case State.VictoryCruise:
			cgs [0].SetActive (false);
			cgs [1].SetActive (true);
			cgs [2].SetActive (false);
			// animate on the stats in a way, artifacts and panther
			// see if new record?
			//			StartCoroutine (switchArtsVC ());
			//			camBlackAnim.Play ("VC_anim");
			break;
		case State.Paused:
			cgs [0].SetActive (false);
			cgs [1].SetActive (false);
			cgs [2].SetActive (true);
			break;
		case State.LevelSelect:
			cgs [2].SetActive (false);
			break;
		case State.Options:
			cgs [2].SetActive (false);
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


	// "Button Catchers" sending button hits here
	public void BC_Victory (string s)
	{
		switch (s) {
		case "continue":
			StartCoroutine (VCcontinueCO ());
			break;
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
			if (PlayerPrefs.GetInt ("FromLS", 0) == 0) {
//				if (tutorialState == 1 && level == 60)
//					worldNum = 0;
//				selectedLevel = 0;	

//				print ("worldnum " + worldNum);
//				print ("selectedLevel " + selectedLevel);
			}
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
