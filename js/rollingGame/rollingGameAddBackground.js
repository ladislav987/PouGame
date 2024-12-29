// rollingGameAddBackground.js
export function addBackground(scene, texture) {
    // Create a sphere geometry
    const geometrySphere = new THREE.SphereGeometry(500, 32, 32); // Larger radius for the sphere

    // Create a material with the preloaded texture
    const materialSphere = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide, // Set to BackSide to make the background visible from inside the sphere
    });

    // Create the sphere
    const sphere = new THREE.Mesh(geometrySphere, materialSphere);
    sphere.position.set(0, 0, 0); // Position of the sphere
    scene.add(sphere); // Add the sphere to the scene
}