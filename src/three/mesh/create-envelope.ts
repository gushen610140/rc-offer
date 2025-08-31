import * as THREE from "three";
import { CSS3DObject } from "three/addons/renderers/CSS3DRenderer.js";
import OfferComp from "@/components/OfferComp.vue";
import { createApp } from "vue";
import { range } from "radash";

export function createEnvelope(size: { w: number; h: number; d: number }) {
  // 通过 element 加载 vue 组件
  const element = document.createElement("div");
  const app = createApp(OfferComp);
  app.mount(element);

  // 信封本体
  const geometry = new THREE.BoxGeometry(size.w, size.h, size.d);
  const materials = Array.from(range(0, 5)).map(
    () =>
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
      }),
  );
  const cube = new THREE.Mesh(geometry, materials);

  // 信封可交互网页
  const cssObject = new CSS3DObject(element);
  cssObject.position.set(0, 0, size.d / 2 + 0.01); // 略微偏移以避免z-fighting
  cssObject.scale.set(0.001, 0.001, 0.001); // 将像素尺寸转换为Three.js单位

  const group = new THREE.Group();
  group.add(cube);
  group.add(cssObject);

  return {
    group,
    cube,
    cssObject,
  };
}
