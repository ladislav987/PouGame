// rollingGame.js

export function createRollingGame(scene) {
    // Tu nepridávame Poua
    const texture = new THREE.TextureLoader().load('texture/rollingGameBg.jpg');
    const geometry = new THREE.PlaneGeometry(10, 6);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const backgroundPlane = new THREE.Mesh(geometry, material);
    backgroundPlane.position.set(0, 0, 0);
    scene.add(backgroundPlane);
}
