
var texes: Texture2D[];
var texesShad: Texture2D[];

var artTex: Texture2D[];
var artTexShad: Texture2D[];

var digitRen: Renderer;
var digitShadRen: Renderer;

var tenRen: Renderer;
var tenShadRen: Renderer;

var a1Ren: Renderer;
var a1ShadRen: Renderer;

var a2Ren: Renderer;
var a2ShadRen: Renderer;

var a3Ren: Renderer;
var a3ShadRen: Renderer;


//var zRen: Renderer;
//var zzRen: Renderer;
var printOutput : boolean = false;

private var chance: float = 0.5;

function Start(){
	transform.localScale.z=0;	
}
function Update(){
	if (transform.localScale.z<.06) transform.localScale.z+=.03;	
}

function UpdateNumbers(level: int, artCount: int) {
//	var btime: int = Mathf.Round(bbtime*100);
	var dig: int = level%10;
	var ten: int = Mathf.Floor(level/10);
/*	
	var w: int = Mathf.Floor(btime/1000);
	var x: int = Mathf.Floor(bbtime%10);
	var z: int = Mathf.Floor((btime%100)/10);
	var zz: int = btime%10;
*/	
	
	var a1: int = Mathf.Floor(artCount/100);	
	var a2: int = Mathf.Floor((artCount%100)/10);
	var a3: int = artCount%10;
	
//	print(a1);
//	print(a2);
//	print(a3);
		
	if(printOutput){
		digitRen.material.mainTexture=texes[dig];
		digitShadRen.material.mainTexture=texesShad[dig];

		tenRen.material.mainTexture=texes[ten];
		tenShadRen.material.mainTexture=texesShad[ten];
		
		a1Ren.material.mainTexture=artTex[a1];
		a1ShadRen.material.mainTexture=artTexShad[a1];

		a2Ren.material.mainTexture=artTex[a2];
		a2ShadRen.material.mainTexture=artTexShad[a2];

		a3Ren.material.mainTexture=artTex[a3];
		a3ShadRen.material.mainTexture=artTexShad[a3];

//		wRen.material.mainTexture=texes[w];
//		xRen.material.mainTexture=texes[x];
//		yRen.material.mainTexture=texes[10];
//		zRen.material.mainTexture=texes[z];
//		zzRen.material.mainTexture=texes[zz];
	}else{
		digitRen.material.mainTexture=texes[dig];
		digitShadRen.material.mainTexture=texesShad[dig];

		tenRen.material.mainTexture=texes[ten];
		tenShadRen.material.mainTexture=texesShad[ten];
		
		a1Ren.material.mainTexture=artTex[a1];
		a1ShadRen.material.mainTexture=artTexShad[a1];

		a2Ren.material.mainTexture=artTex[a2];
		a2ShadRen.material.mainTexture=artTexShad[a2];

		a3Ren.material.mainTexture=artTex[a3];
		a3ShadRen.material.mainTexture=artTexShad[a3];
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
