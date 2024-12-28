// textureLoader.js
import * as THREE from './threejs/build/three.module.js';

export const textures = {};

/**
 * Preloads textures.
 * @param {Object} texturePaths - An object containing texture names and their corresponding file paths.
 * @returns {Promise} - A promise that resolves when all textures are loaded.
 */
export function preloadTextures(texturePaths) {
    const loader = new THREE.TextureLoader();
    const promises = Object.entries(texturePaths).map(([key, path]) => {
        return new Promise((resolve, reject) => {
            loader.load(
                path,
                (texture) => {
                    textures[key] = texture; // Store the loaded texture in the textures object
                    resolve();
                },
                undefined,
                (error) => reject(error) // Reject the promise if an error occurs
            );
        });
    });

    return Promise.all(promises); // Wait for all texture loading promises to resolve
}
