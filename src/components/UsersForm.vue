<template>
 <div class="Allbox">
   <!-- <el-button type="primary" @click="addData()">添加数据</el-button> -->
   <div class="searchOrder">
      <el-select v-model="searchType" placeholder="请选择用户类型">
        <!-- <el-option label="管理员" value="1"></el-option> -->
        <el-option label="业主" value="2"></el-option>
        <el-option label="住户" value="3"></el-option>
        <el-option label="租户" value="4"></el-option>
      </el-select>
  	  <el-button type="primary" @click="searchOrder">搜索</el-button>
      <el-button type="primary" @click="untreated()">查询未处理的用户</el-button>
      <!-- 按名字查询用户 -->
      <el-input style="width:150px;margin-left:10px" v-model="searchName" placeholder="请输入姓名"></el-input>
  	  <el-button type="primary" @click="searchUser">搜索</el-button>
   </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      show-header
      border  height="800"
    >
        <el-table-column prop="id" label="ID"  width="120"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
        <el-table-column  label="用户类型" width="160">
        <template slot-scope="scope">{{scope.row.userType=== 1? '管理员': scope.row.userType=== 2? '业主':scope.row.userType=== 3? '住户':scope.row.userType=== 4? '租户':''}}</template>
      </el-table-column>
      <el-table-column prop="realName" label="用户姓名"  width="120"></el-table-column>
      <el-table-column prop="phoneNumber" label="手机号" width="160"></el-table-column>
      <el-table-column prop="carNumber" label="车牌号" width="160"></el-table-column>
      <el-table-column prop="town" label="镇"  width="160"></el-table-column>
      <el-table-column prop="village" label="村"  width="250"></el-table-column>
      <el-table-column prop="commonAddress" label="详细地址"  width="120"></el-table-column>
      <el-table-column prop="rfid" label="RFID" width="160"></el-table-column>
      <el-table-column prop="totalScore" label="总积分" width="160"></el-table-column>
      <!-- <el-table-column prop="carnumber" label="车牌号" width="160"></el-table-column> -->
      <!-- <el-table-column prop="creattime" label="创建日期" width="160"></el-table-column> -->
      <el-table-column prop="userOwnerId" label="户主ID" width="160"></el-table-column>
       <!-- <el-table-column  label="用户状态" width="160">
        <template slot-scope="scope">{{scope.row.userState=== 1? '未审批': '已审批'}}</template>
      </el-table-column> -->
      <el-table-column fixed="right" label="操作" width="260">
        <template slot-scope="scope">
          <el-button
          size="mini"
          @click="checkIntegral(scope.$index, scope.row, tableData)">查积分明细</el-button>
          <!-- <el-button
          size="mini"
          @click="pay(scope.$index, scope.row)">缴费</el-button> -->
        <!-- <el-button
          size="mini"
          @click="changeData(scope.$index, scope.row)">更改</el-button> -->
          <div v-if="scope.row.userState !== 1" style="display:inline-block;margin:0 10px;">已处理</div>
          <el-button v-if="scope.row.userState === 1"
          size="mini"
          @click="approved(scope.$index, scope.row)">未处理</el-button>
          <el-button
          size="mini"
          @click="deleteData(scope.$index, scope.row, tableData)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>

    <!-- 添加表单 -->
    <!-- <div class="modifyFrom" v-if="showAddForm">
       <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" :rules="formLabelAlignrules">
        <el-form-item label="户主ID" prop="landlordId">
          <el-input v-model="formLabelAlign.landlordId"></el-input>
        </el-form-item>
        <el-form-item label="户主名字">
          <el-input v-model="formLabelAlign.landlordName"></el-input>
        </el-form-item>
        <el-form-item label="用户关系编号">
          <el-input v-model="formLabelAlign.landlordRelationshipNumber"></el-input>
        </el-form-item>
        <el-form-item label="与业主关系">
          <el-input v-model="formLabelAlign.landlordRelationship"></el-input>
        </el-form-item>
        <el-form-item label="是否在册">
          <el-input v-model="formLabelAlign.registered"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input v-model="formLabelAlign.userName"></el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-input v-model="formLabelAlign.sex"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="formLabelAlign.userAddress"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="formLabelAlign.idCard"></el-input>
        </el-form-item>
        <el-form-item label="工作地址">
          <el-input v-model="formLabelAlign.workAddress"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formLabelAlign.phoneNumber"></el-input>
        </el-form-item>     
        <el-form-item label="FRID编号">
          <el-input v-model="formLabelAlign.rfid"></el-input>
        </el-form-item>
        <el-form-item label="用户车牌">
          <el-input v-model="formLabelAlign.carNumber"></el-input>
        </el-form-item>
        <el-form-item label="重点关照">
          <el-select v-model="formLabelAlign.focusAttention" placeholder="请选择是否需要重点关照">
            <el-option label="否" value="1"></el-option>
            <el-option label="是" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAddForm(formLabelAlign)">立即添加</el-button>
          <el-button type="primary" @click="closeAddForm(formLabelAlign)">返回</el-button>
        </el-form-item>
      </el-form>
    </div> -->

    <!-- 修改表单 -->
       <div class="modifyFrom" v-if="showChangeForm">
        <el-form :label-position="labelPosition" label-width="100px" :model="changeformLabelAlign">
        <el-form-item label="ID">
          <el-input :disabled="true" v-model="changeformLabelAlign.id"></el-input>
        </el-form-item>
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
          <el-input v-model="changeformLabelAlign.totalScore"></el-input>
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


    <div class="scoreShow" v-if="scoreShow">
      <div v-for="item in scoreList" class="scoreItem">
        <span class="smallBoxs">积分{{item.score > 0 ? '+' + item.score : item.score}}</span>
         <span class="stylered">{{item.scoreDesc}}</span>
        <span class="styleblod">{{item.createTime}}</span>
      </div>
      <el-button type="primary" style="float:right;" @click="closeScore()">返回</el-button>
    </div>
      
  
  </div>
</template>

<script>

export default {
  name: "UsersForm",
  props: {
    msg: String
  },
  data() {
    return {
      searchName: '',
      searchType: null,
      showAddForm: false,
      showChangeForm: false,
      scoreShow: false,
      scoreList: [],
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
      // 新地址https://api.huijingwuye6688.com
      this.$axios.get(that.api+'userInfo/selectAllInfo').then(function(res){
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
            // that.showTableData() 
            that.searchUser()
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
    searchOrder() {
      const that = this
      // 新地址https://api.huijingwuye6688.com
      this.$axios.get(that.api+'userInfo/selectAllInfo').then(function(res){
        that.tableData = []
        for(let i = 0;  i< res.data.data.length; i++) {
          if(res.data.data[i].userType == that.searchType) {
              that.tableData.push(res.data.data[i])
          }
        }
        // that.tableData = res.data.data
      }).catch(function(err){
        console.log(err)
      })
    },
    untreated() {
      const that = this
      // 新地址https://api.huijingwuye6688.com
      this.$axios.get(that.api+'userInfo/selectAllInfo').then(function(res){
        that.tableData = []
        for(let i = 0;  i< res.data.data.length; i++) {
          if(res.data.data[i].userState == 1) {
              that.tableData.push(res.data.data[i])
          }
        }
        // that.tableData = res.data.data
      }).catch(function(err){
        console.log(err)
      })
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

            // that.showTableData() 
            that.untreated()
          }
        }).catch(function(err){
          console.log(err)
        })
    },
    // 搜索
    searchUser() {
      const that = this
      if(that.searchName) {
        if(!isNaN(Number(that.searchName))) {
          that.$message({
            message: '搜索内容不正确',
            type: 'error'
          });
        } else {
          const http = that.api+'userInfo/fuzzySelectUserInfoByRealName?realName='+ that.searchName
            this.$axios.get(http).then(function(res){
              that.tableData = []
              that.tableData = res.data.data
            }).catch(function(err){
              console.log(err)
            })
        }
      } else{
        that.showTableData()
      }

    },
    //积分
    checkIntegral(index,item){
      const that = this
      that.scoreShow = true
      const http = that.api+'scoreLogs/selectScoredById?userId='+ item.id
      this.$axios.get(http).then(function(res){
        console.log(res)
        that.scoreList = res.data.data
      }).catch(function(err){
        console.log(err)
      })
    },
    closeScore() {
      this.scoreShow = false
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

.searchOrder{
  width: 700px;
  height: 30px;
  border-radius: 5px;
  line-height: 30px;
  margin: 20px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;

}

.scoreShow{
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
    z-index: 100;
}
.scoreItem{
  height: 50px;
}
.smallBoxs {
    width: 20%;
    height: 50rpx;
    float: left;
    background-color: #A60001;
    color:#fff;
    border-radius: 50rpx;
    text-align: center;
}
.stylered {
    width: 54%;
    height: 50rpx;
    line-height: 50rpx;
    color:#a60001;
    font-size: 26rpx;
    text-align: center;
    float: left;
    margin: 0 10px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.styleblod {
    font-family:Impact;
    font-size: 26rpx;
    width: 20%;
    float: right;
    text-align: center;
}
</style>