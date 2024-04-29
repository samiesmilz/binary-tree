/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    const calculateDepth = (node) => {
      if (!node) return 0;
      if (!node.left && !node.right) return 1;
      const leftDepth = calculateDepth(node.left);
      const rightDepth = calculateDepth(node.right);
      return 1 + Math.min(leftDepth, rightDepth);
    };

    // Start the recursive calculation from the root node
    return calculateDepth(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    const calculateDepth = (node) => {
      if (!node) return 0;
      const leftDepth = calculateDepth(node.left);
      const rightDepth = calculateDepth(node.right);
      return 1 + Math.max(leftDepth, rightDepth);
    };

    // Start the recursive calculation from the root node
    return calculateDepth(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let result = 0;

    function maxSumHelper(node) {
      if (node === null) return 0;
      const leftSum = maxSumHelper(node.left);
      const rightSum = maxSumHelper(node.right);
      result = Math.max(result, node.val + leftSum + rightSum);
      return Math.max(0, leftSum + node.val, rightSum + node.val);
    }
    maxSumHelper(this.root);
    return result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;

    // let's use BFS for this!
    let queue = [this.root];
    let closest = null;

    while (queue.length) {
      let currentNode = queue.shift();
      let currentVal = currentNode.val;
      let higherThanLowerBound = currentVal > lowerBound;
      let shouldReassignClosest = currentVal < closest || closest === null;

      if (higherThanLowerBound && shouldReassignClosest) {
        closest = currentVal;
      }

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }

    return closest;
  }
  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    // Helper function to find the level and parent of a node in the tree
    const findLevelAndParent = (root, target, parent = null, level = 0) => {
      if (!root) return null; // Base case: if root is null, return null
      if (root === target) {
        // If the target node is found, return its level and parent
        return { level, parent };
      }
      // Recursively search in the left and right subtrees
      const leftResult = findLevelAndParent(root.left, target, root, level + 1);
      const rightResult = findLevelAndParent(
        root.right,
        target,
        root,
        level + 1
      );
      // Return the result from either subtree if found
      return leftResult || rightResult;
    };

    // Find the level and parent of both node1 and node2
    const info1 = findLevelAndParent(this.root, node1);
    const info2 = findLevelAndParent(this.root, node2);

    // Check if both nodes are at the same level and have different parents
    return (
      info1 &&
      info2 &&
      info1.level === info2.level &&
      info1.parent !== info2.parent
    );
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  /**
   * serialize(tree): Serialize the BinaryTree object tree into a string.
   * This method converts the binary tree into a string representation using
   * a preorder traversal (root, left, right) and null markers to represent
   * empty nodes.
   */
  static serialize(tree) {
    // Helper function to perform preorder traversal and serialize the tree
    const serializeHelper = (node) => {
      if (!node) {
        // If node is null, represent it as 'null' in the serialized string
        return "null";
      }
      // Serialize the current node's value and its left and right subtrees recursively
      return `${node.val},${serializeHelper(node.left)},${serializeHelper(
        node.right
      )}`;
    };

    // Start the serialization process from the root of the tree
    return serializeHelper(tree.root);
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  /**
   * deserialize(stringTree): Deserialize stringTree into a BinaryTree object.
   * This method converts a string representation of a binary tree into a BinaryTree object.
   */
  static deserialize(stringTree) {
    // Helper function to perform deserialization and construct the tree
    const deserializeHelper = () => {
      const val = nodes.shift(); // Extract the next value from the serialized string
      if (val === "null") {
        // If the value is 'null', return null (indicating an empty node)
        return null;
      }
      // Create a new BinaryTreeNode with the extracted value
      const node = new BinaryTreeNode(parseInt(val));
      // Recursively construct the left and right subtrees
      node.left = deserializeHelper();
      node.right = deserializeHelper();
      return node; // Return the constructed node
    };

    // Split the serialized string into an array of values
    const nodes = stringTree.split(",");
    // Start the deserialization process to construct the binary tree
    return new BinaryTree(deserializeHelper());
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  /**
   * lowestCommonAncestor(node1, node2): Find the lowest common ancestor of two nodes in the tree.
   * This method returns the lowest common ancestor (LCA) of the given nodes node1 and node2.
   */
  lowestCommonAncestor(node1, node2) {
    // Helper function to find the lowest common ancestor recursively
    const findLCA = (root, node1, node2) => {
      if (!root || root === node1 || root === node2) {
        // If root is null or matches either of the nodes, return root
        return root;
      }
      // Recursively search for the LCA in the left and right subtrees
      const leftLCA = findLCA(root.left, node1, node2);
      const rightLCA = findLCA(root.right, node1, node2);
      // If both left and right subtrees return non-null, root is the LCA
      if (leftLCA && rightLCA) {
        return root;
      }
      // Otherwise, return the non-null result from left or right subtree
      return leftLCA ? leftLCA : rightLCA;
    };

    // Start the search for the lowest common ancestor from the root
    return findLCA(this.root, node1, node2);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
