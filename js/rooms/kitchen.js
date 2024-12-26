import { addPou } from '../pou.js';
import { textures } from '../textureLoader.js'; // Import prednačítaných textúr

let appleMesh = null;

// Premenné pre drag & drop
let isDragging = false;
let selectedObject = null;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(); // normalizované súradnice myši

export function createKitchen(scene) {
    // Použitie prednačítanej textúry pre pozadie
    const materialBG = new THREE.MeshBasicMaterial({ map: textures.kitchen });
    const geometryBG = new THREE.PlaneGeometry(13.265, 10);
    const backgroundPlane = new THREE.Mesh(geometryBG, materialBG);
    backgroundPlane.position.set(0, 0, 0);
    scene.add(backgroundPlane);

    // Uložíme pozadie pre prípadný Raycaster
    window.sceneBackground = backgroundPlane;

    // Pridáme Poua
    addPou(scene);

    // Pridáme jablko pomocou prednačítanej textúry
    const geometryApple = new THREE.PlaneGeometry(1, 1); // veľkosť jablka
    const materialApple = new THREE.MeshBasicMaterial({
        map: textures.apple,
        transparent: true,
    });
    appleMesh = new THREE.Mesh(geometryApple, materialApple);
    appleMesh.position.set(2, -1, 0.1); // umiestnenie jablka
    scene.add(appleMesh);

    // Event listenery pre ťahanie myšou
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
}

/**
 * Zistí, či klikáme na jablko (appleMesh).
 */
function onMouseDown(event) {
    // 1) Normalizované súradnice myši
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // 2) Nastavíme raycaster z myši do kamery
    raycaster.setFromCamera(mouse, window.camera);

    // 3) Zistíme, či lúč preťal appleMesh
    const intersects = raycaster.intersectObjects([appleMesh], false);
    if (intersects.length > 0) {
        // Klikli sme na jablko
        isDragging = true;
        selectedObject = appleMesh;
    }
}

function onMouseMove(event) {
    if (!isDragging || !selectedObject) return;

    // 1) Normalizované súradnice
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // 2) Prepočet myši na súradnice scény
    const vector = new THREE.Vector3(mouse.x, mouse.y, 0);
    vector.unproject(window.camera);

    // 3) Nastavíme novú pozíciu jablka
    selectedObject.position.x = vector.x;
    selectedObject.position.y = vector.y;
    // Zachovávame z=0.1
}

function onMouseUp() {
    isDragging = false;
    selectedObject = null;
}
