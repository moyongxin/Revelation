
//======// Utility //=============================================================================//

#include "/lib/utility.inc"

//======// Output //==============================================================================//

/* RENDERTARGETS: 0,3 */
layout(location = 0) out vec3 albedoOut;
layout(location = 1) out vec4 gbufferOut0;

//======// Input //===============================================================================//

flat in vec4 tint;
in vec2 lightmap;

//======// Uniform //=============================================================================//

uniform int renderStage;

//======// Function //============================================================================//

float bayer2 (vec2 a) { a = 0.5 * floor(a); return fract(1.5 * fract(a.y) + a.x); }
#define bayer4(a) (bayer2(0.5 * (a)) * 0.25 + bayer2(a))

//======// Main //================================================================================//
void main() {
	if (tint.a < 0.1) { discard; return; }

	albedoOut = tint.rgb;

	const uint materialID = 1u;
	gbufferOut0.x = packUnorm2x8Dithered(lightmap, bayer4(gl_FragCoord.xy));
	gbufferOut0.y = float(materialID + 0.1) * r255;
}
