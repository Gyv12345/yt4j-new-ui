import type { Router, LocationQueryRaw } from 'vue-router';
import NProgress from 'nprogress'; // progress bar

import { useUserStore, useAppStore } from '@/store';
import { isLogin } from '@/utils/auth';

import { WHITE_LIST } from '../constants';
import { NOT_FOUND_ROUTE } from '../routes/base';
// 路由导航守卫 判断是否放行
export default function setupUserLoginInfoGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const userStore = useUserStore();
    if (isLogin()) {
      console.log('cccccccc');

      // 有角色数据  说明加载过 用户信息
      if (userStore.role) {
        console.log('rrrrrrrrrr');

        next();
      } else {
        try {
          // 加载用户信息
          await userStore.info();
          // 后端路由

          const appStore = useAppStore();
          console.log('kkkkkkkkkkk');
          console.log(appStore.appAsyncMenus);
          console.log(to);
          if (appStore.menuFromServer) {
            // 清空路由
            router.getRoutes().forEach((route) => {
              const { name } = route;
              if (name && name !== 'login') {
                // if (name) {
                if (router.hasRoute(name)) {
                  router.removeRoute(name);
                }
              }
            });

            if (
              !appStore.appAsyncMenus.length
              // !WHITE_LIST.find((el) => el.name === to.name)
              // to.name !== 'login'
            ) {
              // 获取 路由列表
              await appStore.fetchServerMenuConfig();
              const allRoute = [...appStore.appAsyncMenus, ...WHITE_LIST];
              // 添加路由
              allRoute.forEach((route) => {
                router.addRoute(route);
              });
              router.addRoute({
                path: '/login',
                name: 'login',
                component: () => import('@/views/login/index.vue'),
                meta: {
                  requiresAuth: false,
                },
              });
              router.addRoute({
                ...NOT_FOUND_ROUTE,
              });
              console.log('aaaaaaaaaaa');
              console.log(router.getRoutes());
            }
          }

          next();
        } catch (error) {
          await userStore.logout();
          next({
            name: 'login',
            query: {
              redirect: to.name,
              ...to.query,
            } as LocationQueryRaw,
          });
        }
      }
    } else {
      if (to.name === 'login') {
        next();
        return;
      }
      next({
        name: 'login',
        query: {
          redirect: to.name,
          ...to.query,
        } as LocationQueryRaw,
      });
    }
  });
}
