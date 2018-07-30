using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ArtBurst : MonoBehaviour
{
	public MoveCam cam;
	float slowdown = 50f;
	CardAnim card;
	Vector3 pos;

	void Awake ()
	{
		card = transform.GetChild (0).GetChild (0).GetComponent<CardAnim> ();
	}


	public void MakeArtBurst (Vector3 inPos)
	{
		pos = inPos;
		card.CardGo ();

		StartCoroutine (ArtMove ());
	}


	IEnumerator ArtMove ()
	{
		transform.position = pos;
		transform.parent = cam.transform;

		while (card.cardGo) {
			transform.localPosition -= new Vector3 (cam.lv.x * Mathf.Clamp01 (2f * slowdown), cam.lv.y * Mathf.Clamp01 (2f * slowdown), cam.lv.z * slowdown) * Time.deltaTime;
			yield return null;
		}

		transform.parent = null;
		transform.position = new Vector3 (0, 0, -40);
	}
		
}
