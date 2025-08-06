import * as THREE from "three";

const cubeSize = 1;
const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
const cubeMat = new THREE.MeshPhongMaterial({ color: "#fff" });
const mesh = new THREE.Mesh(cubeGeo, cubeMat);

export function createCube() {
  return mesh;
}
