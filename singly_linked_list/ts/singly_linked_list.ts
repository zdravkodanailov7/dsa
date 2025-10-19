interface ListNode<T> {
    value: T;
    next: ListNode<T> | null;
}

export class SinglyLinkedList<T> {
    head: ListNode<T> | null;
    tail: ListNode<T> | null;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    insertEnd(value: T): void {
        const newNode: ListNode<T> = { value, next: null };
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            this.tail = newNode;
        }
    }

    insertStart(value: T): void {
        const newNode: ListNode<T> = { value, next: null };
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
    }

    removeStart(): void {
        if (this.head) {
            this.head = this.head.next;
            if (!this.head) {
                this.tail = null;
            }
        }
    }

    remove(value: T): void {
        if (!this.head) {
            return;
        }
        // If head matches
        if (this.head.value === value) {
            this.removeStart();
            return;
        }
        // Search for the node
        let current = this.head;
        while (current.next) {
            if (current.next.value === value) {
                current.next = current.next.next;
                if (!current.next) {
                    this.tail = current;
                }
                return;
            }
            current = current.next;
        }
    }

    printList(): void {
        let current = this.head;
        let output = "";
        while (current) {
            output += `${current.value} -> `;
            current = current.next;
        }
        output += "None";
        console.log(output);
    }
}