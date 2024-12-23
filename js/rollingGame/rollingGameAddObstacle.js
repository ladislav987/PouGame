//rollingGameAddObstacle.js
export function addObstacle(scene, obstacles, x, y, z) {
    const loader = new THREE.GLTFLoader(); // GLTFLoader je dostupný priamo z HTML
    loader.load('./texture/toilet_paper/scene.gltf', (gltf) => {
            const model = gltf.scene;
            model.scale.set(3, 3, 3); // Nastav mierku podľa potreby
            model.position.set(x, y, z);
            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            // Vytvoríme Box3 pre kolízne detekcie
            const box = new THREE.Box3().setFromObject(model);
            model.userData.boundingBox = box; // Uložíme bounding box ako userData

            scene.add(model);
            obstacles.push(model); // Uloženie pre kolízie
        },
        (progress) => {
            console.log(`Načítanie modelu: ${(progress.loaded / progress.total) * 100}%`);
        },
        (error) => {
            console.error('Chyba pri načítavaní modelu:', error);
        });
}
