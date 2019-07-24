module.exports = {
  plugins: ['@babel/plugin-proposal-class-properties'],
  presets: ['@babel/preset-env', '@babel/preset-react'],
  env: {
    test: {
      // allows for async tests:
      plugins: ['@babel/plugin-transform-runtime']
    }
  }
};
