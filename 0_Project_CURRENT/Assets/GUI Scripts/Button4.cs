using UnityEngine;
using System.Collections;

public class Button4 : MonoBehaviour {

	void Awake ()
	{
	}
	
	void Start ()
	{
	}
		
	void onGUIDown (Touch pTouch)
	{
		Debug.Log(gameObject.name + " Down");
	}

	void onGUIUp (Touch pTouch)
	{
		Debug.Log(gameObject.name + " Up");
	}
}
