// init.js
import { createLivingRoom } from './rooms/livingRoom.js';
import { createRoomButtons, switchRoom } from './ui.js';
import { PouState } from './pouState.js';
import * as THREE from './threejs/build/three.module.js';
import { createStateCube, updateCubeScale } from './cubeUtils.js';
import { preloadTextures, textures } from './textureLoader.js';


export let camera, scene, renderer;

export async function init() {
    // Definujte cesty k textúram
    const texturePaths = {
        pou: 'texture/pou2.png',
        health: 'texture/health.png',
        hunger: 'texture/hunger.png',
        joy: 'texture/joy.png',
        livingRoom: 'texture/livingroom.jpg',
        kitchen: 'texture/kitchen.jpg',
        playground: 'texture/playground.jpg',
        apple: 'texture/apple2.png',
        sky: 'texture/sky.jpg',
    };

    // Načítajte všetky textúry
    try {
        await preloadTextures(texturePaths);
        console.log('Textúry boli úspešne načítané!');
    } catch (error) {
        console.error('Chyba pri načítavaní textúr:', error);
        return;
    }

    // Pokračujte v inicializácii scény
    scene = new THREE.Scene();

    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;
    const viewSize = 5;

    // Create OrthographicCamera
    camera = new THREE.OrthographicCamera(
        -aspect * viewSize,
        aspect * viewSize,
        viewSize,
        -viewSize,
        0.1,
        100
    );
    camera.position.set(0, 0, 10);
    camera.lookAt(scene.position);

    // Save camera to window for access in other modules
    window.camera = camera;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    document.getElementById('game-container').appendChild(renderer.domElement);

    // Default room (living room)
    createLivingRoom(scene);
    createRoomButtons((roomName) => switchRoom(scene, roomName));

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;
    const viewSize = 5;

    camera.left = -aspect * viewSize;
    camera.right = aspect * viewSize;
    camera.top = viewSize;
    camera.bottom = -viewSize;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}