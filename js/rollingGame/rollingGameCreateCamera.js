/**
 * Creates and sets up the perspective camera for the game.
 * @returns {THREE.PerspectiveCamera} - The configured perspective camera.
 */
export function createCamera() {
    // Create a perspective camera with a field of view of 70 degrees
    const camera = new THREE.PerspectiveCamera(
        70, // Field of view
        window.innerWidth / window.innerHeight, // Aspect ratio
        0.01, // Near clipping plane
        1000  // Far clipping plane
    );

    // Set the initial camera position
    camera.position.set(0, 10, 150); // Positioned above and behind the player
    camera.lookAt(0, 1, 0); // Point the camera towards the center of the scene

    return camera;
}
