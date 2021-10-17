const ast = require('./babel_parser')
const {default: traverse} = require('@babel/traverse')

/*

function traverse(parent, opts)

常用的就前面两个参数，parent 指定要遍历的 AST 节点，opts 指定 visitor 函数。babel 会在遍历 parent 对应的 AST 时调用相应的 visitor 函数。
visitor 对象的 value 是对象或者函数：

如果 value 为函数，那么就相当于是 enter 时调用的函数。
如果 value 为对象，则可以明确指定 enter 或者 exit 时的处理函数。

// 进入 FunctionDeclaration 节点时调用
traverse(ast, {
  FunctionDeclaration: {
      enter(path, state) {}
  }
})

// 默认是进入节点时调用，和上面等价
traverse(ast, {
  FunctionDeclaration(path, state) {}
})

traverse(ast, {
  'FunctionDeclaration|VariableDeclaration'(path, state) {}
})

// 通过别名指定离开各种 Declaration 节点时调用
traverse(ast, {
  Declaration: {
      exit(path, state) {}
  }
})

 */
traverse(ast, {
    Identifier(path, state) {
        console.log(path, state)
        // path 是遍历过程中的路径，会保留上下文信息，有很多属性和方法，比如:
        //
        // path.node 指向当前 AST 节点
        // path.get、path.set 获取和设置当前节点属性的 path
        // path.parent 指向父级 AST 节点
        // path.getSibling、path.getNextSibling、path.getPrevSibling 获取兄弟节点
        // path.find 从当前节点向上查找节点

        // path.scope 获取当前节点的作用域信息
    },
    StringLiteral: {
        // enter 时调用是在遍历当前节点的子节点前调用，exit 时调用是遍历完当前节点的子节点后调用。
        enter(path, state) {
        },
        exit(path, state) {
        }
    },
    // 进入 FunctionDeclaration 节点时调用
    // FunctionDeclaration: {
    //     enter(path, state) {
    //         console.log(path, state)
    //     }
    // },
    // 默认是进入节点时调用，和上面等价
    // FunctionDeclaration(path, state) {},

    // 进入 FunctionDeclaration 和 VariableDeclaration 节点时调用
    // 'FunctionDeclaration|VariableDeclaration'(path, state) {},

    // 通过别名指定离开各种 Declaration 节点时调用
    Declaration: {
        exit(path, state) {}
    }
})
