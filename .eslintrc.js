module.exports = {
  root: true,
  env: {
    node: true, // 启用node中全局变量
    browser: true // 启用浏览器中全局变量
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/typescript/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    // 解析器选项（parserOptions），用于对解析器进行更精细化的配置。
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // 禁止不必要的转义字符
    'no-useless-escape': 'off'
  }
}
