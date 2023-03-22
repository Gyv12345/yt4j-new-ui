import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState, userListType } from '@/store/modules/user/types';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}
export interface userList {
  avatar: string;
  createTime: string;
  deptId: number;
  email: string;
  id: string;
  idCard: string;
  nickName: string;
  password: string;
  phone: string;
  roleIds: any;
  sex: number;
  state: boolean;
  updateTime: string;
  username: string;
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/user/login', data);
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}
// 用户信息
// export function getUserInfo() {
//   return axios.get<UserState>('/api/sys/user/info');
// }
// 用户信息
export function getUserInfo() {
  return axios.get<UserState>('/api/user/info');
}
// export function getMenuList() {
//   return axios.post<RouteRecordNormalized[]>('/api/user/menu');
// }
// 获取菜单列表
export function getMenuList() {
  return axios.get<RouteRecordNormalized[]>('/api/sys/menu/tree');
}
// 用户列表
export function getUserList(data: userListType) {
  return axios.post('/api/sys/user/page', data);
}
// 登录
export function loginApi(data: LoginData) {
  return axios.post('/api/auth/login', data);
}
