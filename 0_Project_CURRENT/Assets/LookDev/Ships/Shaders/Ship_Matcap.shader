// Made with Amplify Shader Editor
// Available at the Unity Asset Store - http://u3d.as/y3X 
Shader "LookDev/Ship_Matcap"
{
	Properties
	{
		_MainTex ("Sprite Texture", 2D) = "white" {}
		_Color ("Tint", Color) = (1,1,1,1)
		_Shad("Shad", 2D) = "black" {}
		_BaseColor("BaseColor", Color) = (0,0,0,0)
		_PatColor("PatColor", Color) = (0,0,0,0)
		_DecalTex("DecalTex", 2D) = "white" {}
		_MultTex("MultTex", 2D) = "white" {}
		[HideInInspector] _texcoord( "", 2D ) = "white" {}
	}
	
	SubShader
	{
		Tags { "RenderType"="Opaque" }
		LOD 100
		Cull Off
		

		Pass
		{
			CGPROGRAM
			#pragma target 3.0 
			#pragma vertex vert
			#pragma fragment frag
			#include "UnityCG.cginc"
			#include "UnityShaderVariables.cginc"


			struct appdata
			{
				float4 vertex : POSITION;
				float4 texcoord : TEXCOORD0;
				float4 texcoord1 : TEXCOORD1;
				UNITY_VERTEX_INPUT_INSTANCE_ID
				float3 ase_normal : NORMAL;
			};
			
			struct v2f
			{
				float4 vertex : SV_POSITION;
				float4 texcoord : TEXCOORD0;
				UNITY_VERTEX_OUTPUT_STEREO
				float4 ase_texcoord1 : TEXCOORD1;
			};

			uniform sampler2D _MainTex;
			uniform fixed4 _Color;
			uniform float4 _BaseColor;
			uniform float4 _PatColor;
			uniform sampler2D _DecalTex;
			uniform float4 _DecalTex_ST;
			uniform sampler2D _MultTex;
			uniform float4 _MultTex_ST;
			uniform sampler2D _Shad;
			
			v2f vert ( appdata v )
			{
				v2f o;
				UNITY_SETUP_INSTANCE_ID(v);
				UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);
				o.texcoord.xy = v.texcoord.xy;
				o.texcoord.zw = v.texcoord1.xy;
				
				// ase common template code
				float3 ase_worldNormal = UnityObjectToWorldNormal(v.ase_normal);
				o.ase_texcoord1.xyz = ase_worldNormal;
				
				
				//setting value to unused interpolator channels and avoid initialization warnings
				o.ase_texcoord1.w = 0;
				
				v.vertex.xyz +=  float3(0,0,0) ;
				o.vertex = UnityObjectToClipPos(v.vertex);
				return o;
			}
			
			fixed4 frag (v2f i ) : SV_Target
			{
				fixed4 myColorVar;
				// ase common template code
				float2 uv_DecalTex = i.texcoord.zw * _DecalTex_ST.xy + _DecalTex_ST.zw;
				float4 lerpResult35 = lerp( (_BaseColor).rgba , (_PatColor).rgba , tex2D( _DecalTex, uv_DecalTex ).a);
				float2 uv_MultTex = i.texcoord.xy * _MultTex_ST.xy + _MultTex_ST.zw;
				float4 temp_output_43_0 = ( lerpResult35 * tex2D( _MultTex, uv_MultTex ).r );
				float3 ase_worldNormal = i.ase_texcoord1.xyz;
				float4 blendOpSrc61 = temp_output_43_0;
				float4 blendOpDest61 = tex2D( _Shad, ( ( mul( UNITY_MATRIX_V, float4( ase_worldNormal , 0.0 ) ).xyz * 0.5 ) + 0.5 ).xy );
				
				
				myColorVar = saturate( ( temp_output_43_0 + ( saturate( (( blendOpDest61 > 0.5 ) ? ( 1.0 - ( 1.0 - 2.0 * ( blendOpDest61 - 0.5 ) ) * ( 1.0 - blendOpSrc61 ) ) : ( 2.0 * blendOpDest61 * blendOpSrc61 ) ) )) ) );
				return myColorVar;
			}
			ENDCG
		}
	}
	CustomEditor "ASEMaterialInspector"
	
	
}
/*ASEBEGIN
Version=15401
1157;92;793;667;1651.824;709.2962;2.170003;True;False
Node;AmplifyShaderEditor.TexturePropertyNode;50;-1444.876,-592.4678;Float;True;Property;_DecalTex;DecalTex;3;0;Create;True;0;0;False;0;None;60467f7dffcbd4077b20c5b497e3edf2;False;white;Auto;Texture2D;0;1;SAMPLER2D;0
Node;AmplifyShaderEditor.ViewMatrixNode;21;-1119.276,47.42967;Float;False;0;1;FLOAT4x4;0
Node;AmplifyShaderEditor.WorldNormalVector;26;-1199.464,141.5635;Float;False;False;1;0;FLOAT3;0,0,0;False;4;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3
Node;AmplifyShaderEditor.ColorNode;40;-765.0829,-883.0828;Float;False;Property;_BaseColor;BaseColor;1;0;Create;True;0;0;False;0;0,0,0,0;0.5,0.07848796,0.2303531,0.5;0;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.TextureCoordinatesNode;46;-1186.667,-478.7029;Float;False;1;-1;2;3;2;SAMPLER2D;;False;0;FLOAT2;1,1;False;1;FLOAT2;0,0;False;5;FLOAT2;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.ColorNode;39;-748.8229,-697.2428;Float;False;Property;_PatColor;PatColor;2;0;Create;True;0;0;False;0;0,0,0,0;0,0.3554042,0.5,0.5;0;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;18;-960.7327,77.2156;Float;False;2;2;0;FLOAT4x4;0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0;False;1;FLOAT3;0,0,0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.RangedFloatNode;23;-1041.85,394.2904;Float;True;Constant;_Float0;Float 0;-1;0;Create;True;0;0;False;0;0.5;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.SamplerNode;41;-818.5038,-473.6225;Float;True;Property;_TextureSample0;Texture Sample 0;3;0;Create;True;0;0;False;0;None;e3f5448afe2764b7aa31240f7765fd70;True;0;False;black;Auto;False;Object;-1;Auto;Texture2D;6;0;SAMPLER2D;;False;1;FLOAT2;0,0;False;2;FLOAT;0;False;3;FLOAT2;0,0;False;4;FLOAT2;0,0;False;5;FLOAT;1;False;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.ComponentMaskNode;38;-491.4484,-692.1798;Float;True;True;True;True;True;1;0;COLOR;0,0,0,0;False;1;COLOR;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;22;-826.4805,102.6614;Float;True;2;2;0;FLOAT3;0,0,0;False;1;FLOAT;0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.ComponentMaskNode;36;-487.2924,-910.2019;Float;True;True;True;True;True;1;0;COLOR;0,0,0,0;False;1;COLOR;0
Node;AmplifyShaderEditor.SamplerNode;44;-797.4361,-193.5472;Float;True;Property;_MultTex;MultTex;4;0;Create;True;0;0;False;0;None;1b7a77e9ed8814317ac6a043f3628986;True;0;False;white;Auto;False;Object;-1;Auto;Texture2D;6;0;SAMPLER2D;;False;1;FLOAT2;0,0;False;2;FLOAT;0;False;3;FLOAT2;0,0;False;4;FLOAT2;0,0;False;5;FLOAT;1;False;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.LerpOp;35;-93.66263,-423.1074;Float;False;3;0;COLOR;0,0,0,0;False;1;COLOR;0,0,0,0;False;2;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.SimpleAddOpNode;24;-618.1711,163.7383;Float;True;2;2;0;FLOAT3;0,0,0;False;1;FLOAT;0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.SamplerNode;1;-316.8812,175.4496;Float;True;Property;_Shad;Shad;0;0;Create;True;0;0;False;0;None;None;True;0;False;black;Auto;False;Object;-1;Auto;Texture2D;6;0;SAMPLER2D;0,0;False;1;FLOAT2;1,0;False;2;FLOAT;1;False;3;FLOAT2;0,0;False;4;FLOAT2;0,0;False;5;FLOAT;1;False;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;43;106.6462,-186.7727;Float;False;2;2;0;COLOR;0,0,0,0;False;1;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.BlendOpsNode;61;234.7413,65.94327;Float;False;Overlay;True;2;0;COLOR;0,0,0,0;False;1;COLOR;0,0,0,0;False;1;COLOR;0
Node;AmplifyShaderEditor.SimpleAddOpNode;59;644.0493,-120.2657;Float;False;2;2;0;COLOR;0,0,0,0;False;1;COLOR;0,0,0,0;False;1;COLOR;0
Node;AmplifyShaderEditor.SaturateNode;64;815.4697,-115.8006;Float;False;1;0;COLOR;0,0,0,0;False;1;COLOR;0
Node;AmplifyShaderEditor.TemplateMultiPassMasterNode;55;1075.947,-136.0275;Float;False;True;2;Float;ASEMaterialInspector;0;3;LookDev/Ship_Matcap;6e114a916ca3e4b4bb51972669d463bf;0;0;SubShader 0 Pass 0;2;False;False;True;2;False;-1;False;False;False;False;False;True;1;RenderType=Opaque;False;0;False;False;False;False;False;False;False;False;False;True;2;0;;0;2;0;FLOAT4;0,0,0,0;False;1;FLOAT3;0,0,0;False;0
WireConnection;46;2;50;0
WireConnection;18;0;21;0
WireConnection;18;1;26;0
WireConnection;41;0;50;0
WireConnection;41;1;46;0
WireConnection;38;0;39;0
WireConnection;22;0;18;0
WireConnection;22;1;23;0
WireConnection;36;0;40;0
WireConnection;35;0;36;0
WireConnection;35;1;38;0
WireConnection;35;2;41;4
WireConnection;24;0;22;0
WireConnection;24;1;23;0
WireConnection;1;1;24;0
WireConnection;43;0;35;0
WireConnection;43;1;44;1
WireConnection;61;0;43;0
WireConnection;61;1;1;0
WireConnection;59;0;43;0
WireConnection;59;1;61;0
WireConnection;64;0;59;0
WireConnection;55;0;64;0
ASEEND*/
//CHKSM=C09E4A1AF8D26B3386ABDBFA1351693275939389