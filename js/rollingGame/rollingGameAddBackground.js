export function addBackground(scene, texturePath) {
    // Vytvorenie geometrie sféry
    const geometrySphere = new THREE.SphereGeometry(500, 32, 32); // Väčší polomer sféry

    // Načítanie textúry
    const loader = new THREE.TextureLoader();
    loader.load(
        texturePath, // Cesta k textúre
        function (texture) {
            // Vytvorenie materiálu s textúrou
            const materialSphere = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.BackSide // Nastavenie BackSide, aby bolo pozadie viditeľné zvnútra sféry
            });

            // Vytvorenie sféry
            const sphere = new THREE.Mesh(geometrySphere, materialSphere);
            sphere.position.set(0, 0, 0); // Pozícia sféry
            scene.add(sphere); // Pridanie sféry do scény
        },
        undefined,
        function (error) {
            console.error('Chyba pri načítavaní textúry:', error);
        }
    );
}