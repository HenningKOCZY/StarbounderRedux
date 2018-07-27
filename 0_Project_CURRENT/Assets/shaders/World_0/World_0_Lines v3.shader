// Made with Amplify Shader Editor
// Available at the Unity Asset Store - http://u3d.as/y3X 
Shader "LookDev/World_0/Lines v3"
{
	Properties
	{
		_DistanceFadeOffset("Distance Fade Offset", Float) = 0
		_DistanceFadeLength("Distance Fade Length", Float) = 0
		_VertexOffset("Vertex Offset", Float) = 0
		[HDR]_Color("Color", Color) = (0,0,0,0)
		[HDR]_DistanceColor("Distance Color", Color) = (0,0,0,0)
		_LineThickness("Line Thickness", Range( 0 , 100)) = 1
		_HorizontalBend("Horizontal Bend", Float) = 0
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

			uniform float _DistanceFadeLength;
			uniform float _DistanceFadeOffset;
			uniform float _VertexOffset;
			uniform float _HorizontalBend;
			uniform float _LineThickness;
			uniform float4 _DistanceColor;
			uniform float4 _Color;
			
			v2f vert ( appdata v )
			{
				v2f o;
				UNITY_SETUP_INSTANCE_ID(v);
				UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);
				float3 objectToViewPos = UnityObjectToViewPos(v.vertex.xyz);
				float eyeDepth = -objectToViewPos.z;
				float cameraDepthFade4 = (( eyeDepth -_ProjectionParams.y - _DistanceFadeOffset ) / _DistanceFadeLength);
				float clampResult52 = clamp( cameraDepthFade4 , 0.0 , 100.0 );
				float temp_output_13_0 = ( pow( clampResult52 , 2.0 ) * _VertexOffset );
				float4 appendResult58 = (float4(( temp_output_13_0 * _HorizontalBend ) , temp_output_13_0 , 0.0 , 0.0));
				float3 ase_worldNormal = UnityObjectToWorldNormal(v.ase_normal);
				
				o.ase_texcoord.x = eyeDepth;
				
				
				//setting value to unused interpolator channels and avoid initialization warnings
				o.ase_texcoord.yzw = 0;
				
				v.vertex.xyz += ( appendResult58 + float4( ( cameraDepthFade4 * ase_worldNormal * _LineThickness ) , 0.0 ) ).xyz;
				o.vertex = UnityObjectToClipPos(v.vertex);
				return o;
			}
			
			fixed4 frag (v2f i ) : SV_Target
			{
				fixed4 finalColor;
				float eyeDepth = i.ase_texcoord.x;
				float cameraDepthFade4 = (( eyeDepth -_ProjectionParams.y - _DistanceFadeOffset ) / _DistanceFadeLength);
				float4 lerpResult39 = lerp( _DistanceColor , _Color , pow( saturate( ( 1.0 - cameraDepthFade4 ) ) , 2.0 ));
				
				
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
306;248;1369;847;1321.751;933.6621;2.167471;True;True
Node;AmplifyShaderEditor.RangedFloatNode;16;-1099.655,-89.24679;Float;False;Property;_DistanceFadeOffset;Distance Fade Offset;0;0;Create;True;0;0;False;0;0;46;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;15;-1091.116,-185.3217;Float;False;Property;_DistanceFadeLength;Distance Fade Length;1;0;Create;True;0;0;False;0;0;721.6;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.CameraDepthFade;4;-731.8403,-173.0072;Float;False;3;2;FLOAT3;0,0,0;False;0;FLOAT;1;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.ClampOpNode;52;-289.0599,-203.8897;Float;False;3;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;100;False;1;FLOAT;0
Node;AmplifyShaderEditor.PowerNode;53;6.083976,-198.4734;Float;False;2;0;FLOAT;0;False;1;FLOAT;2;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;19;-346.6572,24.10704;Float;False;Property;_VertexOffset;Vertex Offset;2;0;Create;True;0;0;False;0;0;135.22;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;13;245.0509,-108.0826;Float;False;2;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;63;59.24582,-299.3035;Float;False;Property;_HorizontalBend;Horizontal Bend;6;0;Create;True;0;0;False;0;0;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.OneMinusNode;25;-439.8317,-755.6667;Float;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.SaturateNode;64;-198.4091,-754.421;Float;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.WorldNormalVector;51;-272.5726,447.1109;Float;False;False;1;0;FLOAT3;0,0,1;False;4;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;62;346.9857,-251.1985;Float;False;2;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;55;-56.52475,773.7433;Float;False;Property;_LineThickness;Line Thickness;5;0;Create;True;0;0;False;0;1;1;0;100;0;1;FLOAT;0
Node;AmplifyShaderEditor.PowerNode;38;68.82181,-738.3487;Float;False;2;0;FLOAT;0;False;1;FLOAT;2;False;1;FLOAT;0
Node;AmplifyShaderEditor.ColorNode;40;10.28657,-1169.214;Float;False;Property;_DistanceColor;Distance Color;4;1;[HDR];Create;True;0;0;False;0;0,0,0,0;0.8207982,0.5767772,4.237095,0;0;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;61;368.3432,438.7198;Float;False;3;3;0;FLOAT;0;False;1;FLOAT3;0,0,0;False;2;FLOAT;0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.ColorNode;20;12.3997,-960.8676;Float;False;Property;_Color;Color;3;1;[HDR];Create;True;0;0;False;0;0,0,0,0;0.4139632,1.06285,3.953349,0;0;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.DynamicAppendNode;58;496.9482,112.6359;Float;False;FLOAT4;4;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;0;False;3;FLOAT;0;False;1;FLOAT4;0
Node;AmplifyShaderEditor.LerpOp;39;446.6936,-844.7842;Float;False;3;0;COLOR;0,0,0,0;False;1;COLOR;0,0,0,0;False;2;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.SimpleAddOpNode;60;773.9213,176.3708;Float;False;2;2;0;FLOAT4;0,0,0,0;False;1;FLOAT3;0,0,0;False;1;FLOAT4;0
Node;AmplifyShaderEditor.TemplateMultiPassMasterNode;1;962.6201,15.39815;Half;False;True;2;Half;ASEMaterialInspector;0;1;LookDev/World_0/Lines v3;0770190933193b94aaa3065e307002fa;0;0;SubShader 0 Pass 0;2;True;0;1;False;-1;0;False;-1;0;1;False;-1;0;False;-1;True;-1;False;-1;-1;False;-1;True;0;False;-1;True;True;True;True;True;0;False;-1;True;False;255;False;-1;255;False;-1;255;False;-1;7;False;-1;1;False;-1;1;False;-1;1;False;-1;7;False;-1;1;False;-1;1;False;-1;1;False;-1;True;1;False;-1;True;3;False;-1;True;True;0;False;-1;0;False;-1;True;1;RenderType=Opaque;True;2;0;False;False;False;False;False;False;False;False;False;False;0;;0;2;0;FLOAT4;0,0,0,0;False;1;FLOAT3;0,0,0;False;0
WireConnection;4;0;15;0
WireConnection;4;1;16;0
WireConnection;52;0;4;0
WireConnection;53;0;52;0
WireConnection;13;0;53;0
WireConnection;13;1;19;0
WireConnection;25;0;4;0
WireConnection;64;0;25;0
WireConnection;62;0;13;0
WireConnection;62;1;63;0
WireConnection;38;0;64;0
WireConnection;61;0;4;0
WireConnection;61;1;51;0
WireConnection;61;2;55;0
WireConnection;58;0;62;0
WireConnection;58;1;13;0
WireConnection;39;0;40;0
WireConnection;39;1;20;0
WireConnection;39;2;38;0
WireConnection;60;0;58;0
WireConnection;60;1;61;0
WireConnection;1;0;39;0
WireConnection;1;1;60;0
ASEEND*/
//CHKSM=643B01F9165BD1D8753EFF7281E88D0EDF90D4D8