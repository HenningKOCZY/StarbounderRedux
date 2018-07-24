// Made with Amplify Shader Editor
// Available at the Unity Asset Store - http://u3d.as/y3X 
Shader "LookDev/World_0/Track_v2"
{
	Properties
	{
		_Albedo("Albedo", Color) = (0,0,0,0)
		_Smoothness("Smoothness", Range( 0 , 1)) = 0
		_Metallic("Metallic", Range( 0 , 1)) = 0
		_TextureSample0("Texture Sample 0", CUBE) = "black" {}
		_Reflection_Brightness("Reflection_Brightness", Range( 0 , 10)) = 0
		_FadeOffset("Fade Offset", Float) = 0
		_FadeLength("Fade Length", Float) = 0
		_DistanceFadeLength("Distance Fade Length", Range( 0 , 2000)) = 0
		_DistanceFadeOffset("Distance Fade Offset", Range( -1000 , 2000)) = 0
		_Float2("Float 2", Float) = 0
		_Vector1("Vector 1", Vector) = (0,0,0,0)
		_Twist_Grad("Twist_Grad", 2D) = "white" {}
		[HideInInspector] __dirty( "", Int ) = 1
	}

	SubShader
	{
		Tags{ "RenderType" = "Transparent"  "Queue" = "AlphaTest+0" "IgnoreProjector" = "True" "IsEmissive" = "true"  }
		Cull Back
		Blend SrcAlpha OneMinusSrcAlpha
		CGPROGRAM
		#include "UnityShaderVariables.cginc"
		#pragma target 3.0
		#pragma only_renderers d3d9 d3d11 glcore gles gles3 metal 
		#pragma surface surf Standard keepalpha noshadow exclude_path:deferred vertex:vertexDataFunc 
		struct Input
		{
			float3 worldRefl;
			INTERNAL_DATA
			half eyeDepth;
		};

		uniform half _Float2;
		uniform sampler2D _Twist_Grad;
		uniform half _DistanceFadeLength;
		uniform half _DistanceFadeOffset;
		uniform half3 _Vector1;
		uniform half4 _Albedo;
		uniform samplerCUBE _TextureSample0;
		uniform half _Reflection_Brightness;
		uniform half _Metallic;
		uniform half _Smoothness;
		uniform half _FadeLength;
		uniform half _FadeOffset;


		float3 RotateAroundAxis( float3 center, float3 original, float3 u, float angle )
		{
			original -= center;
			float C = cos( angle );
			float S = sin( angle );
			float t = 1 - C;
			float m00 = t * u.x * u.x + C;
			float m01 = t * u.x * u.y - S * u.z;
			float m02 = t * u.x * u.z + S * u.y;
			float m10 = t * u.x * u.y + S * u.z;
			float m11 = t * u.y * u.y + C;
			float m12 = t * u.y * u.z - S * u.x;
			float m20 = t * u.x * u.z - S * u.y;
			float m21 = t * u.y * u.z + S * u.x;
			float m22 = t * u.z * u.z + C;
			float3x3 finalMatrix = float3x3( m00, m01, m02, m10, m11, m12, m20, m21, m22 );
			return mul( finalMatrix, original ) + center;
		}


		void vertexDataFunc( inout appdata_full v, out Input o )
		{
			UNITY_INITIALIZE_OUTPUT( Input, o );
			float cameraDepthFade39 = (( -UnityObjectToViewPos( v.vertex.xyz ).z -_ProjectionParams.y - _DistanceFadeOffset ) / _DistanceFadeLength);
			float clampResult41 = clamp( pow( cameraDepthFade39 , 1.0 ) , 0.0 , 1.0 );
			float4 appendResult88 = (half4(clampResult41 , 0.0 , 0.0 , 0.0));
			float3 rotatedValue73 = RotateAroundAxis( _Vector1, float3( 0,0,0 ), float3( 0,0,-1 ), ( _Float2 * tex2Dlod( _Twist_Grad, half4( appendResult88.xy, 0, 0.0) ).r ) );
			v.vertex.xyz += rotatedValue73;
			o.eyeDepth = -UnityObjectToViewPos( v.vertex.xyz ).z;
		}

		void surf( Input i , inout SurfaceOutputStandard o )
		{
			o.Albedo = _Albedo.rgb;
			half3 ase_worldReflection = i.worldRefl;
			o.Emission = ( texCUBE( _TextureSample0, ase_worldReflection ) * _Reflection_Brightness ).rgb;
			o.Metallic = _Metallic;
			o.Smoothness = _Smoothness;
			float cameraDepthFade31 = (( i.eyeDepth -_ProjectionParams.y - _FadeOffset ) / _FadeLength);
			o.Alpha = ( _Albedo.a * ( 1.0 - saturate( cameraDepthFade31 ) ) );
		}

		ENDCG
	}
	CustomEditor "ASEMaterialInspector"
}
/*ASEBEGIN
Version=15401
1213;100;521;879;596.0438;-146.724;2.077162;False;False
Node;AmplifyShaderEditor.RangedFloatNode;38;-1881.608,1541.229;Float;False;Property;_DistanceFadeOffset;Distance Fade Offset;9;0;Create;True;0;0;False;0;0;237;-1000;2000;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;37;-1873.069,1445.154;Float;False;Property;_DistanceFadeLength;Distance Fade Length;8;0;Create;True;0;0;False;0;0;2000;0;2000;0;1;FLOAT;0
Node;AmplifyShaderEditor.CameraDepthFade;39;-1453.827,1383.368;Float;False;3;2;FLOAT3;0,0,0;False;0;FLOAT;1;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.PowerNode;44;-1112.399,1385.975;Float;False;2;0;FLOAT;0;False;1;FLOAT;1;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;33;-751.0776,-309.7661;Float;False;Property;_FadeLength;Fade Length;7;0;Create;True;0;0;False;0;0;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.ClampOpNode;41;-868.4699,1379.906;Float;False;3;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;1;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;34;-758.2337,-209.5794;Float;False;Property;_FadeOffset;Fade Offset;6;0;Create;True;0;0;False;0;0;2000;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.DynamicAppendNode;88;-671.5381,1359.924;Float;False;FLOAT4;4;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;0;False;3;FLOAT;0;False;1;FLOAT4;0
Node;AmplifyShaderEditor.CameraDepthFade;31;-451.9495,-272.5539;Float;False;3;2;FLOAT3;0,0,0;False;0;FLOAT;1;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.SamplerNode;87;-415.599,1356.553;Float;True;Property;_Twist_Grad;Twist_Grad;12;0;Create;True;0;0;False;0;48bddaeb8d430df479a7492a80979adb;48bddaeb8d430df479a7492a80979adb;True;0;False;white;Auto;False;Object;-1;Auto;Texture2D;6;0;SAMPLER2D;;False;1;FLOAT2;0,0;False;2;FLOAT;0;False;3;FLOAT2;0,0;False;4;FLOAT2;0,0;False;5;FLOAT;1;False;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.SaturateNode;32;-142.802,-242.498;Float;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;75;-98.59573,1328.704;Float;False;Property;_Float2;Float 2;10;0;Create;True;0;0;False;0;0;17.4;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.WorldReflectionVector;14;-792.2882,-71.21339;Float;False;False;1;0;FLOAT3;0,0,0;False;4;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3
Node;AmplifyShaderEditor.SamplerNode;13;-367.4498,-86.14752;Float;True;Property;_TextureSample0;Texture Sample 0;4;0;Create;True;0;0;False;0;None;5364d2b5ecca22a40b84f23f6383e1c6;True;0;False;black;Auto;False;Object;-1;Auto;Cube;6;0;SAMPLER2D;;False;1;FLOAT3;0,0,0;False;2;FLOAT;0;False;3;FLOAT3;0,0,0;False;4;FLOAT3;0,0,0;False;5;FLOAT;1;False;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;84;114.7343,1406.379;Float;False;2;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;15;-690.713,226.9259;Float;False;Property;_Reflection_Brightness;Reflection_Brightness;5;0;Create;True;0;0;False;0;0;3.37;0;10;0;1;FLOAT;0
Node;AmplifyShaderEditor.Vector3Node;83;-81.73628,1102.92;Float;False;Property;_Vector1;Vector 1;11;0;Create;True;0;0;False;0;0,0,0;0,79.8,0;0;4;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3
Node;AmplifyShaderEditor.OneMinusNode;36;40.39685,-251.0852;Float;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.ColorNode;6;-105.2131,-552.9141;Float;False;Property;_Albedo;Albedo;1;0;Create;True;0;0;False;0;0,0,0,0;0,0,0,1;0;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.RangedFloatNode;12;-132.754,308.8349;Float;False;Property;_Smoothness;Smoothness;2;0;Create;True;0;0;False;0;0;0.565;0;1;0;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;30;44.69081,-59.30006;Float;False;2;2;0;COLOR;0,0,0,0;False;1;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;35;240.7702,-265.3976;Float;False;2;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RotateAboutAxisNode;73;392.0078,1395.854;Float;False;False;4;0;FLOAT3;0,0,-1;False;1;FLOAT;0;False;2;FLOAT3;0,1,0;False;3;FLOAT3;0,0,0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.RangedFloatNode;10;-130.0449,161.0973;Float;False;Property;_Metallic;Metallic;3;0;Create;True;0;0;False;0;0;0;0;1;0;1;FLOAT;0
Node;AmplifyShaderEditor.StandardSurfaceOutputNode;0;841.7192,245.6083;Half;False;True;2;Half;ASEMaterialInspector;0;0;Standard;LookDev/World_0/Track_v2;False;False;False;False;False;False;False;False;False;False;False;False;False;False;True;False;False;False;False;False;Back;0;False;-1;0;False;-1;False;0;False;-1;0;False;-1;False;0;Custom;0.5;True;False;0;True;Transparent;;AlphaTest;ForwardOnly;True;True;True;True;True;True;False;False;False;False;False;False;False;True;True;True;True;0;False;-1;False;0;False;-1;255;False;-1;255;False;-1;0;False;-1;0;False;-1;0;False;-1;0;False;-1;0;False;-1;0;False;-1;0;False;-1;0;False;-1;False;2;15;10;25;False;0.5;False;2;5;False;-1;10;False;-1;0;0;False;-1;0;False;-1;-1;False;-1;-1;False;-1;0;False;0;0,0,0,0;VertexOffset;True;False;Cylindrical;False;Relative;0;;0;-1;-1;-1;0;False;0;0;False;-1;-1;0;False;-1;0;0;16;0;FLOAT3;0,0,0;False;1;FLOAT3;0,0,0;False;2;FLOAT3;0,0,0;False;3;FLOAT;0;False;4;FLOAT;0;False;5;FLOAT;0;False;6;FLOAT3;0,0,0;False;7;FLOAT3;0,0,0;False;8;FLOAT;0;False;9;FLOAT;0;False;10;FLOAT;0;False;13;FLOAT3;0,0,0;False;11;FLOAT3;0,0,0;False;12;FLOAT3;0,0,0;False;14;FLOAT4;0,0,0,0;False;15;FLOAT3;0,0,0;False;0
WireConnection;39;0;37;0
WireConnection;39;1;38;0
WireConnection;44;0;39;0
WireConnection;41;0;44;0
WireConnection;88;0;41;0
WireConnection;31;0;33;0
WireConnection;31;1;34;0
WireConnection;87;1;88;0
WireConnection;32;0;31;0
WireConnection;13;1;14;0
WireConnection;84;0;75;0
WireConnection;84;1;87;1
WireConnection;36;0;32;0
WireConnection;30;0;13;0
WireConnection;30;1;15;0
WireConnection;35;0;6;4
WireConnection;35;1;36;0
WireConnection;73;1;84;0
WireConnection;73;2;83;0
WireConnection;0;0;6;0
WireConnection;0;2;30;0
WireConnection;0;3;10;0
WireConnection;0;4;12;0
WireConnection;0;9;35;0
WireConnection;0;11;73;0
ASEEND*/
//CHKSM=89AE92EF0323DB114F70D7D7DE7FBCF2952FF03B