using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Music : MonoBehaviour {

	int music;
	int level;
	public int worldNum;
	string[] worldTrackName;
	string[] sceneTrackName;

	void Awake() {
		DontDestroyOnLoad(transform.gameObject);
	}

	void SetTrack() {
		music = PlayerPrefs.GetInt("Music", 1);	
		if (music == 1) {
			gameObject.GetComponent<AudioSource>().loop = true;
			if (Application.loadedLevel == 1) {
				level = PlayerPrefs.GetInt("Level", 0);
				worldNum = (int)Mathf.Floor(level / 10);
				if (gameObject.GetComponent<AudioSource>().clip == null) {
					if (worldNum == 6)
						gameObject.GetComponent<AudioSource>().clip = Resources.Load<AudioClip>(worldTrackName[worldNum + (level - 60)]);
					else
						gameObject.GetComponent<AudioSource>().clip = Resources.Load<AudioClip>(worldTrackName[worldNum]);
				} else { 
					if (worldNum == 6 && gameObject.GetComponent<AudioSource>().clip.name != worldTrackName[worldNum + (level - 60)])
						gameObject.GetComponent<AudioSource>().clip = Resources.Load<AudioClip>(worldTrackName[worldNum + (level - 60)]);
					else if (gameObject.GetComponent<AudioSource>().clip.name != worldTrackName[worldNum])
							gameObject.GetComponent<AudioSource>().clip = Resources.Load<AudioClip>(worldTrackName[worldNum]);	
				}		
			}
			if (Application.loadedLevel > 1) {
				gameObject.GetComponent<AudioSource>().clip = Resources.Load<AudioClip>(sceneTrackName[Application.loadedLevel]);
				print(sceneTrackName[Application.loadedLevel]);
			}
			if (!gameObject.GetComponent<AudioSource>().isPlaying)
				gameObject.GetComponent<AudioSource>().Play();
		} else
			StopTrack();
	}

	void StopTrack() {
		gameObject.GetComponent<AudioSource>().Stop();	
	}
}
