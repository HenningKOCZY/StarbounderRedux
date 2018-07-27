// Made with Amplify Shader Editor
// Available at the Unity Asset Store - http://u3d.as/y3X 
Shader "LookDev/World_0/Lines Twist"
{
	Properties
	{
		[HDR]_Color("Color", Color) = (0,0,0,0)
		[HDR]_DistanceColor("Distance Color", Color) = (0,0,0,0)
		_Float1("Float 1", Range( 0 , 2000)) = 0
		_Float0("Float 0", Range( -1000 , 2000)) = 0
		_Float2("Float 2", Float) = 0
		_Vector0("Vector 0", Vector) = (0,0,0,0)
		_TextureSample0("Texture Sample 0", 2D) = "white" {}
		_Linethickness("Line thickness", Float) = 0
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
			};
			
			struct v2f
			{
				float4 vertex : SV_POSITION;
				UNITY_VERTEX_OUTPUT_STEREO
				float4 ase_texcoord : TEXCOORD0;
			};

			uniform float _Float2;
			uniform sampler2D _TextureSample0;
			uniform float _Float1;
			uniform float _Float0;
			uniform float3 _Vector0;
			uniform float _Linethickness;
			uniform float4 _DistanceColor;
			uniform float4 _Color;
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
			
			
			v2f vert ( appdata v )
			{
				v2f o;
				UNITY_SETUP_INSTANCE_ID(v);
				UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);
				float3 objectToViewPos = UnityObjectToViewPos(v.vertex.xyz);
				float eyeDepth = -objectToViewPos.z;
				float cameraDepthFade66 = (( eyeDepth -_ProjectionParams.y - _Float0 ) / _Float1);
				float clampResult64 = clamp( pow( cameraDepthFade66 , 1.0 ) , 0.0 , 1.0 );
				float4 appendResult60 = (float4(clampResult64 , 0.0 , 0.0 , 0.0));
				float3 rotatedValue63 = RotateAroundAxis( _Vector0, float3( 0,0,0 ), float3( 0,0,-1 ), ( _Float2 * tex2Dlod( _TextureSample0, float4( appendResult60.xy, 0, 0.0) ).r ) );
				float3 temp_output_72_0 = ( _Linethickness * v.ase_normal * clampResult64 );
				
				o.ase_texcoord.x = eyeDepth;
				
				
				//setting value to unused interpolator channels and avoid initialization warnings
				o.ase_texcoord.yzw = 0;
				
				v.vertex.xyz += ( rotatedValue63 + temp_output_72_0 );
				o.vertex = UnityObjectToClipPos(v.vertex);
				return o;
			}
			
			fixed4 frag (v2f i ) : SV_Target
			{
				fixed4 finalColor;
				float eyeDepth = i.ase_texcoord.x;
				float cameraDepthFade66 = (( eyeDepth -_ProjectionParams.y - _Float0 ) / _Float1);
				float clampResult64 = clamp( pow( cameraDepthFade66 , 1.0 ) , 0.0 , 1.0 );
				float clampResult32 = clamp( pow( ( 1.0 - clampResult64 ) , 2.0 ) , 0.3 , 1.0 );
				float4 lerpResult39 = lerp( _DistanceColor , _Color , clampResult32);
				
				
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
1213;100;521;879;0.2221069;951.2207;2.084318;False;False
Node;AmplifyShaderEditor.RangedFloatNode;58;-2157.733,140.2599;Float;False;Property;_Float0;Float 0;3;0;Create;True;0;0;False;0;0;0;-1000;2000;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;59;-2149.194,44.18496;Float;False;Property;_Float1;Float 1;2;0;Create;True;0;0;False;0;0;1360;0;2000;0;1;FLOAT;0
Node;AmplifyShaderEditor.CameraDepthFade;66;-1729.952,-17.60103;Float;False;3;2;FLOAT3;0,0,0;False;0;FLOAT;1;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.PowerNode;65;-1388.524,-14.9941;Float;False;2;0;FLOAT;0;False;1;FLOAT;1;False;1;FLOAT;0
Node;AmplifyShaderEditor.ClampOpNode;64;-1144.595,-21.06307;Float;False;3;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;1;False;1;FLOAT;0
Node;AmplifyShaderEditor.DynamicAppendNode;60;-881.9081,-80.14303;Float;False;FLOAT4;4;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;0;False;3;FLOAT;0;False;1;FLOAT4;0
Node;AmplifyShaderEditor.SamplerNode;61;-691.7238,-44.4161;Float;True;Property;_TextureSample0;Texture Sample 0;6;0;Create;True;0;0;False;0;48bddaeb8d430df479a7492a80979adb;48bddaeb8d430df479a7492a80979adb;True;0;False;white;Auto;False;Object;-1;Auto;Texture2D;6;0;SAMPLER2D;;False;1;FLOAT2;0,0;False;2;FLOAT;0;False;3;FLOAT2;0,0;False;4;FLOAT2;0,0;False;5;FLOAT;1;False;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.RangedFloatNode;67;-374.7205,-72.2651;Float;False;Property;_Float2;Float 2;4;0;Create;True;0;0;False;0;0;10.45;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.OneMinusNode;25;-465.7354,-751.9661;Float;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.NormalVertexDataNode;70;144.2778,569.6384;Float;False;0;5;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.RangedFloatNode;71;138.5365,417.004;Float;False;Property;_Linethickness;Line thickness;7;0;Create;True;0;0;False;0;0;1;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.Vector3Node;62;-357.861,-298.049;Float;False;Property;_Vector0;Vector 0;5;0;Create;True;0;0;False;0;0,0,0;0,98.9,0;0;4;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3
Node;AmplifyShaderEditor.PowerNode;38;-237.7668,-752.7539;Float;False;2;0;FLOAT;0;False;1;FLOAT;2;False;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;68;-161.3905,5.40994;Float;False;2;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;72;460.2472,348.9476;Float;False;3;3;0;FLOAT;0;False;1;FLOAT3;0,0,0;False;2;FLOAT;0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.RotateAboutAxisNode;63;115.8831,-5.115077;Float;False;False;4;0;FLOAT3;0,0,-1;False;1;FLOAT;0;False;2;FLOAT3;0,1,0;False;3;FLOAT3;0,0,0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.ClampOpNode;32;33.59808,-750.9737;Float;False;3;0;FLOAT;0;False;1;FLOAT;0.3;False;2;FLOAT;1;False;1;FLOAT;0
Node;AmplifyShaderEditor.ColorNode;40;10.28657,-1169.214;Float;False;Property;_DistanceColor;Distance Color;1;1;[HDR];Create;True;0;0;False;0;0,0,0,0;1.338258,1.338258,5.216475,0;0;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.ColorNode;20;12.3997,-960.8676;Float;False;Property;_Color;Color;0;1;[HDR];Create;True;0;0;False;0;0,0,0,0;0.6666956,1.009053,3.441591,0;0;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.LerpOp;39;436.7669,-712.9005;Float;False;3;0;COLOR;0,0,0,0;False;1;COLOR;0,0,0,0;False;2;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;73;741.795,274.3586;Float;False;2;2;0;FLOAT3;0,0,0;False;1;FLOAT3;0,0,0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.SimpleAddOpNode;74;654.2538,57.58942;Float;False;2;2;0;FLOAT3;0,0,0;False;1;FLOAT3;0,0,0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.TemplateMultiPassMasterNode;1;921.6264,17.78247;Half;False;True;2;Half;ASEMaterialInspector;0;1;LookDev/World_0/Lines Twist;0770190933193b94aaa3065e307002fa;0;0;SubShader 0 Pass 0;2;True;0;1;False;-1;0;False;-1;0;1;False;-1;0;False;-1;True;-1;False;-1;-1;False;-1;True;0;False;-1;True;True;True;True;True;0;False;-1;True;False;255;False;-1;255;False;-1;255;False;-1;7;False;-1;1;False;-1;1;False;-1;1;False;-1;7;False;-1;1;False;-1;1;False;-1;1;False;-1;True;1;False;-1;True;3;False;-1;True;True;0;False;-1;0;False;-1;True;1;RenderType=Opaque;True;2;0;False;False;False;False;False;False;False;False;False;False;0;;0;2;0;FLOAT4;0,0,0,0;False;1;FLOAT3;0,0,0;False;0
WireConnection;66;0;59;0
WireConnection;66;1;58;0
WireConnection;65;0;66;0
WireConnection;64;0;65;0
WireConnection;60;0;64;0
WireConnection;61;1;60;0
WireConnection;25;0;64;0
WireConnection;38;0;25;0
WireConnection;68;0;67;0
WireConnection;68;1;61;1
WireConnection;72;0;71;0
WireConnection;72;1;70;0
WireConnection;72;2;64;0
WireConnection;63;1;68;0
WireConnection;63;2;62;0
WireConnection;32;0;38;0
WireConnection;39;0;40;0
WireConnection;39;1;20;0
WireConnection;39;2;32;0
WireConnection;73;0;63;0
WireConnection;73;1;72;0
WireConnection;74;0;63;0
WireConnection;74;1;72;0
WireConnection;1;0;39;0
WireConnection;1;1;74;0
ASEEND*/
//CHKSM=F4F44AA6D1D83A669C8890D4EFD36D81641D0D6B