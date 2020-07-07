<template>
 <div class="Allbox">

   <!-- <el-button type="primary" @click="addData()">添加数据</el-button> -->
    <el-table
      :data="tableData"
      style="width: 100%"
      show-header
      border  height="800"
    >
      <!-- <el-table-column prop="address" label="地址"  width="120"></el-table-column> -->
      <!-- <el-table-column prop="createTime" label="创建日期"  width="120"></el-table-column> -->
      <el-table-column prop="id" label="ID" width="160"></el-table-column>
      <el-table-column prop="rfidInfo" label="rfid描述" width="160"></el-table-column>
      <el-table-column prop="details" label="描述" width="160"></el-table-column>
      <el-table-column prop="userId" label="用户Id" width="160"></el-table-column>
      <el-table-column prop="score" label="积分" width="160"></el-table-column>
      <el-table-column  label="操作" width="120">
        <template slot-scope="scope">
          <!-- <div v-if="scope.row.reapirState !== 1" style="display:inline-block;margin-right:10px;">已审核</div> -->
        <!-- <el-button v-if="scope.row.reapirState === 1"
          size="mini"
          @click="approved(scope.$index, scope.row)">通过审核</el-button> -->
          <el-button
          size="mini"
          @click="deleteData(scope.$index, scope.row, tableData)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>

    <!-- 添加表单 -->
    <div class="modifyFrom" v-if="showAddForm">
       <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
        <el-form-item label="发布日期">
          <el-input v-model="formLabelAlign.announceTime"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="formLabelAlign.content"></el-input>
        </el-form-item>
        <el-form-item label="创建日期">
          <el-input v-model="formLabelAlign.createTime"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="formLabelAlign.title"></el-input>
        </el-form-item>
        <el-form-item label="浏览量">
          <el-input v-model="formLabelAlign.views"></el-input>
        </el-form-item>
        <el-form-item label="发布者ID">
          <el-input v-model="formLabelAlign.creatorId"></el-input>
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
          <!-- <el-form-item label="用户ID">
            <el-input v-model="formLabelAlign.landlordId"></el-input>
          </el-form-item> -->
          <el-form-item label="发布日期">
          <el-input v-model="changeformLabelAlign.announceTime"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="changeformLabelAlign.content"></el-input>
        </el-form-item>
        <el-form-item label="创建日期">
          <el-input v-model="changeformLabelAlign.createTime"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="changeformLabelAlign.title"></el-input>
        </el-form-item>
        <el-form-item label="浏览量">
          <el-input v-model="changeformLabelAlign.views"></el-input>
        </el-form-item>
        <el-form-item label="发布者ID">
          <el-input v-model="changeformLabelAlign.creatorId"></el-input>
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
  name: "AdministratorServiceManagement",
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
        announceTime: null,
        content: null,
        createTime: null,
        creatorId: null,
        creatorName: null,
        id: null,
        title: null,
        views: null,
      },
      changeformLabelAlign: {
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
        landlordId:null
      },
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
      this.$axios.get('https://api.huijingwuye6688.com/serviceManagement/PCSelectAll').then(function(res){
        that.tableData = []
        that.tableData = res.data.data

        console.log(that.tableData)
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
      const http = 'https://api.huijingwuye6688.com/notice/selectOneById/'+id
      this.$axios.get(http).then(function(res){
        //先获取数据回填
        const data = res.data.data
        that.changeformLabelAlign =  {
            announceTime: data.announceTime,
            content: data.content,
            createTime: data.createTime,
            creatorId: data.creatorId,
            creatorName: data.creatorName,
            id: data.id,
            title: data.title,
            views: data.views,
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
        landlordId:null
      },
      that.showAddForm = true
    },
    //删除表单数据
    deleteData(index,item,rows) {
      const that = this
      // const obj = {
      //   id:item.id,
      //   landlordId:item.landlordId
      // }
      const id = Number(item.id)
      const http = 'https://api.huijingwuye6688.com/serviceManagement/delete/'+id
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
      const obj = {
        announceTime: formName.announceTime,
        content: formName.content,
        createTime: formName.createTime,
        creatorName: formName.creatorName,
        title: formName.title,
        views: formName.views,
      }
        // 返回后台添加单条的信息
        this.$axios.post('https://api.huijingwuye6688.com/notice/insertNotice',obj,{headers:{'Content-Type':'application/json'}}).then(function(res){
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
    changeForm(formName) {
        const that = this
        const obj = {
            announceTime: formName.announceTime,
            content: formName.content,
            createTime: formName.createTime,
            creatorId: formName.creatorId,
            creatorName: formName.creatorName,
            id: formName.id,
            title: formName.title,
            views: formName.views,
        }
        const updateHttp = 'https://api.huijingwuye6688.com/notice/update'
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
    //报修通过审核
    approved(index,item) {
      console.log(index, item)
      const that = this
      const obj = {
        auditState : 2,
        userId : item.userId,
        phoneNumber : item.phoneNumber,
      }
      // const id = Number(item.id)
      const http = 'https://api.huijingwuye6688.com/repairInfo/updateRepairState/'+2+'/'+item.id+'/'+item.phoneNumber
        this.$axios.get(http).then(function(res){
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

</style>