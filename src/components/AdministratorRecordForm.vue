<template>
 <div class="Allbox">
   <el-button type="primary" @click="addData()">添加数据</el-button>
    <el-table
      :data="tableData"
      style="width: 1000px;margin: 0 auto"
      show-header
      border  height="858"
       @sort-change="changeTableSort"
    >
      <el-table-column prop="id" label="Id"  width="120" :sortable="'custom'"></el-table-column>
      <el-table-column prop="realName" label="姓名"  width="120"></el-table-column>
      <!-- <el-table-column prop="sex" label="性别"  width="120"></el-table-column> -->
      <el-table-column prop="phoneNumber" label="手机号" width="160"></el-table-column>
      <!-- <el-table-column prop="idCard" label="身份证号" width="160"></el-table-column> -->
      <!-- <el-table-column prop="landlordRelationship" label="与业主关系" width="160"></el-table-column> -->
      <el-table-column prop="rfid" label="RFID编码" width="160"></el-table-column>
      <!-- <el-table-column prop="carnumber" label="车牌号" width="160"></el-table-column> -->
      <!-- <el-table-column prop="creattime" label="创建日期" width="160"></el-table-column> -->
      <!-- <el-table-column prop="registered" label="注册状态"  width="160"></el-table-column> -->
      <!-- <el-table-column prop="userAddress" label="地址"  width="250"></el-table-column> -->
      <!-- <el-table-column  label="重点关照" width="160">
      <template slot-scope="scope">{{scope.row.focusAttention=== 0? '不是': '是'}}</template></el-table-column> -->
      <el-table-column  label="操作" width="200">
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
    <div class="modifyFrom" v-if="showAddForm">
       <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
        <el-form-item label="姓名">
          <el-input v-model="formLabelAlign.userName"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formLabelAlign.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="RFID编号">
          <el-input v-model="formLabelAlign.rfid"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAddForm(formLabelAlign)">立即添加</el-button>
          <el-button type="primary" @click="closeAddForm(formLabelAlign)">返回</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 修改表单 -->
    <div class="modifyFrom" v-if="showChangeForm">
       <el-form :label-position="labelPosition" label-width="100px" :model="changeformLabelAlign">
        <el-form-item label="姓名">
          <el-input :disabled="true" v-model="changeformLabelAlign.userName"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input :disabled="true" v-model="changeformLabelAlign.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="RFID编号">
          <el-input v-model="changeformLabelAlign.rfid"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitchangeForm(changeformLabelAlign)">立即修改</el-button>
          <el-button type="primary" @click="closeChangeForm(changeformLabelAlign)">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdministratorRecordForm",
  props: {
    msg: String
  },
  data() {
    return {
      formShow: false,
      showAddForm: false,
      showChangeForm: false,
      tableData: [],
      labelPosition: 'right',
      formLabelAlign: {
        focusAttention: '',
        id: '',
        idCard: '',
        landlordId:'',
        landlordRelationship:'',
        landlordRelationshipNumber:'',
        phoneNumber:'',
        registered:'',
        rfid:'',
        sex:'',
        userAddress:'',
        userName:'',
        workAddress: ''
      },
      changeformLabelAlign: {
        focusAttention: '',
        id: '',
        idCard: '',
        landlordId:'',
        landlordRelationship:'',
        landlordRelationshipNumber:'',
        phoneNumber:'',
        registered:'',
        rfid:'',
        sex:'',
        userAddress:'',
        userName:'',
        workAddress: ''
      }
    };
  },
  created(){
      // 获取后台数据
      const that = this
      this.showTableData() 
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    // 获取管理员总表数据
    showTableData() {
      const that = this
      this.$axios.get('https://api.huijingwuye6688.com/ManageInfo/selectAllManageInfo').then(function(res){
        that.tableData = []
        that.tableData = res.data.data
        const obj = {
          order: "ascending",
          prop: "id"
        }
        that.changeTableSort(obj)
      }).catch(function(err){
        console.log(err)
      })
    },
     //选择指定列进行排序
    changeTableSort(column){
      //获取字段名称和排序类型
      const fieldName = column.prop;
      const sortingType = column.order;

      //按照降序排序
      if(sortingType == "descending"){
          this.tableData = this.tableData.sort((a, b) => b[fieldName] - a[fieldName]);
      }
      //按照升序排序
      else{
          this.tableData = this.tableData.sort((a, b) => a[fieldName] - b[fieldName]);
      }

    },
    addData(){
      this.showAddForm = true
    },
    closeAddForm() {
      this.showAddForm = false
    },
    submitAddForm(fromData) {
      const that = this
      if(fromData.userName == null || fromData.userName== '') {
        that.$message({
              message: '请填写姓名',
              type: 'warning'
        });
        return false
      }
      if(fromData.phoneNumber== null || fromData.userName== '') {
        that.$message({
              message: '请填写手机号',
              type: 'warning'
        });
        return false
      } else if (!(/^1[3456789]\d{9}$/.test(fromData.phoneNumber))) {
        that.$message({
              message: '手机号码有误,请重新输入',
              type: 'warning'
        });
        return false
      }
      if(fromData.rfid== null || fromData.userName== '') {
        that.$message({
              message: '请填写RFID编号',
              type: 'warning'
        });
        return false
      }
      const obj = {
        realName: fromData.userName,
        phoneNumber: fromData.phoneNumber,
        rfid: fromData.rfid,
        createTime:'',
      }
      // 将新增加的管理员信息返回给后台数据库
      this.$axios.post('https://api.huijingwuye6688.com/ManageInfo/insertManage',obj,{headers:{'Content-Type':'application/json'}}).then(function(res){

        if(res.data.success) {
          that.$message({
            message: res.data.message,
            type: 'success'
          });
          that.closeAddForm()
          //重新回去全部数据
          that.showTableData() 
          // location.reload();
        }
        }).catch(function(err){
        console.log(err)
      })
    },
    //删除列表单条数据
    deleteData(index,item,rows) {
      const that = this
      const id = Number(item.id)
      const landlordId = Number(item.landlordId)
      const http = 'https://api.huijingwuye6688.com/ManageInfo/delete/'+id
      this.$axios.get(http).then(function(res){
        if(res.data.success) {
          // rows.splice(index, 1);
          that.showTableData()
          that.$message({
            message: res.data.message,
            type: 'success'
          });
        }
      }).catch(function(err){
        console.log(err)
      })
    },
    //更改列表单条数据回填
    changeData(index,item) {
      const that = this
      const id = Number(item.id)
      const http = 'https://api.huijingwuye6688.com/ManageInfo/selectOne/'+id
        this.$axios.get(http).then(function(res){

          const data = res.data.data
            that.showChangeForm = true
            that.changeformLabelAlign = {
            id:data.id,
            userName:data.realName,
            phoneNumber:data.phoneNumber,
            rfid:data.rfid
          }
        }).catch(function(err){
          console.log(err)
        })
    },
    //修改表单并提交
    submitchangeForm(formName) {

      // this.submitchangeForm = true
      const that = this
      if(formName.rfid== null || formName.userName== '') {
        that.$message({
              message: '请填写RFID编号',
              type: 'warning'
        });
        return false
      }
      const obj = {
        id: formName.id,
        realName:formName.userName,
        phoneNumber:formName.phoneNumber,
        rfid:formName.rfid,
        createTime:'',
      }
      const updateHttp = 'https://api.huijingwuye6688.com/ManageInfo/update'
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
    closeChangeForm() {
      this.showChangeForm = false
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
    overflow: auto;
}
</style>