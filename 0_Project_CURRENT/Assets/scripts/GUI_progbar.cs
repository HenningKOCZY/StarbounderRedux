using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GUI_progbar : MonoBehaviour {

	GUIQuadObj progScript;

	GameObject shipObj;
	MoveShip ship;
	public float barLength;
	float prog;
	GUIScript gui;
	public float aspectMult = 1.0f;
	float barHeight = 2f;
	float barYpos = 10f;

	void Awake() { 
		progScript = this.GetComponent<GUIQuadObj>();
		shipObj = GameObject.Find("Ship");
		ship = shipObj.GetComponent<MoveShip>();
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
