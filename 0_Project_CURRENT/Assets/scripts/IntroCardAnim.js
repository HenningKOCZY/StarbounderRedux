var dur: float;
var overlay: boolean;
var overlayFullStrength: boolean;
var goalAlpha: float = 0.0;
private var card: Transform;
var t: float = 0.0;
var state: String = "stopped";
private var oVal: float;

function Start() {
	if (overlayFullStrength) oVal=0.75;
	else oVal=0.5;
	card = transform.Find("card");
	if (!card) card=transform.Find("null/card");
	if (overlay) card.GetComponent.<Renderer>().material.SetColor("_TintColor", Vector4(oVal, oVal, oVal, 0));
	else card.GetComponent.<Renderer>().material.color.a = 0;	
}

function fadeIn() {
	state="in";
	while (state=="in") {
		t += Time.deltaTime/dur;
		goalAlpha = Mathf.SmoothStep(0, 1, t);	
		yield;
		if (overlay) card.GetComponent.<Renderer>().material.SetColor("_TintColor", Vector4(oVal, oVal, oVal, goalAlpha));
		else	card.GetComponent.<Renderer>().material.color.a = goalAlpha;
		if (goalAlpha>=0.99) { state="stopped"; t=1; }
	}
}

function fadeOut() {
	state="out";
	t=1-t;
	while (state=="out") {
		t += Time.deltaTime/dur;
		goalAlpha = Mathf.SmoothStep(1, 0, t);	
		yield;
		if (overlay) card.GetComponent.<Renderer>().material.SetColor("_TintColor", Vector4(oVal, oVal, oVal, goalAlpha));
		else	card.GetComponent.<Renderer>().material.color.a = goalAlpha;
		if (goalAlpha<=0.01) state="stopped";
	}
	if (gameObject) Destroy (gameObject);
}