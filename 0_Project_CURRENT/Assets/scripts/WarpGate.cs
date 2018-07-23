using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WarpGate : MonoBehaviour {

	int number = 0;
	float atlasDiv = 4;
	//ex: 4 means 4x4, or 16 tiles
	int gatePhase = 1;
	Mesh mesh;
	Vector3[] vertices;
	Vector2[] uvs;
	int frameCnt = 0;
	float vertX;
	float vertZ;

	void Start() {

		mesh = transform.GetComponent<MeshFilter>().mesh;
		vertices = mesh.vertices;
		uvs = new Vector2[vertices.Length];

		InvokeRepeating("UpdateNumbers", 0.0f, 0.025f);	
	}

	public void GatePhaseWin() {
		gatePhase = 2;
	}

	void UpdateNumbers() {

		for (int i = 0; i < uvs.Length; i++) {
			vertX = ((vertices[i].x + 0.5f) + (number % atlasDiv)) / atlasDiv;
			vertZ = ((vertices[i].z + 0.5f) - (Mathf.Floor(number / atlasDiv))) / atlasDiv + (1 - (1 / atlasDiv));
			uvs[i] = new Vector2(vertX, vertZ);	
		}	

		mesh.uv = uvs;

		if (gatePhase == 1) {
			frameCnt++;
			if (frameCnt == 2) {
				number++;
				frameCnt = 0;	
			}
			if (number > 12) {
				number = 0;
			}
			if (number == 1) {
				transform.localEulerAngles = new Vector3(0, Random.Range(0, 360), 0);
				if (Random.Range(-1, 1) < 0)
					transform.localScale = new Vector3(transform.localScale.x * -1, transform.localScale.y, transform.localScale.z);
				//gameObject.renderer.material.SetColor("_Emission",Vector4(Random.Range(.5,1),Random.Range(.5,1),Random.Range(.5,1),1));

			}
		} else {
			frameCnt++;
			if ((number == 0 || number == 13) && frameCnt > 6)
				number = 13;
			else
				number -= 2;
			if (number < 0)
				number = 12;

			if (transform.localScale.x > 0)
				transform.localScale -= new Vector3(1, 1, 1);
			else
				transform.localScale -= new Vector3(-1, 1, 1);
		}
	}
}
