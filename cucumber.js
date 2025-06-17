// cucumber.js
module.exports = {
  default: {
    require: ["tests/steps/**/*.ts", "tests/support/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: ["pretty", "@cucumber/pretty-formatter"],
    paths: ["tests/features/**/*.feature"],
  }
};