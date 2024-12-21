// init.js
import { createLivingRoom } from './rooms/livingRoom.js';
import { createRoomButtons, switchRoom } from './ui.js';

export let camera, scene, renderer;

export function init() {
    scene = new THREE.Scene();

    // ... (OrthographicCamera nastavenia ako predtým)
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;
    const viewSize = 5;

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

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    document.getElementById('game-container').appendChild(renderer.domElement);

    // Na začiatku vytvoríme default miestnosť (living)
    createLivingRoom(scene);

    // Tu zavoláme vytvorenie tlačidiel
    // switchRoomFn bude anonymná funkcia, ktorá vyvolá switchRoom(scene, roomName)
    createRoomButtons((roomName) => {
        switchRoom(scene, roomName);
    });

    // A event listener na resize
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
