/**
 * A node for use in a prefix tree that stores a single character from a string
 * and a structure of children nodes below it, which associates the next
 * character in a string to the next node along its path from the tree's root
 * node to a terminal node that marks the end of the string.
 */
class PrefixTreeNode {
  /**
   * Initialize this prefix tree node with the given character value, an empty structure of children nodes, and a boolean terminal property.
   * @param {string | null} character
   */
  constructor(character = null) {
    this.character = character;
    this.children = {};
    this.terminal = false;
  }

  /**
   * Return true if this prefix tree node terminates a string.
   * @returns {boolean}
   */
  isTerminal() {
    return this.terminal;
  }

  /**
   * Return the number of children nodes this prefix tree node has.
   * @returns {number}
   */
  numChildren() {
    return Object.keys(this.children).length;
  }

  /**
   * Return true if this prefix tree node has a child node that represents the given character amongst its children.
   * @param {string | null} character
   * @returns {boolean}
   */
  hasChild(character) {
    return character in this.children;
  }

  /**
   * Return this prefix tree node's child node that represents the given character if it is amongst its children, or throw an Error if not.
   * @param {string | null} character
   * @returns {PrefixTreeNode}
   */
  getChild(character) {
    if (this.hasChild(character)) {
      return this.children[character];
    }
    throw new Error(`No child exists for character '${character}'`);
  }

  /**
   * Add the given character and child node as a child of this node, or throw an Error if given character is amongst this node's children.
   * @param {string | null} character
   * @param {PrefixTreeNode} childNode
   * @returns {void}
   */
  addChild(character, childNode) {
    if (!this.hasChild(character)) {
      this.children[character] = childNode;
    } else {
      throw new Error(`Child exists for character '${character}'`);
    }
  }
}

export default PrefixTreeNode;
