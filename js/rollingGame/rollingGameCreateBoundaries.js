// rollingGameCreateBoundaries.js
export function createBoundaries(scene, boundaries) {
    const boundaryMaterial = new THREE.MeshBasicMaterial({ visible: false });

    const leftBoundary = new THREE.Mesh(new THREE.BoxGeometry(1, 10, 1500), boundaryMaterial);
    leftBoundary.position.set(-10.5, 0, 0);
    scene.add(leftBoundary);
    boundaries.push(leftBoundary);

    const rightBoundary = new THREE.Mesh(new THREE.BoxGeometry(1, 10, 1500), boundaryMaterial);
    rightBoundary.position.set(10.5, 0, 0);
    scene.add(rightBoundary);
    boundaries.push(rightBoundary);
}