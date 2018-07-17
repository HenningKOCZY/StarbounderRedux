Shader "SurfaceShader Alpha DOUBLEtint +900" {
Properties {
	_Emission ("Emissive Color", Color) = (0,0,0,0)
	_MainTex ("Base (RGB)", 2D) = "white" {}
}

// 1 texture stage GPUs
SubShader {
	Tags {"Queue"="Transparent+900" "IgnoreProjector"="True" "RenderType"="Transparent"}
	LOD 100
	
	Blend SrcAlpha OneMinusSrcAlpha
	AlphaTest Greater .01
	ColorMask RGB
	Cull Off Lighting Off ZWrite Off
	Fog {Mode Off}
	// Non-lightmapped
	Pass {
	//	Tags { "LightMode" = "Vertex" }
		
		Material {
			Emission [_Emission]
		} 
		Lighting On
	//	SeparateSpecular On
		SetTexture [_MainTex] {
			Combine texture +- primary DOUBLE, texture * primary
		} 
	}	


}
}
