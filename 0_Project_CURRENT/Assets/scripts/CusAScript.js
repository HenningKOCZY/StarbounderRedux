
var texes: Texture2D[];
var texesShad: Texture2D[];

var hundredValue: Renderer;
var tenValue: Renderer;
var digitValue: Renderer;

var oneObj: Renderer;
var eightObj: Renderer;
var zeroObj: Renderer;

var hundredValueShadow: Renderer;
var tenValueShadow: Renderer;
var digitValueShadow: Renderer;

var oneObjShadow: Renderer;
var eightObjShadow: Renderer;
var zeroObjShadow: Renderer;


// var artTotal: int;

function Start(){
	updateNumbers();
		
}

function updateNumbers(){
	var artTotal: int = PlayerPrefs.GetInt("ArtCount", 0);

	var aHun: int = Mathf.Floor(artTotal/100);
	var aTen: int = Mathf.Floor((artTotal%100)/10);
	var aDig: int = artTotal%10;	
//	print(artTotal);
//	print("artTotal = "+aHun+aTen+aDig);
		
	if (aHun==0) aHun=10;
	if (aHun==10 && aTen==0) aTen=10;
	
	
	hundredValue.material.mainTexture = texes[aHun];
	hundredValueShadow.material.mainTexture = texesShad[aHun];

	tenValue.material.mainTexture = texes[aTen];
	tenValueShadow.material.mainTexture = texesShad[aTen];
	
	digitValue.material.mainTexture = texes[aDig];
	digitValueShadow.material.mainTexture = texesShad[aDig];

	
	oneObj.material.mainTexture=texes[1];
	eightObj.material.mainTexture=texes[8];
	zeroObj.material.mainTexture=texes[0];
	
	oneObjShadow.material.mainTexture=texesShad[1];
	eightObjShadow.material.mainTexture=texesShad[8];
	zeroObjShadow.material.mainTexture=texesShad[0];	
}

