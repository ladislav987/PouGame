// ui.js

import { createLivingRoom } from './rooms/livingRoom.js';
import { createKitchen } from './rooms/kitchen.js';
import { createPlayground } from './rooms/playground.js';
import { createRollingGame } from './rooms/rollingGame.js';

/**
 * Creates HTML buttons (Living Room, Kitchen, Playground, Rolling Game)
 * and assigns them the function `switchRoom(roomName)`.
 *
 * @param {Function} switchRoomFn - The function to call when changing rooms
 */
export function createRoomButtons(switchRoomFn) {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '10px';
    container.style.left = '10px';
    container.style.zIndex = '999'; // Ensures buttons are displayed above the canvas

    // Room names (keys) and button labels
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
        // Call switchRoomFn with the room key when the button is clicked
        btn.onclick = () => switchRoomFn(room.key);
        container.appendChild(btn);
    });

    document.body.appendChild(container);
}

/**
 * Removes all objects from the scene and calls the appropriate function
 * to create the specified room.
 *
 * @param {THREE.Scene} scene - The scene to which the room will be added
 * @param {string} roomName - The name of the room to display
 */
export function switchRoom(scene, roomName) {
    // Clear existing objects from the scene
    // Note: `scene.clear()` removes *everything*, including the camera and lights.
    // Here, we prefer to remove only child objects that are meshes (e.g., planes with textures).
    // Alternatively, you can use `.clear()` and re-add the camera and lights if that suits your needs.

    // Create a copy of the scene's children to safely iterate while removing
    const toRemove = [...scene.children];
    toRemove.forEach(obj => {
        // Avoid removing cameras/lights by checking the object type
        if (obj.isMesh) scene.remove(obj);
    });

    // Add the new room to the scene based on the `roomName` parameter
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
            // Default to the living room if no valid room name is provided
            createLivingRoom(scene);
    }
}