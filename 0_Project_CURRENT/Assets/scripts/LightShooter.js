var lightPF: Transform;
var Zspeed: float;
var maxZ: float;
private var counter: float=0.0;
private var timeInc: float=0.05;
private var chance: float=0.2;
var lightPPs: Transform[];
var camTrans: Transform;
var backlights: Light[];
var worldNum: int;
var rando: float;

function Start() {
	var camGO: GameObject = GameObject.Find("Main Camera");
	camTrans=camGO.transform;
	var which: String = "warpLight"+worldNum;
	backlights[0].GetComponent.<Animation>().Play(which);
	//backlights[1].color=liteColors[worldNum];
}

function Update () {
	for (var i: int=0; i<2; i++) {
		//if (lightPPs[i]) {
			//print (i);
			var lite = lightPPs[i];
			lite.localPosition.z+=Zspeed*Time.deltaTime*10;
			if (lite.localPosition.z>maxZ) {
				respawnLight(lite.transform);
			}
		//}
	}

	backlights[0].transform.localEulerAngles.y=180+camTrans.position.x*-36;
	backlights[1].transform.localEulerAngles.y=180+camTrans.position.x*-8;
	
}

function respawnLight(obj: Transform) {
	//var rando: float = Random.Range(-0.5, 3.64);
	//print (rando);
	//var x = Mathf.Cos(rando);
	//var y = Mathf.Sin(rando);
	var x = Random.Range(-2.0, 2.0)+camTrans.position.x;
	var y = 5;
	var z = Random.Range(-20.0, -12.0);
	rando = Random.Range(0.25, 1.5);
	var pos: Vector3 = Vector3(x, y, z)*rando;

	obj.localPosition=pos;
	
	//var lite: Light = obj.GetComponent(Light);
	//rando = Random.Range(0.0, 1.0);
	//var liteColor: Color = Color(rando, Mathf.Clamp((rando*1.6+0.2), 0.0, 1.0), 1, 1);
	//lite.color=liteColor;
}
