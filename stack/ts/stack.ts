export class Stack<T> {
    private stack: T[] = [];

    push(n: T): void {
        this.stack.push(n);
    }

    pop(): T | undefined {
        return this.stack.pop();
    }

    peek(): T | undefined {
        return this.stack[this.stack.length - 1]
    }

    is_empty(): boolean {
        return this.stack.length === 0;
    }

    size(): number {
        return this.stack.length;
    }
}
