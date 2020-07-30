<template>
  <div class="Allbox">
   <!-- <el-button type="primary" @click="addData()">添加数据</el-button> -->
   <div class="searchOrder">
     <el-input v-model="searchOrderId" placeholder="请输入订单ID"></el-input>
  	  <el-button type="primary" @click="searchOrder">搜索</el-button>
   </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      show-header
      border  :height="tableHeight"
    >
      <el-table-column :resizable="false" prop="id" label="商品ID"  width="160"></el-table-column>
      <el-table-column :resizable="false" prop="goodsName" label="商品名称" width="160"></el-table-column>
      <el-table-column :resizable="false" label="商品图片"  width="100">
        <template slot-scope="scope">
　　　　    <img :src="scope.row.goodsPicture" width="80" height="80" />
　　    </template>
      </el-table-column>
      <el-table-column :resizable="false" prop="realName" label="兑换人姓名"  width="160"></el-table-column>
      <el-table-column :resizable="false" prop="phoneNumber" label="手机号" width="160"></el-table-column>
      <el-table-column :resizable="false" prop="creatTime" label="订单创建时间" width="160"></el-table-column>
      <el-table-column :resizable="false" prop="goodsNumber" label="购买数量" width="160"></el-table-column>
      <el-table-column :resizable="false" prop="sales" label="单个积分" width="160"></el-table-column>
      <!-- <el-table-column  label="重点关照" width="160">
      <template slot-scope="scope">{{scope.row.focusAttention=== 0? '不是': '是'}}</template></el-table-column> -->
      <el-table-column :resizable="false" label="操作" width="200">
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
      tableHeight: window.innerHeight  - 190,
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