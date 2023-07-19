# docsify-sidebar-tree

Support docsify sidebar catalog expand and collapse

# Usage

---

```html
<script src="docsify-sidebar-tree.js"></script>
```

# Preview

---

![](1.gif)

If you want to open all nodes by default

```js
window.$docsify = {
  sidebarTree: {
    open: true,//def false
  }
}
```

# _sidebar.md demo

```
- [数据结构与算法](README.md)
  - 数据结构
    - [stack](README.md)
    - [queue](README.md)
    - list
      - [linked-list](README.md)
      - [doubly-linked-list](README.md)
    - tree
      - [binary search tree](README.md)
      - [red black tree](README.md)
    - [heap](README.md)
    - [hash-table](README.md)
    - [graph](README.md)
  - 算法
    - [排序算法](README.md)
- 网络
  - [协议模型](README.md)
  - [TCP/IP](README.md)
```