import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import legacy from "@vitejs/plugin-legacy";
import vue2 from "@vitejs/plugin-vue2";

import usePluginImport from "vite-plugin-importer";

const _fileURLToPath = (__dirname) =>
  fileURLToPath(new URL(__dirname, import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const config = {
    // 开发或生产环境服务的公共基础路径，https://cn.vitejs.dev/config/shared-options.html
    base: loadEnv(mode, process.cwd()).VITE_PROJECT_BASE,
    build: {
      outDir: "dist",
    },
    plugins: [
      vue2(),
      legacy({
        // targets: ["ie >= 11"],
        targets: ["defaults", "not ie < 9"],
        additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
      }),
      // 按需引入 vant
      usePluginImport({
        libraryName: "vant",
        libraryDirectory: "es",
        // style: true,
        style: (name) => `${name}/style/less`,
      }),
    ],
    resolve: {
      alias: {
        // 针对 vite3 + vant2.7 自定主题特殊处理，否则报错
        "~@vant": _fileURLToPath("./node_modules/@vant"),
        "@": _fileURLToPath("./src"),
        "@api": _fileURLToPath("./src/api"),
        "@assets": _fileURLToPath("./src/assets"),
        "@components": _fileURLToPath("./src/components"),
        "@router": _fileURLToPath("./src/router"),
        "@plugins": _fileURLToPath("./src/plugins"),
        "@utils": _fileURLToPath("./src/utils"),
        "@views": _fileURLToPath("./src/views"),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `
                @import "${_fileURLToPath(
                  "./src/assets/styles/less/mixin.less"
                )}";
                `,
          modifyVars: {
            // 直接覆盖变量
            // '@green': 'red',
            // 'border-color': '#eee',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "/src/assets/styles/less/vant.less";`,
          },
        },
      },
    },
    // 开发服务器配置，https://cn.vitejs.dev/config/server-options.html#server-proxy
    server: {
      // 可以被手机访问的地址
      // host: "0.0.0.0",
      // host: "localhost", // 开发服务器主机名
      port: 9527, // 开发服务器端口号
      https: false, // 是否开启 https
      open: false, // 是否自动在浏览器打开
      proxy: {
        // "/api": {
        //   target: "http://example-development.com", // 代理后台接口
        //   changeOrigin: true,
        //   // secure: false, // 如果是https接口，需要配置这个参数
        //   // ws: true, //websocket支持
        //   // rewrite: (path) => path.replace(/^\/api/, ""),
        // },
        // Proxying websockets or socket.io
        // '/socket.io': {
        //   target: 'ws://localhost:3000',
        //   ws: true
        // }
      },
    },
    // 引入第三方的配置
    optimizeDeps: {
      include: [],
    },
  };
  if (mode === "development") {
    const plugins = [];
    config.plugins = [...config.plugins, ...plugins];
  }
  if (mode === "production") {
    config.build.terserOptions = {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    };
  }
  return config;
});
