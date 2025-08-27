import { createFloor } from "../mesh/create-floor";
import { createLight } from "../light/create-light";
import { createInteractiveCube } from "../mesh/create-interactive-cube";
import * as THREE from "three";

export function initScene(scene: THREE.Scene) {
  // 创建地面
  const floor = createFloor(80);
  scene.add(floor);

  // 创建灯光
  const light = createLight({ x: 3, y: 6, z: 3 }, 0xffffff, 50);
  scene.add(light);

  // 创建交互式立方体
  const interactiveCube = createInteractiveCube(2);
  // 将立方体放置在更好的位置，便于交互
  interactiveCube.group.position.set(0, 2, -4);
  // 稍微旋转立方体，使HTML面板更容易看到
  interactiveCube.group.rotation.y = Math.PI * 0.05;
  scene.add(interactiveCube.group);

  return {
    floor,
    light,
    interactiveCube,
  };
}
