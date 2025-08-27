import * as THREE from "three";
import { CSS3DRenderer } from "three/addons/renderers/CSS3DRenderer.js";

export function createRenderer() {
  const webGLRenderer = new THREE.WebGLRenderer();
  webGLRenderer.setSize(window.innerWidth, window.innerHeight);
  // 渲染器在页面上对齐
  webGLRenderer.domElement.style.position = "absolute";
  webGLRenderer.domElement.style.top = "0";
  webGLRenderer.domElement.style.left = "0";

  const cssRenderer = new CSS3DRenderer();
  cssRenderer.setSize(window.innerWidth, window.innerHeight);
  cssRenderer.domElement.style.position = "absolute";
  cssRenderer.domElement.style.top = "0";
  cssRenderer.domElement.style.left = "0";
  cssRenderer.domElement.style.pointerEvents = "none"; // 允许点击通过WebGL元素

  return {
    webGLRenderer,
    cssRenderer,
  };
}
