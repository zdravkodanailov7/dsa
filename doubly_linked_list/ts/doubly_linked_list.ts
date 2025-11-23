interface DoublyListNode<T> {
    value: T;
    next: DoublyListNode<T> | null;
    prev: DoublyListNode<T> | null;
}

export class DoublyLinkedList<T> {
    head: DoublyListNode<T>;
    tail: DoublyListNode<T>;
    private length: number;

    constructor() {
        // Init the list with 'dummy' head and tail nodes which makes 
        // edge cases for insert & remove easier.
        this.head = { value: -1 as T, next: null, prev: null };
        this.tail = { value: -1 as T, next: null, prev: null };
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.length = 0;
    }

    insertFront(value: T): void {
        const newNode: DoublyListNode<T> = {
            value,
            prev: this.head,
            next: this.head.next
        };
        this.head.next!.prev = newNode;
        this.head.next = newNode;
        this.length++;
    }

    insertEnd(value: T): void {
        const newNode: DoublyListNode<T> = {
            value,
            next: this.tail,
            prev: this.tail.prev
        };
        this.tail.prev!.next = newNode;
        this.tail.prev = newNode;
        this.length++;
    }

    removeFront(): void {
        if (this.isEmpty()) {
            return;
        }
        this.head.next!.next!.prev = this.head;
        this.head.next = this.head.next!.next;
        this.length--;
    }

    removeEnd(): void {
        if (this.isEmpty()) {
            return;
        }
        this.tail.prev!.prev!.next = this.tail;
        this.tail.prev = this.tail.prev!.prev;
        this.length--;
    }

    remove(value: T): void {
        let current = this.head.next;
        while (current !== this.tail) {
            if (current!.value === value) {
                current!.prev!.next = current!.next;
                current!.next!.prev = current!.prev;
                this.length--;
                return;
            }
            current = current!.next;
        }
    }

    isEmpty(): boolean {
        return this.length === 0;
    }

    getLength(): number {
        return this.length;
    }

    printList(): void {
        let current = this.head.next;
        let output = "";
        while (current !== this.tail) {
            output += `${current!.value} -> `;
            current = current!.next;
        }
        output += "None";
        console.log(output);
    }
}

