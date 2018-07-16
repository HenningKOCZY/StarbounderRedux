private var card: Transform;
private var lastTime: float;
private var lastRot: float;
var timeInc: float;

function Start() {
	card = transform.Find("card");
	if (!card) card=transform.Find("null/card");
	lastTime=Time.time;
}

function Update () {
	if (Time.time-lastTime>timeInc) {
		var rando: float; 
		rando = Random.Range(0, 360);
		while (Mathf.Abs(rando-lastRot)<20) {
			rando = Random.Range(0, 360);
		}
		card.localEulerAngles.y=rando;
		lastRot = rando;
		lastTime=Time.time;
	}
}