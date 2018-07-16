Shader "Pattern Lerp 2" {

Properties {
	_BaseColor("Base Color",Color) = (1,1,1,1)
	_PatColor("Pattern Color", Color) = (0,0,0,1)
	_MultTex ("Base (RGB)", 2D) = "white" {}
	_DecalTex ("Decal (RGBA)", 2D) = "black" {}
	_Shad ("Refl (RGB)", 2D) = "black" { TexGen SphereMap }		
}
SubShader {
	
	Pass{
		BindChannels{
			Bind "Vertex", vertex
			Bind "normal", normal
			Bind "texcoord1", texcoord1
			Bind "texcoord", texcoord2
		}
		Lighting Off
		SeparateSpecular Off
		SetTexture[_BaseColor]{
			ConstantColor[_BaseColor]
			Combine constant
		}
		SetTexture[_DecalTex]{
			ConstantColor[_PatColor]
			Combine constant lerp(texture) previous
		}
		SetTexture[_MultTex]{
			Combine texture * previous
		}
		SetTexture[_Shad]{
			Combine texture +- previous DOUBLE
		}
		
	}
	
	
}

}