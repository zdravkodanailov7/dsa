import pytest
from stack import Stack

class TestStack:
    def test_init_empty(self):
        stack = Stack()
        assert stack.is_empty() is True
        assert stack.size() == 0

    def test_push_pop(self):
        stack = Stack()
        stack.push(1)
        stack.push(2)
        assert stack.size() == 2
        assert stack.peek() == 2
        assert stack.pop() == 2
        assert stack.peek() == 1
        assert stack.pop() == 1
        assert stack.is_empty() is True

    def test_pop_empty(self):
        stack = Stack()
        with pytest.raises(IndexError):
            stack.pop()

    def test_peek_empty(self):
        stack = Stack()
        assert stack.peek() is None

    def test_size_after_operations(self):
        stack = Stack()
        assert stack.size() == 0
        stack.push(42)
        assert stack.size() == 1
        stack.pop()
        assert stack.size() == 0
