var planes: Transform[];
var variation: float;
var shadowPlane : Transform;

function FixedUpdate () {
	var i: int;
	var plane: Transform;
	for (i=0; i<planes.length; i++) {
		plane=planes[i];
		var rando: float= Random.Range(-variation, variation);
		plane.localPosition.z=rando;
			// base scale // jiggle mult //							//phase speed // phase separation
		var scaler = 1+(0.4*variation*(Mathf.Sin((Time.time*8)+(0.3+i+rando))));
		plane.localScale=Vector3(scaler, scaler, scaler);
		if(i==1) {
			shadowPlane.localScale = Vector3(scaler, scaler, scaler);	
		}
	}
}