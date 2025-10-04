export class StaticArray {
    private _array: number[];
    private _length: number;
    private _capacity: number;

    constructor(capacity: number) {
        this._array = new Array(capacity).fill(0);
        this._length = 0;
        this._capacity = capacity;
    }

    insertEnd(n: number): boolean {
        if (this._length < this._capacity) {
            this._array[this._length] = n;
            this._length += 1;
            return true;
        }
        return false; // Full, no insertion
    }

    removeEnd(): boolean {
        if (this._length > 0) {
            this._array[this._length - 1] = 0;
            this._length -= 1;
            return true;
        }
        return false; // Empty, no removal
    }

    insertMiddle(i: number, n: number): boolean {
        if (i < 0 || i > this._length || this._length >= this._capacity) {
            return false; // Invalid index or full
        }
        // Shift starting from the end to i
        for (let index = this._length - 1; index >= i; index--) {
            this._array[index + 1] = this._array[index];
        }
        // Insert at i
        this._array[i] = n;
        this._length += 1;
        return true;
    }

    removeMiddle(i: number): boolean {
        if (i < 0 || i >= this._length) {
            return false; // Invalid index
        }
        // Shift starting from i + 1 to the end
        for (let index = i + 1; index < this._length; index++) {
            this._array[index - 1] = this._array[index];
        }
        // No need to "remove" this._array[i], since we shifted
        this._array[this._length - 1] = 0; // Optional: clear the last spot
        this._length -= 1;
        return true;
    }

    printArray(): void {
        for (let i = 0; i < this._capacity; i++) {
            console.log(this._array[i]);
        }
    }

    isFull(): boolean {
        return this._length === this._capacity;
    }

    isEmpty(): boolean {
        return this._length === 0;
    }

    getLength(): number {
        return this._length;
    }

    getCapacity(): number {
        return this._capacity;
    }
}