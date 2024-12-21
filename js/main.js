// main.js
import { init, camera, scene, renderer } from './init.js';

init();   // vytvorí scénu, kameru, renderer a tlačidlá
animate();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
