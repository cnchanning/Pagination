# easy-pagination

---

[![spm version](http://spmjs.io/package/easy-pagination)](http://spmjs.io/package/easy-pagination)

Ajax 分页组件

---

## Install

```
$ spm install easy-pagination --save
```

## Api


-----------------------------------------------------

## Pagination 配置说明

### totalitems `Number`

总条数

### items_per_page `Number`

每页多少项目

### num_edge `Number`

边界显示条目数，默认为1

### prev_text `String`

上一页文字

### next_text `String`

下一页文字

### ellipse_text `String`

省略符号

### prev_always `Boolean`

始终显示上一页，默认为true

### next_always `Boolean`

始终显示下一页，默认为true

### classprefix `String`

生成不同的类名前缀

### callback `Function`

回调函数，第一个参数为当前页数.

-----------------------------------------------------

## Pagination 公共方法

### prev `Function`

到上一页

### next `Function`

到下一页

### jumpTo `Function`

传递一个参数到跳转页

### getTotalPage `Function`

获取总页数

### getCurrentPage `Function`

获取当前页数