Shader "Texture + SphereMap" {

Properties {
	_Color("Color (RGB)", Color) = (.5,.5,.5,1)
	_MultTex ("Base (RGB)", 2D) = "white" {}
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
		SetTexture[_Color]{
			ConstantColor[_Color]
			Combine constant
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