var Zspeed: float;
//var explosionLight: Light;
// var boosterColor : Color = MoveShip.boosterColor;

function Start () {
	//boosterColor: Color = Vector4(PlayerPrefs.GetFloat("BoostColor_R", 0), PlayerPrefs.GetFloat("BoostColor_G", 0.5), PlayerPrefs.GetFloat("BoostColor_B", 1),1);
//	explosionLight.color = Vector4(boosterColor.r+0.2, boosterColor.g+0.2,boosterColor.b+0.2,1);
	var rigBods = new Component[43];
	rigBods = GetComponentsInChildren (Rigidbody);
	for (var forceApplied : Rigidbody in rigBods) {
    	forceApplied.AddRelativeForce(0,-800,0);
    	forceApplied.AddRelativeTorque(Random.Range(-200,200),0,Random.Range(-200,200));
    	forceApplied.AddForce(0,50,Zspeed*8);
	}
}