import pytest
from main import SinglyLinkedList, ListNode


def test_insert_end_empty():
    ll = SinglyLinkedList()
    ll.insert_end(10)
    assert ll.head.value == 10
    assert ll.tail.value == 10
    assert ll.head.next is None


def test_insert_end_multiple():
    ll = SinglyLinkedList()
    ll.insert_end(1)
    ll.insert_end(2)
    ll.insert_end(3)
    assert ll.head.value == 1
    assert ll.tail.value == 3
    assert ll.head.next.value == 2
    assert ll.head.next.next.value == 3


def test_insert_start_empty():
    ll = SinglyLinkedList()
    ll.insert_start(10)
    assert ll.head.value == 10
    assert ll.tail.value == 10
    assert ll.head.next is None


def test_insert_start_multiple():
    ll = SinglyLinkedList()
    ll.insert_start(1)
    ll.insert_start(2)
    ll.insert_start(3)
    assert ll.head.value == 3
    assert ll.tail.value == 1
    assert ll.head.next.value == 2
    assert ll.head.next.next.value == 1


def test_insert_start_and_end_mixed():
    ll = SinglyLinkedList()
    ll.insert_end(2)
    ll.insert_start(1)
    ll.insert_end(3)
    assert ll.head.value == 1
    assert ll.tail.value == 3
    current = ll.head
    values = []
    while current:
        values.append(current.value)
        current = current.next
    assert values == [1, 2, 3]


def test_remove_start_single_element():
    ll = SinglyLinkedList()
    ll.insert_end(10)
    ll.remove_start()
    assert ll.head is None
    assert ll.tail is None


def test_remove_start_multiple():
    ll = SinglyLinkedList()
    ll.insert_end(1)
    ll.insert_end(2)
    ll.insert_end(3)
    ll.remove_start()
    assert ll.head.value == 2
    assert ll.tail.value == 3


def test_remove_start_empty():
    ll = SinglyLinkedList()
    ll.remove_start()
    assert ll.head is None
    assert ll.tail is None


def test_remove_value_head():
    ll = SinglyLinkedList()
    ll.insert_end(1)
    ll.insert_end(2)
    ll.insert_end(3)
    ll.remove(1)
    assert ll.head.value == 2
    assert ll.tail.value == 3


def test_remove_value_middle():
    ll = SinglyLinkedList()
    ll.insert_end(1)
    ll.insert_end(2)
    ll.insert_end(3)
    ll.remove(2)
    assert ll.head.value == 1
    assert ll.head.next.value == 3
    assert ll.tail.value == 3


def test_remove_value_tail():
    ll = SinglyLinkedList()
    ll.insert_end(1)
    ll.insert_end(2)
    ll.insert_end(3)
    ll.remove(3)
    assert ll.head.value == 1
    assert ll.tail.value == 2
    assert ll.tail.next is None


def test_remove_value_single_element():
    ll = SinglyLinkedList()
    ll.insert_end(10)
    ll.remove(10)
    assert ll.head is None
    assert ll.tail is None


def test_remove_value_not_found():
    ll = SinglyLinkedList()
    ll.insert_end(1)
    ll.insert_end(2)
    ll.insert_end(3)
    ll.remove(99)
    # List should remain unchanged
    assert ll.head.value == 1
    assert ll.tail.value == 3


def test_remove_value_empty_list():
    ll = SinglyLinkedList()
    ll.remove(10)
    assert ll.head is None
    assert ll.tail is None


def test_remove_duplicate_removes_first():
    ll = SinglyLinkedList()
    ll.insert_end(1)
    ll.insert_end(2)
    ll.insert_end(2)
    ll.insert_end(3)
    ll.remove(2)
    # Should remove first occurrence
    assert ll.head.next.value == 2


def test_print_list_single(capsys):
    ll = SinglyLinkedList()
    ll.insert_end(10)
    ll.print_list()
    captured = capsys.readouterr()
    assert captured.out == "10 -> None\n"


def test_print_list_multiple(capsys):
    ll = SinglyLinkedList()
    ll.insert_end(1)
    ll.insert_end(2)
    ll.insert_end(3)
    ll.print_list()
    captured = capsys.readouterr()
    assert captured.out == "1 -> 2 -> 3 -> None\n"


def test_print_list_empty(capsys):
    ll = SinglyLinkedList()
    ll.print_list()
    captured = capsys.readouterr()
    assert captured.out == "None\n"


def test_list_integrity_after_operations():
    ll = SinglyLinkedList()
    ll.insert_end(1)
    ll.insert_end(2)
    ll.insert_end(3)
    ll.insert_start(0)
    ll.remove(2)
    ll.insert_end(4)
    
    # Collect all values
    values = []
    current = ll.head
    while current:
        values.append(current.value)
        current = current.next
    
    assert values == [0, 1, 3, 4]
    assert ll.head.value == 0
    assert ll.tail.value == 4


def test_large_list():
    ll = SinglyLinkedList()
    n = 100
    for i in range(n):
        ll.insert_end(i)
    
    # Verify head and tail
    assert ll.head.value == 0
    assert ll.tail.value == n - 1
    
    # Count nodes
    count = 0
    current = ll.head
    while current:
        count += 1
        current = current.next
    assert count == n
