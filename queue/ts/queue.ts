interface ListNode<T> {
    value: T;
    next: ListNode<T> | null;
}

export class Queue<T> {
    private head: ListNode<T> | null = null;
    private tail: ListNode<T> | null = null;
    private length: number = 0;

    enqueue(value: T): void {
        const newNode: ListNode<T> = { value, next: null };
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }

    dequeue(): T | null {
        if (this.isEmpty()) {
            return null;
        }
        const value = this.head!.value;
        this.head = this.head!.next;
        if (this.head === null) {
            this.tail = null;
        }
        this.length--;
        return value;
    }

    peek(): T | null {
        return this.head ? this.head.value : null;
    }

    isEmpty(): boolean {
        return this.length === 0;
    }

    size(): number {
        return this.length;
    }

    printQueue(): void {
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

