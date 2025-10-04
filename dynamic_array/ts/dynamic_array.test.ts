import { DynamicArray } from './dynamic_array';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';

describe('DynamicArray', () => {
    let consoleSpy: any;

    beforeEach(() => {
        consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    test('pushback empty', () => {
        const arr = new DynamicArray();
        arr.pushback(10);
        expect(arr.get(0)).toBe(10);
        expect(arr.getLength()).toBe(1);
        expect(arr.getCapacity()).toBe(1);  // No resize yet
    });

    test('pushback with elements and resize', () => {
        const arr = new DynamicArray();
        arr.pushback(1);
        arr.pushback(2);  // Triggers resize to cap=2
        arr.pushback(3);  // Triggers resize to cap=4
        expect(arr.getLength()).toBe(3);
        expect(arr.getCapacity()).toBe(4);  // Doubled twice
        expect(arr.get(0)).toBe(1);
        expect(arr.get(1)).toBe(2);
        expect(arr.get(2)).toBe(3);
    });

    test('pushback beyond initial', () => {
        const arr = new DynamicArray();
        for (let i = 1; i <= 5; i++) {  // Push 5 times: resizes 1→2, 2→4, 4→8
            arr.pushback(i);
        }
        expect(arr.getLength()).toBe(5);
        expect(arr.getCapacity()).toBe(8);  // Final doubled cap
        expect([0, 1, 2, 3, 4].map(i => arr.get(i))).toEqual([1, 2, 3, 4, 5]);
    });

    test('popback non-empty', () => {
        const arr = new DynamicArray();
        arr.pushback(1);
        arr.pushback(2);
        arr.pushback(3);
        arr.popback();
        expect(arr.getLength()).toBe(2);  // No down-resize
        expect(arr.get(0)).toBe(1);
        expect(arr.get(1)).toBe(2);
    });

    test('popback empty', () => {
        const arr = new DynamicArray();
        arr.popback();
        expect(arr.getLength()).toBe(0);
    });

    test('insert middle', () => {
        const arr = new DynamicArray();
        arr.pushback(1);
        arr.pushback(2);
        arr.pushback(3);
        arr.insert(1, 10);  // Insert at index 1
        expect(arr.getLength()).toBe(4);
        expect([0, 1, 2, 3].map(i => arr.get(i))).toEqual([1, 10, 2, 3]);
    });

    test('insert at end', () => {
        const arr = new DynamicArray();
        arr.pushback(1);
        arr.pushback(2);
        arr.pushback(3);
        arr.insert(3, 4);  // i == length, no shift
        expect(arr.getLength()).toBe(4);
        expect([0, 1, 2, 3].map(i => arr.get(i))).toEqual([1, 2, 3, 4]);
    });

    test('insert with resize', () => {
        const arr = new DynamicArray();
        arr.pushback(1);  // cap=1 → resize to 2 on next
        arr.pushback(2);  // cap=2 → resize to 4 on insert if full
        arr.insert(1, 10);  // Triggers resize to 4
        expect(arr.getLength()).toBe(3);
        expect(arr.getCapacity()).toBe(4);
        expect([0, 1, 2].map(i => arr.get(i))).toEqual([1, 10, 2]);
    });

    test('get valid', () => {
        const arr = new DynamicArray();
        arr.pushback(42);
        expect(arr.get(0)).toBe(42);
    });

    test('get invalid', () => {
        const arr = new DynamicArray();
        expect(() => arr.get(0)).toThrow(RangeError);  // Empty
        arr.pushback(1);
        expect(() => arr.get(1)).toThrow(RangeError);  // Beyond length
    });

    test('insert invalid index', () => {
        const arr = new DynamicArray();
        arr.pushback(1);
        expect(() => arr.insert(-1, 99)).toThrow(RangeError);  // Negative
        expect(() => arr.insert(2, 99)).toThrow(RangeError);  // Beyond length
    });

    test('print', () => {
        const arr = new DynamicArray();
        arr.pushback(1);
        arr.pushback(2);
        arr.print();
        expect(consoleSpy).toHaveBeenCalledWith('1 2');
    });

    test('print empty', () => {
        const arr = new DynamicArray();
        arr.print();
        expect(consoleSpy).toHaveBeenCalledWith('');  // Empty string
    });

    test('is full-like', () => {
        const arr = new DynamicArray();
        arr.pushback(1);  // length=1, cap=1 → "full"
        expect(arr.getLength()).toBe(arr.getCapacity());
    });

    test('is empty-like', () => {
        const arr = new DynamicArray();
        expect(arr.getLength()).toBe(0);
        arr.pushback(1);
        expect(arr.getLength()).toBeGreaterThan(0);
    });
});