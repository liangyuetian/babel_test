const {codeFrameColumns} = require('@babel/code-frame')
const code = require('fs').readFileSync('./code.js', {encoding: 'utf-8'})
const res = codeFrameColumns(code, {
    start: { line: 18, column: 5},
    end: { line: 19, column: 52}
}, {
    highlightCode: true,
    message: '这里出错了'
})

console.log(res)
