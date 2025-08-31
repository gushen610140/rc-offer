import * as THREE from "three";
import { gsap } from "gsap";

// TODO: 信封无法放大

// 创建高亮材质
const highlightMaterial = new THREE.MeshPhongMaterial({
  color: 0x00ff00,
  transparent: true,
  opacity: 0.5,
});

let hoveredObject: THREE.Object3D | null = null;
let originalMaterials: THREE.Material[] | null = null;

export function checkMouseCaster(
  raycaster: THREE.Raycaster,
  mouse: THREE.Vector2,
  camera: THREE.Camera,
  envelopeObject: THREE.Group,
) {
  // 更新射线
  raycaster.setFromCamera(mouse, camera);

  // 计算与信封的交点
  const intersects = raycaster.intersectObject(envelopeObject, true);

  // 如果之前有高亮对象，恢复其原始材质
  if (hoveredObject && originalMaterials) {
    // hoveredObject.material = originalMaterials;
    hoveredObject = null;
    originalMaterials = null;
  }

  // 如果有交点，高亮显示第一个交点对象
  if (intersects.length > 0) {
    hoveredObject = intersects[0].object;
    if (hoveredObject instanceof THREE.Mesh) {
      // 保存原始材质
      originalMaterials = Array.isArray(hoveredObject.material)
        ? [...hoveredObject.material]
        : hoveredObject.material;

      // 应用高亮材质
      if (Array.isArray(hoveredObject.material)) {
        const materials = [...hoveredObject.material];
        for (let i = 0; i < materials.length; i++) {
          materials[i] = highlightMaterial;
        }
        hoveredObject.material = materials;
      } else {
        hoveredObject.material = highlightMaterial;
      }
    }
  }
}

let isScaled = false;
export function checkMouseCasterClick() {
  if (!hoveredObject) return;
  if (isScaled) {
    gsap.to(hoveredObject.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.5,
      ease: "power2.out",
    });
    isScaled = false;
    return;
  }
  gsap.to(hoveredObject.scale, {
    x: 1.5,
    y: 1.5,
    z: 1.5,
    duration: 0.5,
    ease: "power2.out",
  });
  isScaled = true;
}
