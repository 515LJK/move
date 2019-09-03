# move.js

一个简单的js运动方法,利用Tween函数和requestAnimationFrame进行动画运动。

### 示例&&参数说明
- 引入
``` javascript
    import move from 'move.js'
```

- 直接调用
``` javascript
    let app = document.getElementById('app');

    move.startMove(app, {
        left: 100
    }, 1000, 'linear', function() {});
```

- startMove参数说明

| 属性        | 说明   |  类型  |   必填  |
| --------   | :-----:  | :----:  | :---:   |
| obj     | 要操作的dom元素 |   HtmlElement     | √
| json        |   要操作的css属性，可以传入多个   |   Object   | √
| time        |    持续时间    |  number  | √
| type  | 运动类型 | String | √
| callback | 回调函数，运动结束后调用 | Function | √

- 其他方法
```javascript
    let app = document.getElementById('app');

    move.css(app, 'left', 100); // 设置dom的left为100px
```

- move参数说明

| 属性        | 说明   |  类型  |   必填  |
| --------   | :-----:  | :----:  | :---:   |
| obj     | dom元素 |   HtmlElement     | √
| attr        |   css属性   |   Object   | √
| value        |    要设置的值，如果不填，函数返回dom当前的值    |  number  | ×


- 补充说明
1. 在move中，scale和opacity为了方便操作，值的变化从0-1改为0-100,即如果要设置opacity为1，需要传入100;
2. move支持css3的transform操作，但由于transform属性值获取的局限性，因此在使用之前，必须先设置一次初始值，然后才能操作
3. transform如果不设置初始值，获取时默认返回0，如果是scale，返回100

> 例子
```javascript
    let app = document.getElementById('app');
    
    move.css(app, 'opacity'); //返回100

    move.css(app, 'translateX', 100); // 先设置初始值
    // 调用运动 运动从100px开始移动到200px
    move.startMove(app, {
        'translateX' : 200
    }, 1000, 'linear', function() {});
```
