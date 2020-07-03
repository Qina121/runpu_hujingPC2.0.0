<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->
   
      <el-header class="bgred">汇景应用后台管理</el-header>
      <el-container class="sideHeight">
   
        <el-menu
          
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#393f4c"
          text-color="#fff"
          active-text-color="#ffd04b"
          :default-active="$route.path" router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click.native='logoutHandle'>用户管理</el-menu-item>
              <el-menu-item index="1-2">管理员管理</el-menu-item>
              <el-menu-item index="1-3">重点关照</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>服务审批</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">申请审批</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
           <el-submenu index="">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>积分商城</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/home/Commodity">线上商品</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/home/PurchaseList">购买列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/home/Notice">
            <i class="el-icon-menu"></i>
            <span slot="title">通知公告</span>
          </el-menu-item>
          <el-menu-item index="/home/AdministratorApproval">
            <i class="el-icon-setting"></i>
            <span slot="title">管理员审批</span>
          </el-menu-item>
          <el-menu-item index="/home/WarrantyApproval">
            <i class="el-icon-remove-outline"></i>
            <span slot="title">报修审批</span>
          </el-menu-item>
          <el-menu-item index="/home/RefuseClassification">
            <i class="el-icon-help"></i>
            <span slot="title">垃圾分类</span>
          </el-menu-item>
          <el-menu-item index="/home/VehicleManagement">
            <i class="el-icon-s-flag"></i>
            <span slot="title">车辆审批</span>
          </el-menu-item>
          <el-submenu index="/home">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>备案表的管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/home/AdministratorRecordForm" >管理员备案</el-menu-item>
              <!-- <el-menu-item index="/home/OtherRecordForm" >户本</el-menu-item> -->
              <el-menu-item index="/home/UserRecordForm" >用户</el-menu-item>
              <el-menu-item index="/home/HzFilingForm" >户主</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
        <el-main style="width:80%">
          <router-view/>
        </el-main>
    
        
      </el-container>
  
  </div>
</template>

<script>
import AboutUser from '@/components/AboutUser.vue'
export default {
  name :"About",
  components: {
    AboutUser
  },
  data() {
return {
  
}
  },
  methods:{
     handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      AboutUser() {
        this.$router.push('/home/AboutUser')
      },
      AdministratorRecord() {
        this.$router.push('/home/AdministratorRecordForm')
      },
      OtherRecordForm() {
        this.$router.push('/home/OtherRecordForm')
      },


      // 获取后台数据
      logoutHandle() {
        this.$axios.get('https://api.huijingwuye6688.com/FamilyInfo/selectAllInfo').then(function(res){
          console.log(res)
        }).catch(function(err){
          console.log(err)
        })
      }
  }
}
</script>

<style>
</style>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.about {
  width: 100%;
  height: 100vh;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-menu-vertical-demo {
  width: 200px;
}
.bgred {
  background-color: #5a8afb;
  color:#fff;
  text-align: left;
  font-weight: 700;
  font-size: 24px;
  text-indent: 1em;
  
}
.sideHeight {
  height: 93vh;
}
</style>
