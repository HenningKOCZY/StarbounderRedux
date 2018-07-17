Shader "Lightmapped/blownout noFog" {
Properties {
	_Color ("Main Color", Color) = (1,1,1,1)
	_SpecColor ("Spec Color", Color) = (1,1,1,1)
	_Shininess ("Shininess", Range (0.01, 1)) = 0.7
	_MainTex ("Base (RGB)", 2D) = "white" {}
	_LightMap ("Lightmap (RGB)", 2D) = "lightmap" { LightmapMode }
}



SubShader {
	LOD 100
	Tags { "RenderType"="Opaque" }
	Cull Off ZWrite Off Fog { Mode Off } 
	// Always drawn base pass: texture * lightmap
	Pass {
		Name "BASE"
		Tags {"LightMode" = "Always"}
		BindChannels {
			Bind "Vertex", vertex
			Bind "normal", normal
			Bind "texcoord1", texcoord0 // lightmap uses 2nd uv
			Bind "texcoord", texcoord1 // main uses 1st uv
		}
		SetTexture [_LightMap] {
			constantColor [_Color]
			combine texture * constant
		}
		SetTexture [_MainTex] {
			combine texture * previous DOUBLE, texture * primary
		}
	}
}



Fallback "VertexLit"
}
