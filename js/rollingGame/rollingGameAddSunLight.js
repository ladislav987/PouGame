// rollingGameAddSunLight.js

export function addSunLight(scene, renderer) {
    // Create a DirectionalLight to simulate sunlight
    const sunLight = new THREE.DirectionalLight(0xffffff, 1); // White light
    sunLight.position.set(30, 50, -50); // Position the light higher and farther away
    sunLight.castShadow = true; // Enable shadows

    // Set the area for shadow rendering
    sunLight.shadow.camera.left = -80;
    sunLight.shadow.camera.right = 80;
    sunLight.shadow.camera.top = 80;
    sunLight.shadow.camera.bottom = -80;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 200;

    // Set shadow resolution
    sunLight.shadow.mapSize.width = 8192;
    sunLight.shadow.mapSize.height = 8192;

    // Enable soft shadows
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Add the light to the scene
    scene.add(sunLight);

    // Create a target object for the light
    const target = new THREE.Object3D();
    target.position.set(0, 0, 0); // Point the light toward the platform
    scene.add(target);
    sunLight.target = target;

    return { sunLight };
}