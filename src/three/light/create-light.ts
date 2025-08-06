import * as THREE from "three";

export function createLight(scene: THREE.Scene) {
  const light = new THREE.PointLight(0xffffff, 100);
  light.position.set(5, 5, 5);
  scene.add(light);
}
