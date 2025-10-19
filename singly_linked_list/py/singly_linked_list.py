class ListNode:
    def __init__(self, value):
        self.value = value
        self.next = None

class SinglyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
    
    def insert_end(self, value):
        new_node = ListNode(value)
        if not self.head:
            self.head = self.tail = new_node
        else:
            self.tail.next = new_node
            self.tail = new_node
    
    def insert_start(self, value):
        new_node = ListNode(value)
        if not self.head:
            self.head = self.tail = new_node
        else:
            new_node.next = self.head
            self.head = new_node
    
    def remove_start(self):
        if self.head:
            self.head = self.head.next
            if not self.head:
                self.tail = None
        
    def remove(self, value):
        if not self.head:
            return 
        # If head matches
        if self.head.value == value:
            self.remove_start()
            return
        # Search for the node
        current = self.head
        while current.next:
            if current.next.value == value:
                current.next = current.next.next
                if not current.next:
                    self.tail = current
                return
            current = current.next

    def print_list(self):
        current = self.head
        while current:
            print(current.value, end=" -> ")
            current = current.next
        print("None")