import { createFloor } from "./geometry/create-floor";
import { createText } from "./geometry/create-text";
import { createLight } from "./light/create-light";
import * as THREE from "three";
import { useFontStore } from "@/stores/FontStore";

export function initScene(scene: THREE.Scene) {
  // 初始化房间
  const floor = createFloor();
  scene.add(floor);

  // 初始化灯光
  const light = createLight();
  scene.add(light);

  // 初始化字体
  const fontStore = useFontStore();
  const text = createText(fontStore.font!, "init", 1, 0xffffff);
  scene.add(text);

  return {
    floor,
    light,
    text,
  };
}
