import pytest

# Insert n into arr at the next open position.
# length is the number of "real" values in arr, and capacity
# is the size (aka memory allocated for the fixed size array).
def insertEnd(arr, n, length, capacity):
    if length < capacity:
        arr[length] = n

# Remove from the last position in the array if the array
# is not empty (length is non zero).
def removeEnd(arr, length):
    if length > 0:
        # Overwrite last element with some default value.
        # We would also decrease the length by 1.
        arr[length - 1] = 0

# Insert n into index i after shifting elements to the right.
# Assuming i is a valid index and arr is not full.
def insertMiddle(arr, i , n, length):
    # Shift starting from the end to i.
    for index in range(length - 1, i - 1, -1):
        arr[index + 1] = arr[index]

    # Insert at i
    arr[i] = n

# Removing value at index i before shifting elements to the left.
# Assuming i is a valid index.
def removeMiddle(arr, i, length):
    # Shift starting from i + 1 to the end.
    for index in range(i + 1, length):
        arr[index - 1] = arr[index]
    # No need to "remove" arr[i], since we already shifted.

def printArr(arr, capacity):
    for i in range(capacity):
        print(arr[i])


################################

def test_insertEnd_empty():
    arr = [0] * 5
    length = 0
    capacity = 5
    insertEnd(arr, 10, length, capacity)
    assert arr[0] == 10

def test_insertEnd_with_elements():
    arr = [1, 2, 3, 0]
    length = 3
    capacity = 4
    insertEnd(arr, 4, length, capacity)
    assert arr == [1, 2, 3, 4]

def test_insertEnd_full():
    arr = [1, 2, 3, 4, 5]
    length = 5
    capacity = 5
    insertEnd(arr, 6, length, capacity)
    assert arr == [1, 2, 3, 4, 5]  # No change

def test_removeEnd_non_empty():
    arr = [1, 2, 3]
    length = 3
    removeEnd(arr, length)
    assert arr == [1, 2, 0]

def test_removeEnd_empty():
    arr = []
    length = 0
    removeEnd(arr, length)
    assert arr == []  # No change

def test_insertMiddle():
    arr = [1, 2, 3, 4, 0]
    length = 4
    i = 1
    n = 10
    insertMiddle(arr, i, n, length)
    assert arr == [1, 10, 2, 3, 4]

def test_insertMiddle_end():
    arr = [1, 2, 3, 0]
    length = 3
    i = 3
    n = 4
    insertMiddle(arr, i, n, length)
    assert arr == [1, 2, 3, 4]

def test_removeMiddle():
    arr = [1, 2, 3, 4]
    length = 4
    i = 1
    removeMiddle(arr, i, length)
    assert arr == [1, 3, 4, 4]  # Last element unchanged

def test_removeMiddle_beginning():
    arr = [1, 2, 3]
    length = 3
    i = 0
    removeMiddle(arr, i, length)
    assert arr == [2, 3, 3]

def test_printArr(capsys):
    arr = [1, 2, 3]
    capacity = 3
    printArr(arr, capacity)
    captured = capsys.readouterr()
    expected_output = "1\n2\n3\n"
    assert captured.out == expected_output

def test_printArr_with_extra_capacity(capsys):
    arr = [1, 2, 0, 0]
    capacity = 4
    printArr(arr, capacity)
    captured = capsys.readouterr()
    expected_output = "1\n2\n0\n0\n"
    assert captured.out == expected_output
