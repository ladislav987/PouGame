export let camera, renderer, controls, scene;
let animationId;

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

    // Svetlá
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

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

function animate() {
    animationId = requestAnimationFrame(animate);
    controls.update(); // Plynulé ovládanie kamery
    renderer.render(scene, camera);
}
