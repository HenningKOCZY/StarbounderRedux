// Made with Amplify Shader Editor
// Available at the Unity Asset Store - http://u3d.as/y3X 
Shader "LookDev/World_0/Lines v3"
{
	Properties
	{
		_DistanceFadeOffset("Distance Fade Offset", Range( -1000 , 2000)) = 0
		_DistanceFadeLength("Distance Fade Length", Range( 0 , 2000)) = 0
		_VertexOffset("Vertex Offset", Float) = 0
		[HDR]_Color("Color", Color) = (0,0,0,0)
		[HDR]_DistanceColor("Distance Color", Color) = (0,0,0,0)
		_DirectionalSpread("Directional Spread", Range( 0 , 1)) = 1
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
			uniform float _DirectionalSpread;
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
				float3 temp_cast_0 = (1.0).xxx;
				float3 ase_worldNormal = UnityObjectToWorldNormal(v.ase_normal);
				float3 lerpResult56 = lerp( temp_cast_0 , ase_worldNormal , _DirectionalSpread);
				float4 appendResult58 = (float4(0.0 , (( pow( clampResult52 , 2.0 ) * _VertexOffset * lerpResult56 )).y , 0.0 , 0.0));
				
				o.ase_texcoord.x = eyeDepth;
				
				
				//setting value to unused interpolator channels and avoid initialization warnings
				o.ase_texcoord.yzw = 0;
				
				v.vertex.xyz += appendResult58.xyz;
				o.vertex = UnityObjectToClipPos(v.vertex);
				return o;
			}
			
			fixed4 frag (v2f i ) : SV_Target
			{
				fixed4 finalColor;
				float eyeDepth = i.ase_texcoord.x;
				float cameraDepthFade4 = (( eyeDepth -_ProjectionParams.y - _DistanceFadeOffset ) / _DistanceFadeLength);
				float clampResult32 = clamp( pow( ( 1.0 - cameraDepthFade4 ) , 2.0 ) , 0.3 , 1.0 );
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
1456;92;653;959;30.92911;452.9832;1.241779;True;False
Node;AmplifyShaderEditor.RangedFloatNode;15;-1045.151,-52.53195;Float;False;Property;_DistanceFadeLength;Distance Fade Length;1;0;Create;True;0;0;False;0;0;1916;0;2000;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;16;-1053.69,43.54295;Float;False;Property;_DistanceFadeOffset;Distance Fade Offset;0;0;Create;True;0;0;False;0;0;119;-1000;2000;0;1;FLOAT;0
Node;AmplifyShaderEditor.CameraDepthFade;4;-754.8232,-32.55645;Float;False;3;2;FLOAT3;0,0,0;False;0;FLOAT;1;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.WorldNormalVector;51;-436.0559,366.2438;Float;False;False;1;0;FLOAT3;0,0,1;False;4;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3
Node;AmplifyShaderEditor.RangedFloatNode;57;-331.6588,263.4103;Float;False;Constant;_Float3;Float 3;10;0;Create;True;0;0;False;0;1;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;55;-327.8444,156.6114;Float;False;Property;_DirectionalSpread;Directional Spread;9;0;Create;True;0;0;False;0;1;0;0;1;0;1;FLOAT;0
Node;AmplifyShaderEditor.ClampOpNode;52;-223.9041,-192.3916;Float;False;3;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;100;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;19;-362.2563,-1.418836;Float;False;Property;_VertexOffset;Vertex Offset;2;0;Create;True;0;0;False;0;0;-1096.3;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.OneMinusNode;25;-465.7354,-751.9661;Float;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.LerpOp;56;24.97245,206.1966;Float;False;3;0;FLOAT3;0,0,0;False;1;FLOAT3;0,0,0;False;2;FLOAT;0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.PowerNode;53;8.764433,-203.8343;Float;False;2;0;FLOAT;0;False;1;FLOAT;2;False;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;13;172.1483,-63.56987;Float;False;3;3;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT3;0,0,0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.PowerNode;38;-237.7668,-752.7539;Float;False;2;0;FLOAT;0;False;1;FLOAT;2;False;1;FLOAT;0
Node;AmplifyShaderEditor.ColorNode;40;10.28657,-1169.214;Float;False;Property;_DistanceColor;Distance Color;4;1;[HDR];Create;True;0;0;False;0;0,0,0,0;0.2897743,2.235402,7.906699,0;0;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.ComponentMaskNode;59;356.5061,136.8621;Float;False;False;True;False;True;1;0;FLOAT3;0,0,0;False;1;FLOAT;0
Node;AmplifyShaderEditor.ColorNode;20;12.3997,-960.8676;Float;False;Property;_Color;Color;3;1;[HDR];Create;True;0;0;False;0;0,0,0,0;0.4233265,0.7237518,2.608238,0;0;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.ClampOpNode;32;33.59808,-750.9737;Float;False;3;0;FLOAT;0;False;1;FLOAT;0.3;False;2;FLOAT;1;False;1;FLOAT;0
Node;AmplifyShaderEditor.CameraDepthFade;44;-1126.454,714.9263;Float;False;3;2;FLOAT3;0,0,0;False;0;FLOAT;1;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.LerpOp;39;436.7669,-712.9005;Float;False;3;0;COLOR;0,0,0,0;False;1;COLOR;0,0,0,0;False;2;FLOAT;0;False;1;COLOR;0
Node;AmplifyShaderEditor.DynamicAppendNode;28;-599.2576,696.0563;Float;False;FLOAT2;4;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;0;False;3;FLOAT;0;False;1;FLOAT2;0
Node;AmplifyShaderEditor.SamplerNode;26;-419.0946,699.1027;Float;True;Property;_GradientMap;Gradient Map;5;0;Create;True;0;0;False;0;None;9e0cde0545cbadf49bd38e20828606d6;True;0;False;white;Auto;False;Object;-1;Auto;Texture2D;6;0;SAMPLER2D;;False;1;FLOAT2;0,0;False;2;FLOAT;0;False;3;FLOAT2;0,0;False;4;FLOAT2;0,0;False;5;FLOAT;1;False;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.RangedFloatNode;42;-1421.507,791.0256;Float;False;Property;_Float0;Float 0;6;0;Create;True;0;0;False;0;0;-194;-1000;2000;0;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;46;-9.779633,707.2197;Float;False;2;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.DynamicAppendNode;58;603.62,133.1377;Float;False;FLOAT4;4;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;0;False;3;FLOAT;0;False;1;FLOAT4;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;49;22.00336,480.144;Float;False;2;2;0;FLOAT3;0,0,0;False;1;FLOAT;0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.SaturateNode;17;-367.5894,-95.73636;Float;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.SaturateNode;45;-834.4088,663.8766;Float;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;47;-308.4142,536.561;Float;False;Property;_Float2;Float 2;8;0;Create;True;0;0;False;0;0;1;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;43;-1416.782,694.9507;Float;False;Property;_Float1;Float 1;7;0;Create;True;0;0;False;0;0;516;0;2000;0;1;FLOAT;0
Node;AmplifyShaderEditor.TemplateMultiPassMasterNode;1;795.2576,15.39815;Half;False;True;2;Half;ASEMaterialInspector;0;1;LookDev/World_0/Lines v3;0770190933193b94aaa3065e307002fa;0;0;SubShader 0 Pass 0;2;True;0;1;False;-1;0;False;-1;0;1;False;-1;0;False;-1;True;-1;False;-1;-1;False;-1;True;0;False;-1;True;True;True;True;True;0;False;-1;True;False;255;False;-1;255;False;-1;255;False;-1;7;False;-1;1;False;-1;1;False;-1;1;False;-1;7;False;-1;1;False;-1;1;False;-1;1;False;-1;True;1;False;-1;True;3;False;-1;True;True;0;False;-1;0;False;-1;True;1;RenderType=Opaque;True;2;0;False;False;False;False;False;False;False;False;False;False;0;;0;2;0;FLOAT4;0,0,0,0;False;1;FLOAT3;0,0,0;False;0
WireConnection;4;0;15;0
WireConnection;4;1;16;0
WireConnection;52;0;4;0
WireConnection;25;0;4;0
WireConnection;56;0;57;0
WireConnection;56;1;51;0
WireConnection;56;2;55;0
WireConnection;53;0;52;0
WireConnection;13;0;53;0
WireConnection;13;1;19;0
WireConnection;13;2;56;0
WireConnection;38;0;25;0
WireConnection;59;0;13;0
WireConnection;32;0;38;0
WireConnection;44;0;43;0
WireConnection;44;1;42;0
WireConnection;39;0;40;0
WireConnection;39;1;20;0
WireConnection;39;2;32;0
WireConnection;28;0;45;0
WireConnection;26;1;28;0
WireConnection;46;0;26;1
WireConnection;46;1;47;0
WireConnection;58;1;59;0
WireConnection;49;0;51;0
WireConnection;49;1;47;0
WireConnection;17;0;4;0
WireConnection;45;0;44;0
WireConnection;1;0;39;0
WireConnection;1;1;58;0
ASEEND*/
//CHKSM=B4F76BCB5B815F7B8F234E9CCC808AB3C25DE2EC