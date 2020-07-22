<template>
  <div class="Allbox">
   <!-- <el-button type="primary" @click="addData()">添加数据</el-button> -->
   <div>
     <input class="searchOrder" type="text" name="" id="" placeholder="请输入订单ID" v-model="searchOrderId"/> 
  	  <button class="searchButton" @click="searchOrder">搜索</button>
   </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      show-header
      border  height="800"
    >
      <el-table-column prop="id" label="商品ID"  width="160"></el-table-column>
      <el-table-column prop="goodsName" label="商品名称" width="160"></el-table-column>
      <el-table-column label="商品图片"  width="100">
        <template slot-scope="scope">
　　　　    <img :src="scope.row.goodsPicture" width="80" height="80" />
　　    </template>
      </el-table-column>
      <el-table-column prop="realName" label="兑换人姓名"  width="160"></el-table-column>
      <el-table-column prop="phoneNumber" label="手机号" width="160"></el-table-column>
      <el-table-column prop="creatTime" label="订单创建时间" width="160"></el-table-column>
      <el-table-column prop="goodsNumber" label="购买数量" width="160"></el-table-column>
      <el-table-column prop="sales" label="单个积分" width="160"></el-table-column>
      <!-- <el-table-column  label="重点关照" width="160">
      <template slot-scope="scope">{{scope.row.focusAttention=== 0? '不是': '是'}}</template></el-table-column> -->
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <div v-if="scope.row.orderStatus !== 1">已审核</div>
        <el-button v-if="scope.row.orderStatus === 1"
          size="mini"
          @click="approved(scope.$index, scope.row)">未审核</el-button>
      </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
export default {
  name: "PurchaseList",
  data() {
    return {
      searchOrderId: '',
      tableData: [
        {
            id: "1",
            name: "陆行",
            address: "西城区阜成门",
            number:'1',
            phone: '13252415632',
            score: '50',
            totalScore: '500',
            userState: 1
        },
      ]
    };
  },
  created () {
    this.showList()
  },
  methods: {
    showList() {
      const that = this
      const http = that.api+'MallOrders/selectAllMallOrders'
        this.$axios.get(http).then(function(res){
          const data = res.data.data
          that.tableData = data
        }).catch(function(err){
          console.log(err)
        })
    },
    approved(index, item) {
      console.log(index, item)
      const that = this
      const http = that.api+'MallOrders/PCUpdateOrderStatus/'+item.id
        this.$axios.get(http).then(function(res){
          console.log(res.data.data)
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
    searchOrder() {
      const that = this
      if(that.searchOrderId) {
      const http = that.api+'MallOrders/selectOne/'+ that.searchOrderId
        this.$axios.get(http).then(function(res){
          console.log(res)
          that.tableData = [];
          that.tableData.push(res.data.data)
        }).catch(function(err){
          console.log(err)
        })
      } else{
        that.showList()
      }

    },

  }
};
</script>
<style scoped>
input, button{
    border:0;outline:none;
}
.searchOrder{
  width: 300px;
  height: 30px;
  border: 1px solid #5a8afb;
  border-radius: 5px;
  line-height: 30px;
  margin: 20px;
  padding-left: 10px;

}
.searchButton{
  width: 50px;
  height: 30px;
  background: #5a8afb;
  color: #fff;
  border-radius: 5px;
  border: 1px solid #5a8afb;
}



</style>