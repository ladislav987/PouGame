// rollingGameAddObstacle.js
export function addObstacle(scene, obstacles, x, y, z) {
    const loader = new THREE.GLTFLoader();
    loader.load('./texture/toilet_paper/scene.gltf', (gltf) => {
            const model = gltf.scene;
            model.scale.set(3, 3, 3);
            model.position.set(x, y, z);

            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true; // Model vrhá tiene
                    child.receiveShadow = true; // Model prijíma tiene
                }
            });

            // Vytvor bounding box pre kolízne detekcie
            const boundingBox = new THREE.Box3().setFromObject(model);

            // Korekcia bounding boxu, ak je potrebná
            const correction = new THREE.Vector3(0, 0, 0); // Uprav podľa potreby
            boundingBox.min.add(correction);
            boundingBox.max.add(correction);

            model.userData.boundingBox = boundingBox;

            scene.add(model);
            obstacles.push(model);
        },
        undefined,
        (error) => {
            console.error('Chyba pri načítavaní modelu:', error);
        });
}
