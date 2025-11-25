import pytest
from queue import Queue, ListNode


class TestQueue:
    # Initialization tests
    def test_init_empty(self):
        q = Queue()
        assert q.is_empty() is True
        assert q.size() == 0
        assert q.head is None
        assert q.tail is None

    # Enqueue tests
    def test_enqueue_single(self):
        q = Queue()
        q.enqueue(10)
        assert q.size() == 1
        assert q.head.value == 10
        assert q.tail.value == 10
        assert q.is_empty() is False

    def test_enqueue_multiple(self):
        q = Queue()
        q.enqueue(1)
        q.enqueue(2)
        q.enqueue(3)
        assert q.size() == 3
        assert q.head.value == 1
        assert q.tail.value == 3

    def test_enqueue_maintains_fifo_order(self):
        q = Queue()
        q.enqueue(1)
        q.enqueue(2)
        q.enqueue(3)
        # Verify linked structure
        assert q.head.value == 1
        assert q.head.next.value == 2
        assert q.head.next.next.value == 3
        assert q.head.next.next.next is None

    # Dequeue tests
    def test_dequeue_single(self):
        q = Queue()
        q.enqueue(10)
        value = q.dequeue()
        assert value == 10
        assert q.size() == 0
        assert q.is_empty() is True
        assert q.head is None
        assert q.tail is None

    def test_dequeue_multiple(self):
        q = Queue()
        q.enqueue(1)
        q.enqueue(2)
        q.enqueue(3)
        assert q.dequeue() == 1
        assert q.dequeue() == 2
        assert q.dequeue() == 3
        assert q.is_empty() is True

    def test_dequeue_empty(self):
        q = Queue()
        value = q.dequeue()
        assert value is None
        assert q.size() == 0

    def test_dequeue_updates_head(self):
        q = Queue()
        q.enqueue(1)
        q.enqueue(2)
        q.dequeue()
        assert q.head.value == 2
        assert q.tail.value == 2

    def test_dequeue_clears_tail_on_last_element(self):
        q = Queue()
        q.enqueue(1)
        q.dequeue()
        assert q.head is None
        assert q.tail is None

    # Peek tests
    def test_peek_single(self):
        q = Queue()
        q.enqueue(10)
        assert q.peek() == 10
        assert q.size() == 1  # Peek should not remove

    def test_peek_multiple(self):
        q = Queue()
        q.enqueue(1)
        q.enqueue(2)
        q.enqueue(3)
        assert q.peek() == 1  # Always returns front element

    def test_peek_empty(self):
        q = Queue()
        assert q.peek() is None

    def test_peek_does_not_modify_queue(self):
        q = Queue()
        q.enqueue(1)
        q.enqueue(2)
        q.peek()
        q.peek()
        q.peek()
        assert q.size() == 2
        assert q.head.value == 1

    # is_empty tests
    def test_is_empty_true(self):
        q = Queue()
        assert q.is_empty() is True

    def test_is_empty_false(self):
        q = Queue()
        q.enqueue(1)
        assert q.is_empty() is False

    def test_is_empty_after_dequeue(self):
        q = Queue()
        q.enqueue(1)
        q.dequeue()
        assert q.is_empty() is True

    # Size tests
    def test_size_empty(self):
        q = Queue()
        assert q.size() == 0

    def test_size_after_enqueue(self):
        q = Queue()
        q.enqueue(1)
        assert q.size() == 1
        q.enqueue(2)
        assert q.size() == 2
        q.enqueue(3)
        assert q.size() == 3

    def test_size_after_dequeue(self):
        q = Queue()
        q.enqueue(1)
        q.enqueue(2)
        q.dequeue()
        assert q.size() == 1
        q.dequeue()
        assert q.size() == 0

    def test_size_after_mixed_operations(self):
        q = Queue()
        q.enqueue(1)
        q.enqueue(2)
        q.dequeue()
        q.enqueue(3)
        q.enqueue(4)
        q.dequeue()
        assert q.size() == 2

    # print_queue tests
    def test_print_queue_single(self, capsys):
        q = Queue()
        q.enqueue(10)
        q.print_queue()
        captured = capsys.readouterr()
        assert captured.out == "10 -> None\n"

    def test_print_queue_multiple(self, capsys):
        q = Queue()
        q.enqueue(1)
        q.enqueue(2)
        q.enqueue(3)
        q.print_queue()
        captured = capsys.readouterr()
        assert captured.out == "1 -> 2 -> 3 -> None\n"

    def test_print_queue_empty(self, capsys):
        q = Queue()
        q.print_queue()
        captured = capsys.readouterr()
        assert captured.out == "None\n"

    # FIFO behavior tests
    def test_fifo_order(self):
        q = Queue()
        items = [1, 2, 3, 4, 5]
        for item in items:
            q.enqueue(item)
        
        result = []
        while not q.is_empty():
            result.append(q.dequeue())
        
        assert result == items

    def test_interleaved_operations(self):
        q = Queue()
        q.enqueue(1)
        q.enqueue(2)
        assert q.dequeue() == 1
        q.enqueue(3)
        assert q.dequeue() == 2
        q.enqueue(4)
        assert q.dequeue() == 3
        assert q.dequeue() == 4
        assert q.is_empty() is True

    # Edge cases
    def test_enqueue_none_value(self):
        q = Queue()
        q.enqueue(None)
        assert q.size() == 1
        assert q.peek() is None
        assert q.dequeue() is None
        assert q.size() == 0

    def test_enqueue_various_types(self):
        q = Queue()
        q.enqueue(1)
        q.enqueue("hello")
        q.enqueue([1, 2, 3])
        q.enqueue({"key": "value"})
        assert q.dequeue() == 1
        assert q.dequeue() == "hello"
        assert q.dequeue() == [1, 2, 3]
        assert q.dequeue() == {"key": "value"}

    # Large queue test
    def test_large_queue(self):
        q = Queue()
        n = 1000
        for i in range(n):
            q.enqueue(i)
        
        assert q.size() == n
        assert q.head.value == 0
        assert q.tail.value == n - 1
        
        for i in range(n):
            assert q.dequeue() == i
        
        assert q.is_empty() is True

    # ListNode tests
    def test_list_node_init(self):
        node = ListNode(42)
        assert node.value == 42
        assert node.next is None

    def test_list_node_linking(self):
        node1 = ListNode(1)
        node2 = ListNode(2)
        node1.next = node2
        assert node1.next.value == 2

