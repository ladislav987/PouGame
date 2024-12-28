import { addObstacle } from "./rollingGameAddObstacle.js";

/**
 * Sets up the first level by removing existing obstacles
 * and adding new ones to the scene.
 * @param {THREE.Scene} scene - The scene where the obstacles will be added.
 * @param {Array<THREE.Object3D>} obstacles - An array to store the obstacles.
 */
export function setupLevel1(scene, obstacles) {
    // Remove old obstacles from the scene
    obstacles.forEach((obstacle) => scene.remove(obstacle));
    obstacles.length = 0; // Clear the obstacles array

    // Add new obstacles for Level 1
    addObstacle(scene, obstacles, 0, 2.5, 100);
    addObstacle(scene, obstacles, 5, 2.5, 50);
    addObstacle(scene, obstacles, -5, 2.5, 20);
}

/**
 * Sets up the second level by removing existing obstacles
 * and adding new ones with increased difficulty.
 * @param {THREE.Scene} scene - The scene where the obstacles will be added.
 * @param {Array<THREE.Object3D>} obstacles - An array to store the obstacles.
 */
export function setupLevel2(scene, obstacles) {
    // Remove old obstacles from the scene
    obstacles.forEach((obstacle) => scene.remove(obstacle));
    obstacles.length = 0; // Clear the obstacles array

    // Add new obstacles for Level 2
    addObstacle(scene, obstacles, 0, 2.5, 80);
    addObstacle(scene, obstacles, 7, 2.5, 40);
    addObstacle(scene, obstacles, -7, 2.5, 20);
    addObstacle(scene, obstacles, 3, 2.5, 60);
}
