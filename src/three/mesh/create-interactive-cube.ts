import * as THREE from "three";
import { CSS3DObject } from "three/addons/renderers/CSS3DRenderer.js";

export function createInteractiveCube(
  size: number = 2,
  htmlElement?: HTMLElement,
) {
  // Create a default HTML element if none is provided
  if (!htmlElement) {
    htmlElement = document.createElement("div");
    htmlElement.style.width = `${size * 100}px`;
    htmlElement.style.height = `${size * 100}px`;
    htmlElement.style.backgroundColor = "#ffffff";
    htmlElement.style.padding = "0";
    htmlElement.style.boxSizing = "border-box";
    htmlElement.style.overflow = "hidden";
    htmlElement.style.fontFamily = "'Arial', sans-serif";
    htmlElement.style.borderRadius = "8px";
    htmlElement.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";

    // Create a more sophisticated HTML interface
    htmlElement.innerHTML = `
      <div style="background: linear-gradient(135deg, #4a90e2, #2c3e50); color: white; padding: 12px; text-align: center; font-weight: bold; border-bottom: 1px solid rgba(255,255,255,0.2);">
        交互控制面板
      </div>
      <div style="padding: 15px; height: calc(100% - 45px); display: flex; flex-direction: column;">
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; color: #333; font-size: 14px;">立方体颜色</label>
          <div style="display: flex; gap: 8px;">
            <button class="color-btn" data-color="#ff5252" style="background-color: #ff5252; width: 30px; height: 30px; border: none; border-radius: 4px; cursor: pointer;"></button>
            <button class="color-btn" data-color="#4caf50" style="background-color: #4caf50; width: 30px; height: 30px; border: none; border-radius: 4px; cursor: pointer;"></button>
            <button class="color-btn" data-color="#2196f3" style="background-color: #2196f3; width: 30px; height: 30px; border: none; border-radius: 4px; cursor: pointer;"></button>
            <button class="color-btn" data-color="#ff9800" style="background-color: #ff9800; width: 30px; height: 30px; border: none; border-radius: 4px; cursor: pointer;"></button>
          </div>
        </div>
        
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; color: #333; font-size: 14px;">旋转速度</label>
          <input type="range" min="0" max="10" value="0" class="rotation-speed" style="width: 100%; height: 8px;">
        </div>
        
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; color: #333; font-size: 14px;">缩放</label>
          <div style="display: flex; align-items: center;">
            <button class="scale-btn" data-scale="decrease" style="background-color: #e0e0e0; border: none; width: 30px; height: 30px; border-radius: 4px; cursor: pointer; font-weight: bold;">-</button>
            <span class="scale-value" style="flex: 1; text-align: center; font-size: 14px;">1.0</span>
            <button class="scale-btn" data-scale="increase" style="background-color: #e0e0e0; border: none; width: 30px; height: 30px; border-radius: 4px; cursor: pointer; font-weight: bold;">+</button>
          </div>
        </div>
        
        <div style="margin-top: auto;">
          <button class="reset-btn" style="background-color: #2c3e50; color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; width: 100%; font-weight: bold;">
            重置
          </button>
        </div>
      </div>
    `;

    // Store cube reference for interaction
    const cubeRef = {
      mesh: null,
      rotationSpeed: 0,
      originalScale: 1,
      currentScale: 1,
    };

    // Add event listeners for color buttons
    const colorButtons = htmlElement.querySelectorAll(".color-btn");
    colorButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        const color = target.getAttribute("data-color");
        if (color && cubeRef.mesh) {
          // Change the cube color (will be connected to the actual cube in HomePage.vue)
          const event = new CustomEvent("cube-color-change", {
            detail: { color },
          });
          window.dispatchEvent(event);
        }
      });
    });

    // Add event listener for rotation speed slider
    const rotationSlider = htmlElement.querySelector(
      ".rotation-speed",
    ) as HTMLInputElement;
    if (rotationSlider) {
      rotationSlider.addEventListener("input", (e) => {
        const target = e.target as HTMLInputElement;
        const speed = parseFloat(target.value) / 10;
        cubeRef.rotationSpeed = speed;

        // Dispatch event for rotation speed change
        const event = new CustomEvent("cube-rotation-change", {
          detail: { speed },
        });
        window.dispatchEvent(event);
      });
    }

    // Add event listeners for scale buttons
    const scaleButtons = htmlElement.querySelectorAll(".scale-btn");
    const scaleValue = htmlElement.querySelector(".scale-value");
    scaleButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        const scaleDirection = target.getAttribute("data-scale");

        if (scaleDirection === "increase" && cubeRef.currentScale < 2.0) {
          cubeRef.currentScale += 0.1;
        } else if (
          scaleDirection === "decrease" &&
          cubeRef.currentScale > 0.5
        ) {
          cubeRef.currentScale -= 0.1;
        }

        // Update display value
        if (scaleValue) {
          scaleValue.textContent = cubeRef.currentScale.toFixed(1);
        }

        // Dispatch event for scale change
        const event = new CustomEvent("cube-scale-change", {
          detail: { scale: cubeRef.currentScale },
        });
        window.dispatchEvent(event);
      });
    });

    // Add event listener for reset button
    const resetButton = htmlElement.querySelector(".reset-btn");
    if (resetButton) {
      resetButton.addEventListener("click", () => {
        // Reset all values
        if (rotationSlider) rotationSlider.value = "0";
        cubeRef.rotationSpeed = 0;
        cubeRef.currentScale = 1.0;
        if (scaleValue) scaleValue.textContent = "1.0";

        // Dispatch reset event
        const event = new CustomEvent("cube-reset");
        window.dispatchEvent(event);
      });
    }
  }

  // Create the cube with materials for each face
  const geometry = new THREE.BoxGeometry(size, size, size);

  // Create materials for each face of the cube
  const materials = [
    new THREE.MeshPhongMaterial({ color: 0xff0000 }), // Right face - red
    new THREE.MeshPhongMaterial({ color: 0x00ff00 }), // Left face - green
    new THREE.MeshPhongMaterial({ color: 0x0000ff }), // Top face - blue
    new THREE.MeshPhongMaterial({ color: 0xffff00 }), // Bottom face - yellow
    new THREE.MeshPhongMaterial({ color: 0xff00ff }), // Front face - magenta (will be replaced with HTML)
    new THREE.MeshPhongMaterial({ color: 0x00ffff }), // Back face - cyan
  ];

  // Make the front face transparent to see the HTML content
  materials[4].opacity = 0;
  materials[4].transparent = true;

  // Create the cube mesh with the materials
  const cube = new THREE.Mesh(geometry, materials);

  // Create CSS3D object for the HTML content
  const cssObject = new CSS3DObject(htmlElement);

  // Position the CSS3D object on the front face of the cube
  // The position needs to be adjusted to align with the front face
  cssObject.position.set(0, 0, size / 2 + 0.01); // Slightly in front of the cube face
  cssObject.scale.set(0.01, 0.01, 0.01); // Scale down to match the cube size

  // Create a group to hold both the cube and the CSS3D object
  const group = new THREE.Group();
  group.add(cube);
  group.add(cssObject);

  return {
    group,
    cube,
    cssObject,
    htmlElement,
  };
}
