using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LightShooter : MonoBehaviour
{

	public Transform lightPF;
	public float Zspeed;
	public float maxZ;

	Transform camTrans;
	public Transform[] lightPPs;
	public Light[] backlights;
	public int worldNum;

	void Start ()
	{
		GameObject camGO = GameObject.Find ("Main Camera");
		camTrans = camGO.transform;
		string which = "warpLight" + worldNum;
		backlights [0].GetComponent<Animation> ().Play (which);
		//backlights[1].color=liteColors[worldNum];
	}

	void Update ()
	{
		foreach (Transform lite in lightPPs) {
			lite.localPosition += new Vector3 (0, 0, Zspeed * Time.deltaTime * 10);
			if (lite.localPosition.z > maxZ) {
				respawnLight (lite);
			}
		}

		backlights [0].transform.localEulerAngles = new Vector3 (10, 180 + camTrans.position.x * -36, 0);
		backlights [1].transform.localEulerAngles = new Vector3 (14, 180 + camTrans.position.x * -8, 0);

	}

	void respawnLight (Transform obj)
	{
		float x = Random.Range (-2, 2) + camTrans.position.x;
		float y = 5;
		float z = Random.Range (-20, -12);
		float rando = Random.Range (0.25f, 1.5f);

		obj.localPosition = new Vector3 (x, y, z) * rando;

		//var lite: Light = obj.GetComponent(Light);
		//rando = Random.Range(0.0, 1.0);
		//var liteColor: Color = Color(rando, Mathf.Clamp((rando*1.6+0.2), 0.0, 1.0), 1, 1);
		//lite.color=liteColor;
	}

}
