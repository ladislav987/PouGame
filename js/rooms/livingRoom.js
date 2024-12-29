// livingRoom.js
import { addPou } from '../pou.js';
import { textures } from '../textureLoader.js'; // Import of preloaded textures

export function createLivingRoom(scene) {
    // Use the preloaded texture for the living room background
    const material = new THREE.MeshBasicMaterial({ map: textures.livingRoom });
    const geometry = new THREE.PlaneGeometry(13.265, 10);

    const backgroundPlane = new THREE.Mesh(geometry, material);
    backgroundPlane.position.set(0, 0, 0);
    scene.add(backgroundPlane);

    // Add the Pou character
    addPou(scene);
}
