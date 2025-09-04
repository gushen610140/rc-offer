import * as THREE from "three";

export function createCamera(
  position: { x: number; y: number; z: number },
  lookAt: { x: number; y: number; z: number },
) {
  const target = new THREE.Vector3(lookAt.x, lookAt.y, lookAt.z);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );

  camera.position.set(position.x, position.y, position.z);
  camera.lookAt(target);

  return {
    camera,
    target,
  };
}
