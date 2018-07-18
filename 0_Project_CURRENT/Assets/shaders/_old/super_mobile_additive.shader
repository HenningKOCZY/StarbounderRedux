Shader "Mobile Additive Texture" {

Properties {
	_TintColor ("Tint Color", Color) = (0.5,0.5,0.5,0.5)

    _MainTex ("Texture", 2D) = ""
}
Category{
	 BindChannels {
		Bind "Color", color
		Bind "Vertex", vertex
		//Bind "TexCoord", texcoord
	}
	SubShader {
	    Tags {Queue = Transparent}
	    Blend One One
	    ZWrite Off
	   
	    Pass {
	        SetTexture[_MainTex]{
	        	constantColor [_TintColor]
				combine constant * primary
			}	
			
	    } 
	}
}
}