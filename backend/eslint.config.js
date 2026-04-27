export default [
  {
    files: ['**/*.js'], // only check .js files
    rules: {
      semi: 'error', // force semicolons
      'no-unused-vars': 'warn', // warn on un used vars
    },
  },
];
