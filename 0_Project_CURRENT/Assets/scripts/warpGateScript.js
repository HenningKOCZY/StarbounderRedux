var number: int = 0;
var atlasDiv : float = 4; //ex: 4 means 4x4, or 16 tiles
var gatePhase = 1;
var ship : GameObject;
var shipScript : MoveShip;
var flip : int;
var mesh : Mesh;
var vertices : Vector3[];
var uvs : Vector2[];
var frameCnt : int = 0;
var vertX : float;
var vertZ : float;

function Start(){
	ship = gameObject.Find("Ship");
	shipScript = ship.GetComponent(MoveShip);
	
	mesh = (GetComponent(MeshFilter) as MeshFilter).mesh;
	vertices = mesh.vertices;
	uvs = new Vector2[vertices.Length];

	
	InvokeRepeating("UpdateNumbers", 0.0 , 0.025);	
}

function UpdateNumbers(){
	
	
	
	for (var i = 0 ; i < uvs.Length ; i++){
		vertX = ((vertices[i].x + .5) + (number % atlasDiv)) / atlasDiv;
		vertZ = ((vertices[i].z + .5) - (Mathf.Floor(number/atlasDiv))) / atlasDiv + (1-(1/atlasDiv)) ;
		uvs[i] = Vector2 (vertX, vertZ);	
	}	

	mesh.uv = uvs;
	
	if (shipScript.state.winning) gatePhase = 2;
	if(gatePhase==1){
		frameCnt++;
		if(frameCnt==2){
			number++;
			frameCnt=0;	
		}
		if (number > 12) {
			number=0;
		}
		if (number == 1){
			gameObject.transform.localEulerAngles = Vector3(0,Random.Range(0,360),0);
			flip = Mathf.Floor(Random.Range(-1,1));
			if (flip < 0) gameObject.transform.localScale.x *= -1;
			//gameObject.renderer.material.SetColor("_Emission",Vector4(Random.Range(.5,1),Random.Range(.5,1),Random.Range(.5,1),1));
	
		}
	}else{
		frameCnt++;
		if ((number == 0 || number == 13) && frameCnt>6) number = 13;
		else number-=2;
		if (number<0) number = 12;
		
		if (gameObject.transform.localScale.x > 0) gameObject.transform.localScale -= Vector3(1,1,1);
		else gameObject.transform.localScale -= Vector3(-1,1,1);
	}
}
