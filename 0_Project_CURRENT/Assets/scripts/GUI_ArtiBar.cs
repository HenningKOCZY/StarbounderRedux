using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GUI_ArtiBar : MonoBehaviour
{

	Text artiDisplay;

	void Awake ()
	{
		artiDisplay = transform.GetComponent<Text> ();
	}

	public void UpdateMe (int artiIndex)
	{
		string disp = "";
		// do stuff to translate int to display text
//		bool temp = false;
//		temp = artiIndex >= 100 ? true:false;
//		artiIndex % 100 >= 10 ? disp += AddArtiState (true) : disp += AddArtiState (false);
//		artiIndex % 10 >= 1 ? disp += AddArtiState (true) : disp += AddArtiState (false);

		disp += AddArtiState (artiIndex >= 100);
		disp += AddArtiState (artiIndex % 100 >= 10);
		disp += AddArtiState (artiIndex % 10 >= 1);

		artiDisplay.text = disp;
	}

	string AddArtiState (bool which)
	{
		if (which == true)
			return "[*]";
		else
			return "   ";
	}

	public IEnumerator SlowUpdateMe ()
	{ // for turning on the icons over time
		yield return null;
	}
}
