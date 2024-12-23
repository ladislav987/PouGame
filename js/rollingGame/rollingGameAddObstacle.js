//rollingGameAddObstacle.js
export function addObstacle(scene, obstacles, x, y, z) {
    const loader = new THREE.GLTFLoader();
    loader.load('./texture/toilet_paper/scene.gltf', (gltf) => {
        const model = gltf.scene;
        model.scale.set(3, 3, 3);
        model.position.set(x, y, z);

        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        // Vytvor bounding box
        const boundingBox = new THREE.Box3().setFromObject(model);

        // Posunutie bounding boxu tak, aby sedel s modelom
        const correction = new THREE.Vector3(0, 0, 0); // Korekcia v osi Y
        boundingBox.min.add(correction);
        boundingBox.max.add(correction);

        model.userData.boundingBox = boundingBox;

        // // Vizualizácia bounding boxu
        // const helper = new THREE.Box3Helper(boundingBox);
        // scene.add(helper);

        scene.add(model);
        obstacles.push(model);
    });
}
