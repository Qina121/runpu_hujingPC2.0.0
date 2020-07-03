<template>
 <div class="Allbox">
   <el-button type="primary" @click="addData()">添加数据</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
      show-header
      border  height="800"
    >
      <el-table-column prop="announceTime" label="发布日期"  width="120"></el-table-column>
      <el-table-column prop="content" label="内容"  width="120"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
      <el-table-column prop="creatorId" label="创建者ID" width="160"></el-table-column>
      <el-table-column prop="creatorName" label="创建者姓名" width="160"></el-table-column>
      <el-table-column prop="id" label="ID" width="160"></el-table-column>
      <!-- <el-table-column prop="carnumber" label="车牌号" width="160"></el-table-column> -->
      <!-- <el-table-column prop="creattime" label="创建日期" width="160"></el-table-column> -->
      <el-table-column prop="title" label="标题"  width="160"></el-table-column>
      <el-table-column prop="views" label="浏览量"  width="250"></el-table-column>
      <!-- <el-table-column  label="重点关照" width="160">
      <template slot-scope="scope">{{scope.row.focusAttention=== 0? '不是': '是'}}</template></el-table-column> -->
      <el-table-column  label="操作" width="280">
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
        <!-- 新添加一个上传通知里的图片按钮 -->
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
        <!-- 新添加一个上传通知里的图片按钮 -->
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
        </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changeForm(changeformLabelAlign)">立即修改</el-button>
            <el-button type="primary" @click="closeChangeForm(changeformLabelAlign)">返回</el-button>
          </el-form-item>
        </el-form>
    </div>

    <!-- 预览图片 -->
    <div class="showPicture" v-if="showPicture">
      <img :src="noticeImageUrl" style="width:100%" />
      <el-button type="primary" style="margin-left: 84%;" @click="closePicture()">返回</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "Notice",
  props: {
    msg: String
  },
  data() {
    return {
      showAddForm: false,
      showChangeForm: false,
      imageUrl: null,
      noticeImageId: null,
      noticeImageUrl: null,
      showPicture: false,
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
  mounted(){
    //初始化数据
    this.showTableData()
  },
  methods: {
    formatter(row, column) {
      return row.address;
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
      const http = 'https://api.huijingwuye6688.com/notice/deleteById/'+id
      this.$axios.get(http).then(function(res){
        if(res.data.success) {
          that.$message({
            message: res.data.message,
            type: 'success'
          });
          // console.log(rows)
          // rows.splice(index, 1);
          that.showTableData()
          location.reload();
          
        }
      }).catch(function(err){
        console.log(err)
      })
    },
    //预览图
    showImage(index,item,rows){
      const that = this
      if(item.attachment) {
        this.$axios.get('https://api.huijingwuye6688.com/notice/selectPictureById/'+item.attachment).then(function(res){
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
      const obj = {
        announceTime: formName.announceTime,
        content: formName.content,
        createTime: formName.createTime,
        creatorName: formName.creatorName,
        title: formName.title,
        views: formName.views,
        attachment: that.noticeImageId.join(",")
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
            location.reload();
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
            attachment: that.noticeImageId.join(",")
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
    // 获取后台总表数据
    showTableData() {
      const that = this
      this.$axios.get('https://api.huijingwuye6688.com/notice/selectAllNotice').then(function(res){
        that.tableData = []
        that.tableData = res.data.data

        console.log(that.tableData)
      }).catch(function(err){
        console.log(err)
      })
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
      this.$axios.post('https://api.huijingwuye6688.com/attachment/uploadFiles1',
      _formData,
      {headers:{'Content-Type':'application/x-www-form-urlencoded'}}
      ).then(function(res){
        console.log(res);
        that.noticeImageId = res.data.data
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

</style>