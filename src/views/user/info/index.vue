<template>
  <div class="container">
    <Breadcrumb :items="['menu.user', 'menu.user.info']" />
    <div>
      <a-table :columns="columns" :data="listData.data">
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
            <a-form-item field="name" label="性别">
              <a-select v-model="form.sex" placeholder="Please select ...">
                <a-option value="0">女</a-option>
                <a-option value="1">男</a-option>
              </a-select>
            </a-form-item>
            <a-form-item field="name" label="电话">
              <a-input v-model="form.phone" placeholder="请输入姓名" />
            </a-form-item>
            <a-form-item field="name" label="邮箱">
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
  import { getUserList } from '@/api/user';
  // 列表
  const listData = reactive({
    data: [],
  });
  const getListData = () => {
    getUserList({
      pageNo: 1,
      pageSize: 10,
      condition: {},
    }).then((res) => {
      listData.data = res.data.data;
    });
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
  // 弹框
  const title = ref('编辑用户信息');
  const visible = ref(false);
  const eidtHandle = (val) => {
    visible.value = true;
    console.log('valllllllll');
    console.log(val);
  };
  const handleOk = () => {
    visible.value = false;
  };
  const handleCancel = () => {
    visible.value = false;
  };
  const form = reactive({
    name: '',
    sex: 0,
    phone: '',
    email: '',
  });
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
</style>
