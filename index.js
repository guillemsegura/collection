"use strict";

const { cloneDeep } = require("lodash");

/**
 * Utility class that allows grouping and manipulation of datasets.
 */
class Collection {
  constructor(data) {
    this.data = data;
    this.tree = { id: null, children: cloneDeep(this.data) };
  }

  group(fieldName) {
    findLeaves(this.tree).forEach((l) => {
      const groups = [];
      l.children.forEach((d) => {
        const groupFound = groups.find((s) => s.id === d[fieldName]);
        if (groupFound) {
          groupFound.children.push(d);
        } else {
          groups.push({ id: d[fieldName], children: [d] });
        }
      });
      l.children = groups;
    });

    return this;
  }

  compose(fn) {
    findLeaves(this.tree).forEach((l, i) => {
      let prev = null;
      l.children.forEach((d) => {
        fn(prev, d, l, i);
        prev = cloneDeep(d);
      });
    });

    return this;
  }

  get() {
    return findLeaves(this.tree)
      .map((l) => l.children)
      .flat();
  }
}

const findLeaves = (tree) => {
  const leaves = [];
  function _findLeaves(tree) {
    if (tree.children && tree.children.find((c) => c.children)) {
      tree.children.forEach((c) => _findLeaves(c));
    } else {
      leaves.push(tree);
    }
  }
  _findLeaves(tree);
  return leaves;
};

module.exports = Collection;
