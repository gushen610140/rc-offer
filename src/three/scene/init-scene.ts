import { createFloor } from "../mesh/create-floor";
import { createLight } from "../light/create-light";
import { createEnvelope } from "../mesh/create-envelope";
import * as THREE from "three";

export function initScene(scene: THREE.Scene) {
  // 创建地面
  const floor = createFloor(80);
  scene.add(floor);

  // 创建灯光
  const light = createLight({ x: 3, y: 6, z: 3 }, 0xffffff, 50);
  scene.add(light);

  // 创建交互式立方体
  const interactiveCube = createEnvelope({ w: 2, h: 2, d: 2 });
  interactiveCube.group.position.set(0, 2, -4);
  interactiveCube.group.rotation.y = Math.PI * 0.05;
  scene.add(interactiveCube.group);

  return {
    floor,
    light,
    interactiveCube,
  };
}
