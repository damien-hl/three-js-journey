import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

/**
 * SOLUTION 1 - le temps
 */
// // Temps
// let time = Date.now()
//
// // Animations
// const tick = () => {
//     // Temps
//     const currentTime = Date.now()
//     const deltaTime = currentTime - time
//     time = currentTime
//
//     // Mise à jour du rendu
//     // mesh.position.x += 0.005
//     // mesh.position.y += 0.005
//     mesh.rotation.y += 0.001 * deltaTime
//
//     // Rendu
//     renderer.render(scene, camera)
//
//     // Appelé à la frame suivante
//     requestAnimationFrame(tick)
// }
//
// tick()

/**
 * SOLUTION 2 - l'horloge incluse avec Three.js
 */
// Horloge
const clock = new THREE.Clock()

// Animations
gsap.to(mesh.position, {
    x: 2,
    duration: 1,
    delay: 1
})

gsap.to(mesh.position, {
    x: 0,
    duration: 1,
    delay: 2
})

// gsap.ticker.add((delta) => {
//     renderer.render(scene, camera)
//     mesh.position.y += delta * 0.01
// })

const tick = () => {
    // Temps
    const elapsedTime = clock.getElapsedTime()

    // Mise à jour du rendu
    // mesh.position.x += 0.005
    // mesh.position.y += 0.005
    // mesh.rotation.y = elapsedTime * Math.PI * 2
    // camera.position.x = Math.cos(elapsedTime)
    // camera.position.y = Math.sin(elapsedTime)
    // camera.lookAt(mesh.position)

    // Rendu
    renderer.render(scene, camera)

    // Appelé à la frame suivante
    requestAnimationFrame(tick)
}

tick()
