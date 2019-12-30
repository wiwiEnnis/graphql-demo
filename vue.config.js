/**
 * @typedef {import("@vue/cli-service").ProjectOptions} VueCliOptions
 */

/** @type {VueCliOptions} */
module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        },
      ],
    },
  },
};
