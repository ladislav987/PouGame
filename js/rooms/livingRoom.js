// livingRoom.js
import { addPou } from '../pou.js';  // cesta uprav podľa toho, kde sa nachádza pou.js

export function createLivingRoom(scene) {
    const texture = new THREE.TextureLoader().load('texture/livingroom.jpg');
    const geometry = new THREE.PlaneGeometry(10, 6);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const backgroundPlane = new THREE.Mesh(geometry, material);
    backgroundPlane.position.set(0, 0, 0);
    scene.add(backgroundPlane);

    // Pridanie Poua
    addPou(scene);
}
