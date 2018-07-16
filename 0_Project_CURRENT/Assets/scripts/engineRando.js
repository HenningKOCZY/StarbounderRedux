var min: float = -1.4;
var max: float = -1.2;

function Update () {
	transform.localPosition.z = Random.Range(min, max);
}