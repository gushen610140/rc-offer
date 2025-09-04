import * as THREE from "three";
import {
  checkMouseCaster,
  checkMouseCasterClick,
} from "../three/ray-caster/check-mouse-caster";

export function addGlobalEvents(
  mouse: THREE.Vector2,
  raycaster: THREE.Raycaster,
  envelopeObject: THREE.Group,
  camera: THREE.Camera,
  target: THREE.Vector3,
  openEnvelopeHtmlInteract: (open: boolean) => void,
) {
  // 添加鼠标移动事件监听器
  function throttleMove(event: MouseEvent) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    checkMouseCaster(raycaster, mouse, camera, envelopeObject);
  }
  document.addEventListener("mousemove", throttleMove);

  // 添加鼠标点击事件监听器
  document.addEventListener("click", () => {
    checkMouseCasterClick(
      raycaster,
      envelopeObject,
      camera,
      target,
      openEnvelopeHtmlInteract,
    );
  });
}
