import * as THREE from "three";

export function createFloor(planeSize: number) {
  // 加载纹理
  const loader = new THREE.TextureLoader();
  const texture = loader.load(
    import.meta.env.VITE_BASE_SERVER + "/floor-texture.png",
  );

  // 设置纹理
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.NearestFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  const repeats = planeSize;
  texture.repeat.set(repeats, repeats);

  const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
  const planeMat = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(planeGeo, planeMat);
  mesh.rotation.x = Math.PI * -0.5;
  return mesh;
}
