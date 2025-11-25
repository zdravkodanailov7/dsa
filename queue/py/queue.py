class ListNode:
    def __init__(self, value):
        self.value = value
        self.next = None


class Queue:
    def __init__(self):
        self.head = None
        self.tail = None
        self._length = 0

    def enqueue(self, value):
        new_node = ListNode(value)
        if self.is_empty():
            self.head = new_node
            self.tail = new_node
        else:
            self.tail.next = new_node
            self.tail = new_node
        self._length += 1

    def dequeue(self):
        if self.is_empty():
            return None
        value = self.head.value
        self.head = self.head.next
        if self.head is None:
            self.tail = None
        self._length -= 1
        return value

    def peek(self):
        return self.head.value if self.head else None

    def is_empty(self):
        return self._length == 0

    def size(self):
        return self._length

    def print_queue(self):
        current = self.head
        while current:
            print(current.value, end=" -> ")
            current = current.next
        print("None")

