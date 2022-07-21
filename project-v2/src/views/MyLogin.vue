<template>
  <!-- 登录界面 -->
  <div class="login">
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <span>后台管理系统</span>
      </div>
      <!-- 用户名 -->
      <el-form label-width="80px" :model="form" ref="form" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <!-- 提交 -->
        <el-form-item>
          <el-button type="primary" @click="login('form')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 表单校验
import { nameRule, passRule } from "../utils/vaildate";
// toKen
import { setToken } from "@/utils/setToken";
// 引入封装的接口
import { login } from "@/api/api.js";

export default {
  data() {
    return {
      // 表单数据
      form: {
        username: "",
        password: "",
      },
      // 校验规则
      rules: {
        username: [{ validator: nameRule, tirgeer: "blur" }],
        password: [{ validator: passRule, tirgeer: "blur" }],
      },
    };
  },
  methods: {
    // 登录
    login(form) {
      // 执行自带验证
      this.$refs[form].validate((valid) => {
        // 判断是否通过
        if (valid) {
          login(this.form).then((result) => {
            if (result.data.status === 200) {
              // session存入 username 和 token
              setToken("username", result.data.username);
              setToken("token", result.data.token);
              // message消息弹框
              this.$message({
                message: result.data.message,
                type: "success",
              });
              // 跳转
              this.$router.push("/home");
            }
          });
          // // 发送请求
          // this.service
          //   .post("/login", this.form)
          //   .then((result) => {
          //     console.log(result);
          //     // 判断响应
          //     if (result.data.status === 200) {
          //       // session存入 username 和 token
          //       setToken("username", result.data.username);
          //       setToken("token", result.data.token);
          //       // message消息弹框
          //       this.$message({
          //         message: result.data.message,
          //         type: "success",
          //       });
          //       // 跳转
          //       this.$router.push("/home");
          //     }
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });
        } else {
          console.log(this.form);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url("../assets/bg.jpg") center no-repeat;
  .el-card {
    background: #65768557;
  }
  .box-card {
    width: 450px;
    margin: 200px auto;
    color: #fff;
    font-size: 25px;
    .el-form .el-form-item__label {
      color: #fff !important;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>