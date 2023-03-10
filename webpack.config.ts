module.exports = {
    mode: 'production',
    entry: './src/index.tsx',
    output: {
      path: `${__dirname}/dist`,
      filename: 'bundle.js',
    },
  };