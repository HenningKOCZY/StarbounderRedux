// Made with Amplify Shader Editor
// Available at the Unity Asset Store - http://u3d.as/y3X 
Shader "ASETemplateShaders/Unlit"
{
	Properties
	{
		_boosters_emis("boosters_emis", 2D) = "white" {}
		[HDR]_Tint("Tint", Color) = (0.1032343,1,0,0)
		_Intensity("Intensity", Range( 0 , 10)) = 3.73105
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

			uniform sampler2D _boosters_emis;
			uniform float4 _boosters_emis_ST;
			uniform float4 _Tint;
			uniform float _Intensity;
			
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
				float2 uv_boosters_emis = i.ase_texcoord.xy * _boosters_emis_ST.xy + _boosters_emis_ST.zw;
				
				
				finalColor = ( tex2D( _boosters_emis, uv_boosters_emis ) + ( _Tint * _Intensity ) );
				return finalColor;
			}
			ENDCG
		}
	}
	CustomEditor "ASEMaterialInspector"
	
	
}
/*ASEBEGIN
Version=15401
1214;92;895;959;1116.802;925.4352;1.893808;True;False
Node;AmplifyShaderEditor.RangedFloatNode;7;-573.279,394.549;Float;False;Property;_Intensity;Intensity;2;0;Create;True;0;0;False;0;3.73105;4;0;10;0;1;FLOAT;0
Node;AmplifyShaderEditor.ColorNode;4;-550.5538,182.4427;Float;False;Property;_Tint;Tint;1;1;[HDR];Create;True;0;0;False;0;0.1032343,1,0,0;0.1041427,0.9945624,0,0;0;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;6;-213.4556,250.6196;Float;False;2;2;0;COLOR;0,0,0,0;False;1;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.SamplerNode;1;-631.9868,-38.48244;Float;True;Property;_boosters_emis;boosters_emis;0;0;Create;True;0;0;False;0;8a640921cde1e064a9b995ae312bb324;8a640921cde1e064a9b995ae312bb324;True;0;False;white;Auto;False;Object;-1;Auto;Texture2D;6;0;SAMPLER2D;;False;1;FLOAT2;0,0;False;2;FLOAT;0;False;3;FLOAT2;0,0;False;4;FLOAT2;0,0;False;5;FLOAT;1;False;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.SimpleAddOpNode;5;-82.78309,74.49556;Float;False;2;2;0;COLOR;0,0,0,0;False;1;COLOR;0,0,0,0;False;1;COLOR;0
Node;AmplifyShaderEditor.TemplateMultiPassMasterNode;0;235.478,-5.769966;Float;False;True;2;Float;ASEMaterialInspector;0;1;ASETemplateShaders/Unlit;0770190933193b94aaa3065e307002fa;0;0;SubShader 0 Pass 0;2;True;0;1;False;-1;0;False;-1;0;1;False;-1;0;False;-1;True;-1;False;-1;-1;False;-1;True;0;False;-1;True;True;True;True;True;0;False;-1;True;False;255;False;-1;255;False;-1;255;False;-1;7;False;-1;1;False;-1;1;False;-1;1;False;-1;7;False;-1;1;False;-1;1;False;-1;1;False;-1;True;1;False;-1;True;3;False;-1;True;True;0;False;-1;0;False;-1;True;1;RenderType=Opaque;True;2;0;False;False;False;False;False;False;False;False;False;False;0;;0;2;0;FLOAT4;0,0,0,0;False;1;FLOAT3;0,0,0;False;0
WireConnection;6;0;4;0
WireConnection;6;1;7;0
WireConnection;5;0;1;0
WireConnection;5;1;6;0
WireConnection;0;0;5;0
ASEEND*/
//CHKSM=BF1F26232002FEEF90606AEF37145B43AFBF6F5E