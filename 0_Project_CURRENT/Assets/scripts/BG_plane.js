var cam : Transform;
//var BGobjs: Transform[];
var currBG: GameObject;
var levelFog: Color[];
//var artifactColor: Color[];
//var artifactBurstMat: Material;
//var ren: Renderer;
//var plane: Transform;



function Update () {
	transform.position.z = cam.position.z;
	transform.position.x = cam.position.x*.8;
	transform.position.y = cam.position.y*.7;
	//transform.position.y = cam.position.y;
	//transform.localRotation.y = cam.position.x*-0.001;
}

function changeBackground (level: int) {
	var worldNum = Mathf.Floor((level+0.1)/10);
	
	//artifactBurstMat.SetColor("_TintColor", artifactColor[worldNum]);
	
	if (currBG) DestroyImmediate(currBG, true);
	RenderSettings.fogColor = levelFog[worldNum];
	
	currBG= Instantiate(Resources.Load("BG/BGobj"+worldNum), Vector3.zero, Quaternion.identity);
	currBG.transform.parent=transform;
	currBG.transform.localPosition=Vector3.zero;
	//currBG.localEulerAngles=Vector3.zero;
//	var pic: int = Mathf.Floor((level+0.1)/10);
	//ren.materials[0].mainTexture=pics[worldNum];
	
	//if (worldNum>4) plane.localScale.z=500;
	//else plane.localScale.z=342;
	
	return worldNum;
}