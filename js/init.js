// init.js
import { createLivingRoom } from './rooms/livingRoom.js';
import { createRoomButtons, switchRoom } from './ui.js';

export let camera, scene, renderer;

export function init() {
    scene = new THREE.Scene();

    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;
    const viewSize = 5;

    // Vytvoríme OrthographicCamera
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

    // Uložíme ju do window, aby bola dostupná aj v kitchen.js
    window.camera = camera;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    document.getElementById('game-container').appendChild(renderer.domElement);

    // Defaultná miestnosť (obývačka)
    createLivingRoom(scene);

    // Tlačidlá na prepínanie miestností
    createRoomButtons((roomName) => {
        switchRoom(scene, roomName);
    });

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
