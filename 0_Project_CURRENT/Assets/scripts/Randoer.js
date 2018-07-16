var xRange: int;
var yRange: int;
var zRange: int;
var xBy: int=2;

function Start() {
	var xMov: int = Random.Range(-xRange, xRange+1);
	var yMov: int = Random.Range(-yRange, yRange+1);
	var zMov: int = Random.Range(-zRange, zRange+1);
// disable following line while level meshes not weighted to rando bones yet
	transform.position+=Vector3(xMov*xBy, yMov*xBy, zMov*xBy);
}