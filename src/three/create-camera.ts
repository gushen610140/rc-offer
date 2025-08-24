import * as THREE from "three";

export function getCamera() {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );

  camera.position.set(8, 3, 0);
  camera.lookAt(0, 3, 0);

  return camera;
}
