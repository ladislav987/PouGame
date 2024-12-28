// pou.js

import { textures } from './textureLoader.js';

/**
 * Adds a 2D Pou character to the scene.
 * @param {THREE.Scene} scene - The scene to which the Pou character will be added
 */
export function addPou(scene) {
    const pouTexture = textures.pou; // The texture for Pou
    const geometry = new THREE.PlaneGeometry(2, 2);

    // If pou.png has a transparent background, enable transparency
    const material = new THREE.MeshBasicMaterial({
        map: pouTexture,
        transparent: true,
    });

    // Create a Mesh and slightly shift it forward on the Z-axis (e.g., 0.1)
    // to ensure it doesn't render behind the background
    const pouMesh = new THREE.Mesh(geometry, material);
    pouMesh.position.set(0, 0, 0.1);

    // Add the Pou character to the scene
    scene.add(pouMesh);
}
