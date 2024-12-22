// init.js
import { createLivingRoom } from './rooms/livingRoom.js';
import { createRoomButtons, switchRoom } from './ui.js';
import { PouState } from './pouState.js';
import * as THREE from './threejs/build/three.module.js';
import { createStateCube, updateCubeScale } from './cubeUtils.js';

export let camera, scene, renderer;

export function init() {
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

    // Room switching buttons
    createRoomButtons((roomName) => {
        switchRoom(scene, roomName);
    });

    // Create PouState instance
    const pouState = new PouState();

    // Create cubes for health, hunger, and joy with respective icons
    const healthCube = createStateCube(0xff0000, -1, 'texture/health.png');
    const hungerCube = createStateCube(0x00ff00, 0, 'texture/hunger.png');
    const joyCube = createStateCube(0x0000ff, 1, 'texture/joy.png');

    scene.add(healthCube);
    scene.add(hungerCube);
    scene.add(joyCube);

    // Decrease hunger every 30 seconds
    setInterval(() => {
        pouState.decreaseHunger(2);
        pouState.decreaseHealth(1);
        pouState.decreaseJoy(1);
        console.log('State updated:', pouState.getState());

        // Update cube scales
        updateCubeScale(healthCube, pouState.getState().health);
        updateCubeScale(hungerCube, pouState.getState().hunger);
        updateCubeScale(joyCube, pouState.getState().joy);
    }, 10000);

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