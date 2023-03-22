type TargetContext = '_self' | '_parent' | '_blank' | '_top';

export const openWindow = (
  url: string,
  opts?: { target?: TargetContext; [key: string]: any }
) => {
  const { target = '_blank', ...others } = opts || {};
  window.open(
    url,
    target,
    Object.entries(others)
      .reduce((preValue: string[], curValue) => {
        const [key, value] = curValue;
        return [...preValue, `${key}=${value}`];
      }, [])
      .join(',')
  );
};
// const DEFAULT_LAYOUT = () => import('@/layout/default-layout.vue');
export const regexUrl = new RegExp(
  '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  'i'
);
export function loadView(view: string) {
  // 这里需要注意一下 vite+vue3 要用 defineAsyncComponent 才能拼接成功 不然会一直报错找不到模块
  // return () => defineAsyncComponent(() => import(`@/${view}.vue`));
  const modules = import.meta.glob('../views/**/*.{vue,tsx}');
  const layoutModules = import.meta.glob('../layout/**/*.{vue,tsx}');
  if (view === 'LAYOUT') {
    return layoutModules[`../layout/default-layout.vue`];
  }
  return modules[`..${view}.vue`];
}
export function filterAsyncRoutes(routes: any[]): any {
  const async = routes.filter((route) => {
    if (route.component) {
      route.component = loadView(route.component);
      if (route.children && route.children.length) {
        route.children.forEach((item: any) => {
          item.component = loadView(item.component);
        });
        return true;
      }
      return true;
    }
    return true;
  });
  return async;
}
export default null;
