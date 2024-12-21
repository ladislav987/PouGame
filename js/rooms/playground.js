// playground.js

export function createPlayground(scene) {
    // Textúra pre ihrisko (napr. playground.jpg)
    const texture = new THREE.TextureLoader().load('texture/playground.jpg');

    const geometry = new THREE.PlaneGeometry(10, 6);
    const material = new THREE.MeshBasicMaterial({ map: texture });

    const playgroundPlane = new THREE.Mesh(geometry, material);
    playgroundPlane.position.set(0, 0, 0);

    scene.add(playgroundPlane);
}
