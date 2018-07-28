﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Explosion : MonoBehaviour
{

	CardAnim card;
	//	ParticleSystem part;
	Transform mark;
	Transform markSub;
	Vector3 crashPos;
	// sound

	void Start ()
	{
		card = transform.GetChild (0).GetChild (0).GetComponent<CardAnim> ();
		mark = transform.GetChild (1);
		markSub = mark.GetChild (0);

	}


	public void MakeSplode (Vector3 pos)
	{
		//playSound("explode");
		crashPos = pos;
		transform.position = pos;
		// random rot
		card.transform.localEulerAngles = new Vector3 (0, Random.Range (0, 360), 0);
		//			//		splodeParticles.GetComponent.<ParticleEmitter>().emit = true;
		card.lookAtCam = true;
		card.CardGo ();
	}

	public void MakeSplodeMark ()
	{
		mark.position = crashPos; 
		markSub.localEulerAngles = new Vector3 (0, 0, Random.Range (0, 360));
	}

	public void reset ()
	{
		transform.localEulerAngles = new Vector3 (336, 180, 180); // ?
		transform.position = new Vector3 (0, 0, -100);
		mark.position = new Vector3 (0, 0, -50);
	}
}
