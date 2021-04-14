// Import des librairies
import * as THREE from 'three'

// Import des styles
import './style.css'

// Récupération de l'élément canvas
const canvas = document.getElementById('webgl')

// La "scene" du projet où seront affichés les objets
const scene = new THREE.Scene()

// Un "mesh" est une combinaison d'une "geometry" (la forme) et d'un "material" (à quoi ça ressemble)
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Dimensions
const sizes = {
    width: 800,
    height: 600
}

// Caméra
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// Recul de la caméra pour pouvoir le cube
camera.position.z = 3
scene.add(camera)

// Un "renderer" rend la "scene" à travers la caméra, le tout dans un canvas
const renderer = new THREE.WebGLRenderer({
    canvas
})

// Dimensionnement du "renderer"
renderer.setSize(sizes.width, sizes.height)

// Rendu de la "scene" à travers la caméra
renderer.render(scene, camera)
