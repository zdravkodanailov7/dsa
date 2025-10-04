# Pythonic arrays are dynamic by default, this is just an example of resizing.

class DynamicArray:
    def __init__(self):
        self._array = [0] * 1 #Start small, capacity of 2.
        self._length = 0
        self._capacity = 1
    
    def resize(self):
        # Create new array of double capacity
        self._capacity *= 2
        new_array = [0] * self._capacity

        #Copy elements to new_array
        for i in range(self._length):
            new_array[i] = self._array[i]
        self._array = new_array
    
    # Insert n in the last position of the array
    def pushback(self, n):
        if self._length == self._capacity:
            self.resize()
        # Insert at next empty position
        self._array[self._length] = n
        self._length += 1

    # Remove the last element in the array
    def popback(self):
        if self._length > 0:
            self._length -= 1

    # Get value at i-th index
    def get(self, i):
        if i < self._length:
            return self._array[i]
        raise IndexError("Index out of bounds")

    # Insert at the i-th index
    def insert(self, i, n):
        if i < 0 or i > self._length:
            raise IndexError("Index out of bounds")
        if self._length == self._capacity:
            self.resize()
        # Shift right from i to end
        for j in range(self._length, i, -1):
            self._array[j] = self._array[j - 1]
        self._array[i] = n
        self._length += 1
        
    def print(self):
        for i in range(self._length):
            print(self._array[i])
        print()
