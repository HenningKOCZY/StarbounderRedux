var number: int = 0;
var atlasDiv : float = 4; //ex: 4 means 4x4, or 16 tiles

function Start(){
	
	var mesh : Mesh = (GetComponent(MeshFilter) as MeshFilter).mesh;
	var vertices : Vector3[] = mesh.vertices;
	var uvs : Vector2[] = new Vector2[vertices.Length];
	
	
	for (var i = 0 ; i < uvs.Length ; i++){
		var vertX : float = ((vertices[i].x + .5) + (number % atlasDiv)) / atlasDiv;
		var vertZ : float = ((vertices[i].z + .5) - (Mathf.Floor(number/atlasDiv))) / atlasDiv + (1-(1/atlasDiv)) ;
		uvs[i] = Vector2 (vertX, vertZ);	
	}	

	mesh.uv = uvs;
}
