var gateScript : warpGateScript;

function Start(){
	gateScript = transform.parent.GetComponent(warpGateScript);
}


function Update () {
	if (gateScript.gatePhase==2) transform.localScale=Vector3(0,0,0);
} 