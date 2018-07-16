var music : int;
var level: int;
var worldNum : int;
var worldTrackName : String[];
var sceneTrackName : String[];

function Awake (){
	DontDestroyOnLoad(transform.gameObject);
}

function Update () {
	//if (!gameObject.audio.isPlaying) gameObject.audio.Play();	
	/*if (Application.loadedLevel>1){
		if (gameObject.audio.clip!=null) gameObject.audio.clip=null;			
	}
	*/
}

function SetTrack(){
	music = PlayerPrefs.GetInt("Music",1);	
	if (music) {
		gameObject.GetComponent.<AudioSource>().loop=true;
		if(Application.loadedLevel==1){
			level = PlayerPrefs.GetInt("Level",0);
			worldNum = Mathf.Floor(level/10);
			if (gameObject.GetComponent.<AudioSource>().clip == null) {
				if(worldNum==6) gameObject.GetComponent.<AudioSource>().clip = Resources.Load(worldTrackName[worldNum+(level-60)]);
				else gameObject.GetComponent.<AudioSource>().clip = Resources.Load(worldTrackName[worldNum]);
			} else{ 
				if (worldNum==6 && gameObject.GetComponent.<AudioSource>().clip.name!= worldTrackName[worldNum+(level-60)] ) gameObject.GetComponent.<AudioSource>().clip = Resources.Load(worldTrackName[worldNum+(level-60)]);
				else if (gameObject.GetComponent.<AudioSource>().clip.name!= worldTrackName[worldNum] ) gameObject.GetComponent.<AudioSource>().clip = Resources.Load(worldTrackName[worldNum]);	
			}		
		}
		if(Application.loadedLevel>1){
			gameObject.GetComponent.<AudioSource>().clip = Resources.Load(sceneTrackName[Application.loadedLevel]);
			print(sceneTrackName[Application.loadedLevel]);
		}
		if (!gameObject.GetComponent.<AudioSource>().isPlaying) gameObject.GetComponent.<AudioSource>().Play();
	}else StopTrack();
}

function StopTrack(){
	gameObject.GetComponent.<AudioSource>().Stop();	
}