Shader "Pattern Lerp" {

Properties {
	_BaseColor("Base Color",Color) = (1,1,1,1)
	_PatColor("Pattern Color", Color) = (0,0,0,1)
	_Color("Default Color", Color) = (1,1,1,1)
	_SpecColor("Spec Color", Color) = (.7,.7,.7,1)
	_Emission("Emmissive Color", Color) = (0,0,0,1)
	_Shininess("Shininess", Range (0.01,1) ) = 0.7
	_MultTex ("Base (RGB)", 2D) = "white" {}
	_DecalTex ("Decal (RGBA)", 2D) = "black" {}		
}
SubShader {
	
	Material {
		Diffuse[_Color]
		Ambient[_Color]
		Shininess[_Shininess]
		Specular[_SpecColor]
		Emission[_Emission]	
	}
	Pass{
		BindChannels{
			Bind "Vertex", vertex
			Bind "normal", normal
			//Bind "texcoord", texcoord0
			Bind "texcoord1", texcoord1
			Bind "texcoord", texcoord2
		}
		Lighting On
		SeparateSpecular On
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
			Combine primary +- previous
		}
		
	}
	
	
}

}