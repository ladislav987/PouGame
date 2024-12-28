// rollingGameCheckCollision.js

/**
 * Checks if two objects are colliding using their bounding boxes.
 * @param {THREE.Object3D} obj1 - The first object.
 * @param {THREE.Object3D} obj2 - The second object.
 * @returns {boolean} - True if the objects' bounding boxes intersect, false otherwise.
 */
export function checkCollision(obj1, obj2) {
    const obj1Box = new THREE.Box3().setFromObject(obj1);
    const obj2Box = new THREE.Box3().setFromObject(obj2);
    return obj1Box.intersectsBox(obj2Box);
}
