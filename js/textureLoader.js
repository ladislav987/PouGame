// textureLoader.js
import * as THREE from './threejs/build/three.module.js';

export const textures = {};

/**
 * Prednačítanie textúr.
 * @param {Object} texturePaths - Objekt s názvami a cestami k textúram.
 * @returns {Promise} - Sľub, ktorý sa vyrieši po načítaní všetkých textúr.
 */
export function preloadTextures(texturePaths) {
    const loader = new THREE.TextureLoader();
    const promises = Object.entries(texturePaths).map(([key, path]) => {
        return new Promise((resolve, reject) => {
            loader.load(
                path,
                (texture) => {
                    textures[key] = texture;
                    resolve();
                },
                undefined,
                (error) => reject(error)
            );
        });
    });

    return Promise.all(promises);
}
