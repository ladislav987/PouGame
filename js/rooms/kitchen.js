// kitchen.js
import { addPou } from '../pou.js';

let appleMesh = null;

// Premenné pre drag & drop
let isDragging = false;
let selectedObject = null;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(); // normalizované súradnice myši

export function createKitchen(scene) {
    // Vytvoríme pozadie
    const texture = new THREE.TextureLoader().load('texture/kitchen.jpg');
    const geometryBG = new THREE.PlaneGeometry(10, 6);
    const materialBG = new THREE.MeshBasicMaterial({ map: texture });
    const backgroundPlane = new THREE.Mesh(geometryBG, materialBG);
    backgroundPlane.position.set(0, 0, 0);
    scene.add(backgroundPlane);

    // Uložíme si pozadie do window, aby sme ho mohli intersectovať
    window.sceneBackground = backgroundPlane;

    // Pridáme Poua
    addPou(scene);

    // Jablko
    const appleTexture = new THREE.TextureLoader().load('texture/apple2.png');
    const geometryApple = new THREE.PlaneGeometry(1, 1); // jablko ~ 1×1
    const materialApple = new THREE.MeshBasicMaterial({
        map: appleTexture,
        transparent: true,
    });
    appleMesh = new THREE.Mesh(geometryApple, materialApple);
    appleMesh.position.set(2, -1, 0.1);
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
    //    (camera je v window.camera, nastavená v init.js)
    raycaster.setFromCamera(mouse, window.camera);

    // 3) Zistíme, či lúč preťal appleMesh
    const intersects = raycaster.intersectObjects([appleMesh], false);
    if (intersects.length > 0) {
        isDragging = true;
        selectedObject = appleMesh;
    }
}

function onMouseMove(event) {
    if (!isDragging || !selectedObject) return;

    // 1) Normalizované súradnice
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // 2) Na zistenie polohy v scéne s OrthographicCamera
    const vector = new THREE.Vector3(mouse.x, mouse.y, 0);
    vector.unproject(window.camera);

    // 3) Nastavíme jablku novú pozíciu
    selectedObject.position.x = vector.x;
    selectedObject.position.y = vector.y;
    // Z ostáva 0.1, aby bolo mierne vpredu
}

function onMouseUp() {
    isDragging = false;
    selectedObject = null;
}
