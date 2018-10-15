using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GUI_Blacker : MonoBehaviour
{

	Image b;
	float w;
	[SerializeField]
	AnimationCurve acin;
	[SerializeField]
	AnimationCurve acout;

	void Awake ()
	{
		b = transform.GetChild (0).GetComponent<Image> ();
		w = Screen.width;
		Shuffle ();
	}


	void Shuffle ()
	{
		float xRand = 1;
		float yRand = 1;

		if (Random.value > 0.5f)
			yRand = -1;
		
		b.rectTransform.localScale = new Vector3 (2, 1 * yRand, 1);

	}


	public void Go (string which)
	{
		if (which == "in") {
			Shuffle ();
			StartCoroutine (SlideCo (which, ((w / -2) - (2 * w)), w / -2));
		} else {
			StartCoroutine (SlideCo (which, w / -2, ((w / -2) - (2 * w))));
		}
	}


	IEnumerator SlideCo (string which, float start, float end)
	{
		float x = start;
		float dur = 0.7f; 
		if (which == "in")
			dur = 0.2f;

		b.rectTransform.localPosition = new Vector3 (start, 0, 0);

		for (float f = 0; f < dur; f += Time.deltaTime) {
			if (which == "in")
				x = Mathf.Lerp (start, end, acin.Evaluate (f / dur));
			else
				x = Mathf.Lerp (start, end, acout.Evaluate (f / dur));
			
			b.rectTransform.localPosition = new Vector3 (x, 0, 0);
			yield return null;
		}
		b.rectTransform.localPosition = new Vector3 (end, 0, 0);
	}

}
