常见的 AST 节点


## Literal
Literal 是字面量的意思，比如 let name = 'guang'中，'guang'就是一个字符串字面量 StringLiteral，相应的还有数字字面量 NumericLiteral，布尔字面量 BooleanLiteral，字符串字面量 StringLiteral，正则表达式字面量 RegExpLiteral 等。

## Identifier

Identifer 是标识符的意思，变量名、属性名、参数名等各种声明和引用的名字，都是Identifer。我们知道，JS 中的标识符只能包含字母或数字或下划线（“_”）或美元符号（“$”），且不能以数字开头。这是 Identifier 的词法特点。

## Statement

statement 是语句，它是可以独立执行的单位，比如 break、continue、debugger、return 或者 if 语句、while 语句、for 语句，还有声明语句，表达式语句等。我们写的每一条可以独立执行的代码都是语句。

## Declaration
声明语句是一种特殊的语句，它执行的逻辑是在作用域内声明一个变量、函数、class、import、export 等。


比如下面这些声明语句：
```js
const a = 1;
function b(){}
class C {}

import d from 'e';

export default e = 1;
export {e};
export * from 'e';
```

## Expression
expression 是表达式，特点是执行完以后有返回值，这是和语句 (statement) 的区别。
```js
[1,2,3]
a = 1
1 + 2;
-1;
function(){};
() => {};
class{};
a;
this;
super;
a::b;
```
