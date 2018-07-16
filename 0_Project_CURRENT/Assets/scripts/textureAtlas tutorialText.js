var number: int = 0;
var atlasDiv : float = 4; //ex: 4 means 4x4, or 16 tiles

function Start(){
	UpdateNumbers(number);	
}

function UpdateNumbers(number:int){
	
	var mesh : Mesh = (GetComponent(MeshFilter) as MeshFilter).mesh;
	var vertices : Vector3[] = mesh.vertices;
	var uvs : Vector2[] = new Vector2[vertices.Length];
	
	
	for (var i = 0 ; i < uvs.Length ; i++){
		var vertX : float = (vertices[i].x + .5);
		var vertZ : float = 1-(1/atlasDiv)+(((vertices[i].z + .5) / atlasDiv)- (number/atlasDiv)  ) ;

		uvs[i] = Vector2 (vertX, vertZ);	
	}	

	mesh.uv = uvs;
}
