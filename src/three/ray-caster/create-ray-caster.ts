import * as THREE from "three";

export function createRayCaster() {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  return {
    raycaster,
    mouse,
  };
}
