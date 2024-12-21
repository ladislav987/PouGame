// kitchen.js

export function createKitchen(scene) {
    // Textúra pre kuchyňu
    const texture = new THREE.TextureLoader().load('texture/kitchen.jpg');

    // PlaneGeometry – 2D
    const geometry = new THREE.PlaneGeometry(10, 6);
    const material = new THREE.MeshBasicMaterial({ map: texture });

    const kitchenPlane = new THREE.Mesh(geometry, material);
    kitchenPlane.position.set(0, 0, 0);

    scene.add(kitchenPlane);
}
