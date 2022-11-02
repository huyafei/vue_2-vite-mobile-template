import {fileURLToPath, URL} from 'node:url'

import {defineConfig, loadEnv} from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue2 from '@vitejs/plugin-vue2'

import usePluginImport from 'vite-plugin-importer'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  const config = {
    // 开发或生产环境服务的公共基础路径，https://cn.vitejs.dev/config/shared-options.html
    base: loadEnv(mode, process.cwd()).VITE_PROJECT_BASE,
    build: {
      outDir: "dist",
    },
    plugins: [
      vue2(),
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      }),
      // 按需引入 vant
      usePluginImport({
        libraryName: 'vant',
        libraryDirectory: 'es',
        // style: true,
        style: (name) => `${name}/style/less`,
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@api': fileURLToPath(new URL('./src/api', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
        '@plugins': fileURLToPath(new URL('./src/plugins', import.meta.url)),
        '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
        // 针对 vite3 + vant2 自定主题特殊处理，否则报错
        '~@vant': fileURLToPath(new URL('./node_modules/@vant', import.meta.url)),
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `
                @import "${fileURLToPath(new URL('./src/assets/styles/less/mixin.less', import.meta.url))}";
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
      https: false, // 是否开启 https
      open: false, // 是否自动在浏览器打开
      port: 9527, // 开发服务器端口号
      // 可以被手机访问的地址
      // host: "0.0.0.0",
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
  }
  if(mode === 'development'){
    const plugins = []
    config.plugins = [...config.plugins, ...plugins]
  }
  if (mode === "production") {
    config.build.terserOptions = {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    };
  }
  return config
})
