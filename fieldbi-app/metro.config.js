/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');
const escape = require('escape-string-regexp');
const pak = require('../package.json');

const root = path.resolve(__dirname, '..');

const modules = [...Object.keys(pak.peerDependencies)];

const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig();

  const {
    resolver: { sourceExts, assetExts },
  } = config;

  return {
    projectRoot: __dirname,
    watchFolders: [root],
    resolver: {
      blacklistRE: blacklist(
        modules.map(m => new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`))
      ),

      extraNodeModules: modules.reduce((acc, name) => {
        acc[name] = path.join(__dirname, 'node_modules', name);
        return acc;
      }, {}),
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
  };
})();
