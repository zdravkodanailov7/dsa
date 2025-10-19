# DSA (Data Structures & Algorithms)

A comprehensive collection of classic data structure implementations in **Python** and **TypeScript**, with complete test coverage for both languages.

## 📚 Project Overview

This project provides clean, well-tested implementations of fundamental data structures with:
- **Dual-language implementations** (Python + TypeScript) for cross-language learning
- **100% test coverage** using pytest (Python) and Vitest (TypeScript)
- **Consistent naming conventions** across both languages
- **TypeScript generics** for type-safe implementations
- **Work in progress** - New data structures added regularly

> 📖 **Learn more:** Detailed blog posts explaining each data structure are available at [zdravkodanailov.com/dsa](https://www.zdravkodanailov.com/dsa)

---

## 📁 Project Structure

```
dsa/
├── dynamic_array/
│   ├── py/
│   │   ├── dynamic_array.py
│   │   └── test_dynamic_array.py
│   └── ts/
│       ├── dynamic_array.ts
│       └── dynamic_array.test.ts
├── static_array/
├── stack/
├── singly_linked_list/
├── NAMING_CONVENTIONS.md    (Detailed naming standards)
└── README.md                (This file)
```

**Organization:** Data structure-first (topic-centric) approach enables easy cross-language comparisons and modular growth.

---

## 📋 Data Structures Implemented

| Data Structure | Python | TypeScript | Tests |
|---|---|---|---|
| **Static Array** | ✅ | ✅ | 24 |
| **Dynamic Array** | ✅ | ✅ | 24 |
| **Stack** | ✅ | ✅ | 5 |
| **Singly Linked List** | ✅ | ✅ | 20 |

---

## 🎯 Naming Conventions

### Folders & Files
- **Folders:** `snake_case` (e.g., `singly_linked_list/`)
- **Python files:** `snake_case` (e.g., `singly_linked_list.py`, `test_singly_linked_list.py`)
- **TypeScript files:** `snake_case` (e.g., `singly_linked_list.ts`, `singly_linked_list.test.ts`)

### Code Naming

#### Python
- **Classes:** `PascalCase` (e.g., `SinglyLinkedList`)
- **Methods:** `snake_case` (e.g., `insert_end()`, `remove_start()`)
- **Variables:** `snake_case` (e.g., `new_node`, `current`)

#### TypeScript
- **Classes:** `PascalCase` (e.g., `SinglyLinkedList<T>`)
- **Methods:** `camelCase` (e.g., `insertEnd()`, `removeStart()`)
- **Variables:** `camelCase` (e.g., `newNode`, `current`)

> **Note:** Each language follows its idiomatic standards. See [NAMING_CONVENTIONS.md](./NAMING_CONVENTIONS.md) for full details.

---

## 🧪 Testing

### Python Tests
Run all Python tests:
```bash
cd singly_linked_list/py
pytest                          # Run all tests
pytest -v                       # Verbose output
pytest test_singly_linked_list.py  # Run specific test file
```

### TypeScript Tests
Run all TypeScript tests:
```bash
npm test                        # Run all tests
npm test -- --watch            # Watch mode
npm test singly_linked_list    # Run specific structure tests
```

### Test Coverage
- **Python:** Uses pytest with comprehensive assertions
- **TypeScript:** Uses Vitest with `expect()` matchers and `describe()` blocks
- Each implementation has mirrored tests across languages

---

## 🛠️ Dependencies

### Python
- `pytest` (testing)
- Python 3.8+

### TypeScript
- `typescript` 5.9+
- `vitest` 3.2+
- `@types/node` 24.6+

Install TypeScript dependencies:
```bash
npm install
```

---

## 📖 Learning Approach

This project is designed for:
1. **Side-by-side learning** - Compare Python and TypeScript implementations
2. **Language-specific idioms** - See how each language approaches the same problem
3. **Test-driven development** - Comprehensive tests demonstrate expected behavior
4. **Type safety** - TypeScript generics showcase modern type-safe practices
5. **In-depth explanations** - Blog posts at [zdravkodanailov.com/dsa](https://www.zdravkodanailov.com/dsa) detail each structure

---

## 🎓 Structure Benefits

- **Topic-centric organization** allows easy addition of new implementations
- **Shared testing philosophy** across languages ensures consistency
- **Modular growth** - add new data structures without affecting existing ones
- **Cross-language parity** - implementations mirror each other for easy comparison

---

## 📝 Contributing

When adding new data structures:
1. Create a folder with `snake_case` naming
2. Add `py/` and `ts/` subdirectories
3. Follow [NAMING_CONVENTIONS.md](./NAMING_CONVENTIONS.md)
4. Include comprehensive tests
5. Ensure both implementations are feature-complete

---

**Happy learning! 🚀**
