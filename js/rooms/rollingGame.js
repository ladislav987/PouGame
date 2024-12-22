export let camera, renderer, controls, scene; // Globálne premenlivé
let animationId;
let pouSphere; // Globálna referencia na Poua
const movement = { w: false, s: false, a: false, d: false }; // Stav stlačených kláves
const speed = 0.1; // Rýchlosť pohybu

export function createRollingGame(existingScene) {
    // Odstránenie starého canvas
    const oldCanvas = document.querySelector('#game-container canvas');
    if (oldCanvas) oldCanvas.remove();

    // Inicializácia scény, ak ešte neexistuje
    scene = existingScene || new THREE.Scene();

    // Vytvoríme novú perspektívnu kameru pre 3D pohľad
    camera = new THREE.PerspectiveCamera(
        70, // uhol záberu
        window.innerWidth / window.innerHeight, // pomer strán
        0.01, // blízka rovina
        1000 // vzdialená rovina
    );
    camera.position.set(0, 10, 150); // Kamera nad Pou a mierne vzadu
    camera.lookAt(0, 1, 0); // Kamera smeruje priamo na Pou

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('game-container').appendChild(renderer.domElement);

    // Ovládanie kamery pomocou OrbitControls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Plynulé ovládanie
    controls.dampingFactor = 0.05;
    controls.enableRotate = false; // Zakáže otáčanie kamery

    // Plošina (3× dlhšia v smere Z)
    const geometryPlane = new THREE.PlaneGeometry(20, 1500); // šírka 20, dĺžka 1500
    const materialPlane = new THREE.MeshBasicMaterial({ color: 0x747570, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometryPlane, materialPlane);
    plane.rotation.x = -Math.PI / 2; // Normála plošiny smeruje nahor
    scene.add(plane);

    // Pridanie Poua ako gule
    const geometrySphere = new THREE.SphereGeometry(1, 32, 32); // Guľa s polomerom 1
    const texturePou = new THREE.TextureLoader().load('texture/pou.png'); // Textúra Poua
    const materialSphere = new THREE.MeshBasicMaterial({ map: texturePou });
    pouSphere = new THREE.Mesh(geometrySphere, materialSphere);
    pouSphere.position.set(0, 1, 145); // Pou je na začiatku plošiny
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

    // Kamera sleduje Poua
    const cameraOffset = new THREE.Vector3(0, 10, 15); // Offset kamery od Pou
    camera.position.copy(pouSphere.position.clone().add(cameraOffset)); // Nastav pozíciu kamery
    camera.lookAt(pouSphere.position); // Kamera smeruje na Pou
    controls.target.copy(pouSphere.position); // Aktualizácia cieľa kamery

    controls.update(); // Plynulé ovládanie kamery
    renderer.render(scene, camera);
}
