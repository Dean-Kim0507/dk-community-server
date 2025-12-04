export default {
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    "babel-plugin-transform-typescript-metadata"
  ],

  presets: [
    "@babel/preset-env",
    "@babel/preset-typescript"
   ]
}