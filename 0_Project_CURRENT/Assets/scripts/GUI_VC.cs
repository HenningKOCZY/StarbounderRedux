using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GUI_VC : MonoBehaviour
{

	public Text vc_lvl;
	public Text vc_attempts;
	public Text vc_time;
	public Text vc_record;
	// artis
	public Image[] artis;

	public Sprite[] artiSprites;
	public Sprite[] pantiSprites;


	public void UpdateMe (int level, int levelAttempts, float curTime, float oldRecord)
	{
		// attempts
		vc_attempts.text = "" + levelAttempts;

		// level readout
		if (level >= 10)
			vc_lvl.text = "" + level;
		else
			vc_lvl.text = "0" + level;

		// time and record time
		vc_time.text = "time: " + curTime.ToString ("00.00");
		if (curTime < oldRecord)
			vc_record.text = "NEW RECORD!!!";
		else
			vc_record.text = "RECORD: " + oldRecord.ToString ("00.00");

		// art counts
		StartCoroutine (ArtisOn (level));

	}


	IEnumerator ArtisOn (int level)
	{
		float timeInc = 0.5f;
		yield return new WaitForSeconds (0.25f);

		bool[] arts = GUInew.ArtiCount (level);

		int i = 0;
		foreach (bool a in arts) {
			yield return new WaitForSeconds (timeInc);
			if (i < 3)
				artis [i].sprite = a ? artiSprites [0] : artiSprites [1];
			else
				artis [i].sprite = a ? pantiSprites [0] : pantiSprites [1];
			i++;

		}
	}
}
