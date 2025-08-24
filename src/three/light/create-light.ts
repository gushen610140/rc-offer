import * as THREE from "three";

export function createLight() {
  const light = new THREE.PointLight(0xffffff, 50);
  light.position.set(3, 6, 3);
  return light;
}
