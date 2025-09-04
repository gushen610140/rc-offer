import * as THREE from "three";
import { gsap } from "gsap";
import { useEventBus, UseEventBusReturn } from "@vueuse/core";

let isClicked = false;

export function checkMouseCaster(
  raycaster: THREE.Raycaster,
  mouse: THREE.Vector2,
  camera: THREE.Camera,
  envelopeObject: THREE.Group,
) {
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(envelopeObject, true);

  if (intersects.length > 0 && !isClicked) {
    gsap.to(envelopeObject.scale, {
      x: 1.1,
      y: 1.1,
      z: 1.1,
      duration: 0.8,
      ease: "power2.out",
    });
  }

  if (intersects.length === 0 && !isClicked) {
    gsap.to(envelopeObject.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.8,
      ease: "power2.out",
    });
  }
}

let bus: UseEventBusReturn<boolean, boolean>;

export function checkMouseCasterClick(
  raycaster: THREE.Raycaster,
  envelopeObject: THREE.Group,
  camera: THREE.Camera, // 使用通用Camera类型以保持兼容性
  target: THREE.Vector3,
  openEnvelopeHtmlInteract: (open: boolean) => void,
) {
  // 开启监听是否触发了关闭表单事件
  if (!bus) {
    bus = useEventBus("close-form");
    bus.on(() => {
      if (!isClicked) return;
      openEnvelopeHtmlInteract(false);
      gsap.to(envelopeObject.rotation, {
        x: Math.PI * -0.5,
        y: 0,
        z: Math.PI * 0.5,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(envelopeObject.position, {
        x: 2.6,
        y: 1.2,
        z: -2.2,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(envelopeObject.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(camera.position, {
        x: 8,
        y: 3,
        z: -4,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(target, {
        x: 0,
        y: 3,
        z: 1,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: () => {
          camera.lookAt(target);
        },
      });
      if (camera instanceof THREE.PerspectiveCamera) {
        gsap.to(camera, {
          fov: 75,
          duration: 0.8,
          ease: "power2.out",
          onUpdate: () => {
            camera.updateProjectionMatrix();
          },
        });
      }

      isClicked = false;
    });
  }

  const intersects = raycaster.intersectObject(envelopeObject, true);

  if (intersects.length === 0) return;

  if (isClicked) return;
  openEnvelopeHtmlInteract(true);
  gsap.to(envelopeObject.rotation, {
    x: Math.PI * -0.5,
    y: Math.PI * 0.5,
    z: Math.PI * 0.5,
    duration: 0.8,
    ease: "power2.out",
  });
  gsap.to(envelopeObject.position, {
    x: 5,
    y: 2,
    z: 0,
    duration: 0.8,
    ease: "power2.out",
  });
  gsap.to(envelopeObject.scale, {
    x: 3,
    y: 3,
    z: 3,
    duration: 0.8,
    ease: "power2.out",
  });
  gsap.to(camera.position, {
    x: 10,
    y: 2,
    z: 0,
    duration: 0.8,
    ease: "power2.out",
  });
  gsap.to(target, {
    x: 5,
    y: 2,
    z: 0,
    duration: 0.8,
    ease: "power2.out",
    onUpdate: () => {
      camera.lookAt(target);
    },
  });
  if (camera instanceof THREE.PerspectiveCamera) {
    gsap.to(camera, {
      fov: 35,
      duration: 0.8,
      ease: "power2.out",
      onUpdate: () => {
        camera.updateProjectionMatrix(); // 更新投影矩阵，使fov变化生效
      },
    });
  }

  isClicked = true;
}
