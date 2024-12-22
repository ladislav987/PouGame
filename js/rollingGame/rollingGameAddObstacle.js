export function addObstacle(scene, obstacles, x, y, z) {
    const geometryCylinder = new THREE.CylinderGeometry(1, 1, 5, 32);
    const materialCylinder = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const obstacle = new THREE.Mesh(geometryCylinder, materialCylinder);
    obstacle.position.set(x, y, z);
    scene.add(obstacle);
    obstacles.push(obstacle);
}
