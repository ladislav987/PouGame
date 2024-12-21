// rollingGame.js

export function createRollingGame(scene) {
    // Textúra pre nejaký mini-game background
    const texture = new THREE.TextureLoader().load('texture/rollingGameBg.jpg');

    const geometry = new THREE.PlaneGeometry(10, 6);
    const material = new THREE.MeshBasicMaterial({ map: texture });

    const rollingGamePlane = new THREE.Mesh(geometry, material);
    rollingGamePlane.position.set(0, 0, 0);

    scene.add(rollingGamePlane);
}
