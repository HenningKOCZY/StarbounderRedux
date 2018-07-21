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

		uniform half4 _Albedo;
		uniform samplerCUBE _TextureSample0;
		uniform half _Reflection_Brightness;
		uniform half _Metallic;
		uniform half _Smoothness;
		uniform half _FadeLength;
		uniform half _FadeOffset;

		void vertexDataFunc( inout appdata_full v, out Input o )
		{
			UNITY_INITIALIZE_OUTPUT( Input, o );
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
1456;92;653;959;418.4431;716.2374;1.431238;False;False
Node;AmplifyShaderEditor.RangedFloatNode;33;-751.0776,-309.7661;Float;False;Property;_FadeLength;Fade Length;8;0;Create;True;0;0;False;0;0;58.75;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;34;-758.2337,-209.5794;Float;False;Property;_FadeOffset;Fade Offset;7;0;Create;True;0;0;False;0;0;136.7;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.CameraDepthFade;31;-451.9495,-272.5539;Float;False;3;2;FLOAT3;0,0,0;False;0;FLOAT;1;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.WorldReflectionVector;14;-792.2882,-71.21339;Float;False;False;1;0;FLOAT3;0,0,0;False;4;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3
Node;AmplifyShaderEditor.SaturateNode;32;-142.802,-242.498;Float;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.OneMinusNode;36;40.39685,-251.0852;Float;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.ColorNode;6;-105.2131,-552.9141;Float;False;Property;_Albedo;Albedo;1;0;Create;True;0;0;False;0;0,0,0,0;0,0,0,0.8;0;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.RangedFloatNode;15;-489.8951,171.3911;Float;False;Property;_Reflection_Brightness;Reflection_Brightness;5;0;Create;True;0;0;False;0;0;3.37;0;10;0;1;FLOAT;0
Node;AmplifyShaderEditor.SamplerNode;13;-531.0604,-69.78645;Float;True;Property;_TextureSample0;Texture Sample 0;4;0;Create;True;0;0;False;0;None;5364d2b5ecca22a40b84f23f6383e1c6;True;0;False;black;Auto;False;Object;-1;Auto;Cube;6;0;SAMPLER2D;;False;1;FLOAT3;0,0,0;False;2;FLOAT;0;False;3;FLOAT3;0,0,0;False;4;FLOAT3;0,0,0;False;5;FLOAT;1;False;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.SamplerNode;25;-514.9216,345.4555;Float;True;Property;_Reflection_Screenspace;Reflection_Screenspace;6;0;Create;True;0;0;False;0;2c30e48aefaa5d6479525b842c08cc23;2c30e48aefaa5d6479525b842c08cc23;True;0;False;white;Auto;False;Object;-1;Auto;Texture2D;6;0;SAMPLER2D;;False;1;FLOAT2;0,0;False;2;FLOAT;0;False;3;FLOAT2;0,0;False;4;FLOAT2;0,0;False;5;FLOAT;1;False;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.ComponentMaskNode;21;-298.9224,654.8085;Float;False;False;True;False;True;1;0;FLOAT3;0,0,0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;12;-132.754,308.8349;Float;False;Property;_Smoothness;Smoothness;2;0;Create;True;0;0;False;0;0;0.565;0;1;0;1;FLOAT;0
Node;AmplifyShaderEditor.TextureCoordinatesNode;23;-585.637,-435.3483;Float;False;0;-1;2;3;2;SAMPLER2D;;False;0;FLOAT2;1,1;False;1;FLOAT2;0,0;False;5;FLOAT2;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;30;44.69081,-59.30006;Float;False;2;2;0;COLOR;0,0,0,0;False;1;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;16;129.3641,509.527;Float;False;3;3;0;COLOR;0,0,0,0;False;1;FLOAT;0;False;2;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.WorldNormalVector;19;-516.9451,651.4316;Float;False;True;1;0;FLOAT3;0,0,1;False;4;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;35;240.7702,-265.3976;Float;False;2;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;10;-130.0449,161.0973;Float;False;Property;_Metallic;Metallic;3;0;Create;True;0;0;False;0;0;0;0;1;0;1;FLOAT;0
Node;AmplifyShaderEditor.ScreenPosInputsNode;29;-1023.915,306.7645;Float;False;0;False;0;5;FLOAT4;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.StandardSurfaceOutputNode;0;528.1193,151.2083;Half;False;True;2;Half;ASEMaterialInspector;0;0;Standard;LookDev/World_0/Track_v2;False;False;False;False;False;False;False;False;False;False;False;False;False;False;True;False;False;False;False;False;Back;0;False;-1;0;False;-1;False;0;False;-1;0;False;-1;False;0;Custom;0.5;True;False;0;False;Transparent;;AlphaTest;ForwardOnly;True;True;True;True;True;True;False;False;False;False;False;False;False;True;True;True;True;0;False;-1;False;0;False;-1;255;False;-1;255;False;-1;0;False;-1;0;False;-1;0;False;-1;0;False;-1;0;False;-1;0;False;-1;0;False;-1;0;False;-1;False;2;15;10;25;False;0.5;False;2;5;False;-1;10;False;-1;0;0;False;-1;0;False;-1;-1;False;-1;-1;False;-1;0;False;0;0,0,0,0;VertexOffset;True;False;Cylindrical;False;Relative;0;;0;-1;-1;-1;0;False;0;0;False;-1;-1;0;False;-1;0;0;16;0;FLOAT3;0,0,0;False;1;FLOAT3;0,0,0;False;2;FLOAT3;0,0,0;False;3;FLOAT;0;False;4;FLOAT;0;False;5;FLOAT;0;False;6;FLOAT3;0,0,0;False;7;FLOAT3;0,0,0;False;8;FLOAT;0;False;9;FLOAT;0;False;10;FLOAT;0;False;13;FLOAT3;0,0,0;False;11;FLOAT3;0,0,0;False;12;FLOAT3;0,0,0;False;14;FLOAT4;0,0,0,0;False;15;FLOAT3;0,0,0;False;0
WireConnection;31;0;33;0
WireConnection;31;1;34;0
WireConnection;32;0;31;0
WireConnection;36;0;32;0
WireConnection;13;1;14;0
WireConnection;25;1;29;0
WireConnection;21;0;19;0
WireConnection;30;0;13;0
WireConnection;30;1;15;0
WireConnection;16;0;25;0
WireConnection;16;1;15;0
WireConnection;16;2;21;0
WireConnection;35;0;6;4
WireConnection;35;1;36;0
WireConnection;0;0;6;0
WireConnection;0;2;30;0
WireConnection;0;3;10;0
WireConnection;0;4;12;0
WireConnection;0;9;35;0
ASEEND*/
//CHKSM=4D2267A9EED812F3634AACFC1E20FA8B68E6AD4A