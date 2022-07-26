<template>
  <div class="workment">
    <el-table :data="tableData" v-loading="loading" border style="width: 100%">
      <el-table-column prop="id" label="用户ID" align="center">
      </el-table-column>
      <el-table-column prop="userId" label="所属班级" align="center">
      </el-table-column>
      <el-table-column prop="title" label="作业名称" align="center">
      </el-table-column>
      <el-table-column prop="completed_text" label="完成情况" align="center">
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pager-view :total="total" :url="url"/>
  </div>
</template>

<script>
import PagerView from '../PagerView.vue';
export default {
  components: { PagerView },
  data() {
    return {
      tableData: [],
      total: 0,
      loading: true,
      url:"/works",
    };
  },
};
</script>

<style lang="scss" scoped>
.workment {
  .el-pagination {
    margin-top: 20px;
  }
}
</style>