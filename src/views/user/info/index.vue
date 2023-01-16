<template>
  <div class="container">
    <Breadcrumb :items="['menu.user', 'menu.user.info']" />
    <div>
      <a-table :columns="columns" :data="data">
        <template #optional="{ record }">
          <a-button @click="eidtHandle(record)">view</a-button>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
  // import { onMounted } from 'vue';
  import { getUserList } from '@/api/user';
  import useRequest from '@/hooks/request';

  const defaultValue = {
    pageNo: 0,
    pageSize: 0,
  };
  const res = useRequest(getUserList, defaultValue);
  console.log('-0--------');
  console.log(res);
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '性别',
      dataIndex: 'salary',
    },
    {
      title: '电话',
      dataIndex: 'address',
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
  const data = [
    {
      key: '1',
      name: 'Jane Doe',
      first: 'Jane',
      last: 'Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      first: 'Alisa',
      last: 'Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      first: 'Kevin',
      last: 'Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      first: 'Ed',
      last: 'Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      first: 'William',
      last: 'Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ];
  const eidtHandle = (val) => {
    console.log('????');
    console.log(val);
  };
  // onMounted(() => {
  //   console.log('1111');
  // });
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
