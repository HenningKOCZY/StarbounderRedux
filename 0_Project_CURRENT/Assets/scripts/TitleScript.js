
var texes: Texture2D[];
var texesShadow: Texture2D[];

var titlePlane: GameObject;
var titlePlaneShad: GameObject;


function updateTitle(worldNum: int) {
	
	//var digitRen: Renderer = titlePlane.GetComponent(Renderer);
	
	//digitRen.material.mainTexture=texes[worldNum];

	titlePlane.GetComponent.<Renderer>().material.mainTexture=texes[worldNum];
	titlePlaneShad.GetComponent.<Renderer>().material.mainTexture=texesShadow[worldNum];

	//var anim = transform.animation;
	//anim["digitRoll"].layer = 1;
	//anim["tenRoll"].layer = 2;

	//anim.Play("digitRoll");
}