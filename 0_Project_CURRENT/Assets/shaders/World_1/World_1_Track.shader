// Made with Amplify Shader Editor
// Available at the Unity Asset Store - http://u3d.as/y3X 
Shader "LookDev/World_1/Track"
{
	Properties
	{
		_Smoothness("Smoothness", Range( 0 , 1)) = 0
		_Metallic("Metallic", Range( 0 , 1)) = 0
		_Opacity("Opacity", Range( 0 , 1)) = 0
		_TextureSample0("Texture Sample 0", CUBE) = "black" {}
		_Reflection_Brightness("Reflection_Brightness", Range( 0 , 10)) = 0
		_DistanceFadeLength("Distance Fade Length", Range( 0 , 2000)) = 0
		_DistanceFadeOffset("Distance Fade Offset", Range( -1000 , 2000)) = 0
		_VertexOffset("Vertex Offset", Float) = 0
		_Circuits("Circuits", 2D) = "white" {}
		[HDR]_Tint2("Tint2", Color) = (0,0,0,0)
		[HDR]_Tint("Tint", Color) = (0,0,0,0)
		_HorizontalBend("Horizontal Bend", Float) = 0
		[HideInInspector] _texcoord( "", 2D ) = "white" {}
		[HideInInspector] __dirty( "", Int ) = 1
	}

	SubShader
	{
		Tags{ "RenderType" = "Transparent"  "Queue" = "AlphaTest+0" "IgnoreProjector" = "True" "IsEmissive" = "true"  }
		Cull Back
		Blend SrcAlpha OneMinusSrcAlpha
		CGINCLUDE
		#include "UnityPBSLighting.cginc"
		#include "Lighting.cginc"
		#pragma target 3.0
		#ifdef UNITY_PASS_SHADOWCASTER
			#undef INTERNAL_DATA
			#undef WorldReflectionVector
			#undef WorldNormalVector
			#define INTERNAL_DATA half3 internalSurfaceTtoW0; half3 internalSurfaceTtoW1; half3 internalSurfaceTtoW2;
			#define WorldReflectionVector(data,normal) reflect (data.worldRefl, half3(dot(data.internalSurfaceTtoW0,normal), dot(data.internalSurfaceTtoW1,normal), dot(data.internalSurfaceTtoW2,normal)))
			#define WorldNormalVector(data,normal) half3(dot(data.internalSurfaceTtoW0,normal), dot(data.internalSurfaceTtoW1,normal), dot(data.internalSurfaceTtoW2,normal))
		#endif
		struct Input
		{
			float3 worldRefl;
			INTERNAL_DATA
			float3 worldNormal;
			float2 uv_texcoord;
		};

		uniform float _DistanceFadeLength;
		uniform float _DistanceFadeOffset;
		uniform float _VertexOffset;
		uniform float _HorizontalBend;
		uniform samplerCUBE _TextureSample0;
		uniform float _Reflection_Brightness;
		uniform float4 _Tint2;
		uniform float4 _Tint;
		uniform sampler2D _Circuits;
		uniform float4 _Circuits_ST;
		uniform float _Metallic;
		uniform float _Smoothness;
		uniform float _Opacity;

		void vertexDataFunc( inout appdata_full v, out Input o )
		{
			UNITY_INITIALIZE_OUTPUT( Input, o );
			float cameraDepthFade39 = (( -UnityObjectToViewPos( v.vertex.xyz ).z -_ProjectionParams.y - _DistanceFadeOffset ) / _DistanceFadeLength);
			float clampResult41 = clamp( cameraDepthFade39 , 0.0 , 100.0 );
			float temp_output_58_0 = ( pow( clampResult41 , 2.0 ) * _VertexOffset );
			float4 appendResult59 = (float4(( temp_output_58_0 * _HorizontalBend ) , temp_output_58_0 , 0.0 , 0.0));
			v.vertex.xyz += appendResult59.xyz;
		}

		void surf( Input i , inout SurfaceOutputStandard o )
		{
			float3 ase_worldReflection = i.worldRefl;
			float3 ase_worldNormal = i.worldNormal;
			float4 lerpResult96 = lerp( _Tint2 , _Tint , saturate( ase_worldNormal.y ));
			float2 uv_Circuits = i.uv_texcoord * _Circuits_ST.xy + _Circuits_ST.zw;
			o.Emission = ( ( texCUBE( _TextureSample0, ase_worldReflection ) * _Reflection_Brightness ) + ( lerpResult96 * tex2D( _Circuits, uv_Circuits ).r ) ).rgb;
			o.Metallic = _Metallic;
			o.Smoothness = _Smoothness;
			o.Alpha = _Opacity;
		}

		ENDCG
		CGPROGRAM
		#pragma surface surf Standard keepalpha fullforwardshadows vertex:vertexDataFunc 

		ENDCG
		Pass
		{
			Name "ShadowCaster"
			Tags{ "LightMode" = "ShadowCaster" }
			ZWrite On
			CGPROGRAM
			#pragma vertex vert
			#pragma fragment frag
			#pragma target 3.0
			#pragma multi_compile_shadowcaster
			#pragma multi_compile UNITY_PASS_SHADOWCASTER
			#pragma skip_variants FOG_LINEAR FOG_EXP FOG_EXP2
			#include "HLSLSupport.cginc"
			#if ( SHADER_API_D3D11 || SHADER_API_GLCORE || SHADER_API_GLES3 || SHADER_API_METAL || SHADER_API_VULKAN )
				#define CAN_SKIP_VPOS
			#endif
			#include "UnityCG.cginc"
			#include "Lighting.cginc"
			#include "UnityPBSLighting.cginc"
			sampler3D _DitherMaskLOD;
			struct v2f
			{
				V2F_SHADOW_CASTER;
				float2 customPack1 : TEXCOORD1;
				float4 tSpace0 : TEXCOORD2;
				float4 tSpace1 : TEXCOORD3;
				float4 tSpace2 : TEXCOORD4;
				UNITY_VERTEX_INPUT_INSTANCE_ID
			};
			v2f vert( appdata_full v )
			{
				v2f o;
				UNITY_SETUP_INSTANCE_ID( v );
				UNITY_INITIALIZE_OUTPUT( v2f, o );
				UNITY_TRANSFER_INSTANCE_ID( v, o );
				Input customInputData;
				vertexDataFunc( v, customInputData );
				float3 worldPos = mul( unity_ObjectToWorld, v.vertex ).xyz;
				half3 worldNormal = UnityObjectToWorldNormal( v.normal );
				half3 worldTangent = UnityObjectToWorldDir( v.tangent.xyz );
				half tangentSign = v.tangent.w * unity_WorldTransformParams.w;
				half3 worldBinormal = cross( worldNormal, worldTangent ) * tangentSign;
				o.tSpace0 = float4( worldTangent.x, worldBinormal.x, worldNormal.x, worldPos.x );
				o.tSpace1 = float4( worldTangent.y, worldBinormal.y, worldNormal.y, worldPos.y );
				o.tSpace2 = float4( worldTangent.z, worldBinormal.z, worldNormal.z, worldPos.z );
				o.customPack1.xy = customInputData.uv_texcoord;
				o.customPack1.xy = v.texcoord;
				TRANSFER_SHADOW_CASTER_NORMALOFFSET( o )
				return o;
			}
			half4 frag( v2f IN
			#if !defined( CAN_SKIP_VPOS )
			, UNITY_VPOS_TYPE vpos : VPOS
			#endif
			) : SV_Target
			{
				UNITY_SETUP_INSTANCE_ID( IN );
				Input surfIN;
				UNITY_INITIALIZE_OUTPUT( Input, surfIN );
				surfIN.uv_texcoord = IN.customPack1.xy;
				float3 worldPos = float3( IN.tSpace0.w, IN.tSpace1.w, IN.tSpace2.w );
				half3 worldViewDir = normalize( UnityWorldSpaceViewDir( worldPos ) );
				surfIN.worldNormal = float3( IN.tSpace0.z, IN.tSpace1.z, IN.tSpace2.z );
				surfIN.worldRefl = -worldViewDir;
				surfIN.internalSurfaceTtoW0 = IN.tSpace0.xyz;
				surfIN.internalSurfaceTtoW1 = IN.tSpace1.xyz;
				surfIN.internalSurfaceTtoW2 = IN.tSpace2.xyz;
				SurfaceOutputStandard o;
				UNITY_INITIALIZE_OUTPUT( SurfaceOutputStandard, o )
				surf( surfIN, o );
				#if defined( CAN_SKIP_VPOS )
				float2 vpos = IN.pos;
				#endif
				half alphaRef = tex3D( _DitherMaskLOD, float3( vpos.xy * 0.25, o.Alpha * 0.9375 ) ).a;
				clip( alphaRef - 0.01 );
				SHADOW_CASTER_FRAGMENT( IN )
			}
			ENDCG
		}
	}
	Fallback "Diffuse"
	CustomEditor "ASEMaterialInspector"
}
/*ASEBEGIN
Version=15401
1104;92;846;723;1514.724;378.1683;2.042432;False;False
Node;AmplifyShaderEditor.RangedFloatNode;38;-1482.855,1128.116;Float;False;Property;_DistanceFadeOffset;Distance Fade Offset;7;0;Create;True;0;0;False;0;0;37.7;-1000;2000;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;37;-1474.316,1032.041;Float;False;Property;_DistanceFadeLength;Distance Fade Length;6;0;Create;True;0;0;False;0;0;756.2;0;2000;0;1;FLOAT;0
Node;AmplifyShaderEditor.CameraDepthFade;39;-1183.989,1052.017;Float;False;3;2;FLOAT3;0,0,0;False;0;FLOAT;1;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.WorldNormalVector;97;-1375.031,329.7696;Float;False;False;1;0;FLOAT3;0,0,1;False;4;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3
Node;AmplifyShaderEditor.ClampOpNode;41;-576.6423,959.309;Float;False;3;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;100;False;1;FLOAT;0
Node;AmplifyShaderEditor.PowerNode;44;-392.3887,959.97;Float;False;2;0;FLOAT;0;False;1;FLOAT;2;False;1;FLOAT;0
Node;AmplifyShaderEditor.SaturateNode;98;-1093.983,357.1073;Float;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.WorldReflectionVector;14;-792.2882,-71.21339;Float;False;False;1;0;FLOAT3;0,0,0;False;4;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3
Node;AmplifyShaderEditor.RangedFloatNode;42;-624.2167,1134.144;Float;False;Property;_VertexOffset;Vertex Offset;8;0;Create;True;0;0;False;0;0;-77.5;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.ColorNode;79;-1176.368,-13.37381;Float;False;Property;_Tint;Tint;11;1;[HDR];Create;True;0;0;False;0;0,0,0,0;2.806932,2.351999,16,0;0;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.ColorNode;95;-1197.755,160.2733;Float;False;Property;_Tint2;Tint2;10;1;[HDR];Create;True;0;0;False;0;0,0,0,0;2.853113,18.16482,12.80168,0;0;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.RangedFloatNode;15;-576.8542,99.01866;Float;False;Property;_Reflection_Brightness;Reflection_Brightness;5;0;Create;True;0;0;False;0;0;2.99;0;10;0;1;FLOAT;0
Node;AmplifyShaderEditor.SamplerNode;13;-518.2606,-106.5864;Float;True;Property;_TextureSample0;Texture Sample 0;4;0;Create;True;0;0;False;0;None;73c213e50bb5af14c95b6671af793ab9;True;0;False;black;Auto;False;Object;-1;Auto;Cube;6;0;SAMPLER2D;;False;1;FLOAT3;0,0,0;False;2;FLOAT;0;False;3;FLOAT3;0,0,0;False;4;FLOAT3;0,0,0;False;5;FLOAT;1;False;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.LerpOp;96;-845.0446,207.3012;Float;False;3;0;COLOR;0,0,0,0;False;1;COLOR;0,0,0,0;False;2;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;58;-171.1102,1141.975;Float;False;2;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.SamplerNode;60;-1090.424,507.7725;Float;True;Property;_Circuits;Circuits;9;0;Create;True;0;0;False;0;1cab82146f56d664ca8658c1dedeca65;1cab82146f56d664ca8658c1dedeca65;True;0;False;white;Auto;False;Object;-1;Auto;Texture2D;6;0;SAMPLER2D;;False;1;FLOAT2;0,0;False;2;FLOAT;0;False;3;FLOAT2;0,0;False;4;FLOAT2;0,0;False;5;FLOAT;1;False;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.RangedFloatNode;91;-204.8785,1578.109;Float;False;Property;_HorizontalBend;Horizontal Bend;12;0;Create;True;0;0;False;0;0;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;30;-144.2669,-79.6181;Float;False;2;2;0;COLOR;0,0,0,0;False;1;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;76;-579.6556,256.6504;Float;False;2;2;0;COLOR;0,0,0,0;False;1;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;92;81.18026,1500.135;Float;False;2;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.TFHCRemapNode;93;-875.8837,1100.303;Float;False;5;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;1;False;3;FLOAT;0;False;4;FLOAT;1;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;77;-72.42374,436.4819;Float;False;Property;_Opacity;Opacity;3;0;Create;True;0;0;False;0;0;1;0;1;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;10;-119.8649,204.3623;Float;False;Property;_Metallic;Metallic;2;0;Create;True;0;0;False;0;0;0;0;1;0;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleAddOpNode;80;188.427,-78.83746;Float;False;2;2;0;COLOR;0,0,0,0;False;1;COLOR;0,0,0,0;False;1;COLOR;0
Node;AmplifyShaderEditor.ComponentMaskNode;45;84.55722,1022.806;Float;False;False;True;False;True;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;12;-132.754,308.8349;Float;False;Property;_Smoothness;Smoothness;0;0;Create;True;0;0;False;0;0;0.565;0;1;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;94;-1202.214,1236.955;Float;False;Property;_ClampBend;Clamp Bend;13;0;Create;True;0;0;False;0;0;0.04;0;1;0;1;FLOAT;0
Node;AmplifyShaderEditor.DynamicAppendNode;59;354.1084,1253.871;Float;False;FLOAT4;4;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;0;False;3;FLOAT;0;False;1;FLOAT4;0
Node;AmplifyShaderEditor.StandardSurfaceOutputNode;82;556.1193,151.2083;Float;False;True;2;Float;ASEMaterialInspector;0;0;Standard;LookDev/World_1/Track;False;False;False;False;False;False;False;False;False;False;False;False;False;False;True;False;False;False;False;False;Back;0;False;-1;0;False;-1;False;0;False;-1;0;False;-1;False;0;Custom;0.5;True;True;0;True;Transparent;;AlphaTest;All;True;True;True;True;True;True;True;True;True;True;True;True;True;True;True;True;True;0;False;-1;False;0;False;-1;255;False;-1;255;False;-1;0;False;-1;0;False;-1;0;False;-1;0;False;-1;0;False;-1;0;False;-1;0;False;-1;0;False;-1;False;2;15;10;25;False;0.5;True;2;5;False;-1;10;False;-1;0;0;False;-1;0;False;-1;-1;False;-1;-1;False;-1;0;False;0;0,0,0,0;VertexOffset;True;False;Cylindrical;False;Relative;0;;1;-1;-1;-1;0;False;0;0;False;-1;-1;0;False;-1;0;0;16;0;FLOAT3;0,0,0;False;1;FLOAT3;0,0,0;False;2;FLOAT3;0,0,0;False;3;FLOAT;0;False;4;FLOAT;0;False;5;FLOAT;0;False;6;FLOAT3;0,0,0;False;7;FLOAT3;0,0,0;False;8;FLOAT;0;False;9;FLOAT;0;False;10;FLOAT;0;False;13;FLOAT3;0,0,0;False;11;FLOAT3;0,0,0;False;12;FLOAT3;0,0,0;False;14;FLOAT4;0,0,0,0;False;15;FLOAT3;0,0,0;False;0
WireConnection;39;0;37;0
WireConnection;39;1;38;0
WireConnection;41;0;39;0
WireConnection;44;0;41;0
WireConnection;98;0;97;2
WireConnection;13;1;14;0
WireConnection;96;0;95;0
WireConnection;96;1;79;0
WireConnection;96;2;98;0
WireConnection;58;0;44;0
WireConnection;58;1;42;0
WireConnection;30;0;13;0
WireConnection;30;1;15;0
WireConnection;76;0;96;0
WireConnection;76;1;60;1
WireConnection;92;0;58;0
WireConnection;92;1;91;0
WireConnection;93;0;39;0
WireConnection;93;1;94;0
WireConnection;80;0;30;0
WireConnection;80;1;76;0
WireConnection;45;0;58;0
WireConnection;59;0;92;0
WireConnection;59;1;58;0
WireConnection;82;2;80;0
WireConnection;82;3;10;0
WireConnection;82;4;12;0
WireConnection;82;9;77;0
WireConnection;82;11;59;0
ASEEND*/
//CHKSM=2B8D2FCD83EEC08E93529638D569EE09CDAF3A7D