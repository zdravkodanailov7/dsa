import { describe, test, expect, beforeEach } from 'vitest'
import { Stack } from './stack' // Adjust import as needed

describe('Stack', () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack();
  });

  test('should initialize empty', () => {
    expect(stack.is_empty()).toBe(true);
    expect(stack.size()).toBe(0);
  });

  test('should push and pop correctly', () => {
    stack.push(1);
    stack.push(2);
    expect(stack.size()).toBe(2);
    expect(stack.peek()).toBe(2);
    expect(stack.pop()).toBe(2);
    expect(stack.peek()).toBe(1);
    expect(stack.pop()).toBe(1);
    expect(stack.is_empty()).toBe(true);
  });

  test('should handle pop on empty', () => {
    expect(stack.pop()).toBeUndefined();
  });

  test('should peek empty as undefined', () => {
    expect(stack.peek()).toBeUndefined();
  });

  test('should track size after operations', () => {
    expect(stack.size()).toBe(0);
    stack.push(42);
    expect(stack.size()).toBe(1);
    stack.pop();
    expect(stack.size()).toBe(0);
  });
});
