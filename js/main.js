// main.js
import { preloadAllTextures } from './textureLoader.js';
import { init, camera, scene, renderer } from './init.js';

preloadAllTextures()
    .then((loadedTextures) => {
        // Uložíš si ich do nejakej premennej, prípadne do window
        window.loadedTextures = loadedTextures;
        // Alebo ak chceš, posuň ich ako argument do init
        init(loadedTextures);

        // Až potom spustíš animáciu
        animate();
    })
    .catch((error) => {
        console.error('Nepodarilo sa načítať všetky textúry:', error);
    });

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
