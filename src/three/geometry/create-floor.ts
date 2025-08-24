import * as THREE from "three";

const planeSize = 80;

const loader = new THREE.TextureLoader();
const texture = loader.load("/src/assets/floor-texture.png");

texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.magFilter = THREE.NearestFilter;
texture.colorSpace = THREE.SRGBColorSpace;
const repeats = planeSize / 2;
texture.repeat.set(repeats, repeats);

const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshPhongMaterial({
  map: texture,
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(planeGeo, planeMat);

export function createFloor() {
  mesh.rotation.x = Math.PI * -0.5;
  return mesh;
}
