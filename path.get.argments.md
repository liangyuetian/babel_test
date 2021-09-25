# 统计 ast path get 属性的参数


### 1. path.get('source.value).node

> import { aa1, aa2 as b2 } from './a';

traverse(ast, {
    ImportDeclaration(path) {}
})

获得 导入语句 form 后面部分。如 'import { aa1, aa2 } from './a';' 得到 './a'；

### 2. path.get('specifiers')

得到 import 导入的变量。如 'import { aa1, aa2 } from './a';' 得到 aa1和aa2两个节点，可以用 toString() 得到字面量；

1. path.get('specifiers')[0].isImportDefaultSpecifier() 来判断是否是默认导入
2. path.get('specifiers')[0].isImportSpecifier() 判断是否是解构导入
3. path.get('specifiers')[0].isImportNamespaceSpecifier() 判断是否是命名空间导入，import * as b from 'A'

### 3. specifiers.get('imported') || specifiers.get('local')

> import { aa1, aa2 as b2 } from './a';

结构导入
1. path.get('specifiers')[0].get('imported').node.name 可以得到 aa1
2. path.get('specifiers')[0].get('local').node.name 可以得到 aa1
3. path.get('specifiers')[1].get('imported').node.name 可以得到 aa2
4. path.get('specifiers')[1].get('local').node.name 可以得到 b2

> import A from 'A'

如果是默认导入
1. path.get('specifiers')[0].isImportDefaultSpecifier()
2. path.get('specifiers')[0].get('local').node.name

### 4. specifiers.get('exported') || specifiers.get('local')

> export { aa1, aa2 }

traverse(ast, {
    ExportDeclaration(path) {}
})

1. path.isExportNamedDeclaration() 判断是否是命名空间导出，如： export { A }
2. path.isExportDefaultDeclaration() 来判断是否是默认导出，如：export default A

> 只有命名空间导出才是list

1. path.get('specifiers')[0].get('exported').node.name 可以得到 aa1
2. path.get('specifiers')[0].get('local').node.name 可以得到 aa1
3. path.get('specifiers')[1].get('exported').node.name 可以得到 aa2
4. path.get('specifiers')[1].get('local').node.name 可以得到 b2

### 5. path.get('declaration') || path.get('left'')

> export default A

当是默认导出时，使用 declaration 和 left

1. path.isExportDefaultDeclaration()
2. path.get('declaration'); // 得到导出声明
3. path.get('declaration').isAssignmentExpression() 如果是赋值语句，则使用下面的方法得出exportName
4. path.get('declaration').isAssignmentExpression() && path.get('declaration').get('left').toString();
5. !path.get('declaration').isAssignmentExpression() && path.get('declaration').toString();


