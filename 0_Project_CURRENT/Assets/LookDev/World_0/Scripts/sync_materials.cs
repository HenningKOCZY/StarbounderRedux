using System.Collections;
using System.Collections.Generic;
using UnityEngine;


[ExecuteInEditMode]
public class sync_materials : MonoBehaviour {

    public Material mat1, mat2;

    // Use this for initialization
    void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
        mat2.SetFloat("_DistanceFadeLength", mat1.GetFloat("_DistanceFadeLength"));
        mat2.SetFloat("_DistanceFadeOffset", mat1.GetFloat("_DistanceFadeOffset"));
        mat2.SetFloat("_VertexOffset", mat1.GetFloat("_VertexOffset"));
      //  mat2.SetFloat("_DirectionalSpread", mat1.GetFloat("_DirectionalSpread"));
        mat2.SetFloat("_HorizontalBend", mat1.GetFloat("_HorizontalBend"));
    }
}
