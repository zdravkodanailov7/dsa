import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StaticArray } from './static_array'; // Adjust path if needed

describe('StaticArray', () => {
    describe('insertEnd', () => {
        it('should insert into empty array', () => {
            const arr = new StaticArray(5);
            arr.insertEnd(10);
            expect(arr['_array'][0]).toBe(10);
            expect(arr.getLength()).toBe(1);
        });

        it('should insert with existing elements', () => {
            const arr = new StaticArray(4);
            arr.insertEnd(1);
            arr.insertEnd(2);
            arr.insertEnd(3);
            arr.insertEnd(4);
            expect(arr['_array']).toEqual([1, 2, 3, 4]);
            expect(arr.getLength()).toBe(4);
        });

        it('should not insert when full', () => {
            const arr = new StaticArray(5);
            for (let i = 1; i <= 5; i++) {
                arr.insertEnd(i);
            }
            const initialLength = arr.getLength();
            arr.insertEnd(6);
            expect(arr['_array']).toEqual([1, 2, 3, 4, 5]);
            expect(arr.getLength()).toBe(initialLength);
        });
    });

    describe('removeEnd', () => {
        it('should remove from non-empty array', () => {
            const arr = new StaticArray(5);
            arr.insertEnd(1);
            arr.insertEnd(2);
            arr.insertEnd(3);
            arr.removeEnd();
            expect(arr['_array'].slice(0, 3)).toEqual([1, 2, 0]);
            expect(arr.getLength()).toBe(2);
        });

        it('should handle empty array (zero capacity)', () => {
            const arr = new StaticArray(0);
            expect(arr.removeEnd()).toBe(false);
            expect(arr.getLength()).toBe(0);
        });
    });

    describe('insertMiddle', () => {
        it('should insert in middle', () => {
            const arr = new StaticArray(5);
            arr.insertEnd(1);
            arr.insertEnd(2);
            arr.insertEnd(3);
            arr.insertEnd(4);
            arr.insertMiddle(1, 10);
            expect(arr['_array'].slice(0, 5)).toEqual([1, 10, 2, 3, 4]);
            expect(arr.getLength()).toBe(5);
        });

        it('should insert at end (i === length)', () => {
            const arr = new StaticArray(4);
            arr.insertEnd(1);
            arr.insertEnd(2);
            arr.insertEnd(3);
            arr.insertMiddle(3, 4);
            expect(arr['_array'].slice(0, 4)).toEqual([1, 2, 3, 4]);
            expect(arr.getLength()).toBe(4);
        });
    });

    describe('removeMiddle', () => {
        it('should remove from middle', () => {
            const arr = new StaticArray(4);
            arr.insertEnd(1);
            arr.insertEnd(2);
            arr.insertEnd(3);
            arr.insertEnd(4);
            arr.removeMiddle(1);
            expect(arr['_array'].slice(0, 3)).toEqual([1, 3, 4]);
            expect(arr.getLength()).toBe(3);
        });

        it('should remove from beginning', () => {
            const arr = new StaticArray(3);
            arr.insertEnd(1);
            arr.insertEnd(2);
            arr.insertEnd(3);
            arr.removeMiddle(0);
            expect(arr['_array'].slice(0, 2)).toEqual([2, 3]);
            expect(arr.getLength()).toBe(2);
        });
    });

    describe('printArray', () => {
        it('should print full array', () => {
            const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { });
            const arr = new StaticArray(3);
            arr.insertEnd(1);
            arr.insertEnd(2);
            arr.insertEnd(3);
            arr.printArray();
            expect(consoleSpy).toHaveBeenCalledTimes(3);
            expect(consoleSpy).toHaveBeenNthCalledWith(1, 1);
            expect(consoleSpy).toHaveBeenNthCalledWith(2, 2);
            expect(consoleSpy).toHaveBeenNthCalledWith(3, 3);
            consoleSpy.mockRestore();
        });

        it('should print with extra capacity (zeros)', () => {
            const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { });
            const arr = new StaticArray(4);
            arr.insertEnd(1);
            arr.insertEnd(2);
            arr.printArray();
            expect(consoleSpy).toHaveBeenCalledTimes(4);
            expect(consoleSpy).toHaveBeenNthCalledWith(1, 1);
            expect(consoleSpy).toHaveBeenNthCalledWith(2, 2);
            expect(consoleSpy).toHaveBeenNthCalledWith(3, 0);
            expect(consoleSpy).toHaveBeenNthCalledWith(4, 0);
            consoleSpy.mockRestore();
        });
    });

    describe('isFull and isEmpty', () => {
        it('should detect full', () => {
            const arr = new StaticArray(3);
            arr.insertEnd(1);
            arr.insertEnd(2);
            arr.insertEnd(3);
            expect(arr.isFull()).toBe(true);
        });

        it('should detect empty and non-empty', () => {
            const arr = new StaticArray(5);
            expect(arr.isEmpty()).toBe(true);
            arr.insertEnd(1);
            expect(arr.isEmpty()).toBe(false);
        });
    });
});