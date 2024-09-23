import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const width = window.innerWidth;
const height = window.innerHeight;

//renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

//camera
const fov = 75;
const aspect = width / height;
const near = 0.1;
const far = 10;

const camera = new THREE.PerspectiveCamera(fov, aspect, near.far);
camera.position.z = 2;

//create the  scene
const scene = new THREE.Scene();

//set controls to control using mouse
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingfactor = 0.03;

//create object
const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true,
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh); //add mesh to scene

//add wiemesh
const wireMat = new THREE.MeshStandardMaterial({
  color: "black",
  wireframe: true,
});

const wireMesh = new THREE.Mesh(geo, wireMat);

mesh.add(wireMesh); // add wireMesh as a child of mesh

// add light
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000);
scene.add(hemiLight);

function animate(t = 0) {
  requestAnimationFrame(animate);
  //mesh.scale.setScalar(Math.cos(t * 0.001) + 1.0);
  //mesh.rotation.y = t * 0.0001;
  renderer.render(scene, camera); //render the scene and camera
  controls.update();
}

animate();
