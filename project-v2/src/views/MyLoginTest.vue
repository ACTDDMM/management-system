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
export default {
  data() {
    // 验证处理
    const validateName = (rule, value, callback) => {
      // 请输入4-10位昵称
      let reg = /^[a-zA-z0-9]{4,10}$/;
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入4-10位用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      // 请输入6-12位密码
      let reg =
        /^\S*(?=\S{6,12})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!reg.test(value)) {
        callback(new Error("6-12位密码需要包含大小写字母和数字及特殊符号"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      form: {
        username: "",
        password: "",
      },
      // 校验规则
      rules: {
        username: [{ validator: validateName, tirgeer: "blur" }],
        password: [{ validator: validatePass, tirgeer: "blur" }],
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
          // 请求地址 和 请求参数
          let url = "http://1.116.64.64:5004/api2/login";
          let body = this.form;
          // 发送请求
          this.axios
            .post(url, body)
            .then((result) => {
              console.log(result);
              // 判断状态码
              if (res.data.status === 200) {
                // 将username存入到 localStorage中
                localStorage.setItem("username", res.data.username);
                // 提示信息
                this.$message({ message: res.data.message, type: "success" });
                // 跳转至 /home页面
                this.$router.push("/home");
              }
            })
            .catch((err) => {
              // 错误信息
              console.log(err);
            });
        } else {
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
  background: #0aa1ed;
  .box-card {
    width: 450px;
    margin: 200px auto;
    .el-button {
      width: 100%;
    }
  }
}
</style>