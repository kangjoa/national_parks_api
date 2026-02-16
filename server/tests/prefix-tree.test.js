import { describe, expect, it } from 'vitest';
import PrefixTree from '../lib/prefix-tree.js';

describe('PrefixTree', () => {
  it('should initialize empty tree with size 0', () => {
    const trie = new PrefixTree();

    expect(trie.size).toBe(0);
    expect(trie.isEmpty()).toBe(true);
  });

  it('should insert initial strings from constructor', () => {
    const trie = new PrefixTree(['A', 'B', 'C']);

    expect(trie.size).toBe(3);
    expect(trie.contains('A')).toBe(true);
    expect(trie.contains('B')).toBe(true);
    expect(trie.contains('C')).toBe(true);

    expect(trie.strings()).toEqual(['A', 'B', 'C']);
  });

  it('should contain inserted strings', () => {
    const trie = new PrefixTree();

    trie.insert('O');
    trie.insert('R');
    trie.insert('B');
    trie.insert('S');

    expect(trie.size).toBe(4);
    expect(trie.contains('R')).toBe(true);
    expect(trie.strings()).toEqual(['O', 'R', 'B', 'S']);
  });

  it('should not contain non-inserted strings', () => {
    const trie = new PrefixTree();

    trie.insert('M');
    trie.insert('E');
    trie.insert('T');

    expect(trie.contains('R')).toBe(false);
  });

  it('should not increase size for duplicate inserts', () => {
    const trie = new PrefixTree();

    trie.insert('Y');
    trie.insert('A');
    trie.insert('Y');

    expect(trie.size).toBe(2);
    expect(trie.strings()).toEqual(['Y', 'A']);
  });

  it('should return all completions for a prefix', () => {
    // Create trie with strings (some that match prefix and some that don't)
    const trie = new PrefixTree(['ba', 'bad', 'bal', 'ban', 'cat', 'car']);

    const completions = trie.complete('ba');

    expect(completions).toEqual(['ba', 'bad', 'bal', 'ban']);
  });

  it('should complete park-like names with a prefix', () => {
    const trie = new PrefixTree([
      'yellowstone national park',
      'yosemite national park',
      'badlands national park',
      'baltimore-washington parkway',
      'bandelier national monument',
    ]);

    expect(trie.complete('y')).toEqual([
      'yellowstone national park',
      'yosemite national park',
    ]);

    expect(trie.complete('ba')).toEqual([
      'badlands national park',
      'baltimore-washington parkway',
      'bandelier national monument',
    ]);

    expect(trie.complete('yosemite')).toEqual(['yosemite national park']);
  });

  it('should return empty array for prefix not in tree', () => {
    // Create trie with strings (some that match prefix and some that don't)
    const trie = new PrefixTree(['ba', 'bad', 'bal', 'ban', 'cat', 'car']);

    const completions = trie.complete('z');

    expect(completions).toEqual([]);
  });

  it('should return all strings when prefix is empty', () => {
    // Create trie with strings (some that match prefix and some that don't)
    const trie = new PrefixTree(['ba', 'bad', 'bal', 'ban', 'cat', 'car']);

    const completions = trie.complete('');

    expect(completions).toEqual(['ba', 'bad', 'bal', 'ban', 'cat', 'car']);
  });

  it('should return all stored strings', () => {
    // Create trie with strings (some that match prefix and some that don't)
    const trie = new PrefixTree(['ba', 'bad', 'bal', 'ban', 'cat', 'car']);

    const allStrings = trie.strings();
    expect(allStrings).toEqual(['ba', 'bad', 'bal', 'ban', 'cat', 'car']);
  });
});
