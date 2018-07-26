// Made with Amplify Shader Editor
// Available at the Unity Asset Store - http://u3d.as/y3X 
Shader "LookDev/World_1/Lines"
{
	Properties
	{
		_DistanceFadeOffset("Distance Fade Offset", Float) = 0
		_DistanceFadeLength("Distance Fade Length", Float) = 0
		_VertexOffset("Vertex Offset", Float) = 0
		[HDR]_Color("Color", Color) = (0,0,0,0)
		[HDR]_DistanceColor("Distance Color", Color) = (0,0,0,0)
		_ThicknessChange("Thickness Change", Range( 0 , 100)) = 1
		_HorizontalBend("Horizontal Bend", Float) = 0
		_LineSpread("Line Spread", Vector) = (0,0,0,0)
		_ClampBend("Clamp Bend", Range( 0 , 1)) = 0
		_ThicknessOverall("Thickness Overall", Range( -0.04 , 10)) = 0
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
			uniform float _ThicknessChange;
			uniform float _ClampBend;
			uniform float3 _LineSpread;
			uniform float _ThicknessOverall;
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
				
				v.vertex.xyz += ( appendResult58 + float4( ( cameraDepthFade4 * ase_worldNormal * _ThicknessChange ) , 0.0 ) + float4( ( saturate( pow( (0.0 + (cameraDepthFade4 - _ClampBend) * (1.0 - 0.0) / (1.0 - _ClampBend)) , 3.0 ) ) * ase_worldNormal * _LineSpread ) , 0.0 ) + float4( ( _ThicknessOverall * ase_worldNormal ) , 0.0 ) ).xyz;
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
1117;92;833;723;244.9175;372.2657;1.938223;True;False
Node;AmplifyShaderEditor.RangedFloatNode;15;-1115.736,-132.0273;Float;False;Property;_DistanceFadeLength;Distance Fade Length;1;0;Create;True;0;0;False;0;0;756.2;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;16;-1150.837,-23.37697;Float;False;Property;_DistanceFadeOffset;Distance Fade Offset;0;0;Create;True;0;0;False;0;0;37.7;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.CameraDepthFade;4;-784.3256,-148.4813;Float;False;3;2;FLOAT3;0,0,0;False;0;FLOAT;1;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;73;-873.4772,97.13553;Float;False;Property;_ClampBend;Clamp Bend;8;0;Create;True;0;0;False;0;0;0.409;0;1;0;1;FLOAT;0
Node;AmplifyShaderEditor.ClampOpNode;52;-234.6628,-210.3021;Float;False;3;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;100;False;1;FLOAT;0
Node;AmplifyShaderEditor.PowerNode;53;34.85274,-205.328;Float;False;2;0;FLOAT;0;False;1;FLOAT;2;False;1;FLOAT;0
Node;AmplifyShaderEditor.TFHCRemapNode;72;-465.8019,211.3241;Float;False;5;0;FLOAT;0;False;1;FLOAT;0.5;False;2;FLOAT;1;False;3;FLOAT;0;False;4;FLOAT;1;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;19;-13.5221,-76.84299;Float;False;Property;_VertexOffset;Vertex Offset;2;0;Create;True;0;0;False;0;0;-77.5;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.PowerNode;71;-206.0582,346.5787;Float;False;2;0;FLOAT;0;False;1;FLOAT;3;False;1;FLOAT;0
Node;AmplifyShaderEditor.OneMinusNode;25;-66.31664,-473.0071;Float;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;13;282.4897,-136.1617;Float;False;2;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;63;-18.19622,-304.6443;Float;False;Property;_HorizontalBend;Horizontal Bend;6;0;Create;True;0;0;False;0;0;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.WorldNormalVector;75;441.2132,920.5291;Float;False;False;1;0;FLOAT3;0,0,1;False;4;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3
Node;AmplifyShaderEditor.WorldNormalVector;51;2.366814,166.7653;Float;False;False;1;0;FLOAT3;0,0,1;False;4;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;62;468.5842,-267.5105;Float;False;2;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.SaturateNode;64;124.6309,-471.7614;Float;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.Vector3Node;67;54.69185,534.0308;Float;True;Property;_LineSpread;Line Spread;7;0;Create;True;0;0;False;0;0,0,0;12.07,0,0;0;4;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3
Node;AmplifyShaderEditor.SaturateNode;70;50.21334,432.276;Float;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;55;-57.69786,70.61439;Float;False;Property;_ThicknessChange;Thickness Change;5;0;Create;True;0;0;False;0;1;0.6;0;100;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;76;437.3368,744.1505;Float;False;Property;_ThicknessOverall;Thickness Overall;9;0;Create;True;0;0;False;0;0;-0.04;-0.04;10;0;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;77;708.688,786.7913;Float;False;2;2;0;FLOAT;0;False;1;FLOAT3;0,0,0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.ColorNode;40;198.7266,-900.0146;Float;False;Property;_DistanceColor;Distance Color;4;1;[HDR];Create;True;0;0;False;0;0,0,0,0;0.03921569,1.498039,1.145098,0;0;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.ColorNode;20;200.8398,-691.6681;Float;False;Property;_Color;Color;3;1;[HDR];Create;True;0;0;False;0;0,0,0,0;0.1885618,2.118547,1.109187,0;0;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;68;464.835,413.1187;Float;False;3;3;0;FLOAT;0;False;1;FLOAT3;0,0,0;False;2;FLOAT3;0,0,0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.PowerNode;38;304.3718,-475.8791;Float;False;2;0;FLOAT;0;False;1;FLOAT;2;False;1;FLOAT;0
Node;AmplifyShaderEditor.DynamicAppendNode;58;648.2034,-196.545;Float;False;FLOAT4;4;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;0;False;3;FLOAT;0;False;1;FLOAT4;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;61;404.2853,56.19303;Float;False;3;3;0;FLOAT;0;False;1;FLOAT3;0,0,0;False;2;FLOAT;0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.TFHCRemapNode;69;-414.4886,4.406955;Float;False;5;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;1;False;3;FLOAT;0;False;4;FLOAT;1;False;1;FLOAT;0
Node;AmplifyShaderEditor.LerpOp;39;500.5337,-518.3793;Float;False;3;0;COLOR;0,0,0,0;False;1;COLOR;0,0,0,0;False;2;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.SimpleAddOpNode;60;861.4114,-129.8443;Float;False;4;4;0;FLOAT4;0,0,0,0;False;1;FLOAT3;0,0,0;False;2;FLOAT3;0,0,0;False;3;FLOAT3;0,0,0;False;1;FLOAT4;0
Node;AmplifyShaderEditor.TemplateMultiPassMasterNode;1;1050.11,-290.8168;Half;False;True;2;Half;ASEMaterialInspector;0;1;LookDev/World_1/Lines;0770190933193b94aaa3065e307002fa;0;0;SubShader 0 Pass 0;2;True;0;1;False;-1;0;False;-1;0;1;False;-1;0;False;-1;True;-1;False;-1;-1;False;-1;True;0;False;-1;True;True;True;True;True;0;False;-1;True;False;255;False;-1;255;False;-1;255;False;-1;7;False;-1;1;False;-1;1;False;-1;1;False;-1;7;False;-1;1;False;-1;1;False;-1;1;False;-1;True;1;False;-1;True;3;False;-1;True;True;0;False;-1;0;False;-1;True;1;RenderType=Opaque;True;2;0;False;False;False;False;False;False;False;False;False;False;0;;0;2;0;FLOAT4;0,0,0,0;False;1;FLOAT3;0,0,0;False;0
WireConnection;4;0;15;0
WireConnection;4;1;16;0
WireConnection;52;0;4;0
WireConnection;53;0;52;0
WireConnection;72;0;4;0
WireConnection;72;1;73;0
WireConnection;71;0;72;0
WireConnection;25;0;4;0
WireConnection;13;0;53;0
WireConnection;13;1;19;0
WireConnection;62;0;13;0
WireConnection;62;1;63;0
WireConnection;64;0;25;0
WireConnection;70;0;71;0
WireConnection;77;0;76;0
WireConnection;77;1;75;0
WireConnection;68;0;70;0
WireConnection;68;1;51;0
WireConnection;68;2;67;0
WireConnection;38;0;64;0
WireConnection;58;0;62;0
WireConnection;58;1;13;0
WireConnection;61;0;4;0
WireConnection;61;1;51;0
WireConnection;61;2;55;0
WireConnection;69;0;4;0
WireConnection;39;0;40;0
WireConnection;39;1;20;0
WireConnection;39;2;38;0
WireConnection;60;0;58;0
WireConnection;60;1;61;0
WireConnection;60;2;68;0
WireConnection;60;3;77;0
WireConnection;1;0;39;0
WireConnection;1;1;60;0
ASEEND*/
//CHKSM=CF8FEC4E13DD4EB624140CEB689EBEA5847EF84A