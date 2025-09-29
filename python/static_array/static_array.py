import pytest

class StaticArray:
    def __init__(self, capacity):
        self._array = [0] * capacity
        self._length = 0
        self._capacity = capacity
    
    def insert_end(self, n):
        if self._length < self._capacity:
            self._array[self._length] = n
            self._length += 1
            return True
        return False # Full, no insertion

    def remove_end(self):
        if self._length > 0:
            self._array[self._length - 1] = 0
            self._length -= 1
            return True
        return False # Empty, no removal

    def insert_middle(self, i, n):
        if i < 0 or i > self._length or self._length >= self._capacity:
            return False # Invalid index or full
        # Shift starting from the end to i
        for index in range(self._length - 1, i - 1, -1):
            self._array[index + 1] = self._array[index]
        # Insert at i
        self._array[i] = n
        self._length += 1
        return True

    def remove_middle(self, i):
        if i < 0 or i >= self._length:
            return False # Invalid index
        # Shift starting from i + 1 to the end
        for index in range(i + 1, self._length):
            self._array[index - 1] = self._array[index]
        # No need to "remove" self._array[i], since we shifted
        self._array[self._length - 1] = 0 # Optional: clear the last spot
        self._length -= 1
        return True

    def print_array(self):
        for i in range(self._capacity):
            print(self._array[i])
    
    def is_full(self):
        return self._length == self._capacity

    def is_empty(self):
        return self._length == 0

    def get_length(self):
        return self._length

    def get_capacity(self):
        return self._capacity
