import { createFloor } from "../mesh/create-floor";
import { createLight } from "../light/create-light";
import { createEnvelope } from "../mesh/create-envelope";
import { createDeskMatrix } from "../mesh/create-desk";
import * as THREE from "three";

export async function initScene(scene: THREE.Scene) {
  // 创建地面
  const floor = createFloor(80);
  scene.add(floor);

  // 创建灯光
  const light = createLight({ x: 0, y: 10, z: 7 }, 0xffffff, 200);
  const light2 = createLight({ x: 0, y: 10, z: 2 }, 0xffffff, 200);
  scene.add(light);
  scene.add(light2);

  // 创建交互式立方体
  const interactiveCube = createEnvelope({ w: 2, h: 2, d: 2 });
  interactiveCube.group.position.set(0, 2, -4);
  interactiveCube.group.rotation.y = Math.PI * 0.05;
  scene.add(interactiveCube.group);

  // 创建桌子
  const deskMatrix = await createDeskMatrix();
  scene.add(deskMatrix);

  return {
    floor,
    light,
    interactiveCube,
    deskMatrix,
  };
}
