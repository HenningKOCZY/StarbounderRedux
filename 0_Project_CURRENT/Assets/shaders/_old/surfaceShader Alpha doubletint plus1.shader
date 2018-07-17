Shader "SurfaceShader Alpha DOUBLEtint+1" {
Properties {
	_Emission ("Emissive Color", Color) = (0,0,0,0)
	_MainTex ("Base (RGB)", 2D) = "white" {}
}

// 1 texture stage GPUs
SubShader {
	Tags {"Queue"="Transparent+200" "IgnoreProjector"="True" "RenderType"="Transparent"}
	LOD 100
	
	Alphatest Greater 0
	ZWrite On
	Blend SrcAlpha OneMinusSrcAlpha 
	ColorMask RGB
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
