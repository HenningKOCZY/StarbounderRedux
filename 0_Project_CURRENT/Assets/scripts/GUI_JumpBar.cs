using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GUI_JumpBar : MonoBehaviour
{

	Text jumpText;


	void Awake ()
	{ 
		jumpText = transform.GetChild (0).GetComponent<Text> ();
	}

	public void UpdateMe (int which)
	{
		string dispText = "| |";
		if (which == 1)
			dispText = "|";
		if (which == 2)
			dispText = "";
		jumpText.text = dispText;
	}

}
