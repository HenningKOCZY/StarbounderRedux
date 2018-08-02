using System.Collections;
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

	void Awake ()
	{
		card = transform.GetChild (0).GetChild (0).GetComponent<CardAnim> ();
		mark = transform.GetChild (1);
		markSub = mark.GetChild (0);

	}

	public void InitColor (Vector4 inColor)
	{
//		card.GetComponent<Renderer> ().material.SetColor ("_Emission", inColor * 0.8f);
		card.GetComponent<Renderer> ().material.SetColor ("_TintColor", inColor * 0.7f);
	}

	public void MakeSplode (Vector3 inPos)
	{
		//playSound("explode");
		crashPos = inPos;
		transform.position = inPos;
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
		mark.position = new Vector3 (0, 0, -90);
	}
}
