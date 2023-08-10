// export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
  name?: string;
  avatar?: string;
  job?: string;
  organization?: string;
  location?: string;
  email?: string;
  introduction?: string;
  personalWebsite?: string;
  jobName?: string;
  organizationName?: string;
  locationName?: string;
  phone?: string;
  registrationDate?: string;
  accountId?: string;
  certification?: number;
  // role: RoleType;
  role: string[];
}
export interface userListType {
  condition: object;
  pageNo: number;
  pageSize: number;
}
export interface AddUserType {
  /**
   * 头像
   */
  avatar?: string;
  /**
   * 创建时间
   */
  createTime?: Date;
  /**
   * 部门ID
   */
  deptId?: number;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 主键
   */
  id?: [number, string];
  /**
   * 身份证
   */
  idCard?: string;
  /**
   * 昵称
   */
  nickName?: string;
  /**
   * 密码
   */
  password?: string;
  /**
   * 手机号
   */
  phone?: string;
  /**
   * 角色
   */
  roleIds?: number[];
  /**
   * 性别
   */
  sex?: number;
  /**
   * 状态
   */
  state?: boolean;
  /**
   * 更新时间
   */
  updateTime?: Date;
  /**
   * 用户名
   */
  username?: string;
}
