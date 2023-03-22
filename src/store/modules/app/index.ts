import { defineStore } from 'pinia';
import { Notification } from '@arco-design/web-vue';
import type { NotificationReturn } from '@arco-design/web-vue/es/notification/interface';
import type { RouteRecordNormalized } from 'vue-router';
import defaultSettings from '@/config/settings.json';
// import { getMenuList } from '@/api/user';
import { filterAsyncRoutes } from '@/utils';
import { AppState } from './types';

const isBack = localStorage.getItem('isBack');
const backFlag = isBack === '1';
const useAppStore = defineStore('app', {
  state: (): AppState => ({
    ...defaultSettings,
    menuFromServer: backFlag,
  }),

  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state };
    },
    appDevice(state: AppState) {
      return state.device;
    },
    appAsyncMenus(state: AppState): RouteRecordNormalized[] {
      return state.serverMenu as unknown as RouteRecordNormalized[];
    },
  },

  actions: {
    // Update app settings
    updateSettings(partial: Partial<AppState>) {
      // @ts-ignore-next-line
      this.$patch(partial);
    },

    // Change theme color
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = 'dark';
        document.body.setAttribute('arco-theme', 'dark');
      } else {
        this.theme = 'light';
        document.body.removeAttribute('arco-theme');
      }
    },
    toggleDevice(device: string) {
      this.device = device;
    },
    toggleMenu(value: boolean) {
      this.hideMenu = value;
    },
    async fetchServerMenuConfig() {
      let notifyInstance: NotificationReturn | null = null;
      try {
        notifyInstance = Notification.info({
          id: 'menuNotice', // Keep the instance id the same
          content: 'loading',
          closable: true,
        });
        // const { data } = await getMenuList();
        const menuData = [
          {
            path: '/dashboard',
            name: 'dashboard',
            component: 'LAYOUT',
            meta: {
              locale: 'menu.server.dashboard',
              requiresAuth: true,
              icon: 'icon-dashboard',
              order: 1,
            },
            children: [
              {
                path: 'workplace',
                name: 'Workplace',
                component: '/views/dashboard/workplace/index',
                meta: {
                  locale: 'menu.server.workplace',
                  requiresAuth: true,
                  // hideInMenu: true,
                },
              },
              {
                path: 'monitor',
                name: 'Monitor',
                component: '/views/dashboard/monitor/index',
                meta: {
                  locale: 'menu.dashboard.monitor',
                  requiresAuth: false,
                },
              },
            ],
          },
        ];

        this.serverMenu = filterAsyncRoutes(menuData);

        notifyInstance = Notification.success({
          id: 'menuNotice',
          content: 'success',
          closable: true,
        });
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        notifyInstance = Notification.error({
          id: 'menuNotice',
          content: 'error',
          closable: true,
        });
      }
    },
    clearServerMenu() {
      this.serverMenu = [];
    },
  },
});

export default useAppStore;
