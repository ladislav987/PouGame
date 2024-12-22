export let camera, renderer, controls, scene; // Globálne premenlivé
let animationId;
let pouSphere; // Globálna referencia na Poua
let obstacles = []; // Pole pre prekážky (valce a iné objekty)
const movement = { w: false, s: false, a: false, d: false }; // Stav stlačených kláves
const speed = 0.1; // Rýchlosť pohybu
const autoMoveSpeed = 0.05; // Konštantná rýchlosť pohybu Poua dopredu

export function createRollingGame(existingScene) {
    // Ak existuje existujúca scéna, použijeme ju, inak vytvoríme novú
    scene = existingScene || new THREE.Scene();

    // Odstránenie starého canvas
    const oldCanvas = document.querySelector('#game-container canvas');
    if (oldCanvas) oldCanvas.remove();

    // Kamera
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.set(0, 10, 150);
    camera.lookAt(0, 1, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('game-container').appendChild(renderer.domElement);

    // Ovládanie kamery
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableRotate = false;

    // Plošina
    const geometryPlane = new THREE.PlaneGeometry(20, 1500);
    const materialPlane = new THREE.MeshBasicMaterial({ color: 0x747570, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometryPlane, materialPlane);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    // Pou
    const geometrySphere = new THREE.SphereGeometry(1, 32, 32);
    const texturePou = new THREE.TextureLoader().load('texture/pou.png');
    const materialSphere = new THREE.MeshBasicMaterial({ map: texturePou });
    pouSphere = new THREE.Mesh(geometrySphere, materialSphere);
    pouSphere.position.set(0, 1, 145);
    scene.add(pouSphere);

    // Pridanie valcov (prekážok)
    addObstacle(0, 2.5, 100); // Prvý valec
    addObstacle(5, 2.5, 50);  // Druhý valec
    addObstacle(-5, 2.5, 20); // Tretí valec

    // Svetlá
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Event listener pre pohyb
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    window.addEventListener('resize', onWindowResize);

    if (animationId) cancelAnimationFrame(animationId);
    animate();
}

function addObstacle(x, y, z) {
    const geometryCylinder = new THREE.CylinderGeometry(1, 1, 5, 32);
    const materialCylinder = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const obstacle = new THREE.Mesh(geometryCylinder, materialCylinder);
    obstacle.position.set(x, y, z);
    scene.add(obstacle); // Pridáme prekážku do scény
    obstacles.push(obstacle); // Uložíme do poľa pre kontrolu kolízie
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onKeyDown(event) {
    switch (event.key.toLowerCase()) {
        case 'w': movement.w = true; break;
        case 's': movement.s = true; break;
        case 'a': movement.a = true; break;
        case 'd': movement.d = true; break;
    }
}

function onKeyUp(event) {
    switch (event.key.toLowerCase()) {
        case 'w': movement.w = false; break;
        case 's': movement.s = false; break;
        case 'a': movement.a = false; break;
        case 'd': movement.d = false; break;
    }
}

function animate() {
    animationId = requestAnimationFrame(animate);

    // Konštantný pohyb Poua
    pouSphere.position.z -= autoMoveSpeed;
    pouSphere.rotation.x -= autoMoveSpeed;

    // Manuálny pohyb Poua
    if (movement.w) pouSphere.position.z -= speed;
    if (movement.s) pouSphere.position.z += speed;
    if (movement.a) pouSphere.position.x -= speed;
    if (movement.d) pouSphere.position.x += speed;

    // Kamera
    const cameraOffset = new THREE.Vector3(0, 10, 15);
    camera.position.copy(pouSphere.position.clone().add(cameraOffset));
    camera.lookAt(pouSphere.position);
    controls.target.copy(pouSphere.position);
    controls.update();

    // Kontrola kolízie s každou prekážkou
    for (const obstacle of obstacles) {
        if (checkCollision(pouSphere, obstacle)) {
            console.log(`Kolízia s prekážkou na pozícii: x=${obstacle.position.x}, y=${obstacle.position.y}, z=${obstacle.position.z}`);
            cancelAnimationFrame(animationId); // Zastavenie animácie
            alert('Koniec hry! Pou sa dotkol prekážky.'); // Správa o konci hry
            return;
        }
    }

    renderer.render(scene, camera);
}

function checkCollision(obj1, obj2) {
    const obj1Box = new THREE.Box3().setFromObject(obj1); // Obálka okolo Poua
    const obj2Box = new THREE.Box3().setFromObject(obj2); // Obálka okolo prekážky
    return obj1Box.intersectsBox(obj2Box); // Zisti, či sa obálky prekrývajú
}

