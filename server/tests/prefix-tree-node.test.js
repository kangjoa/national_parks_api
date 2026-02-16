import { describe, expect, it } from 'vitest';
import PrefixTreeNode from '../lib/prefix-tree-node.js';

describe('PrefixTreeNode', () => {
  it('should initialize with correct properties', () => {
    const node = new PrefixTreeNode('A');

    expect(node.character).toBe('A');
    expect(node.children).toEqual({});
    expect(Object.keys(node.children)).toHaveLength(0);
    expect(node.terminal).toBe(false);
  });

  it('should report no children initially', () => {
    const nodeA = new PrefixTreeNode('A');

    expect(nodeA.numChildren()).toBe(0);
    expect(nodeA.hasChild('B')).toBe(false);
  });

  it('should throw when getting a non-existent child', () => {
    const nodeA = new PrefixTreeNode('A');

    expect(() => nodeA.getChild('B')).toThrow();
  });

  it('should add and retrieve a child', () => {
    const nodeA = new PrefixTreeNode('A');
    const nodeB = new PrefixTreeNode('B');
    nodeA.addChild('B', nodeB);

    expect(nodeA.numChildren()).toBe(1);
    expect(nodeA.hasChild('B')).toBe(true);
    expect(nodeA.getChild('B')).toBe(nodeB);
  });

  it('should throw when adding a duplicate child', () => {
    const nodeA = new PrefixTreeNode('A');
    const nodeB = new PrefixTreeNode('B');
    nodeA.addChild('B', nodeB);

    expect(() => nodeA.addChild('B', nodeB)).toThrow();
  });

  it('should handle multiple children', () => {
    const nodeA = new PrefixTreeNode('A');
    const nodeB = new PrefixTreeNode('B');
    const nodeC = new PrefixTreeNode('C');
    nodeA.addChild('B', nodeB);
    nodeA.addChild('C', nodeC);

    expect(nodeA.numChildren()).toBe(2);
    expect(nodeA.hasChild('B')).toBe(true);
    expect(nodeA.hasChild('C')).toBe(true);
    expect(nodeA.getChild('C')).toBe(nodeC);
  });
});
