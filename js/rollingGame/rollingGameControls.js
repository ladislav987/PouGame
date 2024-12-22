export function handleKeyDown(event, movement, isGameOver) {
    if (isGameOver) return;
    switch (event.key.toLowerCase()) {
        case 'a': movement.a = true; break;
        case 'd': movement.d = true; break;
    }
}

export function handleKeyUp(event, movement, isGameOver) {
    if (isGameOver) return;
    switch (event.key.toLowerCase()) {
        case 'a': movement.a = false; break;
        case 'd': movement.d = false; break;
    }
}
