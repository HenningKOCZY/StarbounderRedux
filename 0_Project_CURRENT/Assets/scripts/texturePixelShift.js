private var origTex: Texture2D;
var newTex: Texture2D;

function Start () {
	origTex = GetComponent.<Renderer>().material.GetTexture("_LightMap");
	newTex = new Texture2D(origTex.width, origTex.height);
	newTex = origTex;
}

function FixedUpdate () {
	HueRot(newTex, newTex, .003);
	origTex = newTex;
}


function HueRot(inTex: Texture2D, outTex: Texture2D, angle: float) {
	var pix: Color[] = inTex.GetPixels(0, 0, inTex.width, inTex.height);
	

	for (var i = 0; i < pix.Length; i++) {
			//print(pix[i]);
		pix[i] += Vector4(angle,angle,angle,1);
		if (pix[i].r >= 1 && pix[i].g >= 1 && pix[i].b >= 1){
			pix[i] -= Vector4(.5,.5,.5,0);
		}
	}
	
	outTex.SetPixels(0, 0, inTex.width, inTex.height, pix);
	outTex.Apply();
}