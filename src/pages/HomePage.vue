<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getRenderer } from "@/three/create-renderer";
import { createControl } from "@/three/control/create-control";
import { createRayCaster } from "@/three/ray-caster/create-ray-caster";
import { createMouse } from "@/three/ray-caster/create-mouse";
import { getCamera } from "@/three/create-camera";
import { getScene } from "@/three/create-scene";
import * as THREE from "three";
import { initScene } from "@/three/init-scene";
import { createText } from "@/three/geometry/create-text";
import { useFontStore } from "@/stores/FontStore";

const fontStore = useFontStore();
const canvasContainer = ref<HTMLDivElement | null>(null);
const renderer = getRenderer();
const camera = getCamera();
const raycaster = createRayCaster();
const mouse = createMouse();
const scene = getScene();
const control = createControl(camera, renderer);
const { text } = initScene(scene);

const textContent = ref<string>("");
const textContainer = [text];

function handleClick(event: MouseEvent) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects<THREE.Mesh>(textContainer);

  if (intersects.length > 0) {
    const randomColor = Math.random() * 0xffffff;
    intersects[0].object.material = new THREE.MeshPhongMaterial({
      color: randomColor,
    });
  }
}

function handleKeyDown(event: KeyboardEvent) {
  // Handle backspace to remove the last character
  if (event.key === "Backspace") {
    if (textContent.value.length > 0) {
      textContent.value = textContent.value.slice(0, -1);
    }
  }
  // Handle printable characters (letters, numbers, some special symbols)
  else if (
    event.key.length === 1 &&
    /[a-zA-Z0-9\s!@#$%^&*()\-_=+\[\]{}|;:'",.<>/?\\]/.test(event.key)
  ) {
    textContent.value += event.key;
  }

  // Update 3D text
  updateTextDisplay();
}

function updateTextDisplay() {
  // Remove existing text objects
  textContainer.forEach((text) => {
    scene.remove(text);
  });
  textContainer.length = 0;

  // Create new text with current content (or show a space if empty)
  const displayText = textContent.value || " ";
  const newText = createText(fontStore.font!, displayText, 1, 0xffffff);

  // Center the text
  newText.geometry.computeBoundingBox();
  const textWidth =
    newText.geometry.boundingBox!.max.x - newText.geometry.boundingBox!.min.x;
  newText.position.set(-textWidth / 2, 0, 0);

  // Add to scene and container
  textContainer.push(newText);
  scene.add(newText);
}

onMounted(async () => {
  if (!canvasContainer.value) return;

  canvasContainer.value.appendChild(renderer.domElement);
  canvasContainer.value.focus();

  const animate = () => {
    renderer.render(scene, camera);
    control.update();
  };

  renderer.setAnimationLoop(animate);
});
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div
      ref="canvasContainer"
      @click="handleClick"
      @keydown="handleKeyDown"
      tabindex="0"
      class="focus:outline-none"
    ></div>
  </div>
</template>

<style scoped></style>
