<template>
  <div class="home">
    <el-container>
      <!-- 头 -->
      <my-header></my-header>
      <!-- 左侧菜单 -->
      <el-container class="content">
        <my-menu></my-menu>
        <!-- 主要内容 -->
        <el-container>
          <el-main>
            <bread-crumb />
            <div class="cont">
              <router-view />
            </div>
          </el-main>
          <!-- 底部 -->
          <el-footer>
            <my-footer></my-footer>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader.vue";
import MyFooter from "@/components/MyFooter.vue";
import MyMenu from "@/components/MyMenu.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";
export default {
  components: { MyHeader, MyFooter, MyMenu, BreadCrumb },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  .content {
    position: absolute;
    width: 100%;
    top: 60px;
    bottom: 0;
    .el-footer {
      padding: 0;
      text-align: center;
    }
    .cont {
      margin: 20px;
    }
    .el-footer {
      width: 100%;
      position: relative;
      bottom: 0;
    }
  }
}
// .el-header,
// .el-footer {
//   background-color: #b3c0d1;
//   color: #333;
//   text-align: center;
//   line-height: 60px;
// }

// .el-aside {
//   background-color: #d3dce6;
//   color: #333;
//   text-align: center;
//   line-height: 200px;
// }

// .el-main {
//   background-color: #e9eef3;
//   color: #333;
//   text-align: center;
//   line-height: 160px;
// }

// body > .el-container {
//   margin-bottom: 40px;
// }
</style>