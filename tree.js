/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }

  findDFS(val) {
    const toVisitStack = [this];
    let sum = 0;
    let evens = [];
    let numGreater = [];

    while (toVisitStack.length) {
      const current = toVisitStack.pop();

      if (current.val % 2 === 0) {
        evens.push(current.val);
      }

      if (current.val > val) {
        numGreater.push(current.val);
      }

      for (let child of current.children) {
        toVisitStack.push(child);
      }

      console.log(current);
      sum = sum + current.val;
    }
    return {
      sum,
      evens,
      numGreater,
    };
  }

  sumValuesDFS() {
    let sum = 0;
    const toVisitStack = [this];
    while (toVisitStack.length) {
      const current = toVisitStack.pop();
      sum += current.val;
      for (let child of current.children) {
        toVisitStack.push(child);
      }
    }
    return sum;
  }

  countEvensDFS() {
    const evens = [];
    const toVisitStack = [this];
    while (toVisitStack.length) {
      const current = toVisitStack.pop();
      if (current.val % 2 === 0) {
        evens.push(current.val);
      }
      for (let child of current.children) {
        toVisitStack.push(child);
      }
    }
    return evens.length;
  }

  numGreaterDFS(lowerBound) {
    let numGreater = 0;
    const toVisitStack = [this];
    while (toVisitStack.length) {
      const current = toVisitStack.pop();
      if (current.val > lowerBound) {
        numGreater++;
      }
      for (let child of current.children) {
        toVisitStack.push(child);
      }
    }
    return numGreater;
  }

  findBFS() {
    const toVisitQueue = [this];
    while (toVisitQueue.length) {
      const current = toVisitQueue.shift();
      console.log(current);
      for (let child of current.children) {
        toVisitQueue.push(child);
      }
    }
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (!this.root) {
      return 0; // Handle empty tree case
    }
    return this.root.sumValuesDFS();
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (!this.root) {
      return 0; // Handle empty tree case
    }
    return this.root.countEvensDFS();
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if (!this.root) {
      return 0;
    }
    return this.root.numGreaterDFS(lowerBound);
  }
}

module.exports = { Tree, TreeNode };
