import pytest
from dynamic_array import DynamicArray  # Assuming the class is in dynamic_array.py

def test_pushback_empty():
    arr = DynamicArray()
    arr.pushback(10)
    assert arr.get(0) == 10
    assert arr._length == 1  # Private for test; consider adding public getter
    assert arr._capacity == 1  # No resize yet

def test_pushback_with_elements_and_resize():
    arr = DynamicArray()
    arr.pushback(1)
    arr.pushback(2)  # Triggers resize to cap=2
    arr.pushback(3)  # Triggers resize to cap=4
    assert [arr.get(i) for i in range(3)] == [1, 2, 3]
    assert arr._length == 3
    assert arr._capacity == 4  # Doubled twice

def test_pushback_beyond_initial():
    arr = DynamicArray()
    for i in range(1, 6):  # Push 5 times: resizes at 1→2, 2→4, 4→8
        arr.pushback(i)
    assert [arr.get(i) for i in range(5)] == [1, 2, 3, 4, 5]
    assert arr._length == 5
    assert arr._capacity == 8  # Final doubled cap

def test_popback_non_empty():
    arr = DynamicArray()
    arr.pushback(1)
    arr.pushback(2)
    arr.pushback(3)
    arr.popback()
    assert [arr.get(i) for i in range(2)] == [1, 2]
    assert arr._length == 2  # No resize down

def test_popback_empty():
    arr = DynamicArray()
    arr.popback()
    assert arr._length == 0

def test_insert_middle():
    arr = DynamicArray()
    arr.pushback(1)
    arr.pushback(2)
    arr.pushback(3)
    arr.insert(1, 10)  # Insert at index 1
    assert [arr.get(i) for i in range(4)] == [1, 10, 2, 3]
    assert arr._length == 4

def test_insert_at_end():
    arr = DynamicArray()
    arr.pushback(1)
    arr.pushback(2)
    arr.pushback(3)
    arr.insert(3, 4)  # Insert at end (i == length)
    assert [arr.get(i) for i in range(4)] == [1, 2, 3, 4]
    assert arr._length == 4

def test_insert_with_resize():
    arr = DynamicArray()
    arr.pushback(1)  # cap=1, resize to 2
    arr.pushback(2)  # cap=2, resize to 4 on next
    arr.insert(1, 10)  # Triggers resize to 4
    assert [arr.get(i) for i in range(3)] == [1, 10, 2]
    assert arr._length == 3
    assert arr._capacity == 4

def test_get_valid():
    arr = DynamicArray()
    arr.pushback(42)
    assert arr.get(0) == 42

def test_get_invalid():
    arr = DynamicArray()
    with pytest.raises(IndexError):
        arr.get(0)  # Empty array

def test_insert_invalid_index():
    arr = DynamicArray()
    arr.pushback(1)
    with pytest.raises(IndexError):
        arr.insert(-1, 99)  # Negative
    with pytest.raises(IndexError):
        arr.insert(2, 99)  # Beyond length=1

def test_print(capsys):
    arr = DynamicArray()
    arr.pushback(1)
    arr.pushback(2)
    arr.print()
    captured = capsys.readouterr()
    expected_output = "1\n2\n\n"  # Up to length + newline
    assert captured.out == expected_output

def test_print_empty(capsys):
    arr = DynamicArray()
    arr.print()
    captured = capsys.readouterr()
    expected_output = "\n"  # Just newline
    assert captured.out == expected_output

# Optional: If you add remove_middle later, mirror static's tests
# def test_remove_middle(): ...

# Helpers: Test "full" by checking length == capacity post-push
def test_is_full_like():
    arr = DynamicArray()
    arr.pushback(1)  # length=1, cap=1 → "full"
    assert arr._length == arr._capacity

# Test "empty"
def test_is_empty_like():
    arr = DynamicArray()
    assert arr._length == 0
    arr.pushback(1)
    assert arr._length > 0
