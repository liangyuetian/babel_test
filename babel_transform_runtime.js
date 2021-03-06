const babel = require('@babel/core')
const sourceCode = `
  new Array(5).fill('111');
`;

const {code, map} = babel.transformSync(sourceCode, {
    filename: 'a.mjs',
    targets: {
        browsers: 'Chrome 45',
    },
    plugins: [
        [
            '@babel/transform-runtime',
            {
                corejs: 3
            }
        ]
    ],
    presets: [
        ['@babel/env', {
            debug: true,
            useBuiltIns: 'usage',
            targets: {
                browsers: 'Chrome 45'
            },
            corejs: 3
        }]
    ]
});

console.log(code)
console.log(map)
