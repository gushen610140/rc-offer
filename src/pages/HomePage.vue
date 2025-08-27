<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { createControl } from "@/three/control/create-control";
import { createScene } from "@/three/scene/create-scene";
import { createRenderer } from "@/three/renderer/create-renderer";
import { createCamera } from "@/three/camera/create-camera";
import { initScene } from "@/three/scene/init-scene";

// canvas 容器
const canvasContainer = ref<HTMLDivElement | null>(null);

// threejs 构建
const { webGLRenderer, cssRenderer } = createRenderer();
const camera = createCamera({ x: 5, y: 3, z: 2 }, { x: 0, y: 2, z: -4 });
const scene = createScene();
// const control = createControl(camera, webGLRenderer);

onMounted(async () => {
  // 检查 dom 元素状态
  if (!canvasContainer.value) return;

  // 初始化场景
  initScene(scene);

  // 将渲染器放入 dom 元素
  canvasContainer.value.appendChild(webGLRenderer.domElement);
  canvasContainer.value.appendChild(cssRenderer.domElement);

  // 持续渲染
  const animate = () => {
    requestAnimationFrame(animate);

    webGLRenderer.render(scene, camera);
    cssRenderer.render(scene, camera);

    // control.update();
  };

  animate();
});
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div ref="canvasContainer" class="w-full h-full"></div>
  </div>
</template>

<style scoped></style>
