<template>
  <div class="container">
    <Breadcrumb :items="['menu.user', 'menu.user.info']" />
    <div>
      <div class="btn-box">
        <a-button type="primary" @click="addHandle()">新建</a-button>
      </div>

      <a-table
        :columns="columns"
        :data="listData.data"
        :pagination="pagination"
        @page-change="pageChange"
        @page-size-change="pageSizeChange"
      >
        <template #optional="{ record }">
          <a-button @click="eidtHandle(record)">编辑</a-button>
        </template>
        <template #sex="{ record }">
          <span v-if="record.sex == 1">男</span>
          <span v-else>女</span>
        </template>
      </a-table>

      <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
        <template #title> {{ title }} </template>
        <div>
          <a-form :model="form" :style="{ width: '400px' }">
            <a-form-item field="name" label="姓名">
              <a-input v-model="form.name" placeholder="请输入姓名" />
            </a-form-item>
            <a-form-item field="sex" label="性别">
              <a-select v-model="form.sex" placeholder="Please select ...">
                <a-option :value="0">女</a-option>
                <a-option :value="1">男</a-option>
              </a-select>
            </a-form-item>
            <a-form-item field="phone" label="电话">
              <a-input v-model="form.phone" placeholder="请输入姓名" />
            </a-form-item>
            <a-form-item field="email" label="邮箱">
              <a-input v-model="form.email" placeholder="请输入姓名" />
            </a-form-item>
          </a-form>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, onMounted, ref } from 'vue';
  import { getUserList, addUser, editUser } from '@/api/user';
  import { Message } from '@arco-design/web-vue';
  // 列表
  const listData = reactive({
    data: [],
  });
  // 分页参数
  const pagination = reactive({
    current: 1,
    total: 0,
    pageSize: 5, // 每页中显示10条数据
    showPageSize: true,
    pageSizeOptions: [5, 10, 50, 100], // 每页中显示的数据
    showTotal: true,
  });

  const getListData = () => {
    getUserList({
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      condition: {},
    }).then((res) => {
      listData.data = res.data.data;
      pagination.total = res.data.totalCount;
    });
  };
  const pageChange = (pageVal) => {
    pagination.current = pageVal;
    getListData();
  };
  const pageSizeChange = (pageSize) => {
    pagination.pageSize = pageSize;
    getListData();
  };

  onMounted(() => {
    getListData();
  });

  const columns = [
    {
      title: '姓名',
      dataIndex: 'username',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      slotName: 'sex',
    },
    {
      title: '电话',
      dataIndex: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '操作',
      slotName: 'optional',
    },
  ];

  const form = reactive({
    name: '',
    sex: 0,
    phone: '',
    email: '',
  });
  const resetForm = () => {
    form.name = '';
    form.sex = '';
    form.phone = '';
    form.email = '';
  };
  // 弹框
  const title = ref();
  const visible = ref(false);
  let isEdit = false;
  let currentId = '';
  const eidtHandle = (val) => {
    title.value = '编辑用户';
    isEdit = true;
    form.name = val.username;
    form.sex = val.sex;
    form.phone = val.phone;
    form.email = val.email;
    visible.value = true;
    currentId = val.id;
  };
  const addHandle = () => {
    resetForm();
    isEdit = false;
    title.value = '新建用户';
    visible.value = true;
  };
  const handleOk = () => {
    let request = '';
    const params = {
      username: form.name,
      sex: form.sex,
      phone: form.phone,
      email: form.email,
    };
    if (isEdit) {
      params.id = currentId;
      request = editUser;
    } else {
      request = addUser;
    }
    request(params).then((res) => {
      if (res.code === 200) {
        visible.value = false;
        Message.success('操作成功!');
        getListData();
      }
    });
  };
  const handleCancel = () => {
    visible.value = false;
  };
</script>

<script lang="ts">
  export default {
    name: 'Info',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px;
  }

  .content {
    display: flex;
    margin-top: 12px;

    &-left {
      flex: 1;
      margin-right: 16px;
      overflow: hidden;
      // background-color: var(--color-bg-2);
      :deep(.arco-tabs-nav-tab) {
        margin-left: 16px;
      }
    }

    &-right {
      width: 332px;
    }

    .tab-pane-wrapper {
      padding: 0 16px 16px;
    }
  }
</style>

<style lang="less" scoped>
  .mobile {
    .content {
      display: block;

      &-left {
        margin-right: 0;
        margin-bottom: 16px;
      }

      &-right {
        width: 100%;
      }
    }
  }

  .btn-box {
    display: flex;
    justify-content: flex-start;
    margin: 10px 0;
  }
</style>
