import * as THREE from "three";
import { gsap } from "gsap";
import { useEventBus, UseEventBusReturn } from "@vueuse/core";

let isClicked = false;
let preventContinusClick = false;

function hoverEnvelope(object: THREE.Group) {
  gsap.to(object.scale, {
    x: 1.1,
    y: 1.1,
    z: 1.1,
    duration: 0.8,
    ease: "power2.out",
  });
}

function unhoverEnvelope(object: THREE.Group) {
  gsap.to(object.scale, {
    x: 1,
    y: 1,
    z: 1,
    duration: 0.8,
    ease: "power2.out",
  });
}

export function checkMouseCaster(
  raycaster: THREE.Raycaster,
  mouse: THREE.Vector2,
  camera: THREE.Camera,
  envelopeObject: THREE.Group,
) {
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(envelopeObject, true);

  if (intersects.length > 0 && !isClicked) {
    hoverEnvelope(envelopeObject);
  }

  if (intersects.length === 0 && !isClicked) {
    unhoverEnvelope(envelopeObject);
  }
}

let bus: UseEventBusReturn<boolean, boolean>;

function unviewEnvelope(
  envelope: THREE.Group,
  camera: THREE.Camera,
  target: THREE.Vector3,
) {
  gsap.to(envelope.rotation, {
    x: Math.PI * -0.5,
    y: 0,
    z: Math.PI * 0.5,
    duration: 0.8,
    ease: "power2.out",
  });
  gsap.to(envelope.position, {
    x: 2.6,
    y: 1.2,
    z: -2.2,
    duration: 0.8,
    ease: "power2.out",
  });
  gsap.to(envelope.scale, {
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
}

function viewEnvelope(
  envelope: THREE.Group,
  camera: THREE.Camera,
  target: THREE.Vector3,
) {
  gsap.to(envelope.rotation, {
    x: Math.PI * -0.5,
    y: Math.PI * 0.5,
    z: Math.PI * 0.5,
    duration: 0.8,
    ease: "power2.out",
  });
  gsap.to(envelope.position, {
    x: 5,
    y: 2,
    z: 0,
    duration: 0.8,
    ease: "power2.out",
  });
  gsap.to(envelope.scale, {
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
}

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
      // 在动画播放完成前禁止连续点击事件
      preventContinusClick = true;
      setTimeout(() => {
        preventContinusClick = false;
      }, 500);

      if (!isClicked) return;
      openEnvelopeHtmlInteract(false);
      unviewEnvelope(envelopeObject, camera, target);

      isClicked = false;
    });
  }

  const intersects = raycaster.intersectObject(envelopeObject, true);
  if (intersects.length === 0) return;

  if (isClicked || preventContinusClick) return;
  openEnvelopeHtmlInteract(true);
  viewEnvelope(envelopeObject, camera, target);

  isClicked = true;
}
