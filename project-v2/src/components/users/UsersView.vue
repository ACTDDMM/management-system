<template>
  <div class="user-view">
    <el-tree
      :data="menus"
      show-checkbox
      node-key="name"
      :props="defaultProps"
      ref="tree"
    >
    </el-tree>
    <el-button @click="getCheckedNodes">通过node节点获取</el-button>
  </div>
</template>

<script>
export default {
  created() {
    this.menus = [...this.$router.options.routes];
    // 权限管理和动态路由

    // 根据不同的用户登录，返回对应的路由权限菜单
    // 通过树形控件达到权限的控制，根据不同角色，勾选不同的菜单权限，将菜单数据提交给后端进行保存
    // 后端保存后，在用户进行登录的时候就会查询该用户所拥有的菜单数据，最后进行渲染展示
    // 动态添加路由使用 router.addRoutes(vue-router3.x版本，已废除)方法
    // 更新后 使用 router.addRouter进行动态路由添加
  },
  data() {
    return {
      menus: [],
      defaultProps: {
        label: "name",
        children: "children",
      },
    };
  },
  methods: {
    getCheckedNodes() {
      let arr = this.$refs.tree.getCheckedNodes();
      console.log(arr);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>