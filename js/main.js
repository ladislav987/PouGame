// main.js
import { init, camera, scene, renderer } from './init.js';

init(); // Initializes the scene, camera, renderer, and buttons
animate();

function animate() {
    // Continuously updates the rendering of the scene
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
