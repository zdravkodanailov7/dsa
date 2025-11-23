class ListNode:
    def __init__(self, value):
        self.value = value
        self.next = None
        self.prev = None


class DoublyLinkedList:
    def __init__(self):
        # Init the list with 'dummy' head and tail nodes which makes 
        # edge cases for insert & remove easier.
        self.head = ListNode(-1)
        self.tail = ListNode(-1)
        self.head.next = self.tail
        self.tail.prev = self.head
        self._length = 0
    
    def insert_front(self, value):
        new_node = ListNode(value)
        new_node.prev = self.head
        new_node.next = self.head.next
        self.head.next.prev = new_node
        self.head.next = new_node
        self._length += 1
    
    def insert_end(self, value):
        new_node = ListNode(value)
        new_node.next = self.tail
        new_node.prev = self.tail.prev
        self.tail.prev.next = new_node
        self.tail.prev = new_node
        self._length += 1
    
    def remove_front(self):
        if self.is_empty():
            return
        self.head.next.next.prev = self.head
        self.head.next = self.head.next.next
        self._length -= 1
    
    def remove_end(self):
        if self.is_empty():
            return
        self.tail.prev.prev.next = self.tail
        self.tail.prev = self.tail.prev.prev
        self._length -= 1
    
    def remove(self, value):
        current = self.head.next
        while current != self.tail:
            if current.value == value:
                current.prev.next = current.next
                current.next.prev = current.prev
                self._length -= 1
                return
            current = current.next
    
    def is_empty(self):
        return self._length == 0
    
    def get_length(self):
        return self._length
    
    def print_list(self):
        current = self.head.next
        while current != self.tail:
            print(current.value, end=" -> ")
            current = current.next
        print("None")

