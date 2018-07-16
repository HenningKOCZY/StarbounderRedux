var digitScript: textureAtlas;
var tenScript: textureAtlas;
var a1Script: textureAtlas;
var a2Script: textureAtlas;
var a3Script: textureAtlas;

var printOutput : boolean = false;

function UpdateNumbers(level: int, artCount: int) {
	var dig: int = level%10;
	var ten: int = Mathf.Floor(level/10);
	
	var a1: int = Mathf.Floor(artCount/100);	
	var a2: int = Mathf.Floor((artCount%100)/10);
	var a3: int = artCount%10;

	if(printOutput){
		digitScript.UpdateNumbers(dig);
		tenScript.UpdateNumbers(ten);
		a1Script.UpdateNumbers(14+a1);
		a2Script.UpdateNumbers(14+a2);
		a3Script.UpdateNumbers(14+a3);
	}else{
		digitScript.UpdateNumbers(dig);
		tenScript.UpdateNumbers(ten);
		a1Script.UpdateNumbers(14);
		a2Script.UpdateNumbers(14);
		a3Script.UpdateNumbers(14);
	}
	

}
