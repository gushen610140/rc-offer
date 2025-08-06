<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getScene } from "@/three/create-scene";
import { getCamera } from "@/three/create-camera";
import { getRenderer } from "@/three/create-renderer";
import { createFloor } from "@/three/geometry/create-floor";
import { createCube } from "@/three/geometry/create-cube";
import { createLight } from "@/three/light/create-light";

const canvasContainer = ref<HTMLDivElement | null>(null);
const scene = getScene();
const camera = getCamera();
const renderer = getRenderer();

const cube = createCube();
cube.position.set(0, 2, 0);
scene.add(cube);

const floor = createFloor();
scene.add(floor);

createLight(scene);

onMounted(() => {
  if (!canvasContainer.value) return;

  canvasContainer.value.appendChild(renderer.domElement);

  const animate = () => {
    renderer.render(scene, camera);
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
