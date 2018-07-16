using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BG_plane : MonoBehaviour {
	
	public Transform cam;
	//var BGobjs: Transform[];
	GameObject currBG;
	Color[] levelFog;
	//var artifactColor: Color[];
	//var artifactBurstMat: Material;
	//var ren: Renderer;
	//var plane: Transform;



	void Update() {
//		transform.position.z = cam.position.z;
//		transform.position.x = cam.position.x*0.8f;
//		transform.position.y = cam.position.y*0.7f;
		transform.position = new Vector3(cam.position.x * 0.8f, cam.position.y * 0.7f, cam.position.z);
		//transform.position.y = cam.position.y;
		//transform.localRotation.y = cam.position.x*-0.001;
	}

	public int changeBackground(int level) {
		int worldNum = (int)Mathf.Floor((level + 0.1f) / 10);

		//artifactBurstMat.SetColor("_TintColor", artifactColor[worldNum]);

		if (currBG)
			DestroyImmediate(currBG, true);
		RenderSettings.fogColor = levelFog[worldNum];

		currBG = Instantiate(Resources.Load("BG/BGobj" + worldNum), Vector3.zero, Quaternion.identity) as GameObject;
		currBG.transform.parent = transform;
		currBG.transform.localPosition = Vector3.zero;

		//currBG.localEulerAngles=Vector3.zero;
		//	var pic: int = Mathf.Floor((level+0.1)/10);
		//ren.materials[0].mainTexture=pics[worldNum];

		//if (worldNum>4) plane.localScale.z=500;
		//else plane.localScale.z=342;

		return worldNum;
	}
}
