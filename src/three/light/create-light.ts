import * as THREE from "three";

export function createLight(
  position: { x: number; y: number; z: number },
  color: number,
  intensity: number,
) {
  const light = new THREE.PointLight(color, intensity);
  light.position.set(position.x, position.y, position.z);
  return light;
}
