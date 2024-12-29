import { addObstacle } from "./rollingGameAddObstacle.js";

/**
 * Sets up the first level by removing existing obstacles
 * and adding new ones to the scene.
 * @param {THREE.Scene} scene - The scene where the obstacles will be added.
 * @param {Array<THREE.Object3D>} obstacles - An array to store the obstacles.
 */
export function setupLevel1(scene, obstacles) {
    obstacles.forEach((obstacle) => scene.remove(obstacle));
    obstacles.length = 0;

    addObstacle(scene, obstacles, 1, 2, 120);
    addObstacle(scene, obstacles, 0, 2.5, 100);
    addObstacle(scene, obstacles, 5, 2.5, 87);
    addObstacle(scene, obstacles, -5, 2.5, 72);
    addObstacle(scene, obstacles, 2, 2.5, 58);
    addObstacle(scene, obstacles, -3, 2.5, 43);
    addObstacle(scene, obstacles, 6, 2.5, 27);
    addObstacle(scene, obstacles, 3, 2.5, 10);
    addObstacle(scene, obstacles, 4, 2.5, -4);
    addObstacle(scene, obstacles, -2, 2.5, -20);
    addObstacle(scene, obstacles, 1, 2.5, -36);
    addObstacle(scene, obstacles, -6, 2.5, -53);
}


/**
 * Sets up the second level by removing existing obstacles
 * and adding new ones with increased difficulty.
 * @param {THREE.Scene} scene - The scene where the obstacles will be added.
 * @param {Array<THREE.Object3D>} obstacles - An array to store the obstacles.
 */
export function setupLevel2(scene, obstacles) {
    obstacles.forEach((obstacle) => scene.remove(obstacle));
    obstacles.length = 0;

    addObstacle(scene, obstacles, 0, 2.5, 80);
    addObstacle(scene, obstacles, 7, 2.5, 60);
    addObstacle(scene, obstacles, -7, 2.5, 40);
    addObstacle(scene, obstacles, 3, 2.5, 20);
    addObstacle(scene, obstacles, -3, 2.5, 0);
    addObstacle(scene, obstacles, 5, 2.5, -20);
    addObstacle(scene, obstacles, -5, 2.5, -40);
    addObstacle(scene, obstacles, 2, 2.5, -60);
    addObstacle(scene, obstacles, 4, 2.5, -80);
    addObstacle(scene, obstacles, -2, 2.5, -100);
    addObstacle(scene, obstacles, 6, 2.5, -120);
    addObstacle(scene, obstacles, -6, 2.5, -140);

    addObstacle(scene, obstacles, 1, 2.5, 110);
    addObstacle(scene, obstacles, -4, 2.5, 130);
    addObstacle(scene, obstacles, 5, 2.5, 150);
    addObstacle(scene, obstacles, -6, 2.5, 170);
    addObstacle(scene, obstacles, -3, 2.5, 125);

}