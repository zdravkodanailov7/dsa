import { describe, test, expect, beforeEach, vi } from 'vitest';
import { DoublyLinkedList } from './doubly_linked_list';

describe('DoublyLinkedList', () => {
    let ll: DoublyLinkedList<number>;

    beforeEach(() => {
        ll = new DoublyLinkedList();
    });

    describe('insertEnd', () => {
        test('should insert into empty list', () => {
            ll.insertEnd(10);
            expect(ll.head.next?.value).toBe(10);
            expect(ll.tail.prev?.value).toBe(10);
            expect(ll.head.next?.next).toBe(ll.tail);
            expect(ll.tail.prev?.prev).toBe(ll.head);
        });

        test('should insert multiple elements', () => {
            ll.insertEnd(1);
            ll.insertEnd(2);
            ll.insertEnd(3);
            expect(ll.head.next?.value).toBe(1);
            expect(ll.tail.prev?.value).toBe(3);
            expect(ll.head.next?.next?.value).toBe(2);
            expect(ll.head.next?.next?.next?.value).toBe(3);
            // Test backward links
            expect(ll.tail.prev?.prev?.value).toBe(2);
            expect(ll.tail.prev?.prev?.prev?.value).toBe(1);
        });
    });

    describe('insertFront', () => {
        test('should insert into empty list', () => {
            ll.insertFront(10);
            expect(ll.head.next?.value).toBe(10);
            expect(ll.tail.prev?.value).toBe(10);
            expect(ll.head.next?.next).toBe(ll.tail);
            expect(ll.tail.prev?.prev).toBe(ll.head);
        });

        test('should insert multiple elements', () => {
            ll.insertFront(1);
            ll.insertFront(2);
            ll.insertFront(3);
            expect(ll.head.next?.value).toBe(3);
            expect(ll.tail.prev?.value).toBe(1);
            expect(ll.head.next?.next?.value).toBe(2);
            expect(ll.head.next?.next?.next?.value).toBe(1);
            // Test backward links
            expect(ll.tail.prev?.prev?.value).toBe(2);
            expect(ll.tail.prev?.prev?.prev?.value).toBe(3);
        });

        test('should work mixed with insertEnd', () => {
            ll.insertEnd(2);
            ll.insertFront(1);
            ll.insertEnd(3);
            expect(ll.head.next?.value).toBe(1);
            expect(ll.tail.prev?.value).toBe(3);
            // Verify forward links
            const values: number[] = [];
            let current = ll.head.next;
            while (current !== ll.tail) {
                values.push(current!.value);
                current = current!.next;
            }
            expect(values).toEqual([1, 2, 3]);
            // Verify backward links
            const valuesBackward: number[] = [];
            current = ll.tail.prev;
            while (current !== ll.head) {
                valuesBackward.push(current!.value);
                current = current!.prev;
            }
            expect(valuesBackward).toEqual([3, 2, 1]);
        });
    });

    describe('removeFront', () => {
        test('should remove from single element list', () => {
            ll.insertEnd(10);
            ll.removeFront();
            expect(ll.isEmpty()).toBe(true);
            expect(ll.head.next).toBe(ll.tail);
            expect(ll.tail.prev).toBe(ll.head);
        });

        test('should remove from multiple element list', () => {
            ll.insertEnd(1);
            ll.insertEnd(2);
            ll.insertEnd(3);
            ll.removeFront();
            expect(ll.head.next?.value).toBe(2);
            expect(ll.tail.prev?.value).toBe(3);
            expect(ll.head.next?.prev).toBe(ll.head);
            expect(ll.tail.prev?.next).toBe(ll.tail);
        });

        test('should handle empty list', () => {
            ll.removeFront();
            expect(ll.isEmpty()).toBe(true);
            expect(ll.head.next).toBe(ll.tail);
            expect(ll.tail.prev).toBe(ll.head);
        });
    });

    describe('removeEnd', () => {
        test('should remove from single element list', () => {
            ll.insertEnd(10);
            ll.removeEnd();
            expect(ll.isEmpty()).toBe(true);
            expect(ll.head.next).toBe(ll.tail);
            expect(ll.tail.prev).toBe(ll.head);
        });

        test('should remove from multiple element list', () => {
            ll.insertEnd(1);
            ll.insertEnd(2);
            ll.insertEnd(3);
            ll.removeEnd();
            expect(ll.head.next?.value).toBe(1);
            expect(ll.tail.prev?.value).toBe(2);
            expect(ll.head.next?.prev).toBe(ll.head);
            expect(ll.tail.prev?.next).toBe(ll.tail);
        });

        test('should handle empty list', () => {
            ll.removeEnd();
            expect(ll.isEmpty()).toBe(true);
            expect(ll.head.next).toBe(ll.tail);
            expect(ll.tail.prev).toBe(ll.head);
        });
    });

    describe('remove', () => {
        test('should remove head element', () => {
            ll.insertEnd(1);
            ll.insertEnd(2);
            ll.insertEnd(3);
            ll.remove(1);
            expect(ll.head.next?.value).toBe(2);
            expect(ll.tail.prev?.value).toBe(3);
            expect(ll.head.next?.prev).toBe(ll.head);
        });

        test('should remove middle element', () => {
            ll.insertEnd(1);
            ll.insertEnd(2);
            ll.insertEnd(3);
            ll.remove(2);
            expect(ll.head.next?.value).toBe(1);
            expect(ll.head.next?.next?.value).toBe(3);
            expect(ll.tail.prev?.value).toBe(3);
            // Verify backward link
            expect(ll.tail.prev?.prev?.value).toBe(1);
        });

        test('should remove tail element', () => {
            ll.insertEnd(1);
            ll.insertEnd(2);
            ll.insertEnd(3);
            ll.remove(3);
            expect(ll.head.next?.value).toBe(1);
            expect(ll.tail.prev?.value).toBe(2);
            expect(ll.tail.prev?.next).toBe(ll.tail);
        });

        test('should remove single element', () => {
            ll.insertEnd(10);
            ll.remove(10);
            expect(ll.isEmpty()).toBe(true);
            expect(ll.head.next).toBe(ll.tail);
            expect(ll.tail.prev).toBe(ll.head);
        });

        test('should not modify list if value not found', () => {
            ll.insertEnd(1);
            ll.insertEnd(2);
            ll.insertEnd(3);
            ll.remove(99);
            expect(ll.head.next?.value).toBe(1);
            expect(ll.tail.prev?.value).toBe(3);
            expect(ll.getLength()).toBe(3);
        });

        test('should handle empty list', () => {
            ll.remove(10);
            expect(ll.isEmpty()).toBe(true);
            expect(ll.head.next).toBe(ll.tail);
            expect(ll.tail.prev).toBe(ll.head);
        });

        test('should remove first occurrence of duplicate', () => {
            ll.insertEnd(1);
            ll.insertEnd(2);
            ll.insertEnd(2);
            ll.insertEnd(3);
            ll.remove(2);
            expect(ll.head.next?.next?.value).toBe(2);
            expect(ll.getLength()).toBe(3);
        });
    });

    describe('isEmpty', () => {
        test('should return true for empty list', () => {
            expect(ll.isEmpty()).toBe(true);
        });

        test('should return false for non-empty list', () => {
            ll.insertEnd(1);
            expect(ll.isEmpty()).toBe(false);
            ll.removeFront();
            expect(ll.isEmpty()).toBe(true);
        });
    });

    describe('getLength', () => {
        test('should return 0 for empty list', () => {
            expect(ll.getLength()).toBe(0);
        });

        test('should return correct length', () => {
            ll.insertEnd(1);
            expect(ll.getLength()).toBe(1);
            ll.insertEnd(2);
            expect(ll.getLength()).toBe(2);
            ll.removeFront();
            expect(ll.getLength()).toBe(1);
            ll.removeEnd();
            expect(ll.getLength()).toBe(0);
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
            ll.insertFront(0);
            ll.remove(2);
            ll.insertEnd(4);

            // Collect all values forward
            const values: number[] = [];
            let current = ll.head.next;
            while (current !== ll.tail) {
                values.push(current!.value);
                current = current!.next;
            }

            expect(values).toEqual([0, 1, 3, 4]);
            expect(ll.head.next?.value).toBe(0);
            expect(ll.tail.prev?.value).toBe(4);

            // Verify backward links
            const valuesBackward: number[] = [];
            current = ll.tail.prev;
            while (current !== ll.head) {
                valuesBackward.push(current!.value);
                current = current!.prev;
            }

            expect(valuesBackward).toEqual([4, 3, 1, 0]);
        });

        test('should handle large list', () => {
            const n = 100;
            for (let i = 0; i < n; i++) {
                ll.insertEnd(i);
            }

            expect(ll.head.next?.value).toBe(0);
            expect(ll.tail.prev?.value).toBe(n - 1);
            expect(ll.getLength()).toBe(n);

            // Count nodes forward
            let count = 0;
            let current = ll.head.next;
            while (current !== ll.tail) {
                count++;
                current = current!.next;
            }
            expect(count).toBe(n);

            // Count nodes backward
            let countBackward = 0;
            current = ll.tail.prev;
            while (current !== ll.head) {
                countBackward++;
                current = current!.prev;
            }
            expect(countBackward).toBe(n);
        });
    });

    describe('bidirectional links', () => {
        test('should maintain correct forward and backward links', () => {
            ll.insertEnd(1);
            ll.insertEnd(2);
            ll.insertEnd(3);

            // Test forward and backward links are consistent
            const node1 = ll.head.next;
            const node2 = node1!.next;
            const node3 = node2!.next;

            expect(node1!.value).toBe(1);
            expect(node2!.value).toBe(2);
            expect(node3!.value).toBe(3);

            // Forward links
            expect(node1!.next).toBe(node2);
            expect(node2!.next).toBe(node3);
            expect(node3!.next).toBe(ll.tail);

            // Backward links
            expect(node3!.prev).toBe(node2);
            expect(node2!.prev).toBe(node1);
            expect(node1!.prev).toBe(ll.head);
        });
    });

    describe('link preservation', () => {
        test('should preserve links after removeFront', () => {
            ll.insertEnd(1);
            ll.insertEnd(2);
            ll.insertEnd(3);
            ll.removeFront();

            // After removing front, verify links
            expect(ll.head.next?.value).toBe(2);
            expect(ll.head.next?.prev).toBe(ll.head);
            expect(ll.head.next?.next?.value).toBe(3);
            expect(ll.head.next?.next?.prev?.value).toBe(2);
        });

        test('should preserve links after removeEnd', () => {
            ll.insertEnd(1);
            ll.insertEnd(2);
            ll.insertEnd(3);
            ll.removeEnd();

            // After removing end, verify links
            expect(ll.tail.prev?.value).toBe(2);
            expect(ll.tail.prev?.next).toBe(ll.tail);
            expect(ll.tail.prev?.prev?.value).toBe(1);
            expect(ll.tail.prev?.prev?.next?.value).toBe(2);
        });
    });
});

