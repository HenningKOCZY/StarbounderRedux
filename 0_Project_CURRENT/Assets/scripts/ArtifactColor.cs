using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ArtifactColor : MonoBehaviour {

	public Material artMat;
	string channel;

	public void colorBurst(Color artColor, string channel){
		gameObject.GetComponent<Renderer>().material.SetColor(channel, artColor);
	}
}
