import * as THREE from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

export function createText(scene: THREE.Scene) {
  const loader = new FontLoader();

  loader.load("fonts/helvetiker_regular.typeface.json", function (font) {
    const geometry = new TextGeometry("Hello three.js!", {
      font: font,
      size: 80,
      depth: 5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 10,
      bevelSize: 8,
      bevelOffset: 0,
      bevelSegments: 5,
    });

    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const text = new THREE.Mesh(geometry, material);
    scene.add(text);
  });
}
