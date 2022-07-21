<template>
  <div class="studentlist">
    <!-- 查询，重置 -->
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      size="small"
    >
      <el-form-item label="姓名">
        <el-input
          v-model="formInline.name"
          placeholder="请输入姓名查询"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="find">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="compData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="sex_text" label="性别" align="center">
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center">
      </el-table-column>
      <el-table-column prop="number" label="学号" align="center">
      </el-table-column>
      <el-table-column prop="class" label="班级" align="center">
      </el-table-column>
      <el-table-column prop="state_text" label="状态" align="center">
      </el-table-column>
      <el-table-column prop="address" label="地址" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            @click="del(scope.row)"
            type="danger"
            size="mini"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <!-- 当前页数-1 * 每页条数，当前页数* 当前条数 -->
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { students, studentDel } from "@/api/api";
export default {
  computed: {
    compData() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
  data() {
    return {
      tableData: [],
      currentPage: 1, //当前页数
      pageSize: 10, //每页显示条数
      total: 0, //总条数
      formInline: {
        name: "",
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // find
    find() {
      this.getData(this.formInline)
    },
    // reset
    reset() {
      this.formInline = {}
      this.getData()
    },
    // 获取数据
    getData(params) {
      students(params)
        .then((result) => {
          if (result.data.status === 200) {
            this.tableData = result.data.data;
            this.total = result.data.total;
            // 数据处理
            this.tableData.forEach((item) => {
              item.sex === 1 ? (item.sex_text = "男") : (item.sex_text = "女");
              item.state === "1"
                ? (item.state_text = "已入学")
                : item.state === "2"
                ? (item.state_text = "未入学")
                : (item.state_text = "休学中");
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    // 删除
    del(row) {
      console.log(row);
      studentDel(row.id)
        .then((result) => {
          if (result.data.status === 200) {
            this.$message({ message: "删除成功", type: "success" });
            this.getData();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.studentlist {
  .el-pagination {
    margin-top: 20px;
  }
}
</style>