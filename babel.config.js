process.env.TAMAGUI_TARGET = "native";

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // NOTE: this is required to pass the right environment
      [
        "transform-inline-environment-variables",
        {
          include: "TAMAGUI_TARGET",
        },
      ],
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
