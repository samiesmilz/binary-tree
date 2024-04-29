# Binary Tree Implementation

This repository contains an implementation of a Binary Tree data structure in JavaScript, along with several methods to perform various operations on the binary tree.

## Introduction

A binary tree is a hierarchical data structure in which each node has at most two children, referred to as the left child and the right child. The topmost node of the tree is called the root node.

## Usage

### Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/your-samiesmilz/binary-tree.git
```

### Usage Example

```javascript
const { BinaryTree, BinaryTreeNode } = require("./binary-tree");

// Create nodes
const node1 = new BinaryTreeNode(1);
const node2 = new BinaryTreeNode(2);
const node3 = new BinaryTreeNode(3);
const node4 = new BinaryTreeNode(4);
const node5 = new BinaryTreeNode(5);

// Construct the binary tree
node1.left = node2;
node1.right = node3;
node2.left = node4;
node2.right = node5;

const binaryTree = new BinaryTree(node1);

// Example usage of methods
console.log("Minimum Depth:", binaryTree.minDepth()); // Output: Minimum Depth: 2
console.log("Maximum Depth:", binaryTree.maxDepth()); // Output: Maximum Depth: 3
console.log("Maximum Sum:", binaryTree.maxSum()); // Output: Maximum Sum: 15

// Serialize and Deserialize
const serializedTree = BinaryTree.serialize(binaryTree);
console.log("Serialized Tree:", serializedTree);
const deserializedTree = BinaryTree.deserialize(serializedTree);
console.log("Deserialized Tree:", deserializedTree);

// Find lowest common ancestor
const lca = binaryTree.lowestCommonAncestor(node4, node5);
console.log("Lowest Common Ancestor:", lca.val); // Output: Lowest Common Ancestor: 2
```

## Available Methods

- `minDepth()`: Returns the minimum depth of the binary tree.
- `maxDepth()`: Returns the maximum depth of the binary tree.
- `maxSum()`: Returns the maximum sum of a path in the binary tree.
- `nextLarger(lowerBound)`: Returns the smallest value in the tree larger than the specified lower bound.
- `areCousins(node1, node2)`: Determines whether two nodes are cousins.
- `lowestCommonAncestor(node1, node2)`: Finds the lowest common ancestor of two nodes.
- `serialize(tree)`: Serializes the binary tree into a string.
- `deserialize(stringTree)`: Deserializes a string representation of a binary tree into a BinaryTree object.

## More

- Implement additional methods or optimizations for the Binary Tree.
- Test the implementation with edge cases and large datasets.
- Explore different traversal algorithms and their applications.
