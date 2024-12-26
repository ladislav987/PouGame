import * as THREE from './threejs/build/three.module.js';

export function createStateCube(color, xPosition, iconTexture) {
    const geometry = new THREE.BoxGeometry(0.7, 0.7, 0.7); // Adjusted dimensions to half size
    const material = new THREE.MeshBasicMaterial({ color });
    const cube = new THREE.Mesh(geometry, material);

    // Create border lines
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));

    const group = new THREE.Group();
    group.add(cube);
    group.add(line);
    group.position.set(xPosition, 2.4, 0);

    // Check if iconTexture is valid and create sprite
    if (iconTexture instanceof THREE.Texture) {
        const spriteMaterial = new THREE.SpriteMaterial({ map: iconTexture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(0.5, 0.5, 1); // Adjust the scale as needed
        sprite.position.set(0, 0, 0.5); // Position the sprite in front of the cube
        group.add(sprite);
    } else {
        console.warn('Invalid texture passed to createStateCube. Expected an instance of THREE.Texture.');
    }

    return group;
}

export function updateCubeScale(cube, value) {
    cube.children[0].scale.y = value / 100;
    cube.children[0].position.y = (value / 100 - 1) / 2;
}