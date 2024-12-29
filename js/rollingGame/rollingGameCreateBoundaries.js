/**
 * Creates invisible boundaries on the left and right sides of the game area.
 * These boundaries are used for collision detection to prevent the player from moving outside the playable area.
 * @param {THREE.Scene} scene - The scene to which the boundaries will be added.
 * @param {Array<THREE.Mesh>} boundaries - An array to store the created boundary objects.
 */
export function createBoundaries(scene, boundaries) {
    const boundaryMaterial = new THREE.MeshBasicMaterial({ visible: false }); // Invisible material for boundaries

    // Create the left boundary
    const leftBoundary = new THREE.Mesh(new THREE.BoxGeometry(1, 10, 1500), boundaryMaterial);
    leftBoundary.position.set(-10.5, 0, 0); // Position on the left
    scene.add(leftBoundary);
    boundaries.push(leftBoundary);

    // Create the right boundary
    const rightBoundary = new THREE.Mesh(new THREE.BoxGeometry(1, 10, 1500), boundaryMaterial);
    rightBoundary.position.set(10.5, 0, 0); // Position on the right
    scene.add(rightBoundary);
    boundaries.push(rightBoundary);
}
