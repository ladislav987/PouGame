// rollingGameAddSunLight.js

export function addSunLight(scene, renderer) {
    // Vytvorenie DirectionalLight na imitáciu slnka
    const sunLight = new THREE.DirectionalLight(0xffffff, 1); // Biele svetlo
    sunLight.position.set(30, 50, -50); // Svetlo je ďalej a vyššie
    sunLight.castShadow = true; // Povolenie tieňov

    // Nastavenie oblasti, kde budú tiene renderované
    sunLight.shadow.camera.left = -80;
    sunLight.shadow.camera.right = 80;
    sunLight.shadow.camera.top = 80;
    sunLight.shadow.camera.bottom = -80;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 200;

    // Nastavenie rozlíšenia tieňov
    sunLight.shadow.mapSize.width = 8192;
    sunLight.shadow.mapSize.height = 8192;

    // Povolenie jemných tieňov
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Pridanie svetla do scény
    scene.add(sunLight);

    // Nastavenie cieľa svetla
    const target = new THREE.Object3D();
    target.position.set(0, 0, 0); // Smerovanie na platformu
    scene.add(target);
    sunLight.target = target;

    // Vizualizácia oblasti tieňov
    const lightHelper = new THREE.CameraHelper(sunLight.shadow.camera);
    scene.add(lightHelper);

    return { sunLight, lightHelper };
}
