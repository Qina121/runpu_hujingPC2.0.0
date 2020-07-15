<template>
 <div class="Allbox">
   <el-button type="primary" @click="addData()">添加数据</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
      show-header
      border  height="800"
    >
      <el-table-column prop="landlordName" label="户主姓名"  width="120"></el-table-column>
      <el-table-column prop="town" label="镇"  width="120"></el-table-column>
      <el-table-column prop="phoneNumber" label="户主手机号" width="160"></el-table-column>
      <el-table-column prop="village" label="村" width="160"></el-table-column>
      <!-- <el-table-column prop="landlordRelationship" label="与业主关系" width="160"></el-table-column> -->
      <el-table-column prop="landlordId" label="户主ID" width="160"></el-table-column>
      <el-table-column prop="landlordCarNumber" label="户主车牌号" width="160"></el-table-column>
      <el-table-column prop="landlordBH" label="户主房屋编号" width="160"></el-table-column>
      <el-table-column prop="id" label="ID"  width="160"></el-table-column>
      <el-table-column prop="commonAddress" label="地址"  width="250"></el-table-column>
      <!-- <el-table-column  label="重点关照" width="160">
      <template slot-scope="scope">{{scope.row.focusAttention=== 0? '不是': '是'}}</template></el-table-column> -->
      <el-table-column fixed="right" label="操作" width="200">
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
        <!-- <el-form-item label="ID">
          <el-input v-model="formLabelAlign.id"></el-input>
        </el-form-item> -->
        <el-form-item label="户主ID">
          <el-input v-model="formLabelAlign.landlordId"></el-input>
        </el-form-item>
        <el-form-item label="户主房屋编号">
          <el-input v-model="formLabelAlign.landlordBH"></el-input>
        </el-form-item>
        <el-form-item label="镇">
          <el-input v-model="formLabelAlign.town"></el-input>
        </el-form-item>
        <el-form-item label="村">
          <el-input v-model="formLabelAlign.village"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="formLabelAlign.commonAddress"></el-input>
        </el-form-item>
        <el-form-item label="户主姓名">
          <el-input v-model="formLabelAlign.landlordName"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formLabelAlign.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="车牌">
          <el-input v-model="formLabelAlign.landlordCarNumber"></el-input>
        </el-form-item>
        <el-form-item label="landlordRFID">
          <el-input v-model="formLabelAlign.landlordRFID"></el-input>
        </el-form-item>
        <!-- <el-form-item label="地址">
          <el-input v-model="formLabelAlign.address"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="重点关照">
          <el-input v-model="formLabelAlign.gz"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitAddForm(formLabelAlign)">立即添加</el-button>
          <el-button type="primary" @click="closeAddForm(formLabelAlign)">返回</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 修改表单 -->
       <div class="modifyFrom" v-if="showChangeForm">
        <el-form :label-position="labelPosition" label-width="100px" :model="changeformLabelAlign">
          <!-- <el-form-item label="用户ID">
            <el-input v-model="formLabelAlign.landlordId"></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="ID">
          <el-input v-model="changeformLabelAlign.id"></el-input>
        </el-form-item> -->
        <el-form-item label="户主ID">
          <el-input :disabled="true" v-model="changeformLabelAlign.landlordId"></el-input>
        </el-form-item>
        <el-form-item label="户主房屋编号">
          <el-input :disabled="true" v-model="changeformLabelAlign.landlordBH"></el-input>
        </el-form-item>
        <el-form-item label="镇">
          <el-input :disabled="true" v-model="changeformLabelAlign.town"></el-input>
        </el-form-item>
        <el-form-item label="村">
          <el-input :disabled="true" v-model="changeformLabelAlign.village"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="changeformLabelAlign.commonAddress"></el-input>
        </el-form-item>
        <el-form-item label="户主姓名">
          <el-input :disabled="true" v-model="changeformLabelAlign.landlordName"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="changeformLabelAlign.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="车牌">
          <el-input v-model="changeformLabelAlign.landlordCarNumber"></el-input>
        </el-form-item>
        <el-form-item label="landlordRFID">
          <el-input v-model="formLabelAlign.landlordRFID"></el-input>
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
  name: "HzFilingForm",
  props: {
    msg: String
  },
  data() {
    return {
      showAddForm: false,
      showChangeForm: false,
      tableData: [
        // {
        //   date: "2016-05-02",
        //   userName: "王小虎",
        //   userAddress: "上海市普陀区金沙江路 1518 弄",
        //   relationship:'父子',
        //   carnumber: '京A52057',
        //   creattime: '2020-06-12',
        //   usertype: '是',
        //   phoneNumber:'',
        //   sex: ''
        // },
      ],
      formLabelAlign: {
        id: null,
        landlordId: null,
        landlordBH: null,
        town:null,
        village:null,
        commonAddress:null,
        landlordName:null,
        phoneNumber:null,
        landlordCarNumber:null,
        landlordRFID: null
      },
      changeformLabelAlign: {
        id: null,
        landlordId: null,
        landlordBH: null,
        town:null,
        village:null,
        commonAddress:null,
        landlordName:null,
        phoneNumber:null,
        landlordCarNumber:null,
        landlordRFID: null
      },
      labelPosition: 'right',
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
      this.$axios.get(that.api+'hzInfo/selectAllInfo').then(function(res){
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
      const landlordId = Number(item.landlordId)
      const http = that.api+'hzInfo/selectOne/+'+id+'/'+landlordId
      this.$axios.get(http).then(function(res){
        //先获取数据回填
        const data = res.data.data
        that.changeformLabelAlign =  {
            id: data.id,
            landlordId: data.landlordId,
            landlordBH: data.landlordBH,
            town:data.town,
            village:data.village,
            commonAddress:data.commonAddress,
            landlordName:data.landlordName,
            phoneNumber:data.phoneNumber,
            landlordCarNumber:data.landlordCarNumber,
            landlordRFID: data.landlordRFID
        }
      }).catch(function(err){
        console.log(err)
      })
    },
    //添加表单数据
    addData() {
      const that = this
      that.formLabelAlign= {
        name: null,
        number: null,
        type: null,
        carId:null,
        frid:null,
        address:null,
        zctype:null,
        gz:null,
        id:null,
        landlordRelationshipNumber:null,
        sex: null,
        landlordId:null,
        landlordRFID: null

      },
      that.showAddForm = true
    },
    //删除表单数据
    deleteData(index,item,rows) {
      const that = this
      const id = Number(item.id)
      const landlordId = Number(item.landlordId)
      const http = that.api+'hzInfo/delete/'+id+'/'+landlordId
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
      if(formName.landlordName == null) {
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
      if(formName.landlordRFID== null) {
        that.$message({
              message: '请填写landlordRFID编号',
              type: 'warning'
        });
        return false
      }
      const obj = {
        id: formName.id,
        landlordId: formName.landlordId,
        landlordBH: formName.landlordBH,
        town:formName.town,
        village:formName.village,
        commonAddress:formName.commonAddress,
        landlordName:formName.landlordName,
        phoneNumber:formName.phoneNumber,
        landlordCarNumber:formName.landlordCarNumber,
        landlordRFID: formName.landlordRFID
      }
        // 返回后台添加单条的信息
        this.$axios.post(that.api+'hzInfo/insert',obj,{headers:{'Content-Type':'application/json'}}).then(function(res){

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
        // if(formName.landlordRFID == null) {
        //   that.$message({
        //         message: '请填写landlordRFID编号',
        //         type: 'warning'
        //   });
        //   return false
        // }
        const obj = {
            id: formName.id,
            landlordId: formName.landlordId,
            landlordBH: formName.landlordBH,
            town:formName.town,
            village:formName.village,
            commonAddress:formName.commonAddress,
            landlordName:formName.landlordName,
            phoneNumber:formName.phoneNumber,
            landlordCarNumber:formName.landlordCarNumber,
            landlordRFID: formName.landlordRFID
        }
        const updateHttp = that.api+'hzInfo/update'
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