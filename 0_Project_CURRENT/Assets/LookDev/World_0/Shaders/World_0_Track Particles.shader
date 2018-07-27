// Made with Amplify Shader Editor
// Available at the Unity Asset Store - http://u3d.as/y3X 
Shader "LookDev/World_0/Track Particles"
{
	Properties
	{
		_TintColor ("Tint Color", Color) = (0.5,0.5,0.5,0.5)
		_MainTex ("Particle Texture", 2D) = "white" {}
		_InvFade ("Soft Particles Factor", Range(0.01,3.0)) = 1.0
		_DistanceFadeOffset("Distance Fade Offset", Float) = 0
		_DistanceFadeLength("Distance Fade Length", Float) = 0
		_VertexOffset("Vertex Offset", Float) = 0
		[HDR]_Color("Color", Color) = (0,0,0,0)
		[HDR]_DistanceColor("Distance Color", Color) = (0,0,0,0)
		_LineThickness("Line Thickness", Range( 0 , 100)) = 1
		_HorizontalBend("Horizontal Bend", Float) = 0
		_ParticleTexture("Particle Texture", 2D) = "white" {}
		[HideInInspector] _texcoord( "", 2D ) = "white" {}
	}

	Category 
	{
		SubShader
		{
			Tags { "Queue"="Transparent" "IgnoreProjector"="True" "RenderType"="Transparent" "PreviewType"="Plane" }
			Blend One One
			ColorMask RGB
			Cull Off
			Lighting Off 
			ZWrite Off
			ZTest LEqual
			
			Pass {
			
				CGPROGRAM
				#pragma vertex vert
				#pragma fragment frag
				#pragma target 2.0
				#pragma multi_compile_particles
				#pragma multi_compile_fog
				

				#include "UnityCG.cginc"

				struct appdata_t 
				{
					float4 vertex : POSITION;
					fixed4 color : COLOR;
					float4 texcoord : TEXCOORD0;
					UNITY_VERTEX_INPUT_INSTANCE_ID
					float3 ase_normal : NORMAL;
				};

				struct v2f 
				{
					float4 vertex : SV_POSITION;
					fixed4 color : COLOR;
					float4 texcoord : TEXCOORD0;
					UNITY_FOG_COORDS(1)
					#ifdef SOFTPARTICLES_ON
					float4 projPos : TEXCOORD2;
					#endif
					UNITY_VERTEX_OUTPUT_STEREO
					float4 ase_texcoord3 : TEXCOORD3;
				};
				
				uniform sampler2D _MainTex;
				uniform fixed4 _TintColor;
				uniform float4 _MainTex_ST;
				uniform sampler2D_float _CameraDepthTexture;
				uniform float _InvFade;
				uniform float _DistanceFadeLength;
				uniform float _DistanceFadeOffset;
				uniform float _VertexOffset;
				uniform float _HorizontalBend;
				uniform float _LineThickness;
				uniform float4 _DistanceColor;
				uniform float4 _Color;
				uniform sampler2D _ParticleTexture;
				uniform float4 _ParticleTexture_ST;

				v2f vert ( appdata_t v  )
				{
					v2f o;
					UNITY_SETUP_INSTANCE_ID(v);
					UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);
					float3 objectToViewPos = UnityObjectToViewPos(v.vertex.xyz);
					float eyeDepth = -objectToViewPos.z;
					float cameraDepthFade4 = (( eyeDepth -_ProjectionParams.y - _DistanceFadeOffset ) / _DistanceFadeLength);
					float clampResult52 = clamp( cameraDepthFade4 , 0.0 , 100.0 );
					float temp_output_53_0 = pow( clampResult52 , 2.0 );
					float temp_output_13_0 = ( temp_output_53_0 * _VertexOffset );
					float4 appendResult58 = (float4(( temp_output_13_0 * _HorizontalBend ) , temp_output_13_0 , 0.0 , 0.0));
					float3 ase_worldNormal = UnityObjectToWorldNormal(v.ase_normal);
					
					o.ase_texcoord3.x = eyeDepth;
					
					
					//setting value to unused interpolator channels and avoid initialization warnings
					o.ase_texcoord3.yzw = 0;

					v.vertex.xyz += ( appendResult58 + float4( ( temp_output_53_0 * ase_worldNormal * _LineThickness ) , 0.0 ) ).xyz;
					o.vertex = UnityObjectToClipPos(v.vertex);
					#ifdef SOFTPARTICLES_ON
						o.projPos = ComputeScreenPos (o.vertex);
						COMPUTE_EYEDEPTH(o.projPos.z);
					#endif
					o.color = v.color;
					o.texcoord = v.texcoord;
					UNITY_TRANSFER_FOG(o,o.vertex);
					return o;
				}

				fixed4 frag ( v2f i  ) : SV_Target
				{
					#ifdef SOFTPARTICLES_ON
						float sceneZ = LinearEyeDepth (SAMPLE_DEPTH_TEXTURE_PROJ(_CameraDepthTexture, UNITY_PROJ_COORD(i.projPos)));
						float partZ = i.projPos.z;
						float fade = saturate (_InvFade * (sceneZ-partZ));
						i.color.a *= fade;
					#endif

					float eyeDepth = i.ase_texcoord3.x;
					float cameraDepthFade4 = (( eyeDepth -_ProjectionParams.y - _DistanceFadeOffset ) / _DistanceFadeLength);
					float4 lerpResult39 = lerp( _DistanceColor , _Color , pow( saturate( ( 1.0 - cameraDepthFade4 ) ) , 2.0 ));
					float2 uv_ParticleTexture = i.texcoord.xy * _ParticleTexture_ST.xy + _ParticleTexture_ST.zw;
					

					fixed4 col = ( lerpResult39 * tex2D( _ParticleTexture, uv_ParticleTexture ) );
					UNITY_APPLY_FOG(i.fogCoord, col);
					return col;
				}
				ENDCG 
			}
		}	
	}
	CustomEditor "ASEMaterialInspector"
	
	
}
/*ASEBEGIN
Version=15401
1157;92;793;890;337.5044;1439.013;2.435006;True;False
Node;AmplifyShaderEditor.RangedFloatNode;16;-1099.655,-89.24679;Float;False;Property;_DistanceFadeOffset;Distance Fade Offset;0;0;Create;True;0;0;False;0;0;46;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;15;-1091.116,-185.3217;Float;False;Property;_DistanceFadeLength;Distance Fade Length;1;0;Create;True;0;0;False;0;0;721.6;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.CameraDepthFade;4;-731.8403,-173.0072;Float;False;3;2;FLOAT3;0,0,0;False;0;FLOAT;1;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.ClampOpNode;52;-289.0599,-203.8897;Float;False;3;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;100;False;1;FLOAT;0
Node;AmplifyShaderEditor.PowerNode;53;6.083976,-198.4734;Float;False;2;0;FLOAT;0;False;1;FLOAT;2;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;19;-346.6572,24.10704;Float;False;Property;_VertexOffset;Vertex Offset;2;0;Create;True;0;0;False;0;0;135.22;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.OneMinusNode;25;-439.8317,-755.6667;Float;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;63;59.24582,-299.3035;Float;False;Property;_HorizontalBend;Horizontal Bend;6;0;Create;True;0;0;False;0;0;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;13;234.2135,-71.23556;Float;False;2;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.SaturateNode;64;-198.4091,-799.9381;Float;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;55;-56.52475,773.7433;Float;False;Property;_LineThickness;Line Thickness;5;0;Create;True;0;0;False;0;1;0.5;0;100;0;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;62;346.9857,-251.1985;Float;False;2;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.WorldNormalVector;51;-322.4245,522.9724;Float;False;False;1;0;FLOAT3;0,0,1;False;4;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3
Node;AmplifyShaderEditor.ColorNode;40;10.28657,-1169.214;Float;False;Property;_DistanceColor;Distance Color;4;1;[HDR];Create;True;0;0;False;0;0,0,0,0;2.666782,1.873955,13.76636,0;0;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.ColorNode;20;12.3997,-960.8676;Float;False;Property;_Color;Color;3;1;[HDR];Create;True;0;0;False;0;0,0,0,0;0.9510378,2.472698,9.082411,0;0;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.PowerNode;38;101.3339,-590.9606;Float;False;2;0;FLOAT;0;False;1;FLOAT;2;False;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;61;368.3432,438.7198;Float;False;3;3;0;FLOAT;0;False;1;FLOAT3;0,0,0;False;2;FLOAT;0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.DynamicAppendNode;58;496.9482,112.6359;Float;False;FLOAT4;4;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;0;False;3;FLOAT;0;False;1;FLOAT4;0
Node;AmplifyShaderEditor.SamplerNode;65;410.9133,-574.4264;Float;True;Property;_ParticleTexture;Particle Texture;7;0;Create;True;0;0;False;0;None;c89e6f459ad98ed4a9d7e328cf73b5bb;True;0;False;white;Auto;False;Object;-1;Auto;Texture2D;6;0;SAMPLER2D;;False;1;FLOAT2;0,0;False;2;FLOAT;0;False;3;FLOAT2;0,0;False;4;FLOAT2;0,0;False;5;FLOAT;1;False;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.LerpOp;39;446.6936,-844.7842;Float;False;3;0;COLOR;0,0,0,0;False;1;COLOR;0,0,0,0;False;2;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;66;844.0073,-693.2389;Float;False;2;2;0;COLOR;0,0,0,0;False;1;COLOR;0,0,0,0;False;1;COLOR;0
Node;AmplifyShaderEditor.SimpleAddOpNode;60;773.9213,176.3708;Float;False;2;2;0;FLOAT4;0,0,0,0;False;1;FLOAT3;0,0,0;False;1;FLOAT4;0
Node;AmplifyShaderEditor.RangedFloatNode;57;-355.9146,155.7759;Float;False;Constant;_Float3;Float 3;10;0;Create;True;0;0;False;0;1;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.LerpOp;56;24.97245,206.1966;Float;False;3;0;FLOAT3;0,0,0;False;1;FLOAT3;0,0,0;False;2;FLOAT;0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.TemplateMultiPassMasterNode;67;1290.315,1.983742;Float;False;True;2;Float;ASEMaterialInspector;0;6;LookDev/World_0/Track Particles;0b6a9f8b4f707c74ca64c0be8e590de0;0;0;SubShader 0 Pass 0;2;True;4;1;False;-1;1;False;-1;0;5;False;-1;10;False;-1;False;True;2;False;-1;True;True;True;True;False;0;False;-1;False;True;2;False;-1;True;3;False;-1;False;True;4;Queue=Transparent;IgnoreProjector=True;RenderType=Transparent;PreviewType=Plane;False;0;False;False;False;False;False;False;False;False;False;True;0;0;;0;2;0;FLOAT4;0,0,0,0;False;1;FLOAT3;0,0,0;False;0
WireConnection;4;0;15;0
WireConnection;4;1;16;0
WireConnection;52;0;4;0
WireConnection;53;0;52;0
WireConnection;25;0;4;0
WireConnection;13;0;53;0
WireConnection;13;1;19;0
WireConnection;64;0;25;0
WireConnection;62;0;13;0
WireConnection;62;1;63;0
WireConnection;38;0;64;0
WireConnection;61;0;53;0
WireConnection;61;1;51;0
WireConnection;61;2;55;0
WireConnection;58;0;62;0
WireConnection;58;1;13;0
WireConnection;39;0;40;0
WireConnection;39;1;20;0
WireConnection;39;2;38;0
WireConnection;66;0;39;0
WireConnection;66;1;65;0
WireConnection;60;0;58;0
WireConnection;60;1;61;0
WireConnection;56;0;57;0
WireConnection;56;1;51;0
WireConnection;56;2;55;0
WireConnection;67;0;66;0
WireConnection;67;1;60;0
ASEEND*/
//CHKSM=5B96BD47A63A26F8877CFFBA32A5BE76E154D623