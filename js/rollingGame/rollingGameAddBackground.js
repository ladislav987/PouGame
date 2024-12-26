// rollingGameAddBackground.js
export function addBackground(scene, texture) {
    // Vytvorenie geometrie sféry
    const geometrySphere = new THREE.SphereGeometry(500, 32, 32); // Väčší polomer sféry

    // Vytvorenie materiálu s prednačítanou textúrou
    const materialSphere = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide, // Nastavenie BackSide, aby bolo pozadie viditeľné zvnútra sféry
    });

    // Vytvorenie sféry
    const sphere = new THREE.Mesh(geometrySphere, materialSphere);
    sphere.position.set(0, 0, 0); // Pozícia sféry
    scene.add(sphere); // Pridanie sféry do scény
}

