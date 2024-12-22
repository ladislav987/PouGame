export let camera, renderer, controls, scene;
let animationId;
let pouSphere; // Globálna referencia na Poua
const movement = { w: false, s: false, a: false, d: false }; // Stav stlačených kláves
const speed = 0.1; // Rýchlosť pohybu

export function createRollingGame(existingScene) {
    // Odstránenie starého canvas
    const oldCanvas = document.querySelector('#game-container canvas');
    if (oldCanvas) oldCanvas.remove();

    // Ak už máme scénu, použijeme ju
    scene = existingScene || new THREE.Scene();

    // Vytvoríme novú perspektívnu kameru pre 3D pohľad
    camera = new THREE.PerspectiveCamera(
        70, // uhol záberu
        window.innerWidth / window.innerHeight, // pomer strán
        0.01, // blízka rovina
        1000 // vzdialená rovina
    );
    camera.position.set(0, 10, 15); // Kamera nad plošinou a mierne vzadu
    camera.lookAt(0, 0, 0); // Smeruje na stred scény (plošina)

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('game-container').appendChild(renderer.domElement);

    // Ovládanie kamery pomocou OrbitControls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Plošina
    const geometryPlane = new THREE.PlaneGeometry(20, 20); // plošina 20x20
    const materialPlane = new THREE.MeshBasicMaterial({ color: 0x747570, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometryPlane, materialPlane);
    plane.rotation.x = -Math.PI / 2; // Normála plošiny smeruje nahor
    scene.add(plane);

    // Pridanie Poua ako gule
    const geometrySphere = new THREE.SphereGeometry(1, 32, 32); // Guľa s polomerom 1
    const texturePou = new THREE.TextureLoader().load('texture/pou.png'); // Textúra Poua
    const materialSphere = new THREE.MeshBasicMaterial({ map: texturePou });
    pouSphere = new THREE.Mesh(geometrySphere, materialSphere);
    pouSphere.position.set(0, 1, 0); // Umiestnenie na plošinu (zvýšené o 1)
    scene.add(pouSphere);

    // Svetlá
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Event listener pre pohyb pomocou W, S, A, D
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // Aktualizácia veľkosti pri zmene okna
    window.addEventListener('resize', onWindowResize);

    // Zrušenie predchádzajúceho cyklu animácie, ak existuje
    if (animationId) cancelAnimationFrame(animationId);
    animate();
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

    // Pohyb Poua
    if (movement.w) {
        pouSphere.position.z -= speed; // Pohyb dopredu
        pouSphere.rotation.x -= speed; // Rotácia v smere pohybu
    }
    if (movement.s) {
        pouSphere.position.z += speed; // Pohyb dozadu
        pouSphere.rotation.x += speed; // Rotácia v smere pohybu
    }
    if (movement.a) {
        pouSphere.position.x -= speed; // Pohyb doľava
        pouSphere.rotation.z += speed; // Rotácia pri doľava
    }
    if (movement.d) {
        pouSphere.position.x += speed; // Pohyb doprava
        pouSphere.rotation.z -= speed; // Rotácia doprava
    }

    controls.update(); // Plynulé ovládanie kamery
    renderer.render(scene, camera);
}
