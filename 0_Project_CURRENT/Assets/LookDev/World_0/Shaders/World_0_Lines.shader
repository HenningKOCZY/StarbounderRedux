// Made with Amplify Shader Editor
// Available at the Unity Asset Store - http://u3d.as/y3X 
Shader "LookDev/World_0/Lines"
{
	Properties
	{
		_Offset("Offset", Range( -1000 , 2000)) = 0
		_Length("Length", Range( 0 , 2000)) = 0
		_Thickness_Mult("Thickness_Mult", Float) = 0
		[HDR]_Color("Color", Color) = (0,0,0,0)
		[HDR]_FogColor("Fog Color", Color) = (0,0,0,0)
		_GradientMap("Gradient Map", 2D) = "white" {}
		_MinThickness("Min Thickness", Range( 0 , 1)) = 0
		_Float0("Float 0", Range( -1000 , 2000)) = 0
		_Float1("Float 1", Range( 0 , 2000)) = 0
		_Float2("Float 2", Float) = 0
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
				float3 ase_normal : NORMAL;
				float4 ase_texcoord : TEXCOORD0;
			};
			
			struct v2f
			{
				float4 vertex : SV_POSITION;
				UNITY_VERTEX_OUTPUT_STEREO
				float4 ase_texcoord : TEXCOORD0;
			};

			uniform float _Length;
			uniform float _Offset;
			uniform float _Thickness_Mult;
			uniform float _MinThickness;
			uniform sampler2D _GradientMap;
			uniform float _Float1;
			uniform float _Float0;
			uniform float _Float2;
			uniform float4 _FogColor;
			uniform float4 _Color;
			float3x3 CotangentFrame( float3 normal , float3 position , float2 uv )
			{
				float3 dp1 = ddx ( position );
				float3 dp2 = ddy ( position );
				float2 duv1 = ddx ( uv );
				float2 duv2 = ddy ( uv );
				float3 dp2perp = cross ( dp2, normal );
				float3 dp1perp = cross ( normal, dp1 );
				float3 tangent = dp2perp * duv1.x + dp1perp * duv2.x;
				float3 bitangent = dp2perp * duv1.y + dp1perp * duv2.y;
				float invmax = rsqrt ( max ( dot ( tangent, tangent ), dot ( bitangent, bitangent ) ) );
				tangent *= invmax;
				bitangent *= invmax;
				return float3x3 (	tangent.x, bitangent.x, normal.x,
									tangent.y, bitangent.y, normal.y,
									tangent.z, bitangent.z, normal.z );
			}
			
			
			v2f vert ( appdata v )
			{
				v2f o;
				UNITY_SETUP_INSTANCE_ID(v);
				UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);
				float3 objectToViewPos = UnityObjectToViewPos(v.vertex.xyz);
				float eyeDepth = -objectToViewPos.z;
				float cameraDepthFade4 = (( eyeDepth -_ProjectionParams.y - _Offset ) / _Length);
				float3 ase_worldNormal = UnityObjectToWorldNormal(v.ase_normal);
				float3 normalizedWorldNormal = normalize( ase_worldNormal );
				float3 normal3_g7 = normalizedWorldNormal;
				float3 ase_worldPos = mul(unity_ObjectToWorld, v.vertex).xyz;
				float3 ase_worldViewDir = UnityWorldSpaceViewDir(ase_worldPos);
				ase_worldViewDir = normalize(ase_worldViewDir);
				float3 position3_g7 = ase_worldViewDir;
				float2 uv3_g7 = v.ase_texcoord.xy;
				float3x3 localCotangentFrame3_g7 = CotangentFrame( normal3_g7 , position3_g7 , uv3_g7 );
				float3 temp_output_6_0_g2 = float3( 0,0,0 );
				float3 temp_output_24_0_g2 = mul( localCotangentFrame3_g7, temp_output_6_0_g2 );
				float cameraDepthFade44 = (( eyeDepth -_ProjectionParams.y - _Float0 ) / _Float1);
				float2 appendResult28 = (float2(saturate( cameraDepthFade44 ) , 0.0));
				
				o.ase_texcoord.x = eyeDepth;
				
				
				//setting value to unused interpolator channels and avoid initialization warnings
				o.ase_texcoord.yzw = 0;
				
				v.vertex.xyz += ( ( saturate( cameraDepthFade4 ) * _Thickness_Mult * ase_worldNormal ) + ( ase_worldNormal * _MinThickness ) + ( temp_output_24_0_g2 * ( tex2Dlod( _GradientMap, float4( appendResult28, 0, 0.0) ).r * _Float2 ) ) );
				o.vertex = UnityObjectToClipPos(v.vertex);
				return o;
			}
			
			fixed4 frag (v2f i ) : SV_Target
			{
				fixed4 finalColor;
				float eyeDepth = i.ase_texcoord.x;
				float cameraDepthFade4 = (( eyeDepth -_ProjectionParams.y - _Offset ) / _Length);
				float clampResult32 = clamp( pow( ( 1.0 - cameraDepthFade4 ) , 2.0 ) , 0.3 , 1.0 );
				float4 lerpResult39 = lerp( _FogColor , _Color , clampResult32);
				
				
				finalColor = lerpResult39;
				return finalColor;
			}
			ENDCG
		}
	}
	CustomEditor "ASEMaterialInspector"
	
	
}
/*ASEBEGIN
Version=15401
1214;92;895;959;1101.178;317.7216;1.666727;True;False
Node;AmplifyShaderEditor.RangedFloatNode;42;-1421.507,791.0256;Float;False;Property;_Float0;Float 0;7;0;Create;True;0;0;False;0;0;-104;-1000;2000;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;43;-1416.782,694.9507;Float;False;Property;_Float1;Float 1;8;0;Create;True;0;0;False;0;0;474;0;2000;0;1;FLOAT;0
Node;AmplifyShaderEditor.CameraDepthFade;44;-1126.454,714.9263;Float;False;3;2;FLOAT3;0,0,0;False;0;FLOAT;1;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;16;-1049.876,43.54295;Float;False;Property;_Offset;Offset;0;0;Create;True;0;0;False;0;0;0;-1000;2000;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;15;-1045.151,-52.53195;Float;False;Property;_Length;Length;1;0;Create;True;0;0;False;0;0;1519;0;2000;0;1;FLOAT;0
Node;AmplifyShaderEditor.SaturateNode;45;-834.4088,663.8766;Float;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.CameraDepthFade;4;-754.8232,-32.55645;Float;False;3;2;FLOAT3;0,0,0;False;0;FLOAT;1;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.DynamicAppendNode;28;-599.2576,696.0563;Float;False;FLOAT2;4;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;0;False;3;FLOAT;0;False;1;FLOAT2;0
Node;AmplifyShaderEditor.OneMinusNode;25;-465.7354,-751.9661;Float;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;47;-218.7796,954.2197;Float;False;Property;_Float2;Float 2;9;0;Create;True;0;0;False;0;0;1;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.SamplerNode;26;-419.0946,699.1027;Float;True;Property;_GradientMap;Gradient Map;5;0;Create;True;0;0;False;0;None;9e0cde0545cbadf49bd38e20828606d6;True;0;False;white;Auto;False;Object;-1;Auto;Texture2D;6;0;SAMPLER2D;;False;1;FLOAT2;0,0;False;2;FLOAT;0;False;3;FLOAT2;0,0;False;4;FLOAT2;0,0;False;5;FLOAT;1;False;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.SaturateNode;17;-285.5833,-109.0862;Float;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;34;-410.695,461.0294;Float;False;Property;_MinThickness;Min Thickness;6;0;Create;True;0;0;False;0;0;0.025;0;1;0;1;FLOAT;0
Node;AmplifyShaderEditor.FunctionNode;50;-579.4926,357.3029;Float;False;PerturbNormal;-1;;2;c8b64dd82fb09f542943a895dffb6c06;1,26,0;1;6;FLOAT3;0,0,0;False;4;FLOAT3;9;FLOAT;28;FLOAT;29;FLOAT;30
Node;AmplifyShaderEditor.PowerNode;38;-237.7668,-752.7539;Float;False;2;0;FLOAT;0;False;1;FLOAT;2;False;1;FLOAT;0
Node;AmplifyShaderEditor.WorldNormalVector;11;-292.3952,195.7302;Float;False;False;1;0;FLOAT3;0,0,1;False;4;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3
Node;AmplifyShaderEditor.RangedFloatNode;19;-318.7938,-1.418836;Float;False;Property;_Thickness_Mult;Thickness_Mult;2;0;Create;True;0;0;False;0;0;1.3;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;46;-9.779633,707.2197;Float;False;2;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.ColorNode;20;12.3997,-960.8676;Float;False;Property;_Color;Color;3;1;[HDR];Create;True;0;0;False;0;0,0,0,0;0.6364893,1.078737,3.953349,0;0;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.ClampOpNode;32;33.59808,-750.9737;Float;False;3;0;FLOAT;0;False;1;FLOAT;0.3;False;2;FLOAT;1;False;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;36;180.0466,209.6052;Float;False;2;2;0;FLOAT3;0,0,0;False;1;FLOAT;0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;13;172.1483,-63.56987;Float;False;3;3;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT3;0,0,0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.ColorNode;40;10.28657,-1169.214;Float;False;Property;_FogColor;Fog Color;4;1;[HDR];Create;True;0;0;False;0;0,0,0,0;0,0.2670155,1,0;0;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;49;182.2014,497.308;Float;False;2;2;0;FLOAT3;0,0,0;False;1;FLOAT;0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.LerpOp;39;436.7669,-712.9005;Float;False;3;0;COLOR;0,0,0,0;False;1;COLOR;0,0,0,0;False;2;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.SimpleAddOpNode;33;458.0411,58.3448;Float;False;3;3;0;FLOAT3;0,0,0;False;1;FLOAT3;0,0,0;False;2;FLOAT3;0,0,0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.TemplateMultiPassMasterNode;1;795.2576,15.39815;Half;False;True;2;Half;ASEMaterialInspector;0;1;LookDev/World_0/Lines;0770190933193b94aaa3065e307002fa;0;0;SubShader 0 Pass 0;2;True;0;1;False;-1;0;False;-1;0;1;False;-1;0;False;-1;True;-1;False;-1;-1;False;-1;True;0;False;-1;True;True;True;True;True;0;False;-1;True;False;255;False;-1;255;False;-1;255;False;-1;7;False;-1;1;False;-1;1;False;-1;1;False;-1;7;False;-1;1;False;-1;1;False;-1;1;False;-1;True;1;False;-1;True;3;False;-1;True;True;0;False;-1;0;False;-1;True;1;RenderType=Opaque;True;2;0;False;False;False;False;False;False;False;False;False;False;0;;0;2;0;FLOAT4;0,0,0,0;False;1;FLOAT3;0,0,0;False;0
WireConnection;44;0;43;0
WireConnection;44;1;42;0
WireConnection;45;0;44;0
WireConnection;4;0;15;0
WireConnection;4;1;16;0
WireConnection;28;0;45;0
WireConnection;25;0;4;0
WireConnection;26;1;28;0
WireConnection;17;0;4;0
WireConnection;38;0;25;0
WireConnection;46;0;26;1
WireConnection;46;1;47;0
WireConnection;32;0;38;0
WireConnection;36;0;11;0
WireConnection;36;1;34;0
WireConnection;13;0;17;0
WireConnection;13;1;19;0
WireConnection;13;2;11;0
WireConnection;49;0;50;9
WireConnection;49;1;46;0
WireConnection;39;0;40;0
WireConnection;39;1;20;0
WireConnection;39;2;32;0
WireConnection;33;0;13;0
WireConnection;33;1;36;0
WireConnection;33;2;49;0
WireConnection;1;0;39;0
WireConnection;1;1;33;0
ASEEND*/
//CHKSM=410933D1C55D2FD1337BAA348E16C6C693C137A2