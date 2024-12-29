// rollingGameAddObstacle.js
export function addObstacle(scene, obstacles, x, y, z) {
    const loader = new THREE.GLTFLoader();
    loader.load('./texture/toilet_paper/scene.gltf', (gltf) => {
            const model = gltf.scene;
            model.scale.set(3, 3, 3); // Nastavenie mierky modelu
            model.position.set(x, y, z); // Prednastavená pozícia

            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true; // Model vrhá tiene
                    child.receiveShadow = true; // Model prijíma tiene
                }
            });

            // Vytvorenie bounding boxu
            const boundingBox = new THREE.Box3().setFromObject(model);

            // Posun modelu tak, aby bol zarovnaný s rovinou
            const modelHeight = boundingBox.max.y - boundingBox.min.y; // Výška modelu
            const groundOffset = boundingBox.min.y; // Spodná hrana bounding boxu
            model.position.y -= groundOffset; // Posun modelu na rovinu

            // Aktualizácia bounding boxu po zarovnaní
            boundingBox.setFromObject(model);
            model.userData.boundingBox = boundingBox;

            scene.add(model);
            obstacles.push(model);
        },
        undefined,
        (error) => {
            console.error('Chyba pri načítavaní modelu:', error);
        });
}