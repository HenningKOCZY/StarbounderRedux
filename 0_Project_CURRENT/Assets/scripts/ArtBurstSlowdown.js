//var keepUp: float;
var slowdown : float;
var ship: MoveShip;
var cam: MoveCam;

function FixedUpdate () {
	if (transform.position.z>0) {
		//transform.localPosition.x-=ship.state.lv.x*2*slowdown*Time.deltaTime;
		//transform.localPosition.z-=ship.state.lv.z*slowdown*Time.deltaTime;
		transform.localPosition-=Vector3(cam.lv.x*Mathf.Clamp01(1.5*slowdown), cam.lv.y*Mathf.Clamp01(1.5*slowdown), cam.lv.z*slowdown);
	}
}