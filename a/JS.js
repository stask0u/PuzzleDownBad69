import * as Three from 'three'
import oc from 'three-orbit-controls'
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(89, window.innerHeight / window.innerWidth)
camera.position.z=3
camera.position.x= 0
scene.add(camera)

const textureLoader = new THREE.TextureLoader()
const texture =textureLoader.load('https://bruno-simon.com/prismic/matcaps/8.png')

const geometry = new THREE.TorusKnotGeometry(0.5,0.2, 100, 22)
const material = new THREE.MeshMatcapMaterial({matcap:texture});
const mesh = new THREE.Mesh(geometry, material)
mesh.rotation.y=0.5
mesh.position.y=1.5
scene.add(mesh)

const renderer = new THREE.WebGLRenderer({antialias:true,alpha:true })
renderer.setSize(window.innerHeight, window.innerWidth)
document.body.append(renderer.domElement)
renderer.render(scene, camera)

const cursor = {x:0, y:0}
window.addEventListener('mousemove', (_event) =>
{
cursor.x= _event.clientX / window.innerWidth
cursor.y=_event.clientY / window.innerHeight
console.log(cursor)
})

const tick = () =>
{
    window.requestAnimationFrame(tick)
    mesh.rotation.y+=0.01
   
    const cameraX = cursor.x
    const cameraY = cursor.y

    camera.position.x= cameraX
    camera.position.y= cameraY
 
    renderer.render(scene, camera)

    
}
tick()


const OrbitControls = oc(Three)
const controls =  new OrbitControls(camera, renderer.domElement)

