// livingRoom.js
import { addPou } from '../pou.js';
import { textures } from '../textureLoader.js'; // Import prednačítaných textúr

export function createLivingRoom(scene) {
    // Použitie prednačítanej textúry pre obývačku
    const material = new THREE.MeshBasicMaterial({ map: textures.livingRoom });
    const geometry = new THREE.PlaneGeometry(13.265, 10);

    const backgroundPlane = new THREE.Mesh(geometry, material);
    backgroundPlane.position.set(0, 0, 0);
    scene.add(backgroundPlane);

    // Pridanie Poua
    addPou(scene);
}
