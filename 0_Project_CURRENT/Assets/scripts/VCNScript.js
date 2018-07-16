
var texes: Texture2D[];
var wRen: Renderer;
var xRen: Renderer;
var yRen: Renderer;
var zRen: Renderer;
var zzRen: Renderer;


function UpdateNumbers(level: int, bbtime: float) {
	var btime: int = Mathf.Round(bbtime*100);
	
	var w: int = Mathf.Floor(btime/1000);
	var x: int = Mathf.Floor(bbtime%10);
	var z: int = Mathf.Floor((btime%100)/10);
	var zz: int = btime%10;
	
	wRen.material.mainTexture=texes[w];
	xRen.material.mainTexture=texes[x];
	yRen.material.mainTexture=texes[10];
	zRen.material.mainTexture=texes[z];
	zzRen.material.mainTexture=texes[zz];

}