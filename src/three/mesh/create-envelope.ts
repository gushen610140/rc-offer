import * as THREE from "three";
import { CSS3DObject } from "three/addons/renderers/CSS3DRenderer.js";
import OfferComp from "@/components/OfferComp.vue";
import { h, createApp } from "vue";

export function createEnvelope(size: { w: number; h: number; d: number }) {
  // 创建容器元素
  const element = document.createElement("div");

  // 设置容器样式，使其大小与立方体表面匹配
  element.style.width = `${size.w * 100}px`; // 乘以100是因为CSS3D对象会被缩放0.01
  element.style.height = `${size.h * 100}px`;
  element.style.overflow = "hidden";
  element.style.backgroundColor = "transparent";

  // 创建内部容器用于缩放内容
  const innerContainer = document.createElement("div");
  innerContainer.style.width = "100%";
  innerContainer.style.height = "100%";

  // 根据立方体大小计算适当的缩放比例
  // 假设表单的原始宽度约为 800px，我们需要将其缩放到立方体宽度
  const scaleRatio = (size.w * 100) / 800;

  innerContainer.style.transform = `scale(${scaleRatio})`;
  innerContainer.style.transformOrigin = "top left";
  innerContainer.style.display = "flex";
  innerContainer.style.flexDirection = "column";
  innerContainer.style.overflow = "auto";

  // 将内部容器添加到主容器
  element.appendChild(innerContainer);

  // 创建Vue应用并挂载到内部容器
  const app = createApp(OfferComp);
  app.mount(innerContainer);
  const geometry = new THREE.BoxGeometry(size.w, size.h, size.d);

  const materials = [
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
    }),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
    }),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
    }),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
    }),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
    }),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
    }),
  ];

  materials[4].opacity = 0;
  materials[4].transparent = true;

  const cube = new THREE.Mesh(geometry, materials);

  const cssObject = new CSS3DObject(element);

  // 定位CSS3D对象到立方体前表面
  cssObject.position.set(0, 0, size.d / 2 + 0.01); // 略微偏移以避免z-fighting

  // 缩放CSS3D对象以匹配立方体大小
  // 由于CSS使用像素而Three.js使用单位，需要缩放因子
  cssObject.scale.set(0.01, 0.01, 0.01); // 将像素尺寸转换为Three.js单位

  const group = new THREE.Group();
  group.add(cube);
  group.add(cssObject);

  return {
    group,
    cube,
    cssObject,
  };
}
