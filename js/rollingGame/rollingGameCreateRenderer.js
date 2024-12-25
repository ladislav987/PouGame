// rollingGameCreateRenderer.js
export function createRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // Povolenie tieňovania
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Jemné tiene
    return renderer;
}
