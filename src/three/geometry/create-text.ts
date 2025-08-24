import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { Font } from "three/addons/loaders/FontLoader.js";
import * as THREE from "three";

export function createText(
  font: Font,
  text: string,
  size: number,
  color: number,
) {
  const geometry = new TextGeometry(text, {
    font: font,
    size: size,
    depth: 0.05,
    curveSegments: 12,
  });

  const material = new THREE.MeshPhongMaterial({ color: color });
  const textMesh = new THREE.Mesh(geometry, material);

  return textMesh;
}
