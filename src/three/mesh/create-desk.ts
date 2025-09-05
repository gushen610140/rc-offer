import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";

export async function createDesk(
  position: {
    x: number;
    y: number;
    z: number;
  },
  rotate: number,
) {
  const loader = new GLTFLoader();

  let desk: THREE.Group;

  desk = await new Promise((resolve) => {
    loader.load(
      import.meta.env.VITE_BASE_SERVER + "/model/office_desk.glb",
      (gltf) => {
        desk = gltf.scene;
        desk.scale.set(2, 2, 2);
        desk.position.set(position.x, position.y, position.z);
        desk.rotation.y = rotate;
        resolve(desk);
      },
    );
  });

  return desk;
}

export async function createDeskGroup() {
  const desk = await createDesk({ x: 2, y: 0, z: -2 }, 0);
  const desk2 = await createDesk({ x: 1, y: 0, z: -2 }, Math.PI * 0.5);
  const desk3 = await createDesk({ x: -6, y: 0, z: -2 }, 0);
  const desk4 = await createDesk({ x: -7, y: 0, z: -2 }, Math.PI * 0.5);
  const desk5 = await createDesk({ x: -14, y: 0, z: -2 }, 0);
  const desk6 = await createDesk({ x: -15, y: 0, z: -2 }, Math.PI * 0.5);

  const deskGroup = new THREE.Group();
  deskGroup.add(desk);
  deskGroup.add(desk2);
  deskGroup.add(desk3);
  deskGroup.add(desk4);
  deskGroup.add(desk5);
  deskGroup.add(desk6);
  return deskGroup;
}

export async function createDeskColumn() {
  const deskGroup = await createDeskGroup();
  const deskGroup2 = await createDeskGroup();
  deskGroup2.rotation.y = Math.PI * 1;
  deskGroup2.position.set(-13, 0, -3.5);

  const deskColumn = new THREE.Group();
  deskColumn.add(deskGroup);
  deskColumn.add(deskGroup2);
  return deskColumn;
}

export async function createDeskMatrix() {
  const deskColumn = await createDeskColumn();
  const deskColumn2 = await createDeskColumn();
  const deskColumn3 = await createDeskColumn();
  deskColumn2.position.set(0, 0, 10);
  deskColumn3.position.set(0, 0, 20);

  const deskMatrix = new THREE.Group();
  deskMatrix.add(deskColumn);
  deskMatrix.add(deskColumn2);
  deskMatrix.add(deskColumn3);

  return deskMatrix;
}
