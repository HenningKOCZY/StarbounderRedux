var gameMaster : GameMaster;
var tracks : AudioClip[];

function Update () { 
	if (!GetComponent.<AudioSource>().isPlaying) {
		if (PlayerPrefs.GetInt("Music", 1)==1) {
			GetComponent.<AudioSource>().clip=tracks[gameMaster.level];
			GetComponent.<AudioSource>().Play();
		}
	}
}