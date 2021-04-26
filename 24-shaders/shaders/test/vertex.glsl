// uniform mat4 projectionMatrix;
// uniform mat4 viewMatrix;
// uniform mat4 modelMatrix;
uniform vec2 uFrequency;
uniform float uTime;

// attribute vec3 position;
// attribute vec2 uv;

varying vec2 vUv;
varying float vElevation;

// attribute float aRandom;

// varying float vRandom;

// float loremIpsum() {
//     float a = 1.0;
//     float b = 2.0;

//     return  a + b;
// }

// float loremIpsum(float a, float b) {
//     return  a + b;
// }

void main() {
    // float a = 4.0;
    // float b = 3.0;
    // float c = a - b;
    // int foo = 123;
    // int bar = 100;
    // int fooBar = foo * bar;
    // float barFoo = a * float(bar);
    // bool foo = true;
    // bool bar = false;
    // vec2 foo = vec2(1.0, 2.0);
    // vec3 foo = vec3(1.0, 2.0, 1.0);
    // vec4 foo = vec4(1.0, 2.0, 1.0, 1.0);
    // foo.x = 2.0;
    // foo *= 2.0;
    // vec3 purpleColor = vec3(0.0);
    // purpleColor.r = 0.5;
    // purpleColor.b = 1.0;
    // vec2 foo = vec2(1.0, 2.0);
    // vec3 bar = vec3(foo, 3.0);
    // vec3 foo = vec3(1.0, 2.0, 3.0);
    // vec2 bar = foo.xy;
    // vec4 foo = vec4(1.0, 2.0, 3.0, 4.0);
    // float bar = foo.w;
    // float result = loremIpsum();
    // float result = loremIpsum(1.0, 2.0);

    // vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // modelPosition.z += sin(modelPosition.x * 10.0) * 0.1;
    // modelPosition.z += aRandom * 0.1;

    // vec4 viewPosition = viewMatrix * modelPosition;
    // vec4 projectedPosition = projectionMatrix * viewPosition;

    // gl_Position = projectedPosition;
    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

    // vRandom = aRandom;
    
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

    // modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    // modelPosition.z += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;
    modelPosition.z += elevation;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vUv = uv;
    vElevation = elevation;
}