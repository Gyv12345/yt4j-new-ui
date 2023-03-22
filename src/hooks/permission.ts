import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/store';
// 判断路由权限  是否展示
export default function usePermission() {
  const userStore = useUserStore();
  return {
    // 判断路由菜单 是否展示
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) {
      return (
        !route.meta?.requiresAuth ||
        !route.meta?.roles ||
        route.meta?.roles?.includes('*') ||
        // route.meta?.roles?.includes(userStore.role)
        userStore.role.some((role) => route.meta?.roles?.includes(role))
      );
    },
    // 寻找 第一个有权限的路由
    // findFirstPermissionRoute(_routers: any, role = 'admin') {
    findFirstPermissionRoute(_routers: any, role: string[] = []) {
      const cloneRouters = [..._routers];
      while (cloneRouters.length) {
        const firstElement = cloneRouters.shift();
        if (
          firstElement?.meta?.roles?.find((el: string[]) => {
            // return el.includes('*') || el.includes(role);
            return (
              el.includes('*') || role.some((itemRole) => el.includes(itemRole))
            );
          })
        )
          return { name: firstElement.name };
        if (firstElement?.children) {
          cloneRouters.push(...firstElement.children);
        }
      }
      return null;
    },
    // You can add any rules you want
  };
}
