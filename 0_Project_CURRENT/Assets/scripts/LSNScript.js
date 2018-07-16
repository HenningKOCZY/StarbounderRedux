
var texes: Texture2D[];
var texesShad: Texture2D[];

var digitRen: Renderer;
var tenRen: Renderer;
var wRen: Renderer;
var xRen: Renderer;
var yRen: Renderer;
var zRen: Renderer;
var zzRen: Renderer;

var digitRenShad: Renderer;
var tenRenShad: Renderer;


var wRenShad: Renderer;
var xRenShad: Renderer;
var yRenShad: Renderer;
var zRenShad: Renderer;
var zzRenShad: Renderer;


var printOutput : boolean = false;

private var chance: float = 0.5;

function Start(){
	transform.localScale.z=0;	
}
function Update(){
	if (transform.localScale.z<.06) transform.localScale.z+=.03;	
}

function UpdateNumbers(level: int, bbtime: float) {
	var btime: int = Mathf.Round(bbtime*100);
	var dig: int = level%10;
	var ten: int = Mathf.Floor(level/10);
	
	var w: int = Mathf.Floor(btime/1000);
	var x: int = Mathf.Floor(bbtime%10);
	var z: int = Mathf.Floor((btime%100)/10);
	var zz: int = btime%10;

	if(printOutput){
		digitRen.material.mainTexture=texes[dig];
		digitRenShad.material.mainTexture=texesShad[dig];
		tenRen.material.mainTexture=texes[ten];
		tenRenShad.material.mainTexture=texesShad[ten];
		wRen.material.mainTexture=texes[w];
		wRenShad.material.mainTexture=texesShad[w];
		xRen.material.mainTexture=texes[x];
		xRenShad.material.mainTexture=texesShad[x];
		yRen.material.mainTexture=texes[10];
		yRenShad.material.mainTexture=texesShad[10];
		zRen.material.mainTexture=texes[z];
		zRenShad.material.mainTexture=texesShad[z];
		zzRen.material.mainTexture=texes[zz];
		zzRenShad.material.mainTexture=texesShad[zz];
	}else{
		digitRen.material.mainTexture=texes[dig];
		digitRenShad.material.mainTexture=texesShad[dig];
		tenRen.material.mainTexture=texes[ten];
		tenRenShad.material.mainTexture=texesShad[ten];
		wRen.material.mainTexture=texes[11];
		wRenShad.material.mainTexture=texesShad[11];
		xRen.material.mainTexture=texes[11];
		xRenShad.material.mainTexture=texesShad[11];
		yRen.material.mainTexture=texes[11];
		yRenShad.material.mainTexture=texesShad[11];
		zRen.material.mainTexture=texes[11];
		zRenShad.material.mainTexture=texesShad[11];
		zzRen.material.mainTexture=texes[11];
		zzRenShad.material.mainTexture=texesShad[11];
	}

	
		
//	if (Random.value<chance) {
//		var anim = transform.animation;
//		var rando: int = Random.Range(0,5);
//        switch (rando) {
//            case 0:  anim.Play("tenRoll"); break;
//            case 1:  anim.Play("digitRoll"); break;
//            case 2:  anim.Play("wRoll"); break;
//            case 3:  anim.Play("xRoll"); break;
//            case 4:  anim.Play("zRoll"); break;
//        }
//	}
}
