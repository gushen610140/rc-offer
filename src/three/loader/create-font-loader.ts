import { FontLoader } from "three/addons/loaders/FontLoader.js";

export function createFontLoader() {
  const loader = new FontLoader();
  return loader;
}
