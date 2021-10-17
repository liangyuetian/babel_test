# compiler 钩子

[https://webpack.docschina.org/api/compiler-hooks/#hooks](https://webpack.docschina.org/api/compiler-hooks/#hooks)

> Compiler 模块是 webpack 的主要引擎，它通过 CLI 或者 Node API 传递的所有选项创建出一个 compilation 实例。 它扩展（extends）自 Tapable 类，用来注册和调用插件。 大多数面向用户的插件会首先在 Compiler 上注册。

在为 webpack 开发插件时，你可能需要知道每个钩子函数是在哪里调用的。想要了解这些内容，请在 webpack 源码中搜索 hooks.<hook name>.call


## 钩子有哪些

以下生命周期钩子函数，是由 compiler 暴露， 可以通过如下方式访问：
```js
compiler.hooks.someHook.tap('MyPlugin', (params) => {
/* ... */
});
```
取决于不同的钩子类型，也可以在某些钩子上访问 tapAsync 和 tapPromise。

关于钩子类型的描述，请查看 [Tapable](https://github.com/webpack/tapable#tapable) 文档.


### environment

<code>SyncHook</code>

> 在编译器准备环境时调用，时机就在配置文件中初始化插件之后。

afterEnvironment $#afterEnvironment$
<code>SyncHook</code>

> 当编译器环境设置完成后，在 environment hook 后直接调用。


### entryOption

<code>SyncBailHook</code>

> 在 webpack 选项中的 entry 被处理过之后调用。

回调参数：context, entry
compiler.hooks.entryOption.tap('MyPlugin', (context, entry) => {
/* ... */
});

### afterPlugins

<code>SyncHook</code>

> 在初始化内部插件集合完成设置之后调用。

回调参数：compiler

### afterResolvers

<code>SyncHook</code>

> resolver 设置完成之后触发。

回调参数：compiler

### initialize

<code>SyncHook</code>

> 当编译器对象被初始化时调用。


### beforeRun

<code>AsyncSeriesHook</code>

> 在开始执行一次构建之前调用，compiler.run 方法开始执行后立刻进行调用。

回调参数：compiler

### run

<code>AsyncSeriesHook</code>

> 在开始读取 records 之前调用。

回调参数：compiler

### watchRun

<code>AsyncSeriesHook</code>

> 在监听模式下，一个新的 compilation 触发之后，但在 compilation 实际开始之前执行。

回调参数：compiler

### normalModuleFactory

<code>SyncHook</code>

> NormalModuleFactory 创建之后调用。

回调参数：normalModuleFactory

### contextModuleFactory

<code>SyncHook</code>

> ContextModuleFactory 创建之后调用。

回调参数：contextModuleFactory

### beforeCompile

<code>AsyncSeriesHook</code>

> 在创建 compilation parameter 之后执行。

回调参数：compilationParams
初始化 compilationParams 变量的示例如下：

```js
compilationParams = {
    normalModuleFactory,
    contextModuleFactory,
};
```

此钩子可用于添加/修改 compilation parameter：

```js
compiler.hooks.beforeCompile.tapAsync('MyPlugin', (params, callback) => {
    params['MyPlugin - data'] = 'important stuff my plugin will use later';
    callback();
});
```

### compile

<code>SyncHook</code>

> beforeCompile 之后立即调用，但在一个新的 compilation 创建之前。这个钩子 不会 被复制到子编译器。

回调参数：compilationParams

### thisCompilation

<code>SyncHook</code>

> 初始化 compilation 时调用，在触发 compilation 事件之前调用。这个钩子 不会 被复制到子编译器。

回调参数：compilation, compilationParams

### compilation

<code>SyncHook</code>

> compilation 创建之后执行。

回调参数：compilation, compilationParams

### make

<code>AsyncParallelHook</code>

> compilation 结束之前执行。这个钩子 不会 被复制到子编译器。

回调参数：compilation

### afterCompile

<code>AsyncSeriesHook</code>

> compilation 结束和封印之后执行。

回调参数：compilation

### shouldEmit

<code>SyncBailHook</code>

> 在输出 asset 之前调用。返回一个布尔值，告知是否输出。

回调参数：compilation
```js
compiler.hooks.shouldEmit.tap('MyPlugin', (compilation) => {
    // 返回 true 以输出 output 结果，否则返回 false
    return true;
});
```

### emit

<code>AsyncSeriesHook</code>

> 输出 asset 到 output 目录之前执行。这个钩子 不会 被复制到子编译器。

回调参数：compilation

### afterEmit

<code>AsyncSeriesHook</code>

> 输出 asset 到 output 目录之后执行。这个钩子 不会 被复制到子编译器。

回调参数：compilation

### assetEmitted

<code>AsyncSeriesHook</code>

> 在 asset 被输出时执行。此钩子可以访问被输出的 asset 的相关信息，例如它的输出路径和字节内容。

回调参数：file, info
例如，可以通过 info.content 访问 asset 的内容 buffer：

compiler.hooks.assetEmitted.tap(
'MyPlugin',
(file, { content, source, outputPath, compilation, targetPath }) => {
console.log(content); // <Buffer 66 6f 6f 62 61 72>
}
);

### done

<code>AsyncSeriesHook</code>

> 在 compilation 完成时执行。这个钩子 不会 被复制到子编译器。

回调参数：stats

### additionalPass

<code>AsyncSeriesHook</code>

This hook allows you to do a one more additional pass of the build.


### failed

<code>SyncHook</code>

> 在 compilation 失败时调用。

回调参数：error

### invalid

<code>SyncHook</code>

> 在一个观察中的 compilation 无效时执行。这个钩子 不会 被复制到子编译器。

回调参数：fileName, changeTime

### watchClose

<code>SyncHook</code>

> 在一个观察中的 compilation 停止时执行。


### infrastructureLog

<code>SyncBailHook</code>

在配置中启用 infrastructureLogging 选项 后，允许使用 infrastructure log(基础日志)。

回调参数：name, type, args

### log

<code>SyncBailHook</code>

> 启用后允许记录到 stats 对象，请参阅 stats.logging, stats.loggingDebug 和 stats.loggingTrace 选项。

回调参数：origin, logEntry
