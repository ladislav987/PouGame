// ui.js

// Importujeme funkcie na vytváranie jednotlivých miestností
import { createLivingRoom } from './rooms/livingRoom.js';
import { createKitchen } from './rooms/kitchen.js';
import { createPlayground } from './rooms/playground.js';
import { createRollingGame } from './rooms/rollingGame.js';

/**
 * Vytvorí HTML tlačidlá (Living, Kitchen, Playground, RollingGame)
 * a priradí im funkciu switchRoom(roomName).
 *
 * @param {Function} switchRoomFn - Funkcia, ktorú voláme pri zmene miestnosti
 */
export function createRoomButtons(switchRoomFn) {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '10px';
    container.style.left = '10px';
    container.style.zIndex = '999'; // Aby boli tlačidlá nad canvasom

    // Názvy miestností (kľúče) a text na tlačidle
    const rooms = [
        { key: 'living', label: 'Living Room' },
        { key: 'kitchen', label: 'Kitchen' },
        { key: 'playground', label: 'Playground' },
        { key: 'rolling', label: 'Rolling Game' }
    ];

    rooms.forEach(room => {
        const btn = document.createElement('button');
        btn.textContent = room.label;
        btn.style.marginRight = '5px';
        btn.onclick = () => switchRoomFn(room.key); // pri kliknutí voláme switchRoomFn("living"/"kitchen"/... atď.)
        container.appendChild(btn);
    });

    document.body.appendChild(container);
}

/**
 * Odstráni všetky objekty zo scény a zavolá príslušnú funkciu
 * na vytvorenie danej miestnosti.
 *
 * @param {THREE.Scene} scene - Scéna, do ktorej chceme pridať miestnosť
 * @param {string} roomName - reťazec určujúci, ktorú miestnosť zobraziť
 */
export function switchRoom(scene, roomName) {
    // Vymažeme staré objekty zo scény
    // Poznámka: scene.clear() zmaže *všetko*, vrátane kamery a svetiel,
    // preto radšej mažeme len potomkov, ktorí sú "Mesh" (čiže plane s textúrami).
    // Alebo môžeš spraviť .clear() a znova pridať kameru, ak to tak vyhovuje.

    // Kopia potomkov, aby sme mohli scene.remove() volať bezpečne v cykle
    const toRemove = [...scene.children];
    toRemove.forEach(obj => {
        // Ak nechceš vymazať kameru/lights, skontroluj typ
        if (obj.isMesh) scene.remove(obj);
    });

    // Podľa parametra `roomName` pridáme do scény novú miestnosť
    switch (roomName) {
        case 'living':
            createLivingRoom(scene);
            break;
        case 'kitchen':
            createKitchen(scene);
            break;
        case 'playground':
            createPlayground(scene);
            break;
        case 'rolling':
            createRollingGame(scene);
            break;
        default:
            // Defaultne napr. obývačka
            createLivingRoom(scene);
    }
}
