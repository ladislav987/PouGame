import { addPou } from '../pou.js';

let appleMesh = null;

// Premenné pre drag & drop
let isDragging = false;
let selectedObject = null;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(); // normalizované súradnice myši

export function createKitchen(scene) {
    // Načítanie textúry pre pozadie s nastaveniami
    const texture = new THREE.TextureLoader().load('texture/kitchen.jpg', (tex) => {
        tex.wrapS = THREE.ClampToEdgeWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.minFilter = THREE.LinearFilter;  // alebo THREE.NearestFilter
        tex.generateMipmaps = false;         // vypneme mipmapy
    });

    // Nastavíme veľkosť PlaneGeometry na 13.265 x 10, aby pozadie pokrývalo celé zorné pole kamery
    const geometryBG = new THREE.PlaneGeometry(13.265, 10);
    const materialBG = new THREE.MeshBasicMaterial({ map: texture });
    const backgroundPlane = new THREE.Mesh(geometryBG, materialBG);
    backgroundPlane.position.set(0, 0, 0);
    scene.add(backgroundPlane);

    // Uložíme pozadie pre prípadný Raycaster
    window.sceneBackground = backgroundPlane;

    // Pridáme Poua
    addPou(scene);

    // Pridáme jablko
    const appleTexture = new THREE.TextureLoader().load('texture/apple2.png');
    const geometryApple = new THREE.PlaneGeometry(1, 1); // veľkosť jablka
    const materialApple = new THREE.MeshBasicMaterial({
        map: appleTexture,
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
