// rollingGameLevels.js
import {addObstacle} from "./rollingGameAddObstacle.js";

export function setupLevel1(scene, obstacles) {
    obstacles.forEach((obstacle) => scene.remove(obstacle)); // Odstránenie starých prekážok
    obstacles.length = 0;

    addObstacle(scene, obstacles, 0, 2.5, 100);
    addObstacle(scene, obstacles, 5, 2.5, 50);
    addObstacle(scene, obstacles, -5, 2.5, 20);
}

export function setupLevel2(scene, obstacles) {
    obstacles.forEach((obstacle) => scene.remove(obstacle)); // Odstránenie starých prekážok
    obstacles.length = 0;

    addObstacle(scene, obstacles, 0, 2.5, 80);
    addObstacle(scene, obstacles, 7, 2.5, 40);
    addObstacle(scene, obstacles, -7, 2.5, 20);
    addObstacle(scene, obstacles, 3, 2.5, 60);
}
