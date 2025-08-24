import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function createControl(
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer,
) {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  return controls;
}
