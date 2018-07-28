using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class IntroCardAnim : MonoBehaviour
{
	public float dur;
	public bool overlay = true;
	bool overlayFullStrength;
	float goalAlpha = 0;
	private Transform card;
	public float t = 0;
	public string state = "stopped";
	private float oVal;
	Material mat;

	void Start ()
	{
		card = transform.GetChild (0);
		if (!card)
			card = transform.Find ("null/card");
		
		mat = card.GetComponent<Renderer> ().material;

		if (overlayFullStrength)
			oVal = 0.75f;
		else
			oVal = 0.5f;
		

		if (overlay)
			mat.SetColor ("_TintColor", new Vector4 (oVal, oVal, oVal, 0));
		else
			mat.color = new Vector4 (mat.color.r, mat.color.g, mat.color.b, 0);
	}

	public IEnumerator fadeIn ()
	{
		state = "in";
		while (state == "in") {
			t += Time.deltaTime / dur;
			goalAlpha = Mathf.SmoothStep (0, 1, t);	

			if (goalAlpha >= 0.99f) {
				goalAlpha = 1;
				state = "stopped";
				t = 1;
			}

			if (overlay)
				mat.SetColor ("_TintColor", new Vector4 (oVal, oVal, oVal, goalAlpha));
			else
				mat.color = new Vector4 (mat.color.r, mat.color.g, mat.color.b, goalAlpha);

			yield return null;

		}
	}

	public IEnumerator fadeOut ()
	{
		state = "out";
		t = 1 - t;
		while (state == "out") {
			t += Time.deltaTime / dur;
			goalAlpha = Mathf.SmoothStep (1, 0, t);	

			if (overlay)
				card.GetComponent<Renderer> ().material.SetColor ("_TintColor", new Vector4 (oVal, oVal, oVal, goalAlpha));
			else
				mat.color = new Vector4 (mat.color.r, mat.color.g, mat.color.b, goalAlpha);

			if (goalAlpha <= 0.01f) {
				state = "stopped";
			}

			yield return null;
		}

		if (gameObject)
			Destroy (gameObject);
	}
}
