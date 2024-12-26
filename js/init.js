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

    // Inicializácia scény
    scene = new THREE.Scene();

    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;
    const viewSize = 5;

    // Vytvorenie kamery
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

    // Uloženie kamery na globálnu premennú pre prístup z iných modulov
    window.camera = camera;

    // Vytvorenie rendereru
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    document.getElementById('game-container').appendChild(renderer.domElement);

    // Predvolená miestnosť (obývačka)
    createLivingRoom(scene);

    // Tlačidlá na prepínanie miestností
    createRoomButtons((roomName) => switchRoom(scene, roomName));

    // Inicializácia stavu Poua
    const pouState = new PouState();

    // Vytvorenie kociek pre vizualizáciu zdravia, hladu a radosti
    const healthCube = createStateCube(0xff0000, -1, textures.health);
    const hungerCube = createStateCube(0x00ff00, 0, textures.hunger);
    const joyCube = createStateCube(0x0000ff, 1, textures.joy);

    scene.add(healthCube);
    scene.add(hungerCube);
    scene.add(joyCube);

    // Aktualizácia stavu Poua každých 10 sekúnd
    setInterval(() => {
        pouState.decreaseHunger(2);
        pouState.decreaseHealth(1);
        pouState.decreaseJoy(1);
        console.log('Aktualizovaný stav Poua:', pouState.getState());

        // Aktualizácia mierky kociek podľa aktuálneho stavu
        updateCubeScale(healthCube, pouState.getState().health);
        updateCubeScale(hungerCube, pouState.getState().hunger);
        updateCubeScale(joyCube, pouState.getState().joy);
    }, 10000);

    // Event listener pre zmenu veľkosti okna
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