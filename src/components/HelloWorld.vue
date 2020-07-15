<template>
  <div class="masklayer">
    <div class="hello">
      <!-- <h1>{{ msg }}</h1> -->
      <div class="centertopbox">
        <h1>您好,欢迎!</h1>
        <h2>汇景服务中心</h2>
      </div>
      <div class="footerwhite"></div>
      <div class="centerbox">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input
              class="marbot"
              clearable
              placeholder="用户名"
              
              v-model="ruleForm.username"
            >
              <template slot="prepend">icon图标</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              clearable
              class="marbot"
              show-password
              placeholder="手机号"
              v-model="ruleForm.password"
            >
              <template slot="prepend">icon图标</template>
            </el-input>
          </el-form-item>
          <span class="flr">一个账号同时只能登录一个人</span>
          <div>
            <el-button @click="submitForm('ruleForm')" class="buttontop" type="primary">登录</el-button>
          </div>
          <span class="footer">推荐使用谷歌Chorme，IE10 +浏览器浏览</span>
        </el-form>
      </div>
      <span class="footerspan">技术支持：北京润朴科技股份发展有限公司版权所有：2014-2018</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          //{ min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          //{ min: 3, max: 10, message: "长度在 11 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const that = this
      //this.$refs[formName].validate(valid => {
        //if (valid) {
          // alert("submit!");
          //this.$router.push({ name: "About" });
        //} else {
         // console.log("error submit!!");
         // return false;
        //}
      //});
      //console.log('提交',this.ruleForm.username,this.ruleForm.password)
      const http = that.api+'userInfo/pcSelectLogin/'+this.ruleForm.username+'/'+this.ruleForm.password
      this.$axios.get(http).then(function(res){
        console.log(res.data.data)
        if(res.data.success) {
          console.log('调整')
          that.$router.push({ name: "About" });
        } else {
          return false;
        }
      }).catch(function(err){
        console.log(err)
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.masklayer {
  width: 100%;
  height: 100vh;
  background-color: rgba(231, 234, 237, 0.5);
  position: absolute;
  left: 0;
  top: 0;
}
.hello {
  background-image: url("../assets/banner.jpg");
  width: 100%;
  height: 50%;
  box-sizing: border-box;
  overflow: hidden;
  vertical-align: middle;
}
.centers {
  width: 33.3%;
  margin-left: 33.3%;
}
.centertopbox {
  margin-top: 10%;
  width: 33.3%;
  text-align: center;
  margin-left: 33.3%;
}
.centerbox {
  left: 50%;
  width: 33.3%;
  position: absolute;
  transform: translateX(-50%);
  background-color: rgba(231, 234, 237, 0.5);
  padding: 40px;
}
.footerspan {
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
}
.centertop {
  text-align: center;
  box-sizing: border-box;
  width: 40%;
  height: 30%;
  padding: 30px;
  border: 1px solid rgba(231, 234, 237, 0.3);
  box-shadow: 0 0 10rpx 10rpx rgba(231, 234, 237, 0.3);
  background-color: rgba(231, 234, 237, 0.3);
}
.marbot {
  margin-bottom: 20px;
  width: 100%;
}
.flr {
  height: 26px;
  float: right;
  color: rgb(255, 137, 42);
  font-size: 12rpx;
}
.buttontop {
  margin-top: 20px;
  width: 100%;
}
.footer {
  color: rgba(153, 153, 176);
  margin-top: 10px;
  font-size: 14px;
  display: block;
  text-align: center;
}
.footerwhite {
  width: 100%;
  height: 50vh;
  position: absolute;
  bottom: 0;
  background-color: #fff;
}
</style>