// kitchen.js
import { addPou } from '../pou.js';

export function createKitchen(scene) {
    const texture = new THREE.TextureLoader().load('texture/kitchen.jpg');
    const geometry = new THREE.PlaneGeometry(10, 6);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const backgroundPlane = new THREE.Mesh(geometry, material);
    backgroundPlane.position.set(0, 0, 0);
    scene.add(backgroundPlane);

    addPou(scene);
}
