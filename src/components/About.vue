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
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click.native='logoutHandle'>用户管理</el-menu-item>
              <el-menu-item index="1-2">管理员管理</el-menu-item>
              <el-menu-item index="1-3">重点关照</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>服务审批</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">申请审批</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
          <el-menu-item index="/home/Notice">
            <i class="el-icon-menu"></i>
            <span slot="title">通知公告</span>
          </el-menu-item>
          <el-menu-item index="/home/AdministratorApproval">
            <i class="el-icon-setting"></i>
            <span slot="title">管理员审批</span>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>管理员提交</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/home/AdministratorServiceManagement" >服务管理</el-menu-item>
              <el-menu-item index="/home/AdministratorVehicleMnagement" >车辆管理</el-menu-item>
              <el-menu-item index="/home/AdministratorEventUpload" >事件上传</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>非管理员提交</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/home/RefuseClassification" >垃圾分类</el-menu-item>
              <el-menu-item index="/home/WarrantyApproval" >服务申办</el-menu-item>
              <el-menu-item index="/home/VehicleManagement" >车辆管理</el-menu-item>
              <el-menu-item index="/home/LicensePlateTimeliness" >RFID车辆管理时效性</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- <el-menu-item index="/home/WarrantyApproval">
            <i class="el-icon-remove-outline"></i>
            <span slot="title">报修审批</span>
          </el-menu-item> -->
          <!-- <el-menu-item index="/home/RefuseClassification">
            <i class="el-icon-help"></i>
            <span slot="title">垃圾分类</span>
          </el-menu-item> -->
          <!-- <el-menu-item index="/home/VehicleManagement">
            <i class="el-icon-s-flag"></i>
            <span slot="title">车辆审批</span>
          </el-menu-item> -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>备案表的管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/home/AdministratorRecordForm" >管理员备案</el-menu-item>
              <!-- <el-menu-item index="/home/OtherRecordForm" >户本</el-menu-item> -->
              <!-- <el-menu-item index="/home/UserRecordForm" >用户</el-menu-item> -->
              <!-- <el-menu-item index="/home/HzFilingForm" >户主</el-menu-item> -->
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>小程序用户</span>
            </template>
            <el-menu-item-group>
              <!-- UsersForm获取的是所有的用户--现在要分为三个村的用户 -->
              <el-menu-item index="/home/UsersForm">用户表</el-menu-item>
              <el-menu-item index="/home/XinLiCunUsers">新立村用户</el-menu-item>
              <el-menu-item index="/home/LiuHeCunUsers">六合庄村用户</el-menu-item>
              <el-menu-item index="/home/MaCunUsers">马村用户</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7">
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
          <el-menu-item index="/home/IntegralRecord">
            <i class="el-icon-menu"></i>
            <span slot="title">积分记录</span>
          </el-menu-item>
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
        const that = this
        this.$axios.get(that.api+'FamilyInfo/selectAllInfo').then(function(res){
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
