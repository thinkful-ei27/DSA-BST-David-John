/* eslint-disable strict */
class BinarySearchTree {
  constructor(key=null, value=null, parent=null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
  show() {
    return console.log(this.value);
  }
  insert(key, value) {
  //if the tree is empty then this key being inserted is the root node of the tree
    if (this.key == null) {
      this.key = key;
      this.value = value;
    }

    //If the tree already exist, then start at the root, 
    //and compare it to the key you want to insert
    // If the new key is less than the node's key 
    //then the new node needs to live in the left-hand branch.
    else if (key < this.key) {
      //if the existing node does not have any left child, 
      //meaning that if the `left` pointer is empty 
      //then we can just instantiate and insert the new node 
      //as the left child of that node, passing `this` as the parent.  
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      //if the node has an existing left child, 
      //then we recursively call the `insert` method 
      //so the node is added further down the tree.
      else {
        this.left.insert(key, value);
      }
    }
    //Similarly, if the new key is greater than the node's key 
    //then you do the same thing, but on the right-hand side.
    else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }
  find(key) {
  //if the item is found at the root then return that value
    if (this.key == key) {
      return this.value;
    }
    //if the item you are looking for is less than the root 
    //then follow the left child
    //if there is an existing left child, 
    //then recursively check its left and/or right child
    //until you find the item.
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    //if the item you are looking for is greater than the root 
    //then follow the right child
    //if there is an existing right child, 
    //then recursively check its left and/or right child
    //until you find the item.
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    //You have search the treen and the item is not in the tree
    else {
      throw new Error('Key Error');
    }
  }
  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      //If the node only has a left child, 
      //then you replace the node with its left child.  
      else if (this.left) {
        this._replaceWith(this.left);
      }
      //And similarly if the node only has a right child 
      //then you replace it with its right child.
      else if (this.right) {
        this._replaceWith(this.right);
      }
      //If the node has no children then
      //simply remove it and any references to it 
      //by calling "this._replaceWith(null)".
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }
  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      }
      else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  _maxDepth(node) {
    // Base case: node is null, return 0
    if (node === null) {
      return 0;
    }

    // Compute the depth of the left, and the depth of the right
    let lDepth = this._maxDepth(node.left);
    let rDepth = this._maxDepth(node.right);

    // If the depth of the left > right, then left + 1; otherwise right + 1
    if (lDepth > rDepth) {
      return lDepth + 1;
    } else {
      return rDepth + 1;
    }
  }

  _isBST(node) {
    // Base case: node is null, return 0
    if (node === null) {
      return 0;
    }
    if (node.left === null || node.right === null) {
      return 0;
    }

    // Compute the depth of the left, and the depth of the right
    let lDepth = this._isBST(node.left);
    let rDepth = this._isBST(node.right);

    // If the depth of the left > right, then left + 1; otherwise right + 1
    if (node.left.key > node.key) {
      return lDepth - 1;
    } else if (node.right.key < node.key) {
      return rDepth - 1;
    } else {
      return 1;
    }
  }

}

function getRoot(bst) {
  let node = bst;
  let parent = bst;
  while (parent.parent !== null) {
    node = parent;
    parent = parent.parent;
  }
  return node;
}

function isItBST(bst) {
  if (bst._isBalanced(bst) >= 0)  {
    return true;
  } else {
    return false;
  }
}

function findLargest(bst) {
  // Traverse all the way right until right === null
  // If parent.left is null, return parent.parent
  // return parent.left
  // 1. node.left to node.left
  // 2. node.left to node.parent
  // 3. node.parent to parent.left
  // 4. node.parent to node.parent
  if (bst === null) return 'Not big enough';

  if (bst.right === null) {
    return bst;
  }
  return findLargest(bst.right);
}

function thirdLargest(bst) {
  const largest = findLargest(bst);
  bst.remove(largest.key);
  const seclargest = findLargest(bst);
  bst.remove(seclargest.key);
  const returnVal = findLargest(bst);
  bst.insert(largest.value, largest.key);
  bst.insert(seclargest.value, seclargest.key);
  return returnVal.key;
}

function rightSide(node) {
  // Base case: node is null, return 0
  if (node === null) {
    return 0;
  }

  // Compute the depth of the left, and the depth of the right
  let lDepth = rightSide(node.left);
  let rDepth = rightSide(node.right);

  // If the depth of the left > right, then left + 1; otherwise right + 1
  if (lDepth > rDepth) {
    return lDepth + 1;
  } else {
    return rDepth + 1;
  }
}

function leftSide(node) {
  // Base case: node is null, return 0
  if (node === null) {
    return 0;
  }

  // Compute the depth of the left, and the depth of the right
  let lDepth = leftSide(node.left);
  let rDepth = leftSide(node.right);

  // If the depth of the left > right, then left + 1; otherwise right + 1
  if (lDepth > rDepth) {
    return rDepth + 1;
  } else {
    return lDepth + 1;
  }
}

function compare(node) {
  let l = leftSide(node);
  let r = rightSide(node);

  return (Math.abs(l - r) < 2 ? true : false);
}

const BST = new BinarySearchTree();
BST.insert(3, 3);
BST.insert(2,2);
BST.insert(1, 1);
BST.insert(4, 4);
BST.insert(6, 6);
BST.insert(9, 9);
BST.insert(2,2);
BST.insert(5,5);
BST.insert(7,7);
console.log(BST);
console.log(BST._maxDepth(BST));
console.log(getRoot(BST));
console.log(BST);
console.log(thirdLargest(BST));
console.log(compare(BST));