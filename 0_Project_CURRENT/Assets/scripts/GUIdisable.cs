using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GUIdisable : MonoBehaviour
{

	GUIQuadObj guiQuadObjScript;
	GameObject shipObj;
	MoveShip ship;
	GameObject guiObj;
	GUIScript gui;

	void Awake ()
	{ 
		guiQuadObjScript = this.GetComponent<GUIQuadObj> ();
		shipObj = GameObject.Find ("Ship");
		ship = shipObj.GetComponent<MoveShip> ();
		guiObj = GameObject.Find ("GUI_1");
		gui = guiObj.GetComponent<GUIScript> ();
	}


	void Update ()
	{
		if (gui.state == "play" && ship.state == MoveShip.State.Normal) {
			guiQuadObjScript.Enabled = true;
			guiQuadObjScript.Visible = true;	
		} else {
			guiQuadObjScript.Enabled = false;
			guiQuadObjScript.Visible = false;	
		}	
	}

}
