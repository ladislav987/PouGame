/**
 * Handles the keydown event to update movement flags.
 * @param {KeyboardEvent} event - The keyboard event.
 * @param {Object} movement - An object representing movement states (e.g., { a: false, d: false }).
 * @param {boolean} isGameOver - Indicates if the game is over; prevents movement if true.
 */
export function handleKeyDown(event, movement, isGameOver) {
    if (isGameOver) return; // Do nothing if the game is over
    switch (event.key.toLowerCase()) {
        case 'a':
            movement.a = true; // Move left
            break;
        case 'd':
            movement.d = true; // Move right
            break;
    }
}

/**
 * Handles the keyup event to reset movement flags.
 * @param {KeyboardEvent} event - The keyboard event.
 * @param {Object} movement - An object representing movement states (e.g., { a: false, d: false }).
 * @param {boolean} isGameOver - Indicates if the game is over; prevents movement reset if true.
 */
export function handleKeyUp(event, movement, isGameOver) {
    if (isGameOver) return; // Do nothing if the game is over
    switch (event.key.toLowerCase()) {
        case 'a':
            movement.a = false; // Stop moving left
            break;
        case 'd':
            movement.d = false; // Stop moving right
            break;
    }
}
