export class DynamicArray {
    private _array: number[];
    private _length: number = 0;
    private _capacity: number = 1;

    constructor() {
        this._array = new Array(1).fill(0); // Start small explicit zeros
    }

    private resize(): void {
        this._capacity *= 2;
        const new_array: number[] = new Array(this._capacity).fill(0);
        for (let i = 0; i < this._length; i++) {
            new_array[i] = this._array[i];
        }
        this._array = new_array;
    }

    pushback(n: number): void {
        if (this._length === this._capacity) {
            this.resize();
        }
        this._array[this._length] = n;
        this._length++;
    }

    popback(): void {
        if (this._length > 0) {
            this._length--;
        }
    }

    get(i: number): number {
        if (i < 0 || i >= this._length) {
            throw new RangeError("Index out of bounds");
        }
        return this._array[i];
    }

    insert(i: number, n: number): void {
        if (i < 0 || i > this._length) {
            throw new RangeError("Index out of bounds");
        }
        if (this._length === this._capacity) {
            this.resize();
        }
        for (let j = this._length; j > i; j--) {
            this._array[j] = this._array[j - 1];
        }
        this._array[i] = n;
        this._length++;
    }

    print(): void {
        const output = this._array.slice(0, this._length).join(" ");
        console.log(output || "");
    }

    getLength(): number {
        return this._length;
    }

    getCapacity(): number {
        return this._capacity;
    }
}
