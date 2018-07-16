private var card: Transform;
private var lastTime: float;
var timeInc: float;

function Start() {
	card = transform.Find("card");
	lastTime=Time.time;
}

function Update () {
	if (Time.time-lastTime>timeInc) {
		var rando: float = Random.Range(0.3, 1.0);
		card.GetComponent.<Renderer>().material.color.b = rando;	
		card.GetComponent.<Renderer>().material.color.r = rando;	
		card.GetComponent.<Renderer>().material.color.g = rando;	
		lastTime=Time.time;
	}
}