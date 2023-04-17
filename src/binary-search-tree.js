const {NotImplementedError} = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
    constructor() {
        this.tree = null;
    }

    root() {
        return this.tree;
    }

    add(data) {
        if (typeof data !== "number") {
            return this.tree;
        }
        const node = new Node(data);

        if (!this.tree) {
            this.tree = node;
            return this.tree;
        }
        let targetNod = this.tree;
        let flag = false;
        while (!flag) {
            if (targetNod.data < node.data) {
                if (targetNod.right === null) {
                    targetNod.right = node;
                    flag = true;
                } else {
                    targetNod = targetNod.right;
                }
            } else {
                if (targetNod.left === null) {
                    targetNod.left = node;
                    flag = true;
                } else {
                    targetNod = targetNod.left;
                }
            }
        }
    }

    has(data) {

        const findNode = this.find(data);
        return !!findNode;
    }

    find(data) {
        if (typeof data !== "number") {
            return null;
        }
        let flag = false;
        let targetNod = this.tree;
        let findNode;

        while (!flag) {
            if (!targetNod) {
                flag = true;
                findNode = null;
                return targetNod;
            }
            if (targetNod.data === data) {
                flag = true;
                findNode = targetNod;
            } else {
                if (targetNod.data < data) {
                    // 7 < 5
                    targetNod = targetNod.right;
                } else {
                    targetNod = targetNod.left;
                }
            }
        }
        return findNode;
    }

    remove(data) {
        if (typeof data !== "number") {
            return null;
        }

        let targetNod = this.tree;
        let parent = null;
        let findNode = null;

        while (targetNod !== null && targetNod.data !== data) {
            if (data < targetNod.data) {
                parent = targetNod;
                targetNod = targetNod.left;
            } else {
                parent = targetNod;
                targetNod = targetNod.right;
            }
        }


        if (targetNod === null) {
            return null;
        }

        findNode = targetNod;


        if (targetNod.left === null && targetNod.right === null) {
            if (parent === null) {
                this.tree = null;
            } else if (parent.left === targetNod) {
                parent.left = null;
            } else {
                parent.right = null;
            }
        }

        else if (targetNod.left === null) {
            if (parent === null) {
                this.tree = targetNod.right;
            } else if (parent.left === targetNod) {
                parent.left = targetNod.right;
            } else {
                parent.right = targetNod.right;
            }
        } else if (targetNod.right === null) {
            if (parent === null) {
                this.tree = targetNod.left;
            } else if (parent.left === targetNod) {
                parent.left = targetNod.left;
            } else {
                parent.right = targetNod.left;
            }
        }

        else {
            let minRightNode = targetNod.right;
            let minRightParent = targetNod;

            while (minRightNode.left !== null) {
                minRightParent = minRightNode;
                minRightNode = minRightNode.left;
            }

            targetNod.data = minRightNode.data;

            if (minRightParent.left === minRightNode) {
                minRightParent.left = minRightNode.right;
            } else {
                minRightParent.right = minRightNode.right;
            }
        }

        return findNode;
    }

    min(node = this.tree) {
        if (!node.left) {
            return node.data;
        } else {
            return this.min(node.left);
        }
    }

    max(node = this.tree) {
        if (!node.right) {
            return node.data;
        } else {
            return this.max(node.right);
        }
    }
}

module.exports = {
    BinarySearchTree,
};