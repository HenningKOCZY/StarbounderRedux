var artMat: Material;
var channel: String;

function colorBurst(artColor: Color, channel: String){
	gameObject.GetComponent.<Renderer>().material.SetColor(channel,artColor);
}

