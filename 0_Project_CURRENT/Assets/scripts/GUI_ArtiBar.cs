using System.Collections;

//using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GUI_ArtiBar : MonoBehaviour
{

	Text a1;
	Text a2;
	Text a3;
	Color onC = Color.white;
	Color offC = new Vector4 (1, 1, 1, 0.1f);

	void Awake ()
	{
		a1 = transform.GetChild (0).GetComponent<Text> ();
		a2 = transform.GetChild (1).GetComponent<Text> ();
		a3 = transform.GetChild (2).GetComponent<Text> ();
	}

	public void UpdateMe (int artiIndex)
	{
		// do stuff to translate int to display text
		a1.color = (artiIndex >= 100) ? onC : offC;
		a2.color = (artiIndex % 100 >= 10) ? onC : offC;
		a3.color = (artiIndex % 10 >= 1) ? onC : offC;

	}



	public IEnumerator SlowUpdateMe ()
	{ // for turning on the icons over time
		yield return null;
	}
}
