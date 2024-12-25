// rollingGameAddSunLight.js

export function addSunLight(scene) {
    // Vytvorenie DirectionalLight na imitáciu slnka
    const sunLight = new THREE.DirectionalLight(0xffffff, 1); // Biele svetlo
    sunLight.position.set(10, 50, 50); // Pozícia svetla
    sunLight.castShadow = true; // Povolenie tieňov

    // Nastavenie oblasti, kde budú tiene renderované
    sunLight.shadow.camera.left = -50;
    sunLight.shadow.camera.right = 50;
    sunLight.shadow.camera.top = 50;
    sunLight.shadow.camera.bottom = -50;
    sunLight.shadow.camera.near = 1;
    sunLight.shadow.camera.far = 200;

    // Nastavenie rozlíšenia tieňov
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;

    // Pridanie svetla do scény
    scene.add(sunLight);

    // Nastavenie cieľa svetla
    const target = new THREE.Object3D();
    target.position.set(0, 0, 0); // Smer na stred scény
    scene.add(target);
    sunLight.target = target;

    // Vizualizácia oblasti tieňov (voliteľné pre ladenie)
    const shadowHelper = new THREE.CameraHelper(sunLight.shadow.camera);
    scene.add(shadowHelper);
}
