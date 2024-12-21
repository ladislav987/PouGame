// pouState.js

export class PouState {
    constructor() {
        this.health = 100;
        this.hunger = 100;
        this.joy = 100;
    }

    // Method to decrease health
    decreaseHealth(amount) {
        this.health = Math.max(0, this.health - amount);
    }

    // Method to increase health
    increaseHealth(amount) {
        this.health = Math.min(100, this.health + amount);
    }

    // Method to decrease hunger
    decreaseHunger(amount) {
        this.hunger = Math.max(0, this.hunger - amount);
    }

    // Method to increase hunger
    increaseHunger(amount) {
        this.hunger = Math.min(100, this.hunger + amount);
    }

    // Method to decrease joy
    decreaseJoy(amount) {
        this.joy = Math.max(0, this.joy - amount);
    }

    // Method to increase joy
    increaseJoy(amount) {
        this.joy = Math.min(100, this.joy + amount);
    }

    // Method to get the current state
    getState() {
        return {
            health: this.health,
            hunger: this.hunger,
            joy: this.joy
        };
    }
}