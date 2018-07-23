using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GUI_progbar : MonoBehaviour {

	GUIQuadObj progScript;

	public MoveShip ship;
	public GUIScript gui;
	// send from moveship, don't need moveship here.
	public float barLength = 320;
	float prog = 0;
	public float aspectMult = 1.0f;
	float barHeight = 2f;
	float barYpos = 10f;

	void Awake() { 

		progScript = this.GetComponent<GUIQuadObj>();

		print("pp: " + ship.state.progress + " other: " + ship.winDist);
	}


	void Update() {
		if (gui.state == "play" && !ship.state.cruising) {
			progScript.Enabled = true;
			progScript.Visible = true;        
			prog = Mathf.Clamp01(ship.state.progress / ship.winDist);  


			progScript.Scale = new Vector2(prog * barLength * 0.99f, barHeight);
			progScript.Location = new Vector2((-240 * aspectMult + 321) + ((progScript.Scale.x) / 2), barYpos);

		} else {
			progScript.Enabled = false;
			progScript.Visible = false;        
		}        
	}
}
