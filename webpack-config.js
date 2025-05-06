const {
  ModuleFederationPlugin,
} = require('../foreman/node_modules/webpack').container;
const path = require('path');
const fs = require('fs');

const packageJsonPath = path.resolve(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const dependencies = packageJson.dependencies || {};
const devDependencies = packageJson.devDependencies || {};
const allDependencies = { ...dependencies, ...devDependencies };
const shared = isPlugin =>
  Object.keys(allDependencies).map(dep => ({
    [dep]: {
      eager: !isPlugin, // core should load all dependencies eagerly so they will be available for plugins
      singleton: true,
      requiredVersion: allDependencies[dep],
    },
  }));
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'foreman-tasks',
      filename: 'foreman_tasks_remoteEntry.js',
      // exposes: {
      // './index': '/home/mariaaga/git/foreman-tasks/webpack/index',
      //   './webpack/
      //   pluginEntries[`./${entry}_index`] = path.resolve(
      //     pluginRoot,
      //     'webpack',
      //     `${entry}_index`
      //   );
      // },
      shared: [
        ...shared(true),
        {
          '@scalprum/react-core': {
            singleton: true,
            requiredVersion: '*',
          },
        },
        {
          '@scalprum/core': {
            singleton: true,
            requiredVersion: '*',
          },
        },
      ],
    }),
  ],
};
