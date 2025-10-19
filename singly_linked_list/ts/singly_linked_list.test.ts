import { describe, test, expect, beforeEach, vi } from 'vitest';
import { SinglyLinkedList } from './index';

describe('SinglyLinkedList', () => {
    let ll: SinglyLinkedList<number>;

    beforeEach(() => {
        ll = new SinglyLinkedList();
    });

    describe('insertEnd', () => {
        test('should insert into empty list', () => {
            ll.insertEnd(10);
            expect(ll.head?.value).toBe(10);
            expect(ll.tail?.value).toBe(10);
            expect(ll.head?.next).toBeNull();
        });

        test('should insert multiple elements', () => {
            ll.insertEnd(1);
            ll.insertEnd(2);
            ll.insertEnd(3);
            expect(ll.head?.value).toBe(1);
            expect(ll.tail?.value).toBe(3);
            expect(ll.head?.next?.value).toBe(2);
            expect(ll.head?.next?.next?.value).toBe(3);
        });
    });

    describe('insertStart', () => {
        test('should insert into empty list', () => {
            ll.insertStart(10);
            expect(ll.head?.value).toBe(10);
            expect(ll.tail?.value).toBe(10);
            expect(ll.head?.next).toBeNull();
        });

        test('should insert multiple elements', () => {
            ll.insertStart(1);
            ll.insertStart(2);
            ll.insertStart(3);
            expect(ll.head?.value).toBe(3);
            expect(ll.tail?.value).toBe(1);
            expect(ll.head?.next?.value).toBe(2);
            expect(ll.head?.next?.next?.value).toBe(1);
        });

        test('should work mixed with insertEnd', () => {
            ll.insertEnd(2);
            ll.insertStart(1);
            ll.insertEnd(3);
            expect(ll.head?.value).toBe(1);
            expect(ll.tail?.value).toBe(3);
            const values: number[] = [];
            let current = ll.head;
            while (current) {
                values.push(current.value);
                current = current.next;
            }
            expect(values).toEqual([1, 2, 3]);
        });
    });

    describe('removeStart', () => {
        test('should remove from single element list', () => {
            ll.insertEnd(10);
            ll.removeStart();
            expect(ll.head).toBeNull();
            expect(ll.tail).toBeNull();
        });

        test('should remove from multiple element list', () => {
            ll.insertEnd(1);
            ll.insertEnd(2);
            ll.insertEnd(3);
            ll.removeStart();
            expect(ll.head?.value).toBe(2);
            expect(ll.tail?.value).toBe(3);
        });

        test('should handle empty list', () => {
            ll.removeStart();
            expect(ll.head).toBeNull();
            expect(ll.tail).toBeNull();
        });
    });

    describe('remove', () => {
        test('should remove head element', () => {
            ll.insertEnd(1);
            ll.insertEnd(2);
            ll.insertEnd(3);
            ll.remove(1);
            expect(ll.head?.value).toBe(2);
            expect(ll.tail?.value).toBe(3);
        });

        test('should remove middle element', () => {
            ll.insertEnd(1);
            ll.insertEnd(2);
            ll.insertEnd(3);
            ll.remove(2);
            expect(ll.head?.value).toBe(1);
            expect(ll.head?.next?.value).toBe(3);
            expect(ll.tail?.value).toBe(3);
        });

        test('should remove tail element', () => {
            ll.insertEnd(1);
            ll.insertEnd(2);
            ll.insertEnd(3);
            ll.remove(3);
            expect(ll.head?.value).toBe(1);
            expect(ll.tail?.value).toBe(2);
            expect(ll.tail?.next).toBeNull();
        });

        test('should remove single element', () => {
            ll.insertEnd(10);
            ll.remove(10);
            expect(ll.head).toBeNull();
            expect(ll.tail).toBeNull();
        });

        test('should not modify list if value not found', () => {
            ll.insertEnd(1);
            ll.insertEnd(2);
            ll.insertEnd(3);
            ll.remove(99);
            expect(ll.head?.value).toBe(1);
            expect(ll.tail?.value).toBe(3);
        });

        test('should handle empty list', () => {
            ll.remove(10);
            expect(ll.head).toBeNull();
            expect(ll.tail).toBeNull();
        });

        test('should remove first occurrence of duplicate', () => {
            ll.insertEnd(1);
            ll.insertEnd(2);
            ll.insertEnd(2);
            ll.insertEnd(3);
            ll.remove(2);
            expect(ll.head?.next?.value).toBe(2);
        });
    });

    describe('printList', () => {
        test('should print single element', () => {
            const consoleSpy = vi.spyOn(console, 'log');
            ll.insertEnd(10);
            ll.printList();
            expect(consoleSpy).toHaveBeenCalledWith('10 -> None');
            consoleSpy.mockRestore();
        });

        test('should print multiple elements', () => {
            const consoleSpy = vi.spyOn(console, 'log');
            ll.insertEnd(1);
            ll.insertEnd(2);
            ll.insertEnd(3);
            ll.printList();
            expect(consoleSpy).toHaveBeenCalledWith('1 -> 2 -> 3 -> None');
            consoleSpy.mockRestore();
        });

        test('should print empty list', () => {
            const consoleSpy = vi.spyOn(console, 'log');
            ll.printList();
            expect(consoleSpy).toHaveBeenCalledWith('None');
            consoleSpy.mockRestore();
        });
    });

    describe('list integrity', () => {
        test('should maintain integrity after mixed operations', () => {
            ll.insertEnd(1);
            ll.insertEnd(2);
            ll.insertEnd(3);
            ll.insertStart(0);
            ll.remove(2);
            ll.insertEnd(4);

            const values: number[] = [];
            let current = ll.head;
            while (current) {
                values.push(current.value);
                current = current.next;
            }

            expect(values).toEqual([0, 1, 3, 4]);
            expect(ll.head?.value).toBe(0);
            expect(ll.tail?.value).toBe(4);
        });

        test('should handle large list', () => {
            const n = 100;
            for (let i = 0; i < n; i++) {
                ll.insertEnd(i);
            }

            expect(ll.head?.value).toBe(0);
            expect(ll.tail?.value).toBe(n - 1);

            let count = 0;
            let current = ll.head;
            while (current) {
                count++;
                current = current.next;
            }
            expect(count).toBe(n);
        });
    });
});
