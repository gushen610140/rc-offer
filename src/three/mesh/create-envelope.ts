import * as THREE from "three";
import { CSS3DObject } from "three/addons/renderers/CSS3DRenderer.js";
import OfferComp from "@/components/OfferComp.vue";
import { h, createApp } from "vue";

export function createEnvelope(size: { w: number; h: number; d: number }) {
  const element = document.createElement("div");

  const app = createApp(OfferComp);

  app.mount(element);
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

  cssObject.position.set(0, 0, size.d / 2 + 0.01);
  cssObject.scale.set(0.01, 0.01, 0.01);

  const group = new THREE.Group();
  group.add(cube);
  group.add(cssObject);

  return {
    group,
    cube,
    cssObject,
  };
}
