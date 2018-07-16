Shader "Projector/Light" {
  Properties {
  	  _Color ("Main Color", Color) = (1,1,1,1)   	
     _ShadowTex ("Cookie", 2D) = "" { TexGen ObjectLinear }
     _FalloffTex ("FallOff", 2D) = "" { TexGen ObjectLinear }
  }
  Subshader {
     Pass {
		Cull Off
		Lighting Off
		ZWrite Off
		Fog { Color (0,0,0,0) }
		//Fog off
        Color [_Color]
        ColorMask RGB
        Blend DstColor One
        Blend SrcAlpha One

		Offset -1, -1
        SetTexture [_ShadowTex] {
		   //combine texture * primary, ONE - texture
		   //combine texture * previous DOUBLE, texture * primary
		   combine texture * primary
           Matrix [_Projector]
        }
        SetTexture [_FalloffTex] {
           constantColor (0,0,0,0)
           combine previous lerp (texture) constant
           Matrix [_ProjectorClip]
        }
     }
  }
}