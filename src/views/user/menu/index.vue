<template>
  <div class="container">
    <Breadcrumb :items="['menu.user', '菜单管理']" />

    <a-table
      row-key="id"
      :columns="columns"
      :data="menuList.tree"
      style="margin-top: 20px"
    >
      <template #icon="{ record }">
        {{ record.icon }}
        {{`<icon-${record.icon} />`}}
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
  import { getMenuList } from '@/api/user';
  import { reactive, onMounted } from 'vue';

  const columns = [
    {
      title: '菜单名称',
      dataIndex: 'name',
    },
    {
      title: '图标',
      dataIndex: 'icon',
      slotName: 'icon',
    },
    {
      title: '权限标识',
      dataIndex: 'component',
    },
    {
      title: '组件',
      dataIndex: 'component',
    },
    {
      title: '排序',
      dataIndex: 'orderNo',
    },
    //   {
    //     title: '状态',
    //     dataIndex: 'email',
    //   },
    //   {
    //     title: '创建时间',
    //     dataIndex: 'email',
    //   },
  ];
  const menuList = reactive({
    tree: [],
  });
  const getTreeList = () => {
    getMenuList().then((res) => {
      menuList.tree = res.data;
    });
  };
  onMounted(() => {
    getTreeList();
  });
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
