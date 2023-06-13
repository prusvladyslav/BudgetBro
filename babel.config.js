module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["@babel/plugin-transform-flow-strip-types"],
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ["@babel/plugin-proposal-class-properties", { "loose": true }],
      ["module-resolver", {
        "alias": {
          "@navigation": "./src/navigation",
          "@components": "./src/components",
          "@screens": "./src/screens",
          "@stores": "./src/stores",
          "@assets": "./assets",
          "@utils": "./src/utils",
          "@constants": "./src/constants",
          "@stores": "./src/stores"
        },
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
        ]
      }],
    ]
  };
};