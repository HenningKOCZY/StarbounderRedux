var min: float = 0.33;
var max: float = 0.4;
private var rando: float;

function Update () {
	rando = Random.Range(min, max);
	transform.localScale = Vector3(rando,rando,rando);
}