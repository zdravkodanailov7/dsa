import pytest
from static_array import StaticArray  # Assuming the class is in static_array.py


def test_insert_end_empty():
    arr = StaticArray(5)
    arr.insert_end(10)
    assert arr._array[0] == 10
    assert arr.get_length() == 1


def test_insert_end_with_elements():
    arr = StaticArray(4)
    arr.insert_end(1)
    arr.insert_end(2)
    arr.insert_end(3)
    arr.insert_end(4)
    assert arr._array == [1, 2, 3, 4]  # Assuming capacity=4, but init with 4
    assert arr.get_length() == 4


def test_insert_end_full():
    arr = StaticArray(5)
    for i in range(1, 6):
        arr.insert_end(i)
    initial_length = arr.get_length()
    arr.insert_end(6)
    assert arr._array == [1, 2, 3, 4, 5]  # No change beyond capacity
    assert arr.get_length() == initial_length  # Still 5


def test_remove_end_non_empty():
    arr = StaticArray(5)
    arr.insert_end(1)
    arr.insert_end(2)
    arr.insert_end(3)
    arr.remove_end()
    assert arr._array[:3] == [1, 2, 0]  # Last is 0, but length=2
    assert arr.get_length() == 2


def test_remove_end_empty():
    arr = StaticArray(0)  # Edge case: zero capacity
    arr.remove_end()
    assert arr.get_length() == 0


def test_insert_middle():
    arr = StaticArray(5)
    arr.insert_end(1)
    arr.insert_end(2)
    arr.insert_end(3)
    arr.insert_end(4)
    arr.insert_middle(1, 10)
    assert arr._array[:5] == [1, 10, 2, 3, 4]
    assert arr.get_length() == 5


def test_insert_middle_end():
    arr = StaticArray(4)
    arr.insert_end(1)
    arr.insert_end(2)
    arr.insert_end(3)
    arr.insert_middle(3, 4)
    assert arr._array[:4] == [1, 2, 3, 4]
    assert arr.get_length() == 4


def test_remove_middle():
    arr = StaticArray(4)
    arr.insert_end(1)
    arr.insert_end(2)
    arr.insert_end(3)
    arr.insert_end(4)
    arr.remove_middle(1)
    assert arr._array[:3] == [1, 3, 4]
    assert arr.get_length() == 3  # Last spot is 0, but not printed in length


def test_remove_middle_beginning():
    arr = StaticArray(3)
    arr.insert_end(1)
    arr.insert_end(2)
    arr.insert_end(3)
    arr.remove_middle(0)
    assert arr._array[:2] == [2, 3]
    assert arr.get_length() == 2


def test_print_array(capsys):
    arr = StaticArray(3)
    arr.insert_end(1)
    arr.insert_end(2)
    arr.insert_end(3)
    arr.print_array()
    captured = capsys.readouterr()
    expected_output = "1\n2\n3\n"
    assert captured.out == expected_output


def test_print_array_with_extra_capacity(capsys):
    arr = StaticArray(4)
    arr.insert_end(1)
    arr.insert_end(2)
    arr.print_array()
    captured = capsys.readouterr()
    expected_output = "1\n2\n0\n0\n"
    assert captured.out == expected_output


def test_is_full():
    arr = StaticArray(3)
    arr.insert_end(1)
    arr.insert_end(2)
    arr.insert_end(3)
    assert arr.is_full() is True


def test_is_empty():
    arr = StaticArray(5)
    assert arr.is_empty() is True
    arr.insert_end(1)
    assert arr.is_empty() is False
