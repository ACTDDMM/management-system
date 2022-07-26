<template>
  <div class="infolist">
    <!--  -->
    <el-form :inline="true" class="demo-form-inline" size="small">
      <el-form-item>
        <el-button type="primary" @click="addStudent">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="sex" label="性别" align="center">
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center">
      </el-table-column>
      <el-table-column prop="father" label="父亲" align="center">
      </el-table-column>
      <el-table-column prop="mother" label="母亲" align="center">
      </el-table-column>
      <el-table-column prop="address" label="家庭住址" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center">
      </el-table-column>
      <el-table-column prop="time" label="入校时间" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-edit"
            @click="edit(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="del(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增 -->
    <el-dialog
      :title="status ? '添加学生信息' : '修改学生信息'"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <!-- 姓名 -->
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 性别 -->
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="2">女</el-radio>
        </el-form-item>
        <!-- 年龄 -->
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 父亲 -->
        <el-form-item label="父亲" :label-width="formLabelWidth" prop="father">
          <el-input v-model="form.father" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 母亲 -->
        <el-form-item label="母亲" :label-width="formLabelWidth" prop="mother">
          <el-input v-model="form.mother" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 地址 -->
        <el-form-item
          label="家庭住址"
          :label-width="formLabelWidth"
          prop="address"
        >
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 联系方式 -->
        <el-form-item
          label="联系方式"
          :label-width="formLabelWidth"
          prop="phone"
        >
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 时间 -->
        <el-form-item
          label="入校时间"
          :label-width="formLabelWidth"
          prop="time"
        >
          <!-- 时间选项卡 -->
          <el-date-picker
            v-model="form.time"
            align="right"
            value-format="yyy-MM-dd"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeInfo(form)">取 消</el-button>

        <el-button type="primary" @click="sure(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { info, getInfo, infoDel } from "@/api/api";
export default {
  created() {
    this.getData();
  },
  data() {
    return {
      status: true,
      total: 0, //
      tableData: [],
      dialogFormVisible: false, // 控制新增按钮显示和隐藏
      form: {
        name: "",
        age: "",
        sex: "1",
        father: "",
        mother: "",
        address: "",
        phone: "",
        time: "",
      },
      formLabelWidth: "80px", // 表单左侧宽度
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        sex: [{ required: true }],
        age: [{ required: true, message: "请输入年龄" }],
        address: [{ required: true, message: "请输入地址" }],
        phone: [{ required: true, message: "请输入入学时间" }],
        time: [{ required: true, message: "请输入联系方式" }],
      }, // 校验规则
    };
  },
  methods: {
    closeInfo(form) {
      console.log(form);
      this.dialogFormVisible = false;
      this.$refs["form"].resetFields();
    },
    edit(row) {
      this.form = { ...row };
      this.status = false;
      this.dialogFormVisible = true;
    },
    del(row) {
      console.log(row);
      this.$alert("确认删除？", "提示", {
        confirmButtonText: "确定",
        callback: () => {
          infoDel(row.id)
            .then((result) => {
              if (result.data.status === 200) {
                this.getData()
                this.$message({
                  message: result.data.message,
                  type: "success",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        },
      });
    },
    addStudent() {
      // 重置
      this.form = {
        name: "",
        age: "",
        sex: "1",
        father: "",
        mother: "",
        address: "",
        phone: "",
        time: "",
      };
      this.status = true;
      this.dialogFormVisible = true;
    },
    // 验证
    sure(form) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.status) {
            info("POST",this.form)
              .then((result) => {
                if (result.data.status === 200) {
                  this.dialogFormVisible = false;
                  this.getData();
                  this.$refs.form.resetFields();
                  this.$message({
                    type: "success",
                    message: result.data.message,
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            info("PUT",this.form)
              .then((result) => {
                if (result.data.status === 200) {
                  this.dialogFormVisible = false;
                  this.getData();
                  this.$refs.form.resetFields();
                  this.$message({
                    type: "success",
                    message: result.data.message,
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      });
    },
    // 获取列表
    getData() {
      getInfo()
        .then((result) => {
          if (result.data.status === 200) {
            this.tableData = result.data.data;
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
</style>