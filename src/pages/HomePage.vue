<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { createControl } from "@/three/control/create-control";
import { createScene } from "@/three/scene/create-scene";
import { createRenderer } from "@/three/renderer/create-renderer";
import { createCamera } from "@/three/camera/create-camera";
import { initScene } from "@/three/scene/init-scene";
import { createRayCaster } from "@/three/ray-caster/create-ray-caster";
import {
  checkMouseCaster,
  checkMouseCasterClick,
} from "@/three/ray-caster/check-mouse-caster";
import { addGlobalEvents } from "@/hooks/addGlobalEvents";

// canvas 容器
const canvasContainer = ref<HTMLDivElement | null>(null);

// threejs 构建
const { webGLRenderer, cssRenderer } = createRenderer();
const { camera, target } = createCamera(
  { x: 8, y: 3, z: -4 },
  { x: 0, y: 3, z: 1 },
);
const scene = createScene();
const { raycaster, mouse } = createRayCaster();
// const control = createControl(camera, webGLRenderer);

onMounted(async () => {
  // 检查 dom 元素状态
  if (!canvasContainer.value) return;

  // 初始化场景
  const { envelope, openEnvelopeHtmlInteract } = await initScene(scene);

  // 将渲染器放入 dom 元素
  canvasContainer.value.appendChild(webGLRenderer.domElement);
  canvasContainer.value.appendChild(cssRenderer.domElement);

  // 添加全局事件
  addGlobalEvents(
    mouse,
    raycaster,
    envelope.group,
    camera,
    target,
    openEnvelopeHtmlInteract,
  );

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
