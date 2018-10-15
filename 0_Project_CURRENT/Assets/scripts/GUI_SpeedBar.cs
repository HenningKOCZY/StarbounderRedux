using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GUI_SpeedBar : MonoBehaviour
{

	float maxSpeed = 70f;
	Image bar;
	Text speedText;


	void Awake ()
	{ 
		bar = transform.GetChild (0).GetComponent<Image> ();
		speedText = transform.GetChild (1).GetComponent<Text> ();
	}

	public void UpdateMe (float speed)
	{
		bar.rectTransform.localScale = new Vector3 (1, speed / maxSpeed, 1);
		speedText.text = speed.ToString ("00");
	}

}
