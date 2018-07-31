using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GUI_progbar : MonoBehaviour
{

	Image midbar;


	void Awake ()
	{ 
		midbar = transform.GetChild (0).GetComponent<Image> ();
	}


	public void UpdateMe (float prog)
	{
		midbar.rectTransform.localScale = new Vector3 (prog, 1, 1);
	}
		
}
