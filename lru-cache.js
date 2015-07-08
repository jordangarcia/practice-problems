class Node {
  constructor(key, value) {
    this.parent = null
    this.child = null
    this.value = value
    this.key = key
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  insert(node) {
    if (!this.head && !this.tail) {
      this.head = this.tail = node
      this.length++
      return
    }


    if (this.head) {
      node.child = this.head
    }

    this.head = node

    this.length++
  }

  remove(node) {
    if (node === this.tail) {
      this.tail = node.parent
    }

    if (node === this.head) {
      this.head = node.child
    }

    if (node.child) {
      node.child.parent = node.parent
    }

    if (node.parent) {
      node.parent.child = node.child
    }
    this.length--
  }
}

class LRUCache {
  constructor({ limit }) {
    this.limit = limit
    this.nodeMap = {}
    this.list = new DoublyLinkedList()
  }

  set(key, value) {
    var node = this.nodeMap[key]
    if (node && this.list.head === node) {
      // node already at head
      return
    }

    if (node) {
      existingNode.remove()
    } else {
      node = new Node(key, value)
    }
    this.list.insert(node)
    this.nodeMap[key] = node

    if (this.list.length > this.limit) {
      this.__deleteNode(this.list.tail)
    }
  }

  delete(key) {
    var node = this.nodeMap[key]
    if (!node) {
      return
    }

    this.__deleteNode(node)
  }

  get(key) {
    var node = this.nodeMap[key]
    if (node) {
      return node.value
    }
  }

  __deleteNode(node) {
    this.list.remove(node)
    delete this.nodeMap[node.key]
  }
}

var cache = new LRUCache({ limit: 3 })

cache.set(1, 'one')
cache.set(2, 'two')
cache.set(3, 'three')
cache.set(4, 'four')

console.log(cache.get(1))
console.log(cache.get(2))
console.log(cache.get(3))
console.log(cache.get(4))
