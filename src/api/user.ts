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
export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/user/login', data);
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return axios.post<UserState>('/api/user/info');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}

export function getUserList(data: userListType) {
  return axios.post('/sys/user/page', data);
}
export function loginApi(data: LoginData) {
  return axios.post('/auth/login', data);
  // axios({
  //   url:'/auth/login',
  //   method:'post',
  //   data,
  //   headers:{
  //     Content-Type:'application/x-www-form-urlencoded;charset=UTF-8'
  //   }
  // })
}
