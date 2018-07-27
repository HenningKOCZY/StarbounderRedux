// Made with Amplify Shader Editor
// Available at the Unity Asset Store - http://u3d.as/y3X 
Shader "LookDev/World_1/BG"
{
	Properties
	{
		_Color_Value("Color_Value", Range( 0 , 2)) = 1
		_Color_Exp("Color_Exp", Range( 0 , 2)) = 1
		_Color("Color", 2D) = "black" {}
		_Emis_Value("Emis_Value", Range( 0 , 10)) = 1
		_Emis("Emis", 2D) = "black" {}
		[HideInInspector] _texcoord( "", 2D ) = "white" {}
	}
	
	SubShader
	{
		Tags { "RenderType"="Opaque" }
		LOD 100
		CGINCLUDE
		#pragma target 3.0
		ENDCG
		Blend Off
		Cull Back
		ColorMask RGBA
		ZWrite On
		ZTest LEqual
		Offset 0 , 0
		
		

		Pass
		{
			CGPROGRAM
			#pragma vertex vert
			#pragma fragment frag
			#include "UnityCG.cginc"
			

			struct appdata
			{
				float4 vertex : POSITION;
				UNITY_VERTEX_INPUT_INSTANCE_ID
				float4 ase_texcoord : TEXCOORD0;
			};
			
			struct v2f
			{
				float4 vertex : SV_POSITION;
				UNITY_VERTEX_OUTPUT_STEREO
				float4 ase_texcoord : TEXCOORD0;
			};

			uniform sampler2D _Color;
			uniform float4 _Color_ST;
			uniform float _Color_Value;
			uniform float _Color_Exp;
			uniform sampler2D _Emis;
			uniform float4 _Emis_ST;
			uniform float _Emis_Value;
			
			v2f vert ( appdata v )
			{
				v2f o;
				UNITY_SETUP_INSTANCE_ID(v);
				UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);
				o.ase_texcoord.xy = v.ase_texcoord.xy;
				
				//setting value to unused interpolator channels and avoid initialization warnings
				o.ase_texcoord.zw = 0;
				
				v.vertex.xyz +=  float3(0,0,0) ;
				o.vertex = UnityObjectToClipPos(v.vertex);
				return o;
			}
			
			fixed4 frag (v2f i ) : SV_Target
			{
				fixed4 finalColor;
				float2 uv_Color = i.ase_texcoord.xy * _Color_ST.xy + _Color_ST.zw;
				float4 temp_cast_0 = (_Color_Exp).xxxx;
				float2 uv_Emis = i.ase_texcoord.xy * _Emis_ST.xy + _Emis_ST.zw;
				
				
				finalColor = ( pow( ( tex2D( _Color, uv_Color ) * _Color_Value ) , temp_cast_0 ) + ( tex2D( _Emis, uv_Emis ) * _Emis_Value ) );
				return finalColor;
			}
			ENDCG
		}
	}
	CustomEditor "ASEMaterialInspector"
	
	
}
/*ASEBEGIN
Version=15401
1365;92;585;723;1065.253;749.4661;2.363368;True;False
Node;AmplifyShaderEditor.SamplerNode;1;-489.9785,-244.194;Float;True;Property;_Color;Color;2;0;Create;True;0;0;False;0;b41ecace8b020d64ea564b27fc73908a;3474193cfa5d443439836bd755a5a7e7;True;0;False;black;Auto;False;Object;-1;Auto;Texture2D;6;0;SAMPLER2D;;False;1;FLOAT2;0,0;False;2;FLOAT;0;False;3;FLOAT2;0,0;False;4;FLOAT2;0,0;False;5;FLOAT;1;False;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.RangedFloatNode;6;-410.9951,14.24499;Float;False;Property;_Color_Value;Color_Value;0;0;Create;True;0;0;False;0;1;1;0;2;0;1;FLOAT;0
Node;AmplifyShaderEditor.SamplerNode;2;-327,163;Float;True;Property;_Emis;Emis;4;0;Create;True;0;0;False;0;fcf5c4be6f3586447abe7cc849819d54;None;True;0;False;black;Auto;False;Object;-1;Auto;Texture2D;6;0;SAMPLER2D;;False;1;FLOAT2;0,0;False;2;FLOAT;0;False;3;FLOAT2;0,0;False;4;FLOAT2;0,0;False;5;FLOAT;1;False;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;4;-103.1123,-154.7258;Float;False;2;2;0;COLOR;0,0,0,0;False;1;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.RangedFloatNode;10;-212.3556,-351.9414;Float;False;Property;_Color_Exp;Color_Exp;1;0;Create;True;0;0;False;0;1;1;0;2;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;7;-313.8595,370.275;Float;False;Property;_Emis_Value;Emis_Value;3;0;Create;True;0;0;False;0;1;1.31;0;10;0;1;FLOAT;0
Node;AmplifyShaderEditor.PowerNode;9;120.8124,-346.2562;Float;False;2;0;COLOR;0,0,0,0;False;1;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;5;65,177;Float;False;2;2;0;COLOR;0,0,0,0;False;1;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.SimpleAddOpNode;3;300.5101,15.66999;Float;True;2;2;0;COLOR;0,0,0,0;False;1;COLOR;0,0,0,0;False;1;COLOR;0
Node;AmplifyShaderEditor.TemplateMultiPassMasterNode;0;573.5896,-6.685009;Float;False;True;2;Float;ASEMaterialInspector;0;1;LookDev/World_1/BG;0770190933193b94aaa3065e307002fa;0;0;SubShader 0 Pass 0;2;True;0;1;False;-1;0;False;-1;0;1;False;-1;0;False;-1;True;-1;False;-1;-1;False;-1;True;0;False;-1;True;True;True;True;True;0;False;-1;True;False;255;False;-1;255;False;-1;255;False;-1;7;False;-1;1;False;-1;1;False;-1;1;False;-1;7;False;-1;1;False;-1;1;False;-1;1;False;-1;True;1;False;-1;True;3;False;-1;True;True;0;False;-1;0;False;-1;True;1;RenderType=Opaque;True;2;0;False;False;False;False;False;False;False;False;False;False;0;;0;2;0;FLOAT4;0,0,0,0;False;1;FLOAT3;0,0,0;False;0
WireConnection;4;0;1;0
WireConnection;4;1;6;0
WireConnection;9;0;4;0
WireConnection;9;1;10;0
WireConnection;5;0;2;0
WireConnection;5;1;7;0
WireConnection;3;0;9;0
WireConnection;3;1;5;0
WireConnection;0;0;3;0
ASEEND*/
//CHKSM=74119059F30F4A19ED8E1CD584ED6079360F56C9