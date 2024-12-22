export function createCamera() {
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.set(0, 10, 150);
    camera.lookAt(0, 1, 0);
    return camera;
}
