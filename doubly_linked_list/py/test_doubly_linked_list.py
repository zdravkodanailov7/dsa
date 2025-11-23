import pytest
from doubly_linked_list import DoublyLinkedList, ListNode


def test_insert_end_empty():
    ll = DoublyLinkedList()
    ll.insert_end(10)
    assert ll.head.next.value == 10
    assert ll.tail.prev.value == 10
    assert ll.head.next.next == ll.tail
    assert ll.tail.prev.prev == ll.head


def test_insert_end_multiple():
    ll = DoublyLinkedList()
    ll.insert_end(1)
    ll.insert_end(2)
    ll.insert_end(3)
    assert ll.head.next.value == 1
    assert ll.tail.prev.value == 3
    assert ll.head.next.next.value == 2
    assert ll.head.next.next.next.value == 3
    # Test backward links
    assert ll.tail.prev.prev.value == 2
    assert ll.tail.prev.prev.prev.value == 1


def test_insert_front_empty():
    ll = DoublyLinkedList()
    ll.insert_front(10)
    assert ll.head.next.value == 10
    assert ll.tail.prev.value == 10
    assert ll.head.next.next == ll.tail
    assert ll.tail.prev.prev == ll.head


def test_insert_front_multiple():
    ll = DoublyLinkedList()
    ll.insert_front(1)
    ll.insert_front(2)
    ll.insert_front(3)
    assert ll.head.next.value == 3
    assert ll.tail.prev.value == 1
    assert ll.head.next.next.value == 2
    assert ll.head.next.next.next.value == 1
    # Test backward links
    assert ll.tail.prev.prev.value == 2
    assert ll.tail.prev.prev.prev.value == 3


def test_insert_front_and_end_mixed():
    ll = DoublyLinkedList()
    ll.insert_end(2)
    ll.insert_front(1)
    ll.insert_end(3)
    assert ll.head.next.value == 1
    assert ll.tail.prev.value == 3
    # Verify forward links
    current = ll.head.next
    values = []
    while current != ll.tail:
        values.append(current.value)
        current = current.next
    assert values == [1, 2, 3]
    # Verify backward links
    current = ll.tail.prev
    values_backward = []
    while current != ll.head:
        values_backward.append(current.value)
        current = current.prev
    assert values_backward == [3, 2, 1]


def test_remove_front_single_element():
    ll = DoublyLinkedList()
    ll.insert_end(10)
    ll.remove_front()
    assert ll.is_empty()
    assert ll.head.next == ll.tail
    assert ll.tail.prev == ll.head


def test_remove_front_multiple():
    ll = DoublyLinkedList()
    ll.insert_end(1)
    ll.insert_end(2)
    ll.insert_end(3)
    ll.remove_front()
    assert ll.head.next.value == 2
    assert ll.tail.prev.value == 3
    assert ll.head.next.prev == ll.head
    assert ll.tail.prev.next == ll.tail


def test_remove_front_empty():
    ll = DoublyLinkedList()
    ll.remove_front()
    assert ll.is_empty()
    assert ll.head.next == ll.tail
    assert ll.tail.prev == ll.head


def test_remove_end_single_element():
    ll = DoublyLinkedList()
    ll.insert_end(10)
    ll.remove_end()
    assert ll.is_empty()
    assert ll.head.next == ll.tail
    assert ll.tail.prev == ll.head


def test_remove_end_multiple():
    ll = DoublyLinkedList()
    ll.insert_end(1)
    ll.insert_end(2)
    ll.insert_end(3)
    ll.remove_end()
    assert ll.head.next.value == 1
    assert ll.tail.prev.value == 2
    assert ll.head.next.prev == ll.head
    assert ll.tail.prev.next == ll.tail


def test_remove_end_empty():
    ll = DoublyLinkedList()
    ll.remove_end()
    assert ll.is_empty()
    assert ll.head.next == ll.tail
    assert ll.tail.prev == ll.head


def test_remove_value_head():
    ll = DoublyLinkedList()
    ll.insert_end(1)
    ll.insert_end(2)
    ll.insert_end(3)
    ll.remove(1)
    assert ll.head.next.value == 2
    assert ll.tail.prev.value == 3
    assert ll.head.next.prev == ll.head


def test_remove_value_middle():
    ll = DoublyLinkedList()
    ll.insert_end(1)
    ll.insert_end(2)
    ll.insert_end(3)
    ll.remove(2)
    assert ll.head.next.value == 1
    assert ll.head.next.next.value == 3
    assert ll.tail.prev.value == 3
    # Verify backward link
    assert ll.tail.prev.prev.value == 1


def test_remove_value_tail():
    ll = DoublyLinkedList()
    ll.insert_end(1)
    ll.insert_end(2)
    ll.insert_end(3)
    ll.remove(3)
    assert ll.head.next.value == 1
    assert ll.tail.prev.value == 2
    assert ll.tail.prev.next == ll.tail


def test_remove_value_single_element():
    ll = DoublyLinkedList()
    ll.insert_end(10)
    ll.remove(10)
    assert ll.is_empty()
    assert ll.head.next == ll.tail
    assert ll.tail.prev == ll.head


def test_remove_value_not_found():
    ll = DoublyLinkedList()
    ll.insert_end(1)
    ll.insert_end(2)
    ll.insert_end(3)
    ll.remove(99)
    # List should remain unchanged
    assert ll.head.next.value == 1
    assert ll.tail.prev.value == 3
    assert ll.get_length() == 3


def test_remove_value_empty_list():
    ll = DoublyLinkedList()
    ll.remove(10)
    assert ll.is_empty()
    assert ll.head.next == ll.tail
    assert ll.tail.prev == ll.head


def test_remove_duplicate_removes_first():
    ll = DoublyLinkedList()
    ll.insert_end(1)
    ll.insert_end(2)
    ll.insert_end(2)
    ll.insert_end(3)
    ll.remove(2)
    # Should remove first occurrence
    assert ll.head.next.next.value == 2
    assert ll.get_length() == 3


def test_is_empty():
    ll = DoublyLinkedList()
    assert ll.is_empty()
    ll.insert_end(1)
    assert not ll.is_empty()
    ll.remove_front()
    assert ll.is_empty()


def test_get_length():
    ll = DoublyLinkedList()
    assert ll.get_length() == 0
    ll.insert_end(1)
    assert ll.get_length() == 1
    ll.insert_end(2)
    assert ll.get_length() == 2
    ll.remove_front()
    assert ll.get_length() == 1
    ll.remove_end()
    assert ll.get_length() == 0


def test_print_list_single(capsys):
    ll = DoublyLinkedList()
    ll.insert_end(10)
    ll.print_list()
    captured = capsys.readouterr()
    assert captured.out == "10 -> None\n"


def test_print_list_multiple(capsys):
    ll = DoublyLinkedList()
    ll.insert_end(1)
    ll.insert_end(2)
    ll.insert_end(3)
    ll.print_list()
    captured = capsys.readouterr()
    assert captured.out == "1 -> 2 -> 3 -> None\n"


def test_print_list_empty(capsys):
    ll = DoublyLinkedList()
    ll.print_list()
    captured = capsys.readouterr()
    assert captured.out == "None\n"


def test_list_integrity_after_operations():
    ll = DoublyLinkedList()
    ll.insert_end(1)
    ll.insert_end(2)
    ll.insert_end(3)
    ll.insert_front(0)
    ll.remove(2)
    ll.insert_end(4)
    
    # Collect all values forward
    values = []
    current = ll.head.next
    while current != ll.tail:
        values.append(current.value)
        current = current.next
    
    assert values == [0, 1, 3, 4]
    assert ll.head.next.value == 0
    assert ll.tail.prev.value == 4
    
    # Verify backward links
    values_backward = []
    current = ll.tail.prev
    while current != ll.head:
        values_backward.append(current.value)
        current = current.prev
    
    assert values_backward == [4, 3, 1, 0]


def test_large_list():
    ll = DoublyLinkedList()
    n = 100
    for i in range(n):
        ll.insert_end(i)
    
    # Verify head and tail
    assert ll.head.next.value == 0
    assert ll.tail.prev.value == n - 1
    assert ll.get_length() == n
    
    # Count nodes forward
    count = 0
    current = ll.head.next
    while current != ll.tail:
        count += 1
        current = current.next
    assert count == n
    
    # Count nodes backward
    count_backward = 0
    current = ll.tail.prev
    while current != ll.head:
        count_backward += 1
        current = current.prev
    assert count_backward == n


def test_bidirectional_links():
    ll = DoublyLinkedList()
    ll.insert_end(1)
    ll.insert_end(2)
    ll.insert_end(3)
    
    # Test forward and backward links are consistent
    node1 = ll.head.next
    node2 = node1.next
    node3 = node2.next
    
    assert node1.value == 1
    assert node2.value == 2
    assert node3.value == 3
    
    # Forward links
    assert node1.next == node2
    assert node2.next == node3
    assert node3.next == ll.tail
    
    # Backward links
    assert node3.prev == node2
    assert node2.prev == node1
    assert node1.prev == ll.head


def test_remove_front_preserves_links():
    ll = DoublyLinkedList()
    ll.insert_end(1)
    ll.insert_end(2)
    ll.insert_end(3)
    ll.remove_front()
    
    # After removing front, verify links
    assert ll.head.next.value == 2
    assert ll.head.next.prev == ll.head
    assert ll.head.next.next.value == 3
    assert ll.head.next.next.prev.value == 2


def test_remove_end_preserves_links():
    ll = DoublyLinkedList()
    ll.insert_end(1)
    ll.insert_end(2)
    ll.insert_end(3)
    ll.remove_end()
    
    # After removing end, verify links
    assert ll.tail.prev.value == 2
    assert ll.tail.prev.next == ll.tail
    assert ll.tail.prev.prev.value == 1
    assert ll.tail.prev.prev.next.value == 2

