/**
 * A Minimum Heap: i.e. a collection of values that supports the following operations:
 * * buildHeap - Create Heap from initialValues in O(n) time
 * * length - get number of items in collection in O(1) time
 * * peek - get minimum item in collection in O(1) time
 * * pop - remove the minimum item in collection in O(log(n)) time
 * * push - add a new item to the collection in O(log(n)) time
 * 
 * Space complexity is O(n).
 * @param initialValues {Array} Initial values to add to the Heap
 */
export function MinHeap<T>(initialValues: T[] = []) {
  /**
   * Store all values in this array.
   * Array indexes are determined by position in the binary tree
   * at (2 * level) + indexAtLevel, where both level and indexAtLevel start at 0
   */
  buildHeap(initialValues);
  const array: T[] = initialValues;
  return {
    get length() {
      return array.length;
    },
    peek,
    pop,
    push,
  };

  /**
   * @returns the minimum value of all items.
   */
  function peek() {
    return array[0];
  }
  /**
   * Remove the minimum value from the collection.
   * @returns The minimum value that was removed
   */
  function pop() {
    swap(array, 0, array.length - 1);
    const popped = array.pop();
    siftDown(array, 0);
    return popped;
  }
  /**
   * Add a new value.
   * @param value The value to add
   */
  function push(value: T) {
    array.push(value);
    siftUp(array, array.length - 1);
  }
}

/** Given an index in an array storing a binary tree, return the index of its left child. There may be no value at that index. */
function leftIndex(index: number) {
  return (2 * index) + 1;
}
/** Given an index in an array storing a binary tree, return the index of its right child. There may be no value at that index. */
function rightIndex(index: number) {
  return (2 * index) + 2;
}
/** Given an index in an array storing a binary tree, return the index of its parent */
function parentIndex(index: number) {
  return Math.floor((index - 1) / 2);
}

/**
 * Given an array of values, order the items so they represent a MinHeap binary tree.
 */
function buildHeap<T>(initialValues: Array<T>) {
  const lastChild = initialValues.length - 1;
  const firstParent = parentIndex(lastChild);
  for (let i = firstParent; i >= 0; i--) {
    siftDown(initialValues, i);
  }
}

/**
 * Move the value at the provided index down in the binary tree until it satiesfies the Heap property.
 * (i.e. move it down until all its descendents are larger that it)
 * @param array {Array} An array of values representing a binary tree that has the Heap property
 * @param index {Number} index of value to siftDown
 */
function siftDown<T>(array: Array<T>, index: number) {
  while (index < array.length) {
    let left = leftIndex(index);
    let right = rightIndex(index);
    let hasLeft = left < array.length;
    let hasRight = right < array.length;
    if ((!hasLeft) && (!hasRight)) {
    }
    let minChild;
    if ((!hasLeft) && (!hasRight)) {
      // node with index is a leaf. nothing more to do
      return;
    } else if (!hasLeft) {
      minChild = right;
    } else if (!hasRight) {
      minChild = left;
    } else {
      // have both left and right
      minChild = (array[left] < array[right]) ? left : right;
    }
    if (array[index] > array[minChild]) {
      swap(array, index, minChild);
      index = minChild;
    } else {
      return;
    }
  }
}

/**
 * Move the value at the provided index up in the binary tree until it satiesfies the Heap property.
 * (i.e. move it up until all its descendents are greater than it)
 * @param array {Array} An array of values representing a binary tree that has the Heap property
 * @param index {Number} index of value to siftUp
 */
function siftUp<T>(array: Array<T>, index: number) {
  while (index) {
    const parent = parentIndex(index);
    // min heap
    if (array[index] < array[parent]) {
      swap(array, index, parent);
    }
    index = parent;
  }
}

/**
 * Swap the values at two indexes in the array.
 * @param array 
 * @param i {Number} first index to swap
 * @param j {Number} second index to swap
 */
function swap<T>(array: Array<T>, i: number, j: number) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
