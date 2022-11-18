/**
 * @name: index
 * @description: index.js
 * @date: 2022/10/20 9:54
 * @author: yf_hu
 */
const modules = import.meta.glob(["./modules/**/*.js"], { eager: true });

for (let modulesKey in modules) {
  const module = modules[modulesKey];
};
