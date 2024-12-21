// main.js
import { createLivingRoom } from './rooms/livingRoom.js';

// Globálne premenné pre kameru, scénu, renderer
let camera, scene, renderer;

init();
animate();

function init() {
    // Vytvorenie scény
    scene = new THREE.Scene();

    // Veľkosť okna
    const width = window.innerWidth;
    const height = window.innerHeight;

    // OrthographicCamera parametre:
    // left, right, top, bottom, near, far
    // Pomocná premenná aspect, aby scéna nebola deformovaná
    const aspect = width / height;
    // Nastavíme výšku "virtuálneho" zobrazenia na 10 (napr. -5..+5)
    const viewSize = 5;

    camera = new THREE.OrthographicCamera(
        -aspect * viewSize,  // left
        aspect * viewSize,   // right
        viewSize,            // top
        -viewSize,           // bottom
        0.1,                 // near
        100                  // far
    );

    // Kamera bude "kolmo" na scénu, takže ju môžeme posunúť napr. v osi Z
    camera.position.set(0, 0, 10);
    camera.lookAt(scene.position);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    document.getElementById('game-container').appendChild(renderer.domElement);

    // Zavoláme funkciu, ktorá pridá do scény 2D obývačku
    createLivingRoom(scene);

    // Event listener na zmenu veľkosti okna
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;
    const viewSize = 5;

    // Update kamery
    camera.left = -aspect * viewSize;
    camera.right = aspect * viewSize;
    camera.top = viewSize;
    camera.bottom = -viewSize;
    camera.updateProjectionMatrix();

    // Update veľkosti rendereru
    renderer.setSize(width, height);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
