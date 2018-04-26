## 一、什么是JQuery事件？
jQuery事件是DOM事件的封装，同时支持自定义的扩展。在程序设计中，事件和代理有着相似的作用： 它们提供了一种机制，使得行为的实现方式和调用时机可以分离。
不谈jQuery，DOM本身就提供了一系列的javascript事件，例如`click`，`keyup`，`submit`。 未实现相关业务逻辑，通常会为这些事件定义一系列的处理函数，处理函数定义了业务的实现方式，而浏览器知道这些业务的调用时机。 Javascript事件就是这样一种机制，使得行为的实现方式和调用时机可以动态地绑定。
jQuery事件是通过封装javascript事件来实现的，例如`.keyup()`便是onkeyup的封装：
```
.keyup()： Bind an event handler to the “keyup” JavaScript event, or trigger that event on an element.
```

## 二、常用事件绑定
除了封装大多数的javascript事件，jQuery提供了统一的事件绑定和触发机制：
>* 绑定事件：bind、on、live、delegate；
>* 触发事件：trigger('keyup')；
>* 解绑事件：unbind、off、die、undelegate；

先来看下常用事件绑定适用的版本：
>* bind()-------------------------版本号小于3.0（在Jquery3.0中已经移除，相应unbind()也移除）；
>* live()--------------------------版本号小于1.7（在Jquery1.7中已经移除，相应die()也移除）；
>* delegate()--------------------版本号小于1.7（在Jquery1.7中已经移除）；
>* on()---------------------------版本号大于1.7（在Jquery1.7中添加，相应off()也添加）；

自 jQuery 版本 1.7 起，`on()`方法是`bind()`、`live()`和`delegate()`方法的新的替代品。因为`on()`是最通用的jQuery事件机制，其他事件绑定都是`on()`来实现的，参见jQuery1.8.2源码：
```
bind: function( types, data, fn ) {
    return this.on( types, null, data, fn );
},
unbind: function( types, fn ) {
    return this.off( types, null, fn );
},

live: function( types, data, fn ) {
    jQuery( this.context ).on( types, this.selector, data, fn );
    return this;
},
die: function( types, fn ) {
    jQuery( this.context ).off( types, this.selector || "**", fn );
    return this;
},

delegate: function( selector, types, data, fn ) {
    return this.on( types, selector, data, fn );
},
undelegate: function( selector, types, fn ) {
    return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
}
```

官方用`on()`取缔其余三种方法的原因可能是出于性能的考虑：毕竟`on()`是其他方式的底层实现，简化JQuery代码库；其次`on()`方法有4个参数可选，分别是**events|selecter|data|fn**，其中selecter是其它绑定方法不具备的，原来我们的事件events只能委派给document，如果你需要绑定的DOM目标嵌套在很深的DOM结构中，那么让document去派发事件我想是非常不明智的，我们用on()就可以找到要绑定的目标元素的父级，通过事件委托机制，这样事件的派发就变得轻松很多，提升效率。

## 三、使用方法：

使用`on()`方法添加的事件处理程序适用于当前及未来的元素，如需移除事件处理程序，请使用`off()`方法， 如需添加只运行一次的事件然后移除，请使用`one()`方法，语法规则如下：

$(selector).on(event,childSelector,data,function)

参数解释：
>* event-----------------------必需。规定要从被选元素移除的一个或多个事件或命名空间，由空格分隔多个事件值，也可以是数组。必须是有效的事件。
>* childSelector---------------可选。规定只能添加到指定的子元素上的事件处理程序（且不是选择器本身，比如已废弃的 delegate() 方法）；
>* data------------------------可选。规定传递到函数的额外数据；
>* function--------------------可选。规定当事件发生时运行的函数；

参见DEMO：

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <script src="./jquery.min.js"></script>
    <style>
        #Container{
            width: 100%;
            height: 400px;
            background: thistle;
        }
        .created{
            width: 150px;
            height: 150px;
            border: 1px solid red;
            float: left;
            padding: 10px;
        }
    </style>
</head>
<body>
<button id="add" type="button">添加 DIV</button>
<button id="del" type="button">删除 DIV</button>
<button id="onBtn1" type="button">原生元素绑定事件</button>
<button id="onBtn" type="button">动态元素绑定事件</button>
<button id="offBtn" type="button">解绑事件</button>
<div id="container">
    <div class='created'>我是原生div</div>
    </div>
</body>
<script>
    $(function () {
        $("#add").click(function(){
            $("#container").prepend("<div class='created'>我是动态生成的DIV<div/>")
        });
        $("#del").click(function(){
            $("div").remove(".created:first")
        });
        $("#onBtn1").click(function(){
            $(".created").bind("click", function(){
                alert('我为原生元素添加事件');
            });
        });
        $("#onBtn").click(function(){
            $("#container").on("click",".created",function(){
                alert('我为动态元素添加事件');
            });
        });
        $("#offBtn").click(function(){
            $("#container").off("click");
        })
    })
</script>
</html>
```