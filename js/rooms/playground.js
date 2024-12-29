import { addPou } from '../pou.js';

export function createPlayground(scene) {
    // Načítanie textúry s nastaveniami
    const texture = new THREE.TextureLoader().load('texture/playground.jpg', (tex) => {
        tex.wrapS = THREE.ClampToEdgeWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.minFilter = THREE.LinearFilter;  // alebo THREE.NearestFilter
        tex.generateMipmaps = false;         // vypneme mipmapy
    });

    // Nastavíme veľkosť PlaneGeometry na 13.265 x 10
    const geometry = new THREE.PlaneGeometry(13.265, 10);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const backgroundPlane = new THREE.Mesh(geometry, material);
    backgroundPlane.position.set(0, 0, 0);
    scene.add(backgroundPlane);

    // Pridanie Poua
    addPou(scene);
}