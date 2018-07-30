var yPos : float;
var airBurstScript : CardAnim;

function Update () {
	if(airBurstScript.cardGo){
		gameObject.transform.position.y=yPos+1;	
		//gameObject.transform.position.y = 63;
	}
}