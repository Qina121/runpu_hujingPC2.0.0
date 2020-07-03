<template>

  <div>
       <el-button type="primary" @click="addInfo()">添加数据</el-button>
       <!-- 预览表单 -->
       <el-table
      :data="tableData"
      style="width: 100%"
      show-header
      border  height="800"
    >
      <el-table-column prop="goodsId" label="序号"  width="160"></el-table-column>
      <el-table-column prop="goodsName" label="商品名称"  width="160"></el-table-column>
      <el-table-column label="商品图片"  width="100">
        <template slot-scope="scope">
　　　　    <img :src="scope.row.goodsPicture" width="80" height="80" />
　　    </template>
      </el-table-column>
      <el-table-column prop="goodsPrice" label="价钱" width="160"></el-table-column>
      <!-- <el-table-column prop="redeemPoints" label="兑换积分" width="160"></el-table-column> -->
      <el-table-column prop="goodsInventory" label="库存" width="160"></el-table-column>
      <el-table-column prop="goodsDescribe" label="描述" width="160"></el-table-column>
      <!-- <el-table-column  label="重点关照" width="160">
      <template slot-scope="scope">{{scope.row.focusAttention=== 0? '不是': '是'}}</template></el-table-column> -->
      <el-table-column  label="操作" width="200">
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="changeInfo(scope.$index, scope.row)">更改</el-button>
          <el-button
          size="mini"
          @click="deleteInfo(scope.$index, scope.row, tableData)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>

      <!-- 添加表单 -->
    <div class="modifyFrom" v-if="showAddForm">
       <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
        <el-form-item label="序号">
          <el-input v-model="formLabelAlign.goodsId"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="formLabelAlign.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="价钱">
          <el-input v-model="formLabelAlign.goodsPrice"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="formLabelAlign.goodsInventory"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="formLabelAlign.goodsDescribe"></el-input>
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
            <el-form-item label="序号">
          <el-input v-model="changeformLabelAlign.goodsId"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="changeformLabelAlign.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="价钱">
          <el-input v-model="changeformLabelAlign.goodsPrice"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="changeformLabelAlign.goodsInventory"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="changeformLabelAlign.goodsDescribe"></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload
            class="avatar-uploader"
            action=""
            :http-request="addImage" 
            :show-file-list="false"
            :on-success="handleAvatarSuccess" :on-change="onchangeImg"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width:60px;height:60px">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
  name: "Commodity",
  data() {
    return {
        showAddForm: false,
        showChangeForm: false,
        imageUrl: '',
        uploadFilesOfMall: null,
        labelPosition: 'right',
        tableData: [
            {
                goodsId: "3",
                goodsName: "豆油",
                goodsPrice: "30",
                goodsInventory:'30',
                goodsDescribe: '50mL',
                goodsPicture: 'http://img14.360buyimg.com/n5/s54x54_jfs/t1/120894/5/2728/83881/5ec7e56dEe9af0984/2fab4247e9eeb675.jpg'
            },
        ],
        formLabelAlign: {
            goodsId: null,
            goodsName: null,
            goodsPrice: null,
            goodsInventory:null,
            goodsDescribe: null,
            goodsPicture: null,
        },
        changeformLabelAlign: {
            goodsId: null,
            goodsName: null,
            goodsPrice: null,
            goodsInventory:null,
            goodsDescribe: null,
            goodsPicture: null,
        },
    };
  },
  created () {
    this.showList()
  },
  methods: {
    //更新tableData数据
      showList() {
        const that = this
        const http = 'https://api.huijingwuye6688.com/MallGoods/selectAllMallGoods'
          this.$axios.get(http).then(function(res){
            const data = res.data.data
            that.tableData = data
          }).catch(function(err){
            console.log(err)
          })
      },
      //添加数据
      addInfo() {
        this.showAddForm = true;
        // 初始化表单数据
        this.imageUrl = ''
        this.formLabelAlign = {
            goodsId: null,
            goodsName: null,
            goodsPrice: null,
            goodsInventory:null,
            goodsDescribe: null,
            goodsPicture: null,
        }
      },
      //单击更改回填数据
      changeInfo(index, item) {
          console.log('更改', index, item)
          const that = this
          this.showChangeForm = true
          // 获取单条数据
          const goodsId = Number(item.goodsId)
          const http = 'https://api.huijingwuye6688.com/MallGoods/selectOneInfo/'+goodsId
          this.$axios.get(http).then(function(res){
 
            //数据回填
            that.changeformLabelAlign =  {
              goodsId: res.data.data.goodsId,
              goodsName: res.data.data.goodsName,
              goodsPrice: res.data.data.goodsPrice,
              goodsInventory:res.data.data.goodsInventory,
              goodsDescribe: res.data.data.goodsDescribe,
              goodsPicture: res.data.data.goodsPicture,
            }
            that.imageUrl = res.data.data.goodsPicture
          }).catch(function(err){
            console.log(err)
          })
      },
      //删除发布的商品信息
      deleteInfo(index, item) {
        const that = this
        console.log('删除', index, item)
        const goodsId = Number(item.goodsId)
        const http = 'https://api.huijingwuye6688.com/MallGoods/pcDelete/?goodsId='+goodsId
        this.$axios.get(http).then(function(res){
          if(res.data.success) {
            that.$message({
              message: res.data.message,
              type: 'success'
            });
            that.showList()
          }
        }).catch(function(err){
          console.log(err)
        })
      },
      
      //立即添加数据
      submitAddForm(form) {
        const that = this
        const obj = {
          goodsId: form.goodsId,
          goodsName:form.goodsName,
          goodsPrice:form.goodsPrice,
          goodsInventory:form.goodsInventory,
          goodsDescribe:form.goodsDescribe,
          goodsPicture:that.uploadFilesOfMall
        }
        const updateHttp = 'https://api.huijingwuye6688.com/MallGoods/pcInsert'
        that.$axios.post(updateHttp,obj,{headers:{'Content-Type':'application/json'}}).then(function(res){
          if(res.data.success) {
            that.$message({
              message: res.data.message,
              type: 'success'
            });
            that.closeAddForm()
            that.showList() 
            
          }
        }).catch(function(err){
          console.log(err)
        })
      },
      //添加表单的返回按钮
      closeAddForm() {
        this.showAddForm = false;
      },
      // 点击提交修改表单按钮
      changeForm(form){
        console.log(form)
        const that = this
        const obj = {
            goodsId: form.goodsId,
            goodsName: form.goodsName,
            goodsPrice: form.goodsPrice,
            goodsInventory:form.goodsInventory,
            goodsDescribe: form.goodsDescribe,
            goodsPicture: that.uploadFilesOfMall,
        }
        const updateHttp = 'https://api.huijingwuye6688.com/MallGoods/pdUpdate'
        that.$axios.post(updateHttp,obj,{headers:{'Content-Type':'application/json'}}).then(function(res){
          if(res.data.success) {
            console.log(res.data.success)
            that.$message({
              message: res.data.message,
              type: 'success'
            });
            that.closeChangeForm()
            that.showList() 
          }
        }).catch(function(err){
          console.log(err)
        })
      },
      // 点击修改表单返回按钮
      closeChangeForm() {
        this.showChangeForm = false
      },
      //上传图片
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      onchangeImg(file) {
        console.log(file)
      },
      beforeAvatarUpload(file) {
        console.log('before',file)
      },
      addImage(param) {
        const that = this
        let _formData = new FormData();//formdata格式
        _formData.append('file', param.file);
          // 返回后台添加单条的信息
        this.$axios.post('https://api.huijingwuye6688.com/attachment/uploadFilesOfMall',
        _formData,
        {headers:{'Content-Type':'application/x-www-form-urlencoded'}}
        ).then(function(res){
          that.uploadFilesOfMall = res.data.data
          if(res.data.success) {
            that.$message({
              message: res.data.message,
              type: 'success'
            });
          }
        }).catch(function(err){
          console.log(err)
        })
        }
      },
 
    
    
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