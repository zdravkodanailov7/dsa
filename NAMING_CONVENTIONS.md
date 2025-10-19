# Naming Conventions

This document outlines the file, folder, and code naming standards used across this DSA (Data Structures & Algorithms) project.

---

## 📁 Folder Naming

**Standard:** `snake_case` (lowercase with underscores)

**Examples:**
- `singly_linked_list/`
- `dynamic_array/`
- `static_array/`
- `stack/`

**Structure:**
Each data structure folder contains two subfolders: `py/` and `ts/`

```
data_structure/
├── py/        (Python implementations)
└── ts/        (TypeScript implementations)
```

---

## 📄 File Naming

### Python Files

**Standard:** `snake_case`

| File Type | Pattern | Example |
|-----------|---------|---------|
| Implementation | `{structure_name}.py` | `singly_linked_list.py` |
| Tests | `test_{structure_name}.py` | `test_singly_linked_list.py` |

**Notes:**
- Test files use `test_` prefix for automatic pytest discovery
- Implementation files match the data structure name exactly

### TypeScript Files

**Standard:** `snake_case` with test suffix

| File Type | Pattern | Example |
|-----------|---------|---------|
| Implementation | `{structure_name}.ts` | `singly_linked_list.ts` |
| Tests | `{structure_name}.test.ts` | `singly_linked_list.test.ts` |

**Notes:**
- Test files use `.test.ts` suffix for automatic Vitest discovery
- Implementation files match the data structure name exactly

---

## 💻 Code Naming Conventions

### Python

#### Classes
**Standard:** `PascalCase`

```python
class SinglyLinkedList:
    pass

class ListNode:
    pass

class Stack:
    pass
```

#### Methods & Functions
**Standard:** `snake_case`

```python
def insert_end(self, value):
    pass

def remove_start(self):
    pass

def print_list(self):
    pass
```

#### Variables & Attributes
**Standard:** `snake_case`

```python
new_node = ListNode(value)
current = self.head
self.head = None
self.tail = None
```

#### Special Variables
**Standard:** `snake_case` with underscore prefix for "private"

```python
self._length = 0      # Protected/private
self._capacity = 1    # Protected/private
```

---

### TypeScript

#### Classes
**Standard:** `PascalCase`

```typescript
export class SinglyLinkedList<T> {
    ...
}

interface ListNode<T> {
    ...
}

export class Stack<T> {
    ...
}
```

#### Methods & Functions
**Standard:** `camelCase`

```typescript
insertEnd(value: T): void {
    ...
}

removeStart(): void {
    ...
}

printList(): void {
    ...
}
```

#### Variables & Attributes
**Standard:** `camelCase`

```typescript
const newNode: ListNode<T> = { value, next: null };
let current = this.head;
this.head = null;
this.tail = null;
```

#### Access Modifiers
**Standard:** `private` keyword for encapsulation

```typescript
private stack: T[] = [];
```

---

## 📋 Test File Naming Conventions

### Python (pytest)

```python
def test_insert_end_empty():
    pass

def test_remove_value_head():
    pass

def test_print_list_multiple(capsys):
    pass
```

**Standard:**
- `test_` prefix
- `{method_name}_{scenario}` format
- `snake_case` throughout

### TypeScript (Vitest)

```typescript
describe('SinglyLinkedList', () => {
  test('should insert into empty list', () => {
    ...
  });

  test('should remove head element', () => {
    ...
  });
});
```

**Standard:**
- Test names use `describe()` blocks for grouping
- Individual tests use `test()` with human-readable descriptions
- Prefix with `should` for clarity
- Use `camelCase` in code, descriptive text in strings

---

## 🎯 Quick Reference

| Element | Python | TypeScript |
|---------|--------|-----------|
| **Folders** | `snake_case` | `snake_case` |
| **Files** | `snake_case.py` | `snake_case.ts` |
| **Test Files** | `test_name.py` | `name.test.ts` |
| **Classes** | `PascalCase` | `PascalCase` |
| **Methods** | `snake_case` | `camelCase` |
| **Variables** | `snake_case` | `camelCase` |
| **Constants** | `UPPER_SNAKE_CASE` | `UPPER_SNAKE_CASE` |
| **Interfaces** | N/A | `PascalCase` |

---

## ✅ Examples Across Languages

### Python Implementation
```python
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
```

### TypeScript Implementation
```typescript
export class SinglyLinkedList<T> {
    head: ListNode<T> | null;
    tail: ListNode<T> | null;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    insertEnd(value: T): void {
        const newNode: ListNode<T> = { value, next: null };
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            this.tail = newNode;
        }
    }
}
```

### Python Test
```python
def test_insert_end_empty():
    ll = SinglyLinkedList()
    ll.insert_end(10)
    assert ll.head.value == 10
```

### TypeScript Test
```typescript
test('should insert into empty list', () => {
  const ll = new SinglyLinkedList<number>();
  ll.insertEnd(10);
  expect(ll.head?.value).toBe(10);
});
```

---

## 📝 Notes

1. **Language Idioms:** Each language follows its standard conventions to maximize readability for developers familiar with that language.
2. **Consistency:** Within each language, naming is consistent across all data structures.
3. **Auto-discovery:** File naming follows testing framework conventions for automatic test discovery.
4. **Cross-language Parity:** Implementations mirror each other in structure despite naming differences.