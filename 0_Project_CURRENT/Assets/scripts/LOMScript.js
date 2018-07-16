
var texes: Texture2D[];
var digitPlane: GameObject;
var tenPlane: GameObject;

function UpdateNumbers(level: int) {
	var dig: int = level%10;
	var ten: int = Mathf.Floor(level/10);
	
	var digitRen: Renderer = digitPlane.GetComponent(Renderer);
	var tenRen: Renderer = tenPlane.GetComponent(Renderer);
	
	digitRen.material.mainTexture=texes[dig];
	tenRen.material.mainTexture=texes[ten];
	var anim = transform.GetComponent.<Animation>();
	anim["digitRoll"].layer = 1;
	anim["tenRoll"].layer = 2;
	
	yield WaitForSeconds(0.4);
//	print("play LOMs");
	anim.Play("digitRoll");
	if (dig==0) anim.Play("tenRoll");

}