/**
 * Handles window resize events to update the camera and renderer settings.
 * Ensures that the aspect ratio and renderer size adapt to the new window dimensions.
 * @param {THREE.Camera} camera - The camera used in the scene.
 * @param {THREE.Renderer} renderer - The renderer used to render the scene.
 */
export function onWindowResize(camera, renderer) {
    // Update the camera's aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); // Recalculate the projection matrix with the new aspect ratio

    // Update the renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);
}
