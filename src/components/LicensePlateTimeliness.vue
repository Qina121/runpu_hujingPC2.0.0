<template>
 <div class="Allbox">
   <!-- <el-button type="primary" @click="addData()">添加数据</el-button> -->
    <el-table
      :data="tableData"
      style="width: 100%"
      show-header
      border  height="800"
    >
    <el-table-column :resizable="false" prop="id" label="ID"  width="120"></el-table-column>
    <el-table-column :resizable="false" prop="userId" label="用户ID" width="160"></el-table-column>
    <el-table-column :resizable="false" prop="realName" label="用户姓名"  width="120"></el-table-column>
    <el-table-column :resizable="false" prop="phoneNumber" label="手机号" width="160"></el-table-column>
    <el-table-column :resizable="false" prop="carNumber" label="车牌号" width="160"></el-table-column>   
    <el-table-column :resizable="false" prop="createTime" label="创建时间" width="160"></el-table-column>
    <el-table-column :resizable="false" prop="endTime" label="结束时间"  width="160"></el-table-column>
    <el-table-column :resizable="false" prop="rfidCar" label="RFID"  width="250"></el-table-column>
    <el-table-column  :resizable="false" label="时效性" width="160">
        <template slot-scope="scope">{{scope.row.rfidCarValid== '1'? '无效': scope.row.rfidCarValid=='2'? '有效':''}}</template>
    </el-table-column>
    <el-table-column :resizable="false" fixed="right" label="操作" width="200">
        <template slot-scope="scope">
        <el-button
            size="mini"
            @click="changeData(scope.$index, scope.row)">更改</el-button>
            <el-button
            size="mini"
            @click="deleteData(scope.$index, scope.row, tableData)">删除</el-button>
        </template>
    </el-table-column>
    </el-table>

    <!-- 添加表单 -->


    <!-- 修改表单 -->
       <div class="modifyFrom" v-if="showChangeForm">
        <el-form :label-position="labelPosition" label-width="100px" :model="changeformLabelAlign">
        <el-form-item label="ID">
          <el-input :disabled="true" v-model="changeformLabelAlign.id"></el-input>
        </el-form-item>
        <el-form-item label="用户ID">
          <el-input :disabled="true" v-model="changeformLabelAlign.userId"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input :disabled="true" v-model="changeformLabelAlign.realName"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input :disabled="true" v-model="changeformLabelAlign.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input :disabled="true" v-model="changeformLabelAlign.carNumber"></el-input>
        </el-form-item>
        <!-- <el-form-item label="创建时间">
          <el-input v-model="changeformLabelAlign.createTime"></el-input>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-input v-model="changeformLabelAlign.endTime"></el-input>
        </el-form-item> -->
        <el-form-item label="创建日期">
          <el-date-picker style="width:100%" v-model="changeformLabelAlign.createTime" type="date" placeholder="选择创建日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker style="width:100%" v-model="changeformLabelAlign.endTime" type="date" placeholder="选择结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="RFID">
          <el-input :disabled="true" v-model="changeformLabelAlign.rfidCar"></el-input>
        </el-form-item>
        <el-form-item label="时效性">
          <el-select v-model="changeformLabelAlign.rfidCarValid" placeholder="请选择用户状态">
            <el-option label="无效" value="1"></el-option>
            <el-option label="有效" value="2"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="changeForm(changeformLabelAlign)">立即修改</el-button>
            <el-button type="primary" @click="closeChangeForm(changeformLabelAlign)">返回</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: "LicensePlateTimeliness",
  props: {
    msg: String
  },
  data() {
    return {
      showAddForm: false,
      showChangeForm: false,
      tableData: [],
      formLabelAlign: {
        landlordId: null,
        landlordName: null,
        landlordRelationshipNumber: null,
        landlordRelationship: null,
        registered:null,
        userName:null,
        sex:null,
        userAddress:null,
        idCard:null,
        workAddress:null,
        phoneNumber:null,
        rfid: null,
        carNumber: null,
        focusAttention: null
      },
      changeformLabelAlign: {
        landlordId: null,
        landlordName: null,
        landlordRelationshipNumber: null,
        landlordRelationship: null,
        registered:null,
        userName:null,
        sex:null,
        userAddress:null,
        idCard:null,
        workAddress:null,
        phoneNumber:null,
        rfid: null,
        carNumber: null,
        id: null,
        focusAttention: null
      },
      labelPosition: 'right',
      formLabelAlignrules: { // 表单验证规则
        // landlordId: [
        //   { required: true, message: '户主ID', trigger: "blur" },
        // ]
      }
    };
  },
  created(){
    this.showTableData()
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    // 获取后台总表数据
    showTableData() {
      const that = this
      this.$axios.get(that.api+'RfidCarTimeliness/selectAll').then(function(res){
        that.tableData = []
        that.tableData = res.data.data
      }).catch(function(err){
        console.log(err)
      })
    },
    //修改表单数据,数据回填
    changeData(index,item) {
      const that = this
      //显示表单
      that.showChangeForm = true
      const id = Number(item.id)
      const http = that.api+'RfidCarTimeliness/selectOneInfo/?id='+id
      this.$axios.get(http).then(function(res){
        //先获取数据回填
        const data = res.data.data
        that.changeformLabelAlign =  res.data.data
        that.changeformLabelAlign.rfidCarValid = res.data.data.rfidCarValid.toString()
      }).catch(function(err){
        console.log(err)
      })
    },
    //添加表单数据
    addData() {
      const that = this
      that.formLabelAlign= {
        landlordId: null,
        landlordName: null,
        landlordRelationshipNumber: null,
        landlordRelationship: null,
        registered:null,
        userName:null,
        sex:null,
        userAddress:null,
        idCard:null,
        workAddress:null,
        phoneNumber:null,
        rfid: null,
        carNumber: null
      },
      that.showAddForm = true
    },
    //删除表单数据
    deleteData(index,item,rows) {
      const that = this
      const id = Number(item.id)
      const http = that.api+'userInfo/delete/'+id
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
    //添加用户表单
    submitAddForm(formName,statue) {
      const that = this
      if(formName.landlordName== null) {
        that.$message({
              message: '请填写户主名字',
              type: 'warning'
        });
        return false
      }
      if(formName.phoneNumber== null) {
        that.$message({
              message: '请填写手机号',
              type: 'warning'
        });
        return false
      } else if (!(/^1[3456789]\d{9}$/.test(formName.phoneNumber))) {
        that.$message({
              message: '手机号码有误,请重新输入',
              type: 'warning'
        });
        return false
      }
      if(formName.rfid== null) {
        that.$message({
              message: '请填写FRID编号',
              type: 'warning'
        });
        return false
      }

      const obj = {
        landlordId: formName.landlordId,
        landlordName: formName.landlordName,
        landlordRelationshipNumber: formName.landlordRelationshipNumber,
        landlordRelationship: formName.landlordRelationship,
        registered:formName.registered,
        userName:formName.userName,
        sex:formName.sex,
        userAddress:formName.userAddress,
        idCard:formName.idCard,
        workAddress:formName.workAddress,
        phoneNumber:formName.phoneNumber,
        rfid: formName.rfid,
        carNumber: formName.carNumber,
        focusAttention: Number(formName.focusAttention)
      }

        // 返回后台添加单条的信息
        this.$axios.post(that.api+'FamilyInfo/insert',obj,{headers:{'Content-Type':'application/json'}}).then(function(res){

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
    changeForm(formName) {
        const that = this
        //处理时间
        let eTime = ''
        let cTime = ''
        if(formName.createTime == null) {
          that.$message({
                message: '请选择创建时间',
                type: 'warning'
          });
          return false
        } else {
            cTime = that.uploadDate(formName.createTime) 
        }
        if(formName.endTime == null) {
          that.$message({
                message: '请选择结束时间',
                type: 'warning'
          });
          return false
        } else {
          eTime = that.uploadDate(formName.endTime)
        }
        const obj = {
          id: formName.id,
          carNumber: formName.carNumber,
          createTime: cTime,
          endTime: eTime,
          phoneNumber:formName.phoneNumber,
          realName:formName.realName,
          rfidCar:formName.rfidCar,
          rfidCarValid:formName.rfidCarValid,
          userId:formName.userId
        }

        const updateHttp = that.api+'RfidCarTimeliness/update'
        that.$axios.post(updateHttp,obj,{headers:{'Content-Type':'application/json'}}).then(function(res){
          if(res.data.success) {
            that.$message({
              message: res.data.message,
              type: 'success'
            });
            that.closeChangeForm()
            that.showTableData() 
          }
        }).catch(function(err){
          console.log(err)
        })
    },
    //关闭添加窗口
    closeAddForm() {
      this.showAddForm = false
    },
    //关闭数据更改窗口
    closeChangeForm() {
      this.showChangeForm = false
    },

    // pay() {
    //   console.log('缴费')
    // }
    //时间处理
    uploadDate(date) {
      let d = new Date(date)
      let datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      return datetime
    },
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
    z-index: 99;
}


</style>