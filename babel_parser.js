/*
parse 的内容是什么：

plugins： 指定jsx、typescript、flow 等插件来解析对应的语法
allowXxx： 指定一些语法是否允许，比如函数外的 await、没声明的 export等
sourceType： 指定是否支持解析模块语法，有 module、script、unambiguous 3个取值，
    module 是解析 es module 语法，
    script 则不解析 es module 语法，当作脚本执行，
    unambiguous 则是根据内容是否有 import 和 export 来确定是否解析 es module 语法。

以什么方式 parse

strictMode 是否是严格模式
startLine 从源码哪一行开始 parse
errorRecovery 出错时是否记录错误并继续往下 parse
tokens parse 的时候是否保留 token 信息
ranges 是否在 ast 节点中添加 ranges 属性
*/
const code = require('fs').readFileSync('./code.js', {encoding: 'utf-8'})
const ast = require("@babel/parser").parse(code, {
    sourceType: "module",
    plugins: [
        // "jsx",
        // "typescript"
    ]
});

module.exports = ast
