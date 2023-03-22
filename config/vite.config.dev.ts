import { mergeConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: true,
      fs: {
        strict: true,
      },
      // port: 9999,
      // proxy: {
      //   // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      //   // 正则表达式写法
      //   '^/api': {
      //     target: 'http://192.168.0.164:8888/', // 后端服务实际地址
      //     changeOrigin: true, // 开启代理
      //     rewrite: (path) => path.replace(/^\/api/, ''),
      //   },
      // },
    },
    plugins: [
      eslint({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
    ],
  },
  baseConfig
);
