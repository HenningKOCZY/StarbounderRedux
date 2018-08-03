using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GUI_LevelSelect : MonoBehaviour
{

	public List<Text> ls_buttonTexts = new List<Text> ();
	int worldNum;
	int maxLevel;
	int maxWorld;
	int tutorialState;
	int cinemaState;


	public void UpdateFromPP (int lev)
	{
		// update stats from PP... do this separate rather than recalc every world change
		worldNum = (int)(Mathf.Floor (lev / 10));
//		print ("worldnum: " + worldNum);
		maxLevel = PlayerPrefs.GetInt ("MaxLevel", 0);
		maxWorld = (int)(Mathf.Floor (maxLevel / 10));
		tutorialState = PlayerPrefs.GetInt ("TutorialState", 0);
		cinemaState = PlayerPrefs.GetInt ("CinemaState", 0);
	}


	public void ButtonCatch (string s)
	{
		if (s == "world-") {
			//			selectedLevel = 99;
			//			selectionOn = false;
			//			if (sfx == 1)
			//				GetComponent<AudioSource> ().PlayOneShot (blip2);
			worldNum--;
			if (worldNum < 0)
				worldNum = 6;
			else if (worldNum > maxWorld)
				worldNum = maxWorld;
			//			print ("world: " + worldNum);
			Pop ();
		} else if (s == "world+") {
			//			selectedLevel = 99;
			//			selectionOn = false;
			//			if (sfx == 1)
			//				GetComponent<AudioSource> ().PlayOneShot (blip2);
			worldNum++;
			if (worldNum > 6)
				worldNum = 0;
			if (worldNum > maxWorld)
				worldNum = 6;
			//			print ("world: " + worldNum);
			Pop ();
		} else {
			int digits = 0;

			if (int.TryParse (s, out digits)) {
//				print ("level hit: " + (worldNum * 10 + digits));
				string type = "level";
				if (worldNum == 6) {
					if (digits < 5)
						type = "tutorial";
					else
						type = "cinema";
				}
				LevelLoad (type, (worldNum * 10 + digits));
			} else
				Debug.Log ("Not usable string input");
		}
	}


	void LevelLoad (string type, int lev)
	{
		GUInew gui = transform.parent.GetComponent<GUInew> ();

		if (type == "cinema") {
			int cinLevel = 0;
			if (lev == 65)
				cinLevel = 2;
			if (lev == 66)
				cinLevel = 3;
			if (lev == 67)
				cinLevel = 5;
			if (lev == 68)
				cinLevel = 4;
			if (lev == 69)
				cinLevel = 6;
			gui.LoadLevel (type, cinLevel);
		} else {
			gui.LoadLevel (type, lev);
		}
	}


	public void Pop ()
	{
		// set limit to how many buttons show up if you're in the highest world achieved
		int levelLimit = 9;
		if (worldNum == maxWorld)
			levelLimit = (maxLevel % 10);

		//		// if (ship.state.cruising) levelLimit--; // ?? why tho
		if (worldNum != 6) { 
			// go through the level buttons and label them, add their artifact state
			int d = 0;
			foreach (Text lsbt in ls_buttonTexts) {				
				string levelString = "" + worldNum + d;
				if (d <= levelLimit) {
					lsbt.transform.parent.gameObject.SetActive (true);
					lsbt.text = levelString;
				} else {
					lsbt.transform.parent.gameObject.SetActive (false); // turn off buttons of unavailable levels
				}

				//			int artCount = PlayerPrefs.GetInt ("Level" + (levelString [i]) + "ArtCount", 000);
				//			a1 [i] = (int)Mathf.Floor (artCount / 100);	
				//			a2 [i] = (int)Mathf.Floor ((artCount % 100) / 10);
				//			a3 [i] = (int)artCount % 10;

				// select the first level that has incomplete artifacts, unless in current level's world
				//			if (selectedLevel == 99 && worldNum != Mathf.Floor (level / 10)) {
				//				if (artCount < 111) {
				//					selectedLevel = i;
				//					selectionOn = true;		
				//				}
				//			}
				d++;
			}

		} else { // special buttons for tut/cin
			string[] tutStrings = new string[]{ "BASIC", "PANTHER" };
			for (int i = 0; i < 5; i++) {
				if (i < tutorialState) {
					ls_buttonTexts [i].transform.parent.gameObject.SetActive (true);
					ls_buttonTexts [i].text = tutStrings [i];
				} else {
					ls_buttonTexts [i].transform.parent.gameObject.SetActive (false);
				}
			}
			string[] cinStrings = new string[]{ "INTRO", "OUTRO", "CREDITS", "OUTRO2", "OUTRO3" };
			for (int i = 0; i < 5; i++) {
				if (i < tutorialState) {
					ls_buttonTexts [5 + i].transform.parent.gameObject.SetActive (true);
					ls_buttonTexts [5 + i].text = cinStrings [i];
				} else {
					ls_buttonTexts [5 + i].transform.parent.gameObject.SetActive (false);
				}
			}
		}

		//		if (tutorialState == 1 && level == 60) {
		//			selectedLevel = 0;
		//			selectionOn = true;
		//		}
		//
		//		if (worldNum == Mathf.Floor (level / 10)) {
		//			curLevel = (level - (worldNum * 10));
		//			selectedLevel = curLevel;
		//			selectionOn = true;
		//		} else if (selectedLevel == 99) {
		//			selectedLevel = 0;
		//			selectionOn = true;
		//		}

	}
}
