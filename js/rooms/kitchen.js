// kitchen.js
import { addPou } from '../pou.js';
import { textures } from '../textureLoader.js'; // Import of preloaded textures

let appleMesh = null;

// Variables for drag & drop functionality
let isDragging = false;
let selectedObject = null;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(); // Normalized mouse coordinates

export function createKitchen(scene) {
    // Use the preloaded texture for the background
    const materialBG = new THREE.MeshBasicMaterial({ map: textures.kitchen });
    const geometryBG = new THREE.PlaneGeometry(13.265, 10);
    const backgroundPlane = new THREE.Mesh(geometryBG, materialBG);
    backgroundPlane.position.set(0, 0, 0);
    scene.add(backgroundPlane);

    // Save the background plane for potential use with the Raycaster
    window.sceneBackground = backgroundPlane;

    // Add Pou character
    addPou(scene);

    // Add an apple using the preloaded texture
    const geometryApple = new THREE.PlaneGeometry(1, 1); // Size of the apple
    const materialApple = new THREE.MeshBasicMaterial({
        map: textures.apple,
        transparent: true,
    });
    appleMesh = new THREE.Mesh(geometryApple, materialApple);
    appleMesh.position.set(2, -1, 0.1); // Position of the apple
    scene.add(appleMesh);

    // Event listeners for mouse drag
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
}

/**
 * Checks if the user clicked on the apple (appleMesh).
 */
function onMouseDown(event) {
    // 1) Normalize mouse coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // 2) Set raycaster from the mouse position into the camera view
    raycaster.setFromCamera(mouse, window.camera);

    // 3) Check if the ray intersects with appleMesh
    const intersects = raycaster.intersectObjects([appleMesh], false);
    if (intersects.length > 0) {
        // The user clicked on the apple
        isDragging = true;
        selectedObject = appleMesh;
    }
}

function onMouseMove(event) {
    if (!isDragging || !selectedObject) return;

    // 1) Normalize mouse coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // 2) Convert mouse coordinates to scene coordinates
    const vector = new THREE.Vector3(mouse.x, mouse.y, 0);
    vector.unproject(window.camera);

    // 3) Set the new position of the apple
    selectedObject.position.x = vector.x;
    selectedObject.position.y = vector.y;
    // Keep z = 0.1
}

function onMouseUp() {
    isDragging = false;
    selectedObject = null;
}