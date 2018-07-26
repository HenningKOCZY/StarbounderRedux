using UnityEngine;
using System.Collections;

public class WarpTubeScript_2 : MonoBehaviour {
    public Material[] rens;
    public Color[] palette;
    public float[] uSpeeds;
    public float[] vSpeeds;

    void Start (){
	    //GameObject gameMaster = gameObject.Find("AA_gameMaster");
	    GameMaster gameMasterScript = GameObject.Find("AA_gameMaster").GetComponent<GameMaster>();
	    int world = gameMasterScript.worldNum;
	    for (int i=0; i< rens.Length ; i++) {
		    if(i==0) rens[i].SetColor ("_TintColor", palette[i+(world*10)]);
		    if(i==1) rens[i].SetColor ("_TintColor", palette[i+(world*10)]);
		    if(i==2) rens[i].SetColor ("_TintColor", palette[i+(world*10)]);
	    }
    }

    void Update (){
	    for (int i=0; i<rens.Length; i++) {
		    rens[i].mainTextureOffset = new Vector2 ((Time.time*-1*uSpeeds[i]) % 1, (Time.time*vSpeeds[i]) % 1);
	    }
    }
}