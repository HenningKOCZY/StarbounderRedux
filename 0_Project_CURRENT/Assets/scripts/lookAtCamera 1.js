var cam : GameObject;
function Start (){
	cam = gameObject.Find("Cam/Main Camera");
}
function Update () {
	transform.LookAt(cam.transform.position);
}