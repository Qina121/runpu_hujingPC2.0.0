<template>
 <div class="Allbox">
   <div class="searchOrder">
     <el-input v-model="searchName" placeholder="请输入姓名"></el-input>
  	<el-button type="primary" @click="searchUser">搜索</el-button>
    <el-button type="primary" @click="addData()">添加新立村用户</el-button>
   </div>
  
    <el-table
      :data="tableData"
      style="width: 100%"
      show-header
      border  height="800"
    >
        <el-table-column :resizable="false" prop="id" label="ID"  width="120"></el-table-column>
        <el-table-column :resizable="false" prop="createTime" label="创建时间" width="160"></el-table-column>
      <el-table-column :resizable="false" prop="realName" label="用户姓名"  width="120"></el-table-column>
      <el-table-column :resizable="false" prop="phoneNumber" label="手机号" width="160"></el-table-column>
      <el-table-column :resizable="false" prop="carNumber" label="车牌号" width="160"></el-table-column>
      <el-table-column :resizable="false" prop="town" label="镇"  width="120"></el-table-column>
      <el-table-column :resizable="false" prop="village" label="村"  width="120"></el-table-column>
      <el-table-column :resizable="false" prop="commonAddress" label="详细地址"  width="160"></el-table-column>
      <el-table-column :resizable="false" prop="rfid" label="RFID" width="160"></el-table-column>
      <el-table-column :resizable="false" prop="totalScore" label="总积分" width="160"></el-table-column>
      <!-- <el-table-column prop="carnumber" label="车牌号" width="160"></el-table-column> -->
      <!-- <el-table-column prop="creattime" label="创建日期" width="160"></el-table-column> -->
      <el-table-column :resizable="false" prop="userOwnerId" label="户主ID" width="160"></el-table-column>
       <!-- <el-table-column  :resizable="false" label="用户状态" width="160">
        <template slot-scope="scope">{{scope.row.userState=== 1? '未审批': '已审批'}}</template>
      </el-table-column> -->
      <el-table-column  :resizable="false" label="用户类型" width="160">
        <template slot-scope="scope">{{scope.row.userType=== 1? '管理员': scope.row.userType=== 2? '业主':scope.row.userType=== 3? '住户':scope.row.userType=== 4? '租户':''}}</template>
      </el-table-column>
      <el-table-column :resizable="false" fixed="right" label="操作" width="240">
        <template slot-scope="scope">
           <div v-if="scope.row.userState !== 1" style="display:inline-block;margin-right:10px;">已处理</div>
        <el-button v-if="scope.row.userState === 1"
          size="mini"
          @click="approved(scope.$index, scope.row)">未处理</el-button>
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
       <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign" :rules="formLabelAlignrules">
        <!-- <el-form-item label="用户所属户主ID" prop="userOwnerId">
          <el-input v-model="formLabelAlign.userOwnerId"></el-input>
        </el-form-item> -->
        <el-form-item label="姓名" prop="landlordId">
          <el-input v-model="formLabelAlign.realName"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formLabelAlign.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="镇">
          <el-input :disabled="true" v-model="formLabelAlign.town"></el-input>
        </el-form-item>
        <el-form-item label="村">
          <el-input :disabled="true" v-model="formLabelAlign.village"></el-input>
        </el-form-item>
        <el-form-item label="常用地址">
          <el-input v-model="formLabelAlign.commonAddress"></el-input>
        </el-form-item>
        <el-form-item label="FRID编号">
          <el-input v-model="formLabelAlign.rfid"></el-input>
        </el-form-item>
        <el-form-item label="用户车牌">
          <el-input v-model="formLabelAlign.carNumber"></el-input>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-select v-model="formLabelAlign.userState" placeholder="请选择用户状态">
            <el-option label="未处理" value="1"></el-option>
            <el-option label="已处理" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-select v-model="formLabelAlign.userType" placeholder="请选择用户类型" @change="selectType">
            <el-option label="管理员" value="1"></el-option>
            <el-option label="业主" value="2"></el-option>
            <el-option label="住户" value="3"></el-option>
            <el-option label="租户" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="户主姓名">
          <el-input :disabled="finllInfo" v-model="formLabelAlign.userOwerName"></el-input>
        </el-form-item>
        <el-form-item label="户主手机号">
          <el-input :disabled="finllInfo" v-model="formLabelAlign.userOwerPhoneNumber"></el-input>
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
        <el-form-item label="ID">
          <el-input :disabled="true" v-model="changeformLabelAlign.id"></el-input>
        </el-form-item>
        <!-- <el-form-item label="户主姓名">
          <el-input :disabled="true" v-model="changeformLabelAlign.userOwerName"></el-input>
        </el-form-item>
        <el-form-item label="户主手机号">
          <el-input :disabled="true" v-model="changeformLabelAlign.userOwerPhoneNumber"></el-input>
        </el-form-item> -->
        <el-form-item label="创建时间">
          <el-input :disabled="true" v-model="changeformLabelAlign.createTime"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input :disabled="true" v-model="changeformLabelAlign.realName"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input :disabled="true" v-model="changeformLabelAlign.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input v-model="changeformLabelAlign.carNumber"></el-input>
        </el-form-item>
        <el-form-item label="镇">
          <el-input v-model="changeformLabelAlign.town"></el-input>
        </el-form-item>
        <el-form-item label="村">
          <el-input v-model="changeformLabelAlign.village"></el-input>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="changeformLabelAlign.commonAddress"></el-input>
        </el-form-item>
        <el-form-item label="RFID">
          <el-input v-model="changeformLabelAlign.rfid"></el-input>
        </el-form-item>
        <el-form-item label="总积分">
          <el-input :disabled="true" v-model="changeformLabelAlign.totalScore"></el-input>
        </el-form-item>
        <el-form-item label="户主ID">
          <el-input v-model="changeformLabelAlign.userOwnerId"></el-input>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-select :disabled="true" v-model="changeformLabelAlign.userState" placeholder="请选择用户状态">
            <el-option label="未审批" value="1"></el-option>
            <el-option label="已审批" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-select :disabled="true" v-model="changeformLabelAlign.userType" placeholder="请选择用户类型">
            <el-option label="管理员" value="1"></el-option>
            <el-option label="业主" value="2"></el-option>
            <el-option label="住户" value="3"></el-option>
            <el-option label="租户" value="4"></el-option>
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
  name: "XinLiCunUsers",
  props: {
    msg: String
  },
  data() {
    return {
      searchName: '',
      finllInfo: false,
      userTypeNum: '',
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
        focusAttention: null,
        village: '新立村'
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
        // userOwnerId: [
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
      // const rLoading = that.openLoading();
      this.$axios.get(that.api+'userInfo/selectAllInfo').then(function(res){
        that.tableData = []
        for(let i = 0; i<res.data.data.length; i++) {
            if(res.data.data[i].village == '新立村') {
                that.tableData.push(res.data.data[i])
            }
        }
        // if(that.tableData.length>0) {
        //   rLoading.close();
        // }
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
      const http = that.api+'userInfo/selectOne/+'+id
      this.$axios.get(http).then(function(res){
        //先获取数据回填
        const data = res.data.data
        that.changeformLabelAlign =  res.data.data
        that.changeformLabelAlign.userType = res.data.data.userType.toString()
        that.changeformLabelAlign.userState = res.data.data.userState.toString()
      }).catch(function(err){
        console.log(err)
      })
    },
    //添加表单数据
    addData() {
      const that = this
      that.formLabelAlign= {
        userOwnerId: null,
        realName: null,
        phoneNumber: null,
        town: '北臧村镇',
        village: null,
        commonAddress:null,
        userState:null,
        userType:null,
        rfid:null,
        village: '新立村'
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
    submitAddForm(formName) {
      const that = this
      if(!formName.realName) {
        that.$message({
              message: '请输入姓名',
              type: 'warning'
        });
        return false
      }
      if(!formName.phoneNumber) {
        that.$message({
              message: '请输入用户电话',
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
      if(!formName.commonAddress) {
        that.$message({
              message: '请输入地址',
              type: 'warning'
        });
        return false
      }
       if(!formName.rfid) {
        that.$message({
              message: '请填写RFID',
              type: 'warning'
        });
        return false
      }
       if(!formName.rfid) {
        that.$message({
              message: '请填写车牌',
              type: 'warning'
        });
        return false
      }
      if(!formName.userState) {
        that.$message({
              message: '请选择用户状态',
              type: 'warning'
        });
        return false
      }
      if(!formName.userType) {
        that.$message({
              message: '请选择用户类型',
              type: 'warning'
        });
        return false
      }
      if(that.userTypeNum == 3 || that.userTypeNum == 4) {
        if(!formName.userOwerName) {
          that.$message({
                message: '请输入户主姓名',
                type: 'warning'
          });
          return false
        }
        if(!formName.userOwerPhoneNumber) {
          that.$message({
                message: '请输入户主手机号',
                type: 'warning'
          });
          return false
        }
      }
     
      const obj = {
        userOwerName:formName.userOwerName,
        userOwerPhoneNumber:formName.userOwerPhoneNumber,
        realName: formName.realName,
        phoneNumber: formName.phoneNumber,
        town: '北臧村镇',
        village: '新立村',
        commonAddress:formName.commonAddress,
        rfid:formName.rfid,
        carNumber:formName.carNumber,
        userState:Number(formName.userState),
        userType:Number(formName.userType),
      }

        // 返回后台添加单条的信息
        this.$axios.post(that.api+'userInfo/insertUsers',obj,{headers:{'Content-Type':'application/json'}}).then(function(res){

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
        const obj = {
          id: formName.id,
          headImage: formName.headImage,
          realName: formName.realName,
          phoneNumber: formName.phoneNumber,
          town:formName.town,
          village:formName.village,
          commonAddress:formName.commonAddress,
          createTime:formName.createTime,
          userState:Number(formName.userState),
          userType:Number(formName.userType),
          userOwnerId:formName.userOwnerId,
          carNumber:formName.carNumber,
          totalScore: formName.totalScore,
          rfid:formName.rfid
        }

        const updateHttp = that.api+'userInfo/update'
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
    //关闭数据更改惶窗口
    closeChangeForm() {
      this.showChangeForm = false
    },
    //后台审核用户
    approved(index,item) {
      const that = this
      const http = that.api+'userInfo/updateUserInfoApplicationStatus?id='+item.id+'&&userState='+2+'&&realName='+item.realName+'&&phoneNumber='+item.phoneNumber+'&&userType='+item.userType
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
    // 搜索
    searchUser() {
      const that = this
      if(that.searchName) {
      const http = that.api+'userInfo/fuzzySelectUserInfoByRealName?realName='+ that.searchName
        this.$axios.get(http).then(function(res){
          that.tableData = []
          for(let i = 0; i<res.data.data.length; i++) {
              if(res.data.data[i].village == '新立村') {
                  that.tableData.push(res.data.data[i])
              }
          }
        }).catch(function(err){
          console.log(err)
        })
      } else{
        that.showList()
      }

    },
    selectType(e) {
      this.userTypeNum = e
      if(e == 1 || e == 2) {
        this.finllInfo = true
        this.formLabelAlign.userOwerName = null
        this.formLabelAlign.userOwerPhoneNumber = null
      } else {
        this.finllInfo = false
      }
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
    z-index: 99;
}
.searchOrder{
  width: 350px;
  height: 30px;
  border-radius: 5px;
  line-height: 30px;
  margin: 20px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;

}


</style>