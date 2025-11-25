import { describe, test, expect, beforeEach, vi } from 'vitest';
import { Queue } from './queue';

describe('Queue', () => {
    let queue: Queue<number>;

    beforeEach(() => {
        queue = new Queue();
    });

    describe('initialization', () => {
        test('should initialize empty', () => {
            expect(queue.isEmpty()).toBe(true);
            expect(queue.size()).toBe(0);
        });
    });

    describe('enqueue', () => {
        test('should enqueue single element', () => {
            queue.enqueue(10);
            expect(queue.size()).toBe(1);
            expect(queue.isEmpty()).toBe(false);
            expect(queue.peek()).toBe(10);
        });

        test('should enqueue multiple elements', () => {
            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
            expect(queue.size()).toBe(3);
            expect(queue.peek()).toBe(1);
        });

        test('should maintain FIFO order', () => {
            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
            expect(queue.dequeue()).toBe(1);
            expect(queue.dequeue()).toBe(2);
            expect(queue.dequeue()).toBe(3);
        });
    });

    describe('dequeue', () => {
        test('should dequeue single element', () => {
            queue.enqueue(10);
            const value = queue.dequeue();
            expect(value).toBe(10);
            expect(queue.size()).toBe(0);
            expect(queue.isEmpty()).toBe(true);
        });

        test('should dequeue multiple elements in FIFO order', () => {
            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
            expect(queue.dequeue()).toBe(1);
            expect(queue.dequeue()).toBe(2);
            expect(queue.dequeue()).toBe(3);
            expect(queue.isEmpty()).toBe(true);
        });

        test('should return null on empty queue', () => {
            expect(queue.dequeue()).toBeNull();
            expect(queue.size()).toBe(0);
        });

        test('should update size correctly', () => {
            queue.enqueue(1);
            queue.enqueue(2);
            queue.dequeue();
            expect(queue.size()).toBe(1);
        });

        test('should handle dequeue to empty state', () => {
            queue.enqueue(1);
            queue.dequeue();
            expect(queue.isEmpty()).toBe(true);
            expect(queue.peek()).toBeNull();
        });
    });

    describe('peek', () => {
        test('should peek single element', () => {
            queue.enqueue(10);
            expect(queue.peek()).toBe(10);
            expect(queue.size()).toBe(1); // Should not remove
        });

        test('should always return front element', () => {
            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
            expect(queue.peek()).toBe(1);
        });

        test('should return null on empty queue', () => {
            expect(queue.peek()).toBeNull();
        });

        test('should not modify queue', () => {
            queue.enqueue(1);
            queue.enqueue(2);
            queue.peek();
            queue.peek();
            queue.peek();
            expect(queue.size()).toBe(2);
            expect(queue.peek()).toBe(1);
        });
    });

    describe('isEmpty', () => {
        test('should return true for new queue', () => {
            expect(queue.isEmpty()).toBe(true);
        });

        test('should return false after enqueue', () => {
            queue.enqueue(1);
            expect(queue.isEmpty()).toBe(false);
        });

        test('should return true after all elements dequeued', () => {
            queue.enqueue(1);
            queue.dequeue();
            expect(queue.isEmpty()).toBe(true);
        });
    });

    describe('size', () => {
        test('should return 0 for empty queue', () => {
            expect(queue.size()).toBe(0);
        });

        test('should increase after enqueue', () => {
            queue.enqueue(1);
            expect(queue.size()).toBe(1);
            queue.enqueue(2);
            expect(queue.size()).toBe(2);
            queue.enqueue(3);
            expect(queue.size()).toBe(3);
        });

        test('should decrease after dequeue', () => {
            queue.enqueue(1);
            queue.enqueue(2);
            queue.dequeue();
            expect(queue.size()).toBe(1);
            queue.dequeue();
            expect(queue.size()).toBe(0);
        });

        test('should handle mixed operations', () => {
            queue.enqueue(1);
            queue.enqueue(2);
            queue.dequeue();
            queue.enqueue(3);
            queue.enqueue(4);
            queue.dequeue();
            expect(queue.size()).toBe(2);
        });
    });

    describe('printQueue', () => {
        test('should print single element', () => {
            const consoleSpy = vi.spyOn(console, 'log');
            queue.enqueue(10);
            queue.printQueue();
            expect(consoleSpy).toHaveBeenCalledWith('10 -> None');
            consoleSpy.mockRestore();
        });

        test('should print multiple elements', () => {
            const consoleSpy = vi.spyOn(console, 'log');
            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
            queue.printQueue();
            expect(consoleSpy).toHaveBeenCalledWith('1 -> 2 -> 3 -> None');
            consoleSpy.mockRestore();
        });

        test('should print empty queue', () => {
            const consoleSpy = vi.spyOn(console, 'log');
            queue.printQueue();
            expect(consoleSpy).toHaveBeenCalledWith('None');
            consoleSpy.mockRestore();
        });
    });

    describe('FIFO behavior', () => {
        test('should maintain FIFO order', () => {
            const items = [1, 2, 3, 4, 5];
            for (const item of items) {
                queue.enqueue(item);
            }

            const result: number[] = [];
            while (!queue.isEmpty()) {
                result.push(queue.dequeue()!);
            }

            expect(result).toEqual(items);
        });

        test('should handle interleaved operations', () => {
            queue.enqueue(1);
            queue.enqueue(2);
            expect(queue.dequeue()).toBe(1);
            queue.enqueue(3);
            expect(queue.dequeue()).toBe(2);
            queue.enqueue(4);
            expect(queue.dequeue()).toBe(3);
            expect(queue.dequeue()).toBe(4);
            expect(queue.isEmpty()).toBe(true);
        });
    });

    describe('edge cases', () => {
        test('should handle null values', () => {
            const nullQueue = new Queue<null>();
            nullQueue.enqueue(null);
            expect(nullQueue.size()).toBe(1);
            expect(nullQueue.peek()).toBeNull();
            expect(nullQueue.dequeue()).toBeNull();
            expect(nullQueue.size()).toBe(0);
        });

        test('should handle string values', () => {
            const stringQueue = new Queue<string>();
            stringQueue.enqueue('hello');
            stringQueue.enqueue('world');
            expect(stringQueue.dequeue()).toBe('hello');
            expect(stringQueue.dequeue()).toBe('world');
        });

        test('should handle object values', () => {
            const objQueue = new Queue<{ key: string }>();
            objQueue.enqueue({ key: 'value1' });
            objQueue.enqueue({ key: 'value2' });
            expect(objQueue.dequeue()).toEqual({ key: 'value1' });
            expect(objQueue.dequeue()).toEqual({ key: 'value2' });
        });
    });

    describe('large queue', () => {
        test('should handle large number of elements', () => {
            const n = 1000;
            for (let i = 0; i < n; i++) {
                queue.enqueue(i);
            }

            expect(queue.size()).toBe(n);
            expect(queue.peek()).toBe(0);

            for (let i = 0; i < n; i++) {
                expect(queue.dequeue()).toBe(i);
            }

            expect(queue.isEmpty()).toBe(true);
        });
    });
});

