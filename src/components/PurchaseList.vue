<template>
  <div class="Allbox">
   <!-- <el-button type="primary" @click="addData()">添加数据</el-button> -->
    <el-table
      :data="tableData"
      style="width: 100%"
      show-header
      border  height="800"
    >
      <el-table-column prop="id" label="id"  width="160"></el-table-column>
      <el-table-column prop="name" label="姓名"  width="160"></el-table-column>
      <el-table-column prop="address" label="邮寄地址" width="160"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="160"></el-table-column>
      <el-table-column prop="number" label="购买量" width="160"></el-table-column>
      <el-table-column prop="score" label="使用积分" width="160"></el-table-column>
      <el-table-column prop="totalScore" label="剩余积分" width="160"></el-table-column>
      <!-- <el-table-column  label="重点关照" width="160">
      <template slot-scope="scope">{{scope.row.focusAttention=== 0? '不是': '是'}}</template></el-table-column> -->
      <el-table-column  label="操作" width="200">
        <template slot-scope="scope">
          <div v-if="scope.row.userState !== 1">已处理</div>
        <el-button v-if="scope.row.userState === 1"
          size="mini"
          @click="approved(scope.$index, scope.row)">未处理</el-button>
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
      const http = 'https://api.huijingwuye6688.com/MallOrders/selectAllMallOrders'
        this.$axios.get(http).then(function(res){
          const data = res.data.data
          that.tableData = data
        }).catch(function(err){
          console.log(err)
        })
    },
    approved(index, item) {
      console.log(index, item)
    },
  }
};
</script>
<style scoped>


</style>