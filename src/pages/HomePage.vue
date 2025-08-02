<script lang="ts" setup>
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { onMounted, ref } from "vue";

const canvasContainer = ref<HTMLDivElement | null>(null);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const floorSize = 40;

const loader = new THREE.TextureLoader();
const texture = loader.load("/src/assets/floor-texture.png");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.magFilter = THREE.NearestFilter;
texture.colorSpace = THREE.SRGBColorSpace;
const repeats = floorSize / 2;
texture.repeat.set(repeats, repeats);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 5, 0);
controls.update();

renderer.setSize(window.innerWidth, window.innerHeight);

onMounted(() => {
  if (!canvasContainer.value) return;

  canvasContainer.value.appendChild(renderer.domElement);

  const animate = () => {
    renderer.render(scene, camera);
    controls.update();
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  };
  renderer.setAnimationLoop(animate);
});
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div ref="canvasContainer"></div>
  </div>
</template>

<style scoped>
/* Component styles */
</style>
