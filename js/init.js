// init.js
import { createLivingRoom } from './rooms/livingRoom.js';
import { createRoomButtons, switchRoom } from './ui.js';
import { PouState } from './pouState.js';
import * as THREE from './threejs/build/three.module.js';
import { createStateCube, updateCubeScale } from './cubeUtils.js';
import { preloadTextures, textures } from './textureLoader.js';

export let camera, scene, renderer;

export async function init() {
    // Define paths to textures
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

    // Preload all textures
    try {
        await preloadTextures(texturePaths);
        console.log('Textures successfully loaded!');
    } catch (error) {
        console.error('Error loading textures:', error);
        return;
    }

    // Initialize the scene
    scene = new THREE.Scene();

    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;
    const viewSize = 5;

    // Create the camera
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

    // Save the camera globally for access from other modules
    window.camera = camera;

    // Create the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    document.getElementById('game-container').appendChild(renderer.domElement);

    // Set the default room (living room)
    createLivingRoom(scene);

    // Create buttons for switching rooms
    createRoomButtons((roomName) => switchRoom(scene, roomName));

    // Initialize Pou's state
    const pouState = new PouState();

    // Create cubes to visualize health, hunger, and joy levels
    const healthCube = createStateCube(0xff0000, -1, textures.health);
    const hungerCube = createStateCube(0x00ff00, 0, textures.hunger);
    const joyCube = createStateCube(0x0000ff, 1, textures.joy);

    scene.add(healthCube);
    scene.add(hungerCube);
    scene.add(joyCube);

    // Update Pou's state every 10 seconds
    setInterval(() => {
        pouState.decreaseHunger(2);
        pouState.decreaseHealth(1);
        pouState.decreaseJoy(1);
        console.log('Updated Pou state:', pouState.getState());

        // Update cube scales based on current state
        updateCubeScale(healthCube, pouState.getState().health);
        updateCubeScale(hungerCube, pouState.getState().hunger);
        updateCubeScale(joyCube, pouState.getState().joy);
    }, 10000);

    // Event listener for window resize
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