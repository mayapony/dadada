module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            utils: "./utils",
            components: "./components",
            styles: "./styles",
            constants: "./constants",
            assets: "./assets",
            db: "./db",
          },
        },
      ],
    ],
  };
};
