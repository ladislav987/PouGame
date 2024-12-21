// pou.js

/**
 * Pridá do scény 2D postavičku Poua.
 * @param {THREE.Scene} scene - scéna, do ktorej sa má Pou pridať
 */
export function addPou(scene) {
    // Načítame textúru (napr. 'pou.png') z priečinka 'texture/'
    const pouTexture = new THREE.TextureLoader().load('texture/pou2.png');

    // Vytvoríme PlaneGeometry s veľkosťou napr. 2×2 (podľa toho, aký veľký má byť Pou)
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Ak má pou.png priesvitné pozadie, nastavíme transparent: true
    const material = new THREE.MeshBasicMaterial({
        map: pouTexture,
        transparent: true
    });

    // Vytvoríme Mesh a mierne ho posunieme dopredu na osi Z (napr. 0.1),
    // aby sa nevykresľoval za pozadím
    const pouMesh = new THREE.Mesh(geometry, material);
    pouMesh.position.set(0, 0, 0.1);

    // Pridáme Poua do scény
    scene.add(pouMesh);
}
