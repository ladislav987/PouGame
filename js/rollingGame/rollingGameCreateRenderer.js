/**
 * Creates and configures the WebGL renderer for the game.
 * @returns {THREE.WebGLRenderer} - The configured WebGL renderer.
 */
export function createRenderer() {
    // Create a WebGL renderer with antialiasing enabled for smoother edges
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    // Set the renderer size to match the window dimensions
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Enable shadow mapping
    renderer.shadowMap.enabled = true; // Allow rendering of shadows
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Use soft shadows for better visual quality

    return renderer;
}
