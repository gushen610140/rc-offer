import { ref } from "vue";
import { defineStore } from "pinia";
import { Font } from "three/addons/loaders/FontLoader.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

export const useFontStore = defineStore(
  "font",
  () => {
    const font = ref<Font | null>(null);

    const initFont = () => {
      const loader = new FontLoader();
      loader.load(
        "src/assets/fonts/MiSans_Regular.json",
        function (loadedFont: Font) {
          font.value = loadedFont;
        },
      );
    };

    return {
      font,
      initFont,
    };
  },
  {
    persist: true,
  },
);
