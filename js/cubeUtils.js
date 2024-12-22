// cubeUtils.js
import * as THREE from './threejs/build/three.module.js';

export function createStateCube(color, xPosition, iconPath) {
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

    // Load the icon texture
    const loader = new THREE.TextureLoader();
    loader.load(iconPath, (texture) => {
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(0.5, 0.5, 1); // Adjust the scale as needed
        sprite.position.set(0, 0, 0.5); // Position the sprite in front of the cube
        group.add(sprite);
    });

    return group;
}

export function updateCubeScale(cube, value) {
    cube.children[0].scale.y = value / 100;
    cube.children[0].position.y = (value / 100 - 1) / 2;
}