using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GUI_TitleScreen : MonoBehaviour
{

	public Image title;
	public Image shad;

	public void ChangeTitle (Sprite a, Sprite b)
	{
		title.sprite = a;
		shad.sprite = b;
	}
}
