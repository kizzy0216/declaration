const blacklist = require('metro-config/src/defaults/blacklist');
const path = require('path');
const { getDefaultConfig, mergeConfig } = require("metro-config");

// const config1 = (async () => {
module.exports = (async () => {
    const {
      resolver: { sourceExts, assetExts }
    } = await getDefaultConfig();
    return {
      projectRoot: path.resolve(__dirname),
      watchFolders: [
        path.resolve(__dirname, '../interface'),
        path.resolve(__dirname, '../interface/src'),
      ],
      transformer: {
        getTransformOptions: async () => ({
          transform: {
            experimentalImportSupport: false,
            inlineRequires: false
          }
        }),
        babelTransformerPath: require.resolve("react-native-svg-transformer")
      },
      resolver: {
        assetExts: assetExts.filter(ext => ext !== "svg"),
        sourceExts: [...sourceExts, "svg"],
        extraNodeModules: new Proxy({}, {
          get: (target, name) => path.join(process.cwd(), `node_modules/${name}`),
        }),
      }
    };
})();
// const config2 = {
//   resolver: {
//     // https://github.com/facebook/metro/issues/1#issuecomment-453450709
//     extraNodeModules: new Proxy({}, {
//       get: (target, name) => path.join(process.cwd(), `node_modules/${name}`),
//     }),
//   },
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false
//       }
//     })
//   },
//   projectRoot: path.resolve(__dirname),
//   watchFolders: [
//     path.resolve(__dirname, '../interface'),
//     path.resolve(__dirname, '../interface/src'),
//   ],
// };

// module.exports = mergeConfig(config1(), config2)