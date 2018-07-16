var number: int = 0;
var atlasDiv : float = 4; //ex: 4 means 4x4, or 16 tiles
var mesh : Mesh;
var vertices : Vector3[];
var uvs : Vector2[];
var vertX : float;
var vertZ : float;

function Start(){
	
	mesh = (GetComponent(MeshFilter) as MeshFilter).mesh;
	vertices = mesh.vertices;
	uvs = new Vector2[vertices.Length];

}

function UpdateNumbers(){
	
	
	
	for (var i = 0 ; i < uvs.Length ; i++){
		vertX = ((vertices[i].x + .5) + (number % atlasDiv)) / atlasDiv;
		vertZ = ((vertices[i].z + .5) - (Mathf.Floor(number/atlasDiv))) / atlasDiv + (1-(1/atlasDiv)) ;
		uvs[i] = Vector2 (vertX, vertZ);	
	}	

	mesh.uv = uvs;

}

