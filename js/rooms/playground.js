// playground.js
import { addPou } from '../pou.js';
import { textures } from '../textureLoader.js'; // Import prednačítaných textúr

export function createPlayground(scene) {
    // Použitie prednačítanej textúry pre ihrisko
    const material = new THREE.MeshBasicMaterial({ map: textures.playground });
    const geometry = new THREE.PlaneGeometry(13.265, 10);

    const backgroundPlane = new THREE.Mesh(geometry, material);
    backgroundPlane.position.set(0, 0, 0);
    scene.add(backgroundPlane);

    // Pridanie Poua
    addPou(scene);
}
