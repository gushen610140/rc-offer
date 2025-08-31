import * as THREE from "three";
import { checkMouseCasterClick } from "./check-mouse-caster";

export function createRayCaster() {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // 添加鼠标移动事件监听器
  document.addEventListener("mousemove", (event: MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  });

  // 添加鼠标点击事件监听器
  document.addEventListener("click", () => {
    checkMouseCasterClick();
  });

  return {
    raycaster,
    mouse,
  };
}
