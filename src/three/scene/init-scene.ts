import { createFloor } from "../mesh/create-floor";
import { createLight } from "../light/create-light";
import { createEnvelope } from "../mesh/create-envelope";
import { createDesk } from "../mesh/create-desk";
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

  // 创建信封
  const envelope = createEnvelope({ w: 0.7, h: 1.4, d: 0.01 });
  envelope.group.position.set(2.6, 1.2, -2.2);
  envelope.group.rotation.x = Math.PI * -0.5;
  envelope.group.rotation.z = Math.PI * 0.5;
  // 关闭信封html交互
  envelope.cssObject.element.style.pointerEvents = "none";
  // 信封html交互模式开关，方便后续调用
  const openEnvelopeHtmlInteract = (open: boolean) => {
    envelope.cssObject.element.style.pointerEvents = open ? "auto" : "none";
  };
  scene.add(envelope.group);

  // 创建桌子
  const desk = await createDesk({ x: 2, y: 0, z: -2 }, 0);
  scene.add(desk);
  // const deskMatrix = await createDeskMatrix();
  // scene.add(deskMatrix);

  return {
    floor,
    light,
    envelope,
    openEnvelopeHtmlInteract,
  };
}
