<template>
 <div class="Allbox">
   <!-- <div class="buttonBox">
    <el-button type="primary" @click="addData()">添加数据</el-button>
    <el-button type="primary" @click="addCarousel()">将已选择的复选框内容添加到小程序轮播图</el-button>
   </div> -->
   
    <el-table
     ref="multipleTable"
      :data="tableData"
   
      style="width: 100%"
      show-header
      border  
 :height="tableHeight"
    >
    <!-- <el-table-column
      type="selection"
      width="50">
    </el-table-column> -->
    <!-- :show-overflow-tooltip="true" -->
         <!-- :row-style="{height:'100px'}"
      :cell-style="{height:'100px'}" -->
      <el-table-column :resizable="false" prop="auditId" label="提交人ID"  width="200"></el-table-column>
      <!-- <el-table-column :resizable="false" label="内容"  width="300">
        <template slot-scope="scope">
          <div class="concentStyle">{{scope.row.content}}</div>
　　    </template>
      </el-table-column> -->
      <el-table-column :resizable="false" prop="createTime" label="创建时间"  width="200"></el-table-column>   
      <el-table-column :resizable="false" prop="scoreDesc" label="积分描述" width="200"></el-table-column>
      <el-table-column :resizable="false" prop="score" label="积分" width="200"></el-table-column>
      <el-table-column :resizable="false" prop="userName" label="用户名字"  width="200"></el-table-column>
      <el-table-column :resizable="false" prop="userId" label="用户ID" width="200"></el-table-column>     
      
     
      <!-- <el-table-column :resizable="false"  fixed="right"  label="操作" width="280">
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="changeData(scope.$index, scope.row)">更改</el-button>
          <el-button
          size="mini"
          @click="deleteData(scope.$index, scope.row, tableData)">删除</el-button>
          <el-button
          size="mini"
          @click="showImage(scope.$index, scope.row, tableData)">预览图片</el-button>
      </template>
      </el-table-column> -->
    </el-table>

    <!-- 添加表单 -->
    <!-- <div class="modifyFrom" v-if="showAddForm">
       <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
         <el-form-item label="创建日期">
           <el-date-picker style="width:100%" v-model="formLabelAlign.createTime" type="date" placeholder="选择创建日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="发布日期">
           <el-date-picker style="width:100%" v-model="formLabelAlign.announceTime" type="date" placeholder="选择发布日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="formLabelAlign.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="formLabelAlign.content"></el-input>
        </el-form-item>
        <el-form-item label="创建者姓名">
          <el-input :disabled="true" v-model="userInfo.realName"></el-input>
        </el-form-item>
        <el-form-item label="创建者ID">
          <el-input :disabled="true" v-model="userInfo.id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload
            class="avatar-uploader"
            action=""
            :http-request="addImage" 
            :show-file-list="false"
            :on-success="handleAvatarSuccess" :on-change="onchangeImg"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div style="display:inline-block;color:#ccc">建议图片大小为820*550</div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAddForm(formLabelAlign)">立即添加</el-button>
          <el-button type="primary" @click="closeAddForm(formLabelAlign)">返回</el-button>
        </el-form-item>
      </el-form>
    </div> -->

    <!-- 修改表单 -->
    <!-- <div class="modifyFrom" v-if="showChangeForm">
        <el-form :label-position="labelPosition" label-width="100px" :model="changeformLabelAlign">
        <el-form-item label="创建日期">
          <el-date-picker style="width:100%" v-model="changeformLabelAlign.createTime" type="date" placeholder="选择创建日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="发布日期">
          <el-date-picker style="width:100%" v-model="changeformLabelAlign.announceTime" type="date" placeholder="选择发布日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="changeformLabelAlign.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="changeformLabelAlign.content"></el-input>
        </el-form-item>
        <el-form-item label="创建者姓名">
          <el-input :disabled="true" v-model="userInfo.realName"></el-input>
        </el-form-item>
        <el-form-item label="创建者ID">
          <el-input :disabled="true" v-model="userInfo.id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload
            class="avatar-uploader"
            action=""
            :http-request="addImage" 
            :show-file-list="false"
            :on-success="handleAvatarSuccess" :on-change="onchangeImg"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div style="display:inline-block;color:#ccc">建议图片大小为820*550</div>
        </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changeForm(changeformLabelAlign)">立即修改</el-button>
            <el-button type="primary" @click="closeChangeForm(changeformLabelAlign)">返回</el-button>
          </el-form-item>
        </el-form>
    </div> -->

    <!-- 预览图片 -->
    <!-- <div class="showPicture" v-if="showPicture">
      <img :src="noticeImageUrl" style="width:100%" />
      <el-button type="primary" style="margin-left: 84%;" @click="closePicture()">返回</el-button>
    </div> -->
  </div>
</template>

<script>

export default {
  name: "IntegralRecord",
  props: {
    msg: String
  },
  data() {
    return {
      tableHeight: window.innerHeight  - 80,
      userInfo:{},
      showAddForm: false,
      showChangeForm: false,
      imageUrl: null,
      noticeImageId: null,
      noticeImageUrl: null,
      showPicture: false,
      // 选择的轮播图信息
      multipleSelection: [],
      tableData: [
        {
          date: "2016-05-02",
          userName: "王小虎",
          userAddress: "上海市普陀区金沙江路 1518 弄",
          relationship:'父子',
          carnumber: '京A52057',
          creattime: '2020-06-12',
          usertype: '是',
          phoneNumber:'',
          sex: '',
          content: '商量个事立即登录受奖罚临时冻结斐林试剂东方嘉盛傅雷家书砥砺奋进塑料袋解放路时代峻峰来得及发链接砥砺奋进第三方精灵盛典杰弗里斯积分,商量个事立即登录受奖罚临时冻结斐林试剂东方嘉盛傅雷家书砥砺奋进塑料袋解放路时代峻峰来得及发链接砥砺奋进第三方精灵盛典杰弗里斯积分'
        },
        {
          date: "2016-05-02",
          userName: "王小虎",
          userAddress: "上海市普陀区金沙江路 1518 弄",
          relationship:'父子',
          carnumber: '京A52057',
          creattime: '2020-06-12',
          usertype: '是',
          phoneNumber:'',
          sex: '',
          content: '商量个事立即登录受奖罚临时冻结斐林试剂东方嘉盛傅雷家书砥砺奋进塑料袋解放路时代峻峰来得及发链接砥砺奋进第三方精灵盛典杰弗里斯积分,商量个事立即登录受奖罚临时冻结斐林试剂东方嘉盛傅雷家书砥砺奋进塑料袋解放路时代峻峰来得及发链接砥砺奋进第三方精灵盛典杰弗里斯积分'
        },
        {
          date: "2016-05-02",
          userName: "王小虎",
          userAddress: "上海市普陀区金沙江路 1518 弄",
          relationship:'父子',
          carnumber: '京A52057',
          creattime: '2020-06-12',
          usertype: '是',
          phoneNumber:'',
          sex: '',
          content: '商量个事立即登录受奖罚临时冻结斐林试剂东方嘉盛傅雷家书砥砺奋进塑料袋解放路时代峻峰来得及发链接砥砺奋进第三方精灵盛典杰弗里斯积分,商量个事立即登录受奖罚临时冻结斐林试剂东方嘉盛傅雷家书砥砺奋进塑料袋解放路时代峻峰来得及发链接砥砺奋进第三方精灵盛典杰弗里斯积分'
        },
        
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
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.userInfo)
    // this.tableHeight = window.innerHeight  - 190;
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    //判断如果是表头则不显示复选框
    cellclass(row){
      if(row.columnIndex===0){
        return 'DisabledSelection'
      }
    },
    toggleSelection() { //清空复选框
        this.$refs.multipleTable.clearSelection();
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val;
    },
    // 获取后台总表数据
    showTableData() {
      const that = this
      this.$axios.get(that.api+'/scoreLogs/PCSelectAll').then(function(res){
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
      const http = that.api+'notice/selectOneById/'+id
      this.$axios.get(http).then(function(res){
        
        //先获取数据回填
        const data = res.data.data
        that.noticeImageId = data.attachment

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
      that.imageUrl = null
      that.noticeImageId = null
      that.formLabelAlign= {
        announceTime: null,
        content: null,
        createTime: null,
        creatorId: null,
        creatorName: null,
        id: null,
        title: null,
        views: null,
        attachment: null
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
      const http = that.api+'notice/deleteById/'+id
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
    //预览图
    showImage(index,item,rows){
      const that = this
      if(item.attachment) {
        this.$axios.get(that.api+'notice/selectPictureById/'+item.attachment).then(function(res){
          console.log(res)
          that.noticeImageUrl = res.data.data.fileUrl
          console.log( that.noticeImageUrl)
          that.showPicture = true
        }).catch(function(err){
          console.log(err)
        })
      } else {
        that.$message({
          message: '还没有上传图片',
          type: 'success'
        });
      }
    },
    closePicture() {
      this.showPicture = false
    },
    //添加用户表单
    submitAddForm(formName) {
      const that = this
      //处理时间
      let aTime = ''
      let cTime = ''
      if(formName.announceTime) {
        aTime = that.uploadDate(formName.announceTime)
      }
      if(formName.createTime) {
        cTime = that.uploadDate(formName.createTime)
      }
      let uploadPictures = ''
      if(that.noticeImageId) {
        uploadPictures = that.noticeImageId.join(",")
      } else {
        uploadPictures = null
      }
      const obj = {
        announceTime: aTime,
        content: formName.content,
        createTime: cTime,
        creatorId: that.userInfo.id,
        title: formName.title,
        views: 0,
        attachment: uploadPictures,
        creatorName: that.userInfo.realName,
      }
        // 返回后台添加单条的信息
        this.$axios.post(that.api+'notice/insertNotice',obj,{headers:{'Content-Type':'application/json'}}).then(function(res){
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
        //处理时间
        let aTime = ''
        let cTime = ''
        if(formName.announceTime) {
          aTime = that.uploadDate(formName.announceTime)
        }
        if(formName.createTime) {
          cTime = that.uploadDate(formName.createTime)
        }
        let uploadPictures = ''
        if(that.noticeImageId) {
          if(that.noticeImageId.constructor===Array) {
             uploadPictures = that.noticeImageId.join(",")
          } else {
             uploadPictures = that.noticeImageId
          }
         
        } else {
          uploadPictures = null
        }
        const obj = {
            announceTime: aTime,
            content: formName.content,
            createTime: cTime,
            creatorId: that.userInfo.id,
            creatorName: that.userInfo.realName,
            id: formName.id,
            title: formName.title,
            views: 0,
            attachment: uploadPictures
        }
        const updateHttp = that.api+'notice/update'
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
    //上传图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log('before',file)
    //   const isJPG = file.type === 'image/jpeg';
    //   const isLt2M = file.size / 1024 / 1024 < 2;

    //   if (!isJPG) {
    //     this.$message.error('上传头像图片只能是 JPG 格式!');
    //   }
    //   if (!isLt2M) {
    //     this.$message.error('上传头像图片大小不能超过 2MB!');
    //   }
    //   return isJPG && isLt2M;
    },
    onchangeImg(file) {
      console.log('change', file)
    },
    addImage(param) {
      const that = this
      let _formData = new FormData();//formdata格式
       _formData.append('file', param.file);
        // 返回后台添加单条的信息
      this.$axios.post(that.api+'attachment/uploadFiles1',
      _formData,
      {headers:{'Content-Type':'application/x-www-form-urlencoded'}}
      ).then(function(res){
        console.log(res);
        that.noticeImageId = res.data.data
        console.log(that.noticeImageId)
        if(res.data.success) {
          that.$message({
            message: res.data.message,
            type: 'success'
          });
          // that.closeAddForm()
          //重新回去全部数据
          // that.showTableData() 
          // location.reload();
        }
      }).catch(function(err){
        console.log(err)
      })
    },
    //时间处理
    uploadDate(date) {
      let d = new Date(date)
      let datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      return datetime
    },
    //将已选择的复选框添加到轮播图
    addCarousel(){
      const that = this
      let arr = []
      if(that.multipleSelection.length > 0) {
        for(let i = 0; i<that.multipleSelection.length; i++) {
          if(!that.multipleSelection[i].attachment) {
            that.$message({
              message: '标题为'+that.multipleSelection[i].title+'的公告没有图片无法设为轮播图',
              type: 'error'
            });
            return false
          }
        }
        for(let i = 0; i<that.multipleSelection.length; i++) {
          arr.push(that.multipleSelection[i].id)
        }
      } else {
        that.$message({
          message: '请先选择要添加到轮播图的信息',
          type: 'error'
        });
      }
      if(that.multipleSelection.length > 5) {
        that.$message({
          message: '添加为轮播图的信息最多为5条',
          type: 'error'
        });
        return false
      }
      const str = JSON.stringify(arr).replace(/[\[\]]/g,"");
  
      const obj = {
        noticeAsCarousel: str,
        operatorId:that.userInfo.id,
        operatorName:that.userInfo.realName
      }
      this.$axios.get(that.api+'NoticeAsCarousel/updateOneNoticeAsCarousel/'+str+'/'+that.userInfo.id+'/'+that.userInfo.realName).then(function(res){
        // this.$axios.post(that.api+'NoticeAsCarousel/updateOneNoticeAsCarousel',obj,{headers:{'Content-Type':'application/json'}}).then(function(res){
          console.log(res);
          if(res.data.success) {
            that.$message({
              message: res.data.message,
              type: 'success'
            });
            that.toggleSelection() //上传后清空所有选中
          }
        }).catch(function(err){
          console.log(err)
        })
    }
  }
};
</script>

<style scoped>
.buttonBox{
  padding: 20px;
}
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
.showPicture{
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
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border: 1px solid #ccc;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .concentStyle{
    height: 120px;
    overflow: auto;
  }
  .el-table /deep/.DisabledSelection .cell .el-checkbox__inner{
    display:none;
    position:relative;
  }
  .el-table /deep/.DisabledSelection .cell:before{
    /* content:"选择";
    position:absolute;
    padding-left: 10px; */
  }
/* .el-tooltip__popper{max-width:200px} */
</style>