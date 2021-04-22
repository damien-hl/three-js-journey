import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import * as dat from 'dat.gui'

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader()
// const dracoLoader = new DRACOLoader()
// gltfLoader.setDRACOLoader(dracoLoader)
const cubeTextureLoader = new THREE.CubeTextureLoader()

/**
 * Update all materials
 */
const updateAllMaterials = () => {
    scene.traverse(child => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
            // child.material.envMap = environmentMap
            child.material.envMapIntensity = debugObject.envMapIntensity
            child.material.needsUpdate = true
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
const debugObject = {
    envMapIntensity: 5
}
gui.add(debugObject, 'envMapIntensity').min(0).max(10).step(0.001).name('EnvMapIntensity').onChange(updateAllMaterials)

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Test sphere
 */
// const testSphere = new THREE.Mesh(
//     new THREE.SphereGeometry(1, 32, 32),
//     new THREE.MeshStandardMaterial()
// )
// scene.add(testSphere)

/**
 * Environment map
 */
const environmentMapFolder = 3
const environmentMap = cubeTextureLoader.load([
    `/textures/environmentMaps/${environmentMapFolder}/px.jpg`,
    `/textures/environmentMaps/${environmentMapFolder}/nx.jpg`,
    `/textures/environmentMaps/${environmentMapFolder}/py.jpg`,
    `/textures/environmentMaps/${environmentMapFolder}/ny.jpg`,
    `/textures/environmentMaps/${environmentMapFolder}/pz.jpg`,
    `/textures/environmentMaps/${environmentMapFolder}/nz.jpg`,
])

environmentMap.encoding = THREE.sRGBEncoding

scene.background = environmentMap
scene.environment = environmentMap

/**
 * Models
 */
// gltfLoader.load('/models/FlightHelmet/glTF/FlightHelmet.gltf', gltf => {
//     gltf.scene.scale.set(10, 10, 10)
//     gltf.scene.position.set(0, -4, 0)
//     gltf.scene.rotation.y = Math.PI * 0.5
//     scene.add(gltf.scene)

//     gui.add(gltf.scene.rotation, 'y')
//         .min(- Math.PI)
//         .max(Math.PI)
//         .step(0.001)
//         .name('Rotation')

//     updateAllMaterials()
// })
gltfLoader.load('/models/hamburger.glb', gltf => {
    gltf.scene.scale.set(0.3, 0.3, 0.3)
    gltf.scene.position.set(0, -4, 0)
    gltf.scene.rotation.y = Math.PI * 0.5
    scene.add(gltf.scene)

    gui.add(gltf.scene.rotation, 'y')
        .min(- Math.PI)
        .max(Math.PI)
        .step(0.001)
        .name('Rotation')

    updateAllMaterials()
})

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.position.set(0.25, 3, -2.25)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 12
directionalLight.shadow.normalBias = 0.03
scene.add(directionalLight)

// const directionalLightCameraHelper = new CameraHelper(directionalLight.shadow.camera)
// scene.add(directionalLightCameraHelper)

gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('LightIntensity')
gui.add(directionalLight.position, 'x').min(-5).max(15).step(0.001).name('LightX')
gui.add(directionalLight.position, 'y').min(-5).max(15).step(0.001).name('LightY')
gui.add(directionalLight.position, 'z').min(-5).max(15).step(0.001).name('LightZ')

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(4, 1, - 4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: !!window.devicePixelRatio >= 1,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping =  THREE.ReinhardToneMapping
renderer.toneMappingExposure = 3
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap

gui.add(renderer, 'toneMapping', {
    No: THREE.NoToneMapping,
    Linear: THREE.LinearToneMapping,
    Reinhard: THREE.ReinhardToneMapping,
    Cineon: THREE.CineonToneMapping,
    ACESFilmic: THREE.ACESFilmicToneMapping,
}).onFinishChange(() => {
    renderer.toneMapping = Number(renderer.toneMapping)
    updateAllMaterials()
}).name('toneMapping')

gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001).name('ToneMappingExposure')

/**
 * Animate
 */
const tick = () => {
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()