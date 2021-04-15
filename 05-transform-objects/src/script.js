// Import des librairies
import * as THREE from 'three'

// Import des styles
import './style.css'

// Récupération de l'élément canvas
const canvas = document.getElementById('webgl')

// La "scene" du projet où seront affichés les objets
const scene = new THREE.Scene()

// Création d'"un groupe
const group = new THREE.Group();

// Ajout du groupe à la "scene"
scene.add(group)

/**
 * Cube 1
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)

// Positionnement, échelle et rotation du groupe
group.position.y = 1
group.scale.y = 2
group.rotation.y = 1

// Ajout du cube au groupe
group.add(cube)

/**
 * Cube 2
 */
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)

group.add(cube2)

cube2.position.x = -2

/**
 * Cube 3
 */
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)

group.add(cube3)

cube3.position.x = 2

// Utilitaire pour les axes
const axesHelper = new THREE.AxesHelper()

// Ajout de l'utilitaire à la scène
scene.add(axesHelper)

/**
 * POSITION
 */

// Placement du "mesh" avec des coordonnées fixes
// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1
// mesh.position.set(0.7, -0.6, 1)

// Normalise les vecteurs du "mesh" à 1
// mesh.position.normalize()

// Distance entre la position du "mesh" et le centre de la scène
// console.log(mesh.position.length())

/**
 * ÉCHELLE
 */

// Définition de l'échelle du "mesh"
// mesh.scale.x = 2
// mesh.scale.y = 0.5
// mesh.scale.y = 1
// mesh.scale.set(2, 0.5, 0.5)

/**
 * ROTATION (ou QUATERNION)
 */
// Changement de l'ordre des rotations
// mesh.rotation.reorder('YXZ')

// Définition des rotations du "mesh"
// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25

// Dimensions
const sizes = {
    width: 800,
    height: 600
}

// Caméra
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

// Recul de la caméra pour pouvoir le cube
// camera.position.x = 1
// camera.position.y = 1
camera.position.z = 3

// Ajout de la camera à la "scene"
scene.add(camera)

// camera.lookAt(mesh.position)

// Distance entre la position du "mesh" et la caméra
// console.log(mesh.position.distanceTo(camera.position))

// Un "renderer" rend la "scene" à travers la caméra, le tout dans un canvas
const renderer = new THREE.WebGLRenderer({
    canvas
})

// Dimensionnement du "renderer"
renderer.setSize(sizes.width, sizes.height)

// Rendu de la "scene" à travers la caméra
renderer.render(scene, camera)
