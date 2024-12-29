// rollingGameAddObstacle.js
export function addObstacle(scene, obstacles, x, y, z) {
    const loader = new THREE.GLTFLoader();
    loader.load(
        './texture/toilet_paper/scene.gltf',
        (gltf) => {
            const model = gltf.scene;
            model.scale.set(3, 3, 3); // Set the scale of the model
            model.position.set(x, y, z); // Set the initial position

            // Traverse the model to enable shadow casting and receiving
            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true; // Model casts shadows
                    child.receiveShadow = true; // Model receives shadows
                }
            });

            // Create a bounding box for the model
            const boundingBox = new THREE.Box3().setFromObject(model);

            // Adjust the model's position to align it with the ground plane
            const modelHeight = boundingBox.max.y - boundingBox.min.y; // Model height
            const groundOffset = boundingBox.min.y; // Bottom edge of the bounding box
            model.position.y -= groundOffset; // Align the model with the ground

            // Update the bounding box after alignment
            boundingBox.setFromObject(model);
            model.userData.boundingBox = boundingBox;

            // Add the model to the scene and obstacles array
            scene.add(model);
            obstacles.push(model);
        },
        undefined,
        (error) => {
            console.error('Error loading the model:', error);
        }
    );
}