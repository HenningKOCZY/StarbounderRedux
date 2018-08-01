using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class JumpBurst : MonoBehaviour
{

	Vector3 pos;
	Vector3 vel;
	CardAnim card;
	Coroutine jumpCo;

	void Awake ()
	{
		card = transform.GetChild (0).GetChild (0).GetComponent<CardAnim> ();
	}


	public void InitColor (Vector4 inColor)
	{
//		card.GetComponent<Renderer> ().material.SetColor ("_Emission", inColor * 0.8f);
		card.GetComponent<Renderer> ().material.SetColor ("_TintColor", inColor * 0.8f);
	}


	public void MakeJump (Vector3 inPos, Vector3 inVel)
	{
		if (jumpCo != null) // stop moving if already moving
			StopCoroutine (jumpCo);
		
		if (Random.value > 0.5f) { 	// do random flip
			card.transform.localScale = new Vector3 (card.transform.localScale.x * -1, card.transform.localScale.y, card.transform.localScale.z);
		}

		card.CardGo ();
		pos = inPos;
		vel = inVel;

		jumpCo = StartCoroutine (JumpMove ());
	}


	IEnumerator JumpMove ()
	{
		transform.position = pos + (Vector3.up * 1.25f);
		float followMult = 0.9f;
		while (card.cardGo) {
			followMult -= Time.deltaTime;
			transform.position += new Vector3 (vel.x, 0, vel.z) * followMult * Time.deltaTime;
			yield return null;
		}
//		transform.position = new Vector3 (0, 0, -20);
	}
		

}
