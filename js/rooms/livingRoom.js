// livingRoom.js
import { addPou } from '../pou.js';

export function createLivingRoom(scene) {
    // Zoberieme si z window.loadedTextures
    const texture = window.loadedTextures['texture/livingroom.jpg'];
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;

    const geometry = new THREE.PlaneGeometry(13.265, 10);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const backgroundPlane = new THREE.Mesh(geometry, material);
    backgroundPlane.position.set(0, 0, 0);
    scene.add(backgroundPlane);

    addPou(scene);
}
