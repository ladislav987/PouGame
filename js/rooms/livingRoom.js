// livingRoom.js

// Exportovaná funkcia, ktorú volá main.js
export function createLivingRoom(scene) {
    // Namiesto boxu použijeme Plane ako "pozadie" obývačky
    const texture = new THREE.TextureLoader().load('texture/livingroom.jpg');

    // PlaneGeometry šírka a výška
    // Napr. 10 x 6, aby nám to zapasovalo do kamery
    const geometry = new THREE.PlaneGeometry(10, 6);

    // MeshBasicMaterial, aby sa neaplikovalo žiadne svetlo (2D look)
    const material = new THREE.MeshBasicMaterial({ map: texture });

    const backgroundPlane = new THREE.Mesh(geometry, material);
    // Umiestnime plane do stredu (0,0)
    backgroundPlane.position.set(0, 0, 0);
    scene.add(backgroundPlane);
}
