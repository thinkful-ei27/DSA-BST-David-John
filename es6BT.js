/* eslint-disable strict */
const tree = (r = null, n = 0) => {
  let nodes = n;
  let root = r;

  const node = (data, left = null, right = null) => {
    const o = {
      left: null,
      right: null,
      show() {
        console.log(this.data);
      }
    };
    return Object.assign(Object.create(o), {data, left, right});
  };

  const traversals = {
    find(data) {
      let current = root;
      while ((current.data !== data)) {
        if (data < current.data) {
          current = current.left;
        } else {
          current = current.right;
        }
        if (current === null) {
          return undefined;
        }
      }
      return current;
    },
    inOrder: function inOrder(node) {
      if (!(node === null)) {
        inOrder(node.left);
        node.show();
        inOrder(node.right);
      }
    },
    preOrder: function preOrder(node) {
      if (!(node === null)) {
        node.show();
        preOrder(node.left);
        preOrder(node.right);
      }
    },
    postOrder: function postOrder(node) {
      if (!(node === null)) {
        postOrder(node.left);
        postOrder(node.right);
        node.show();
      }
    },
    maxDepth: function maxDepth(node) {
      if (node === null) {
        return 0;
      } else {
        // Compute the depth of each subtree
        let lDepth = maxDepth(node.left);
        let rDepth = maxDepth(node.right);
  
        if (lDepth > rDepth) {
          return lDepth + 1;
        } else {
          return rDepth + 1;
        }
      }
    }
  };

  const getValues = {
    minValue() {
      let current = root;
      while (!(current.left === null)) {
        current = current.left;
      }
      return current.data;
    },
    maxValue () {
      let current = root;
      while (!(current.right === null)) {
        current = current.right;
      }
      return current.data;
    },
    totalNodes: () => nodes,
    totalEdges: function totalEdges (node) {
      if (node === null) {
        return 0;
      }
      if (node.left === null && node.right === null) {
        return 1;
      } else {
        return totalEdges(node.left) + totalEdges(node.right);
      }
    },
    getRoot: () => root
  };

  const insert = (data) => {
    const n = node(data);
    if (root == null) {
      root = n;
    } else {
      let current = root;
      while (!(current === null)) {
        let parent = current;
        if (data < current.data) {
          current = current.left;
          if (current === null) {
            parent.left = n;
          }
        } else {
          current = current.right;
          if (current === null) {
            parent.right = n;
          }
        }
      }
    }
    nodes += 1;
  };

  const remove = (data) => {
    root = removeNode(getValues.getRoot(), data);
  };

  const removeNode = (node, data) => {
    if (node === null) {
      return null;
    }
    if (data === node.data) {
      if (node.left === null && node.right === null) {
        return null;
      }
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      }

      let tempNode = getValues.minValue(node.right);
      node.data = tempNode.data;
      node.right = removeNode(node.right, data);
      return node;
    } else if (data < node.data) {
      node.left = removeNode(node.left, data);
    } else {
      node.right = removeNode(node.right, data);
      return node;
    }
  };

  return Object.assign({}, {insert}, {remove}, traversals, getValues);
};

const nums = tree();
nums.insert(23);
nums.insert(45);
nums.insert(16);
// nums.insert(37);
// nums.insert(3);
// nums.insert(99);
// nums.insert(22);

console.log('Inorder traversal: ');
nums.inOrder(nums.getRoot());
console.log('\nPreorder traversal: ');
nums.preOrder(nums.getRoot());
console.log('\nPostorder traversal: ');
nums.postOrder(nums.getRoot());
console.log('Find value 45: ');
console.log(nums.find(45));
console.log('Height is: ');
console.log(nums.maxDepth(nums.getRoot()));
