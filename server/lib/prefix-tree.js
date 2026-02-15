import PrefixTreeNode from './prefix-tree-node.js';

/**
 * PrefixTree: A multi-way prefix tree that stores strings with efficient
    methods to insert a string into the tree, check if it contains a matching
    string, and retrieve all strings that start with a given prefix string.
    Time complexity of these methods depends only on the number of strings
    retrieved and their maximum length (size and height of subtree searched),
    but is independent of the number of strings stored in the prefix tree, as
    its height depends only on the length of the longest string stored in it.
    This makes a prefix tree effective for spell-checking and autocompletion.
    Each string is stored as a sequence of characters along a path from the
    tree's root node to a terminal node that marks the end of the string.
 */
class PrefixTree {
  static START_CHARACTER = '';
  /**
   * Initialize this prefix tree and insert the given strings, if any.
   * @param {string[]} strings
   */
  constructor(strings = null) {
    this.root = new PrefixTreeNode(PrefixTree.START_CHARACTER);
    this.size = 0;

    if (strings !== null) {
      for (const string of strings) {
        this.insert(string);
      }
    }
  }

  /**
   * Return true if this prefix tree is empty (contains no strings).
   * @returns {boolean}
   */
  isEmpty() {
    return this.size === 0;
  }

  /**
   * Return true if this prefix tree contains the given string.
   * @param {string} string
   * @returns {boolean}
   */
  contains(string) {
    let node = this.root;
    for (const char of string) {
      if (!node.hasChild(char)) {
        return false;
      }
      node = node.getChild(char);
    }
    return node.isTerminal();
  }

  /**
   * Insert the given string into this prefix tree.
   * @param {string} string
   */
  insert(string) {
    let node = this.root;

    for (const char of string) {
      if (!node.hasChild(char)) {
        const newNode = new PrefixTreeNode(char);
        node.addChild(char, newNode);
        node = newNode;
      } else {
        node = node.getChild(char);
      }
    }

    if (!node.isTerminal()) {
      this.size += 1;
    }
    node.terminal = true;
  }

  /**
   * Return a pair containing the deepest node in this prefix tree that matches the longest prefix of the given string and the node's depth. The depth returned is equal to the number of prefix characters matched. Search is done iteratively with a loop starting from the root node.
   * @param {string} string
   * @returns {[PrefixTreeNode, number]} tuple
   */
  _findNode(string) {
    if (string.length === 0) {
      return [this.root, 0];
    }

    let node = this.root;
    let depth = 0;

    for (const char of string) {
      if (!node.hasChild(char)) {
        return [node, depth];
      }
      node = node.getChild(char);
      depth += 1;
    }

    return [node, depth];
  }

  /**
   * Return a list of all strings stored in this prefix tree that start with the given prefix string.
   * @param {string} prefix
   * @returns {string[]} array
   */
  complete(prefix) {
    const completions = [];
    const [node, depth] = this._findNode(prefix);

    if (depth !== prefix.length) {
      return completions;
    }

    const visit = (node, path) => {
      if (node.isTerminal()) {
        completions.push(path);
      }
    };

    this._traverse(node, prefix, visit);
    return completions;
  }

  /**
   * Return a list of all strings stored in this prefix tree.
   * @returns {string[]}
   */
  strings() {
    const allStrings = [];

    const visit = (node, path) => {
      if (node.isTerminal()) {
        allStrings.push(path);
      }
    };

    this._traverse(this.root, '', visit);
    return allStrings;
  }

  /**
   * Traverse this prefix tree with recursive depth-first traversal.
    Start at the given node with the given prefix representing its path in
    this prefix tree and visit each node with the given visit function.
   * @param {PrefixTreeNode} node 
   * @param {string} prefix 
   * @param {(node: PrefixTreeNode, path: string) => void} visit
   */
  _traverse(node, prefix, visit) {
    visit(node, prefix);
    for (const [char, child] of Object.entries(node.children)) {
      this._traverse(child, prefix + char, visit);
    }
  }
}

export default PrefixTree;
