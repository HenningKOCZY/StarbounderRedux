Shader "SurfaceShader Alpha Simple Overlay" {
Properties {
	_Emission ("Emissive Color", Color) = (0,0,0,0)
	_MainTex ("Base (RGB)", 2D) = "white" {}
}

// 1 texture stage GPUs
SubShader {
	Tags {"Queue"="Overlay" "IgnoreProjector"="True" "RenderType"="Transparent"}
	ZTest Always
	//LOD 100
	
	//Alphatest Greater 0
	//ZWrite Off
	Blend SrcAlpha OneMinusSrcAlpha 
	//ColorMask RGB
	fog {mode Off}
	// Non-lightmapped
	Pass {
	//	Tags { "LightMode" = "Vertex" }
		
		Material {
			Emission [_Emission]
		} 
		Lighting On
	//	SeparateSpecular On
		SetTexture [_MainTex] {
			Combine texture * primary DOUBLE, texture * primary
		} 
	}	


}
}
