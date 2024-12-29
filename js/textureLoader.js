// textureLoader.js
import * as THREE from './threejs/build/three.module.js';

const texturePaths = [
    'texture/pou2.png',
    'texture/livingroom.jpg',
    'texture/playground.jpg',
    'texture/kitchen.jpg',
    'texture/apple2.png',
    'texture/sky.jpg',
    'texture/health.png',
    'texture/hunger.png',
    'texture/joy.png',
    'texture/toilet_paper/textures/TP_shader_diffuse.png',
];

/**
 * Načíta všetky textúry a vráti Promise,
 * ktorý rozresolve s objektom, kde key je cesta
 * a value je THREE.Texture.
 */
export function preloadAllTextures() {
    return new Promise((resolve, reject) => {
        const loader = new THREE.TextureLoader();
        const loadedTextures = {};
        let loadedCount = 0;

        texturePaths.forEach((path) => {
            loader.load(
                path,
                (texture) => {
                    loadedTextures[path] = texture;
                    loadedCount++;
                    // Keď máme načítané všetky, rozresolve Promise
                    if (loadedCount === texturePaths.length) {
                        resolve(loadedTextures);
                    }
                },
                undefined,
                (error) => {
                    console.error('Chyba pri načítaní textúry:', path, error);
                    reject(error);
                }
            );
        });
    });
}
