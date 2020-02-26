let modules = process.env.BABEL_MODULES || 'auto';

if (process.env.BABEL_MODULES === 'false') {
  modules = false;
}

module.exports = api => {
  api.cache.forever();

  return {
    presets: [['@babel/preset-env', { targets: { node: '8.9.0' }, modules }]],
    plugins: [
      'babel-plugin-const-enum',
      ['@babel/plugin-transform-typescript', { isTSX: true }],
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      '@babel/plugin-proposal-object-rest-spread'
    ],
    env: {
      test: {
        presets: [['@babel/preset-env', { targets: { node: '8.9.0' }, modules: 'cjs' }]]
      },
      production: {
        ignore: [/[/\\.]test\.[tj]sx?$/, /[/\\]__demo__[/\\]/]
      }
    }
  };
};
