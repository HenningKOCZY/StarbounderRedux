var tileWidth: float = 100;
var tileHeight: float = 100;
var textureSize: float = 1024; //square format binary, 512x512 etc
var number: int = 0; //tile number, or frame number
private var atlasDivW: float;
private var atlasDivH: float;
private var tileWPercent: float;
private var tileHPercent: float;
private var startTime: float;


function Start(){
	atlasDivW = textureSize/tileWidth;
	atlasDivH = textureSize/tileHeight;
	tileWPercent = tileWidth/textureSize;
	tileHPercent = tileHeight/textureSize;
	UpdateNumbers(number);	
}

function UpdateNumbers(number:int){
	
	var mesh : Mesh = (GetComponent(MeshFilter) as MeshFilter).mesh;
	var vertices : Vector3[] = mesh.vertices;
	var uvs : Vector2[] = new Vector2[vertices.Length];
	
	var i = 0;
	for (var x = 0 ; x < 2 ; x++){
		for (var z = 0 ; z < 2 ; z++){
			
			var vertX : float = ((number % Mathf.Floor(atlasDivW)) * tileWPercent) + (tileWPercent*x);
			var vertZ : float = 1- ( ((Mathf.Floor(number / Mathf.Floor(atlasDivW))) * tileHPercent) + (tileHPercent*z) );
			uvs[i] = Vector2 (vertX, vertZ);
			//print("uv "+i+" : ( "+vertX+" , "+vertZ+" ) ");	
			i++;
		}
	}	

	mesh.uv = uvs;
	
}
