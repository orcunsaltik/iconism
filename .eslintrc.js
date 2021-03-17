module.exports = {
    env: {
        node: true
    },
    extends: [
             'eslint:recommended',
        'plugin:node/recommended'
    ],
    parserOptions: {
        ecmaVersion: 9
    },
    rules: {
         'no-mixed-spaces-and-tabs': 0,
        'no-async-promise-executor': 0
    }
};
