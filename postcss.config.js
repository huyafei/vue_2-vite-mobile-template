/**
 * @name: postcss.config.js
 * @description：postcss.config.js
 * @date: 2022/10/21 17:24
 * @author: yf_hu
 */
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
    },
  },
};
