using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GUI_progbar : MonoBehaviour
{

	GUIQuadObj progScript;
	public GUIQuadObj progBox1;
	public GUIQuadObj progBox2;

	//	public MoveShip ship;
	//	public GUIScript gui;
	// send from moveship, don't need moveship here. Or GUI
	public float barLength = 320;
	public float aspectMult = 1.0f;
	float barHeight = 1f;
	float barYpos = 13f;


	void Awake ()
	{ 
		progScript = this.GetComponent<GUIQuadObj> ();
	}


	public void UpdateMe (float prog)
	{
		progScript.Scale = new Vector2 (prog * barLength * 0.99f, barHeight);
		progScript.Location = new Vector2 ((-240 * aspectMult + 321) + ((progScript.Scale.x) / 2), barYpos);
	}


	public void DisableMe ()
	{
		progScript.Enabled = false;
		progScript.Visible = false;
		progBox1.Enabled = false;
		progBox1.Visible = false;
		progBox2.Enabled = false;
		progBox2.Visible = false;
	}


	public void EnableMe ()
	{
		progScript.Enabled = true;
		progScript.Visible = true;
		progBox1.Enabled = true;
		progBox1.Visible = true;
		progBox2.Enabled = true;
		progBox2.Visible = true;
	}
}
