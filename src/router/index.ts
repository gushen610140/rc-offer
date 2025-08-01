import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

/**
 * Convert PascalCase to kebab-case and remove 'Page' suffix
 * @param name PascalCase name (e.g., AboutMePage)
 * @returns kebab-case path (e.g., about-me)
 */
function formatPathFromComponentName(name: string): string {
  // Remove .vue extension if present
  const baseName = name.endsWith(".vue") ? name.slice(0, -4) : name;

  // Remove Page suffix if present
  const withoutPageSuffix = baseName.endsWith("Page")
    ? baseName.slice(0, -4)
    : baseName;

  // Convert PascalCase to kebab-case
  return withoutPageSuffix
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

/**
 * Extract component name from file path
 * @param filePath Path to the component file
 * @returns Component name without extension
 */
function getComponentNameFromPath(filePath: string): string {
  // Get the file name from the path
  return filePath.split("/").pop() || "";
}

/**
 * Generate routes from page components using Vite's import.meta.glob
 * @returns Array of route configurations
 */
function generateRoutesFromPages(): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];

  const pages = import.meta.glob("@/pages/**/*.vue");

  for (const path in pages) {
    const componentName = getComponentNameFromPath(path);
    const routePath = `/${formatPathFromComponentName(componentName)}`;

    // Special case for home page
    const finalPath = routePath.toLowerCase() === "/home" ? "/" : routePath;

    routes.push({
      path: finalPath,
      name: componentName,
      component: pages[path],
    });
  }

  return routes;
}

// Generate routes from pages directory
const routes: RouteRecordRaw[] = generateRoutesFromPages();

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
