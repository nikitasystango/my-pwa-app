// var WebpackObfuscator = require('webpack-obfuscator');
// // const path = require('path');
// module.exports = function override(config, env) {
//   config.optimization.splitChunks = {
//     cacheGroups: {
//       default: false
//     }
//   };
//   config.plugins.push(
//     new WebpackObfuscator({
//       rotateStringArray: true
//     }, ['bundles/**/**.js'])
//   );
//   // config.module.rules.push({
//   //   test: /\.js$/,
//   // exclude: [
//   //     path.resolve(__dirname, 'node_modules')
//   //   ],
//   //   enforce: 'post',
//   //   use: {
//   //     loader: WebpackObfuscator.loader,
//   //     options: {
//   //       rotateStringArray: true
//   //     }
//   //   }
//   // })
//   return config
// }

