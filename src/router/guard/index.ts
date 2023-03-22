import type { Router } from 'vue-router';
import { setRouteEmitter } from '@/utils/route-listener';
import setupUserLoginInfoGuard from './userLoginInfo';
import setupPermissionGuard from './permission';

function setupPageGuard(router: Router) {
  router.beforeEach(async (to) => {
    // emit route change
    setRouteEmitter(to);
  });
}

export default function createRouteGuard(router: Router) {
  // 监听路由
  setupPageGuard(router);
  // 路由导航守卫
  setupUserLoginInfoGuard(router);
  // 加载路由菜单
  setupPermissionGuard(router);
}
