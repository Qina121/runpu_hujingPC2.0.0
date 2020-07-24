<template>
 <div class="Allbox">
   <el-button type="primary" @click="addData()">添加数据</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
      show-header
      border  height="800"
    >
     <el-table-column :resizable="false" prop="createTime" label="创建时间" width="160"></el-table-column>
      <el-table-column :resizable="false" prop="userId" label="用户ID"  width="120"></el-table-column>
      <el-table-column :resizable="false" prop="applyUser" label="用户"  width="120"></el-table-column>
      <!-- <el-table-column prop="auditState" label="状态" width="160"></el-table-column> -->
      <el-table-column :resizable="false" prop="phoneNumber" label="手机号"  width="160"></el-table-column>
      <el-table-column :resizable="false" prop="houseNumber" label="家庭住址" width="160"></el-table-column>
      <el-table-column :resizable="false" prop="plateNumber" label="车牌" width="160"></el-table-column>
      <el-table-column :resizable="false" prop="rfidCar" label="RFID" width="160"></el-table-column>
      <el-table-column :resizable="false" prop="createTime" label="开始时间"  width="160"></el-table-column>
      <el-table-column :resizable="false" prop="endTime" label="结束时间" width="160"></el-table-column>
      <el-table-column :resizable="false" prop="applyDesc" label="描述"  width="250"></el-table-column>
      <!-- <el-table-column  label="重点关照" width="160">
      <template slot-scope="scope">{{scope.row.focusAttention=== 0? '不是': '是'}}</template></el-table-column> -->
      <el-table-column :resizable="false" fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <!-- {{scope.row.auditState=== 1? '未审核': '已审核'}} -->
          <div v-if="scope.row.auditState !== 1" style="display:inline-block;margin-right:10px;">已处理</div>
        <el-button v-if="scope.row.auditState === 1"
          size="mini"
          @click="approved(scope.$index, scope.row)">未处理</el-button>
          <el-button
          size="mini"
          @click="deleteData(scope.$index, scope.row, tableData)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>

       <!-- 添加表单 -->
    <div class="modifyFrom" v-if="showAddForm">
       <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
        <el-form-item label="申请人姓名">
          <el-input v-model="formLabelAlign.applyUser"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="formLabelAlign.phoneNumber"></el-input>
        </el-form-item>
        <!-- 查userId按钮 -->
        <el-form-item>
          <el-button type="primary" @click="lookId(formLabelAlign.applyUser,formLabelAlign.phoneNumber)">请填写姓名和电话号码查询用户ID</el-button>
        </el-form-item>
        <el-form-item label="用户ID">
          <el-input v-model="formLabelAlign.userId"></el-input>
        </el-form-item>
        <el-form-item label="门牌号">
          <el-input v-model="formLabelAlign.houseNumber"></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <!-- <el-input v-model="formLabelAlign.statrtTime"></el-input> -->
          <el-date-picker style="width:100%" v-model="formLabelAlign.statrtTime" type="date" placeholder="选择开始日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <!-- <el-input v-model="formLabelAlign.endTime"></el-input> -->
          <el-date-picker style="width:100%" v-model="formLabelAlign.endTime" type="date" placeholder="选择结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="申请描述">
          <el-input v-model="formLabelAlign.applyDesc"></el-input>
        </el-form-item>
        <!-- <el-form-item label="申请状态">
          <el-input v-model="formLabelAlign.auditState"></el-input>
        </el-form-item> -->
        <el-form-item label="创建时间">
          <!-- <el-input v-model="formLabelAlign.createTime"></el-input> -->
          <el-date-picker style="width:100%" v-model="formLabelAlign.createTime" type="date" placeholder="选择创建日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="车牌">
          <el-input v-model="formLabelAlign.plateNumber"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAddForm(formLabelAlign)">立即添加</el-button>
          <el-button type="primary" @click="closeAddForm(formLabelAlign)">返回</el-button>
        </el-form-item>
      </el-form>
    </div>


    <!-- 处理时填写rifd -->
    <div class="examineShow" v-if="examineShow">
        <div>
          <span>请填写RFID</span>
           <el-input v-model="rfid"></el-input>
           <div class="examineBtn">
             <el-button type="primary"  @click="examine()">确定</el-button>
             <el-button type="primary"  @click="closeExamine()">返回</el-button>
           </div>
        </div>
    </div>

  </div>
</template>

<script>

export default {
  name: "VehicleManagement",
  props: {
    msg: String
  },
  data() {
    return {
      showAddForm: false,
      showChangeForm: false,
      rfid:'',
      examineShow: false,
      tableData: [],
      formLabelAlign: {
        userId: null,
        applyUser: null,
        phoneNumber: null,
        houseNumber: null,
        statrtTime: null,
        endTime: null,
        applyDesc: null,
        auditState: null,
        createTime: null,
        plateNumber: null,
      },
      userInfo : null,
      // changeformLabelAlign: {
      //   name: null,
      //   number: null,
      //   type: null,
      //   carId:null,
      //   frid:null,
      //   address:null,
      //   zctype:null,
      //   gz:null,
      //   id:null,
      //   landlordRelationshipNumber:null,
      //   sex: null,
      //   landlordId:null
      // },
      labelPosition: 'right',
    };
  },
  created(){
    //初始化数据
    this.showTableData()
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
        // 获取后台总表数据
    showTableData() {
      const that = this
      this.$axios.get(that.api+'vehicleManager/PCSelectAll').then(function(res){
        that.tableData = []
        that.tableData = res.data.data
      }).catch(function(err){
        console.log(err)
      })
    },
    //修改表单数据,数据回填
    // changeData(index,item) {
    //   const that = this
    //   that.showChangeForm = true
    //   const id = Number(item.id)
    //   const landlordId = Number(item.landlordId)
    //   const http = that.api+'notice/selectOneById/'+id
    //   this.$axios.get(http).then(function(res){
    //     const data = res.data.data
    //     that.changeformLabelAlign =  {
    //         announceTime: data.announceTime,
    //         content: data.content,
    //         createTime: data.createTime,
    //         creatorId: data.creatorId,
    //         creatorName: data.creatorName,
    //         id: data.id,
    //         title: data.title,
    //         views: data.views,
    //     }
    //   }).catch(function(err){
    //     console.log(err)
    //   })
    // },
    //添加表单数据
    addData() {
      const that = this
      that.formLabelAlign= {
        userId: null,
        applyUser: null,
        phoneNumber: null,
        houseNumber: null,
        statrtTime: null,
        endTime: null,
        applyDesc: null,
        auditState: null,
        createTime: null,
        plateNumber: null,
      },
      that.showAddForm = true
    },
    //删除表单数据
    deleteData(index,item,rows) {
      const that = this
      const id = Number(item.id)
      const http = that.api+'vehicleManager/delete/'+id
      this.$axios.get(http).then(function(res){
        if(res.data.success) {
          that.$message({
            message: res.data.message,
            type: 'success'
          });
          that.showTableData()
        }
      }).catch(function(err){
        console.log(err)
      })
    },
    //查用户ID
    lookId(name,number) {
      const that = this
      const http = that.api+'vehicleManager/PCSelectOneUserInfo/'+name+'/'+number
      this.$axios.get(http).then(function(res){
        //先获取数据回填
        that.formLabelAlign.userId = res.data.data
      }).catch(function(err){
        console.log(err)
      })
    },
    //添加用户表单
    submitAddForm(formName) {
      const that = this
      //处理时间
      let sTime = ''
      let eTime = ''
      let cTime = ''
      if(formName.statrtTime) {
        sTime = that.uploadDate(formName.statrtTime)
      }
      if(formName.endTime) {
        eTime = that.uploadDate(formName.endTime)
      }
      if(formName.createTime) {
        cTime = that.uploadDate(formName.createTime)
      }
      if(!formName.userId) {
        that.$message({
          message: '用户ID为空,无法添加数据',
          type: 'error'
        });
        return
      }
      const obj = {
        userId: formName.userId,
        applyUser: formName.applyUser,
        phoneNumber: formName.phoneNumber,
        houseNumber: formName.houseNumber,
        statrtTime: sTime,
        endTime: eTime,
        applyDesc: formName.applyDesc,
        auditState: 2,
        createTime: cTime,
        plateNumber: formName.plateNumber,
      }
        // 返回后台添加单条的信息
        this.$axios.post(that.api+'vehicleManager/PCInsert',obj,{headers:{'Content-Type':'application/json'}}).then(function(res){
          console.log(res);
          if(res.data.success) {
            that.$message({
              message: res.data.message,
              type: 'success'
            });
            that.closeAddForm()
            //重新回去全部数据
            that.showTableData() 
          }
        }).catch(function(err){
          console.log(err)
        })
    },
    // 修改单条信息并提交
    // changeForm(formName) {
    //     const that = this
    //     const obj = {
    //         announceTime: formName.announceTime,
    //         content: formName.content,
    //         createTime: formName.createTime,
    //         creatorId: formName.creatorId,
    //         creatorName: formName.creatorName,
    //         id: formName.id,
    //         title: formName.title,
    //         views: formName.views,
    //     }
    //     const updateHttp = that.api+'notice/update'
    //     that.$axios.post(updateHttp,obj,{headers:{'Content-Type':'application/json'}}).then(function(res){
    //       if(res.data.success) {
    //         that.$message({
    //           message: res.data.message,
    //           type: 'success'
    //         });
    //         that.closeChangeForm()
    //         that.showTableData() 
    //       }
    //     }).catch(function(err){
    //       console.log(err)
    //     })
    // },
    //关闭添加窗口
    closeAddForm() {
      this.showAddForm = false
    },
    //关闭数据更改窗口
    // closeChangeForm() {
    //   this.showChangeForm = false
    // },
    //车辆通过审核
    approved(index,item) {
      console.log(index, item)
      const that = this
      that.examineShow = true
      that.userInfo = item
      // return
      // const obj = {
      //   auditState : 2,
      //   userId : item.userId,
      //   phoneNumber : item.phoneNumber,
      // }
      // const http = that.api+'vehicleManager/updateVehicleState/'+2+'/'+item.id+'/'+item.phoneNumber
      //   this.$axios.get(http).then(function(res){
      //     if(res.data.success) {
      //       that.$message({
      //         message: res.data.message,
      //         type: 'success'
      //       });
      //       // that.closeChangeForm()
      //       that.showTableData() 
      //     }
      //   }).catch(function(err){
      //     console.log(err)
      //   })
    },
    closeExamine() {
      this.examineShow = false
    },
    //添加rfid并通过审核
    examine() {
      const that = this
      const http = that.api+'vehicleManager/updateVehicleState/'+that.userInfo.id+'/'+that.userInfo.userId+'/'+that.userInfo.phoneNumber+'/'+that.userInfo.plateNumber+'/'+that.rfid
        this.$axios.get(http).then(function(res){
          if(res.data.success) {
            that.$message({
              message: res.data.message,
              type: 'success'
            });
            that.closeExamine()
            that.showTableData() 
          }
        }).catch(function(err){
          console.log(err)
        })
    }
  }
};
</script>

<style scoped>
.modifyFrom{
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -250px;
    margin-top: -280px;
    width:450px;
    height:560px;
    background-color:#fff;
    padding: 28px 90px;
    border: 2px solid #999;
    border-radius: 10px;
    /* display: none; */
    overflow: auto;
}
.examineShow{
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -200px;
  width:300px;
  /* height:80px; */
  background-color:#fff;
  padding: 28px 90px;
  border: 2px solid #999;
  border-radius: 10px;
  overflow: auto;
  z-index: 99;
}
.examineBtn{
  display: flex;
  justify-content:space-between;
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
  
}

</style>