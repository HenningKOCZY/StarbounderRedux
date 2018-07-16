var digitScript: textureAtlas;
var tenScript: textureAtlas;
var wScript: textureAtlas;
var xScript: textureAtlas;
var yScript: textureAtlas;
var zScript: textureAtlas;
var zzScript: textureAtlas;
var pantherHead: Transform;

var printOutput : boolean = false;


function UpdateNumbers(level: int, bbtime: float) {
	var btime: int = Mathf.Round(bbtime*100);
	var dig: int = level%10;
	var ten: int = Mathf.Floor(level/10);
	
	var w: int = Mathf.Floor(btime/1000);
	var x: int = Mathf.Floor(bbtime%10);
	var z: int = Mathf.Floor((btime%100)/10);
	var zz: int = btime%10;

	if(printOutput){
		digitScript.UpdateNumbers(dig);
		tenScript.UpdateNumbers(ten);
		wScript.UpdateNumbers(w);
		xScript.UpdateNumbers(x);
		yScript.UpdateNumbers(11);
		zScript.UpdateNumbers(z);
		zzScript.UpdateNumbers(zz);
	}else{
		digitScript.UpdateNumbers(dig);
		tenScript.UpdateNumbers(ten);
		wScript.UpdateNumbers(13);
		xScript.UpdateNumbers(13);
		yScript.UpdateNumbers(13);
		zScript.UpdateNumbers(13);
		zzScript.UpdateNumbers(13);
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
