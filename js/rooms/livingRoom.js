// livingRoom.js
import { addPou } from '../pou.js';

export function createLivingRoom(scene) {
    // Načítanie textúry s callbackom:
    const texture = new THREE.TextureLoader().load('texture/livingroom.jpg', (tex) => {
        tex.wrapS = THREE.ClampToEdgeWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.minFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
    });

    // Kamera pri viewSize=5 pokrýva 10 na výšku a ~13.265 na šírku.
    // (presná šírka = 2 * aspect * viewSize = 2 * (1300/980) * 5)
    // Môžeme to nastaviť napevno, napr. 13.265 x 10, alebo mierne zaokrúhliť:
    const geometry = new THREE.PlaneGeometry(13.265, 10);

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const backgroundPlane = new THREE.Mesh(geometry, material);
    backgroundPlane.position.set(0, 0, 0);
    scene.add(backgroundPlane);

    // Pridanie Poua
    addPou(scene);
}
